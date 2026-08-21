import argparse
import json
import re
from pathlib import Path

import pdfplumber


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "src" / "courseOutcomeMap.json"
SOURCE_PDF = ROOT / "sources" / "หลักสูตร-ปวส-พืชศาสตร์-2570.pdf"
COURSE_DIR = ROOT / "vault" / "04_Course_Descriptions_2570" / "courses"
CURRICULUM_DATA = ROOT / "src" / "curriculumData.js"
REPORT_PATH = ROOT / "vault" / "05_TQF2_Academic_Drafts" / "13_CLO_Text_Repair_Report.md"
LEGACY_MAPPING = ROOT / "vault" / "05_TQF2_Academic_Drafts" / "10_Course_Learning_Outcomes_CLO_Mapping.md"

START_MARKERS = ("ผลลัพธ์การเรียนรู้ระดับรายวิชา (CLOs)", "ผลลัพธ์การเรียนรู้ระดับรายวิชา")
END_MARKERS = ("จุดประสงค์รายวิชา", "จุดประสงค์ของรายวิชา")
NUMBERED = re.compile(r"^\s*(\d+)\.\s*(.*)$")

MANUAL_VERIFIED = {
    "30905*4006": ([
        (1, "เข้าใจหลักการและกระบวนการเสริมสร้างทักษะประสบการณ์วิชาการและวิชาชีพ การพัฒนาคุณภาพชีวิต การพัฒนาองค์กร ชุมชน สังคม ระเบียบ ข้อบังคับของสถานประกอบการ และทักษะการปฏิบัติงานในสถานประกอบการ"),
        (2, "วางแผน ดำเนินกิจกรรมด้วยการโค้ชชิ่ง เป็นผู้นำและผู้ตามที่ดี ประเมินผล และปรับปรุงการทำงานในสถานประกอบการ"),
        (3, "มีเจตคติและกิจนิสัยที่ดีในการทำงานด้วยความรับผิดชอบ มีวินัย พอเพียง ซื่อสัตย์ จิตอาสา มีความคิดริเริ่มสร้างสรรค์ และสามารถทำงานร่วมกับผู้อื่น"),
        (4, "ประเมินประสบการณ์จากการเข้าร่วมกิจกรรมและเสนอแนวทางนำไปใช้ในการพัฒนาตนเองและวิชาชีพ"),
    ], "manual:cross-page-source-check"),
}

SAFE_TEXT_FIXES = {
    "ถูกต้อ ": "ถูกต้อง ",
    "ถูกต้อ": "ถูกต้อง",
}


def normalize_line(value):
    text = re.sub(r"\s+", " ", value.replace("\u200b", "")).strip()
    for wrong, correct in SAFE_TEXT_FIXES.items():
        text = text.replace(wrong, correct)
    return text


def extract_numbered(lines):
    outcomes = []
    current = None
    for raw in lines:
        line = normalize_line(raw)
        if not line:
            continue
        match = NUMBERED.match(line)
        if match:
            if current:
                outcomes.append(current)
            current = {"number": int(match.group(1)), "parts": [match.group(2).strip()]}
        elif current:
            current["parts"].append(line)
    if current:
        outcomes.append(current)
    return [(item["number"], "".join(item["parts"]).strip()) for item in outcomes]


def section_lines(text):
    lines = text.splitlines()
    start = next((i for i, line in enumerate(lines) if any(marker in line for marker in START_MARKERS)), None)
    if start is None:
        return []
    end = next((i for i in range(start + 1, len(lines)) if any(marker in lines[i] for marker in END_MARKERS)), len(lines))
    return lines[start + 1:end]


def markdown_sources():
    result = {}
    for path in COURSE_DIR.glob("*.md"):
        text = path.read_text(encoding="utf-8")
        code_match = re.search(r"course_code:\s*[\"']?([^\"'\n]+)", text)
        if not code_match:
            continue
        outcomes = extract_numbered(section_lines(text))
        if outcomes:
            result[code_match.group(1).strip()] = (outcomes, f"vault:{path.name}")
    return result


def markdown_name_sources():
    result = {}
    for path in COURSE_DIR.glob("*.md"):
        text = path.read_text(encoding="utf-8")
        match = re.search(r"(?m)^#\s+(\d{5}[-*]\d{4})\s+(.+?)\s*$", text)
        if not match:
            continue
        code, thai = match.group(1), normalize_line(match.group(2))
        body_match = re.search(rf"(?m)^{re.escape(code)}\s+.+?\s*$\n([^\n]+)", text)
        english = normalize_line(body_match.group(1)) if body_match else ""
        result[code] = (thai, english)
    return result


def curriculum_name_sources():
    text = CURRICULUM_DATA.read_text(encoding="utf-8")
    courses_start = text.index("export const courses = [")
    courses_end = text.index("\n];", courses_start)
    text = text[courses_start:courses_end]
    return {
        code: (normalize_line(thai), "")
        for code, thai in re.findall(r'\["(\d{5}[-*]\d{4})",\s*"([^"]+)"', text)
    }


def pdf_sources(codes):
    result = {}
    with pdfplumber.open(SOURCE_PDF) as pdf:
        pages = [page.extract_text(x_tolerance=2, y_tolerance=3) or "" for page in pdf.pages[:238]]
    full_text = "\n".join(pages)
    for code in codes:
        candidates = []
        for match in re.finditer(re.escape(code), full_text):
            window = full_text[match.start():match.start() + 7000]
            lines = section_lines(window)
            if lines:
                outcomes = extract_numbered(lines)
                if outcomes:
                    candidates.append(outcomes)
        if candidates:
            result[code] = (max(candidates, key=len), "pdf:course-description")
    return result


def legacy_mapping_sources(codes):
    """Recover readable CLO text for general education/activity rows.

    These rows have no standalone course-description page in this curriculum.
    The older appendix transcription is cleaner than the narrow table cells.
    """
    text = LEGACY_MAPPING.read_text(encoding="utf-8", errors="replace").replace("\x00", "")
    result = {}
    for code in codes:
        start = re.search(rf"(?m)^{re.escape(code)}(?=\s)", text)
        if not start:
            continue
        tail = text[start.end():]
        end = re.search(r"\d{5}[-*]\d{4}", tail)
        block = tail[:end.start()] if end else tail
        outcomes = []
        current = None
        for raw in block.splitlines():
            line = normalize_line(raw)
            numbered = NUMBERED.match(line)
            if numbered:
                if current:
                    outcomes.append(current)
                current = {"number": int(numbered.group(1)), "parts": [numbered.group(2).strip()]}
                continue
            if current and re.search(r"\bK[1-7]\b", line):
                outcomes.append(current)
                current = None
                continue
            if current and line:
                current["parts"].append(line)
        if current:
            outcomes.append(current)
        cleaned = [(item["number"], "".join(item["parts"]).strip()) for item in outcomes]
        if cleaned:
            result[code] = (cleaned, "legacy:appendix-transcription")
    return result


def legacy_name_sources(codes):
    text = LEGACY_MAPPING.read_text(encoding="utf-8", errors="replace").replace("\x00", "")
    result = {}
    for code in codes:
        start = re.search(rf"(?m)^{re.escape(code)}(?=\s)", text)
        if not start:
            continue
        tail = text[start.end():]
        numbered = re.search(r"(?m)^\s*1\.\s", tail)
        if not numbered:
            continue
        header = [normalize_line(line) for line in tail[:numbered.start()].splitlines() if normalize_line(line)]
        thai_parts = []
        english_parts = []
        english_started = False
        for line in header:
            if re.search(r"[A-Za-z]", line):
                english_started = True
            if english_started:
                english_parts.append(line)
            elif re.search(r"[ก-๙]", line):
                thai_parts.append(line)
        if thai_parts:
            result[code] = ("".join(thai_parts), " ".join(english_parts))
    return result


def main(write=False):
    payload = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    courses = payload["courses"]
    sources = markdown_sources()
    missing = [course["code"] for course in courses if course["code"] not in sources]
    sources.update(pdf_sources(missing))
    # Prefer the established appendix transcription for courses without a
    # standalone description; it preserves Thai glyph order better than the PDF table.
    sources.update(legacy_mapping_sources(missing))
    sources.update(MANUAL_VERIFIED)
    names = markdown_name_sources()
    names.update(legacy_name_sources([course["code"] for course in courses if course["code"] not in names]))
    # The curriculum array is manually curated and is the cleanest source for
    # official Thai names of the 42 plant-science courses.
    for code, (thai, _) in curriculum_name_sources().items():
        previous_english = names.get(code, ("", ""))[1]
        names[code] = (thai, previous_english)

    repaired_courses = 0
    repaired_clos = 0
    changed_clos = 0
    skipped = []
    source_counts = {}

    for course in courses:
        if course["code"] in names:
            course["thai"], course["english"] = names[course["code"]]
        candidate = sources.get(course["code"])
        expected_numbers = [outcome["clo"] for outcome in course["outcomes"]]
        if not candidate:
            skipped.append((course["code"], "ไม่พบข้อความรายละเอียดรายวิชา"))
            continue
        clean_outcomes, source = candidate
        clean_numbers = [number for number, _ in clean_outcomes]
        if clean_numbers != expected_numbers:
            skipped.append((course["code"], f"ลำดับไม่ตรง: ต้องการ {expected_numbers}, พบ {clean_numbers}"))
            continue
        repaired_courses += 1
        repaired_clos += len(clean_outcomes)
        source_counts[source.split(":")[0]] = source_counts.get(source.split(":")[0], 0) + 1
        clean_by_number = dict(clean_outcomes)
        for outcome in course["outcomes"]:
            replacement = clean_by_number[outcome["clo"]]
            if replacement != outcome["text"]:
                changed_clos += 1
                outcome["text"] = replacement

    report = [
        "---",
        "tags: [CLO, text-quality, repair-report]",
        "status: verified-against-course-descriptions",
        "updated: 2026-08-21",
        "---",
        "",
        "# รายงานตรวจแก้ข้อความ CLO",
        "",
        f"- รายวิชาที่ตรวจและจับคู่ครบ: **{repaired_courses}/{len(courses)}**",
        f"- CLO ที่ตรวจเทียบ: **{repaired_clos}**",
        f"- CLO ที่มีการแก้ข้อความ: **{changed_clos}**",
        f"- แหล่งจากไฟล์รายละเอียดรายวิชาใน vault: **{source_counts.get('vault', 0)} รายวิชา**",
        f"- แหล่งจากรายละเอียดรายวิชาใน PDF: **{source_counts.get('pdf', 0)} รายวิชา**",
        f"- แหล่งจากตารางภาคผนวกฉบับถอดข้อความเดิม: **{source_counts.get('legacy', 0)} รายวิชา**",
        f"- รายวิชาที่ตรวจข้อความข้ามหน้าด้วยมือ: **{source_counts.get('manual', 0)} รายวิชา**",
        "",
        "## รายวิชาที่ยังไม่แทนข้อความอัตโนมัติ",
        "",
    ]
    report.extend(f"- `{code}`: {reason}" for code, reason in skipped)
    if not skipped:
        report.append("- ไม่มี")

    print(json.dumps({
        "courses": len(courses),
        "matchedCourses": repaired_courses,
        "checkedClos": repaired_clos,
        "changedClos": changed_clos,
        "skippedCourses": len(skipped),
        "skipped": [{"code": code, "reason": reason} for code, reason in skipped],
    }, ensure_ascii=False, indent=2))

    if write:
        payload["meta"]["textQuality"] = "verified-against-course-descriptions"
        DATA_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        REPORT_PATH.write_text("\n".join(report) + "\n", encoding="utf-8")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    main(write=args.write)
