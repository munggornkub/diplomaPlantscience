import json
import re
from collections import Counter, defaultdict
from pathlib import Path

import pdfplumber


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "sources" / "หลักสูตร-ปวส-พืชศาสตร์-2570.pdf"
JSON_OUTPUT = ROOT / "src" / "courseOutcomeMap.json"
MD_OUTPUT = ROOT / "vault" / "05_TQF2_Academic_Drafts" / "12_CLO_KSA_PLO_Draft_for_Review.md"

CODE_RE = re.compile(r"(?:\d{5}[-*]\d{4})")
CLO_RE = re.compile(r"^\s*(\d+)\.\s*(.*)", re.S)
LEVEL_RE = re.compile(r"[KSA][1-7]")
PLO_RE = re.compile(r"PLO[1-6]")

NAME_OVERRIDES = {
    "30905*0006": ("อาชีวอนามัยและความปลอดภัย", "Occupational Health and Safety"),
    "30000-1501": ("สังคมไทยในยุคดิจิทัล", "Thai Society in the Digital Era"),
    "30905*1006": ("สรีรวิทยาของพืช", "Plant Physiology"),
    "30905*1115": ("การขยายพันธุ์พืชเพื่อการค้า", "Commercial Plant Propagation"),
    "30905*1127": ("โครงงานพิเศษพืชศาสตร์", "Special Project in Plant Science"),
}


def clean(value):
    text = str(value or "").replace("\u2013", "-").replace("\u2014", "-")
    return re.sub(r"\s+", " ", text).strip()


def course_label(value):
    lines = [clean(line) for line in str(value or "").splitlines() if clean(line)]
    if not lines:
        return None, None, None
    match = CODE_RE.search(lines[0])
    if not match:
        return None, None, None
    code = match.group(0)
    thai = lines[1] if len(lines) > 1 else ""
    english = " ".join(lines[2:]) if len(lines) > 2 else ""
    return code, thai, english


records = []
current = {"code": None, "thai": "", "english": ""}

with pdfplumber.open(SOURCE) as pdf:
    # Appendix table: PDF pages 239-269 (zero-based 238-268).
    for page_index in range(238, 269):
        page = pdf.pages[page_index]
        for table in page.extract_tables():
            if not table:
                continue
            header = [clean(cell) for cell in table[0]]
            def find_col(term):
                return next((i for i, cell in enumerate(header) if term.lower() in cell.lower()), None)
            course_col = find_col("รายวิชา")
            clo_col = find_col("Course Learning Outcomes")
            knowledge_col = find_col("Knowledge")
            skill_col = find_col("Skill")
            attitude_col = find_col("Attitude")
            plo_col = find_col("PLO")
            required = [course_col, clo_col, knowledge_col, skill_col, attitude_col, plo_col]
            if any(index is None for index in required):
                continue
            for row in table[1:]:
                if len(row) <= max(required):
                    continue
                code, thai, english = course_label(row[course_col])
                if code:
                    current = {"code": code, "thai": thai, "english": english}
                clo_text = clean(row[clo_col])
                clo_match = CLO_RE.match(clo_text)
                if not current["code"] or not clo_match:
                    continue
                knowledge = LEVEL_RE.findall(clean(row[knowledge_col]))
                skill = LEVEL_RE.findall(clean(row[skill_col]))
                attitude = LEVEL_RE.findall(clean(row[attitude_col]))
                plos = sorted(set(PLO_RE.findall(clean(row[plo_col]))), key=lambda value: int(value[3:]))
                records.append({
                    **current,
                    "clo": int(clo_match.group(1)),
                    "text": clean(clo_match.group(2)),
                    "knowledge": knowledge,
                    "skill": skill,
                    "attitude": attitude,
                    "plos": plos,
                    "sourcePage": page_index + 1,
                })

deduplicated = {}
for record in records:
    deduplicated[(record["code"], record["clo"])] = record
records = list(deduplicated.values())
records.sort(key=lambda row: (row["sourcePage"], row["code"], row["clo"]))

for record in records:
    if record["code"] in NAME_OVERRIDES:
        record["thai"], record["english"] = NAME_OVERRIDES[record["code"]]

courses = defaultdict(list)
for record in records:
    courses[record["code"]].append(record)

plo_counts = Counter(plo for record in records for plo in record["plos"])
ksa_counts = {
    "K": sum(bool(record["knowledge"]) for record in records),
    "S": sum(bool(record["skill"]) for record in records),
    "A": sum(bool(record["attitude"]) for record in records),
}

payload = {
    "meta": {
        "status": "draft-for-review",
        "source": "sources/หลักสูตร-ปวส-พืชศาสตร์-2570.pdf",
        "sourcePages": "239-269",
        "courseCount": len(courses),
        "cloCount": len(records),
        "ksaCounts": ksa_counts,
        "ploLinkCounts": dict(sorted(plo_counts.items())),
    },
    "courses": [
        {
            "code": code,
            "thai": rows[0]["thai"],
            "english": rows[0]["english"],
            "plos": sorted({plo for row in rows for plo in row["plos"]}, key=lambda value: int(value[3:])),
            "outcomes": [{key: value for key, value in row.items() if key not in {"code", "thai", "english"}} for row in rows],
        }
        for code, rows in courses.items()
    ],
}

JSON_OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

lines = [
    "---",
    "tags: [curriculum-2570, CLO, KSA, PLO-mapping, draft-for-review]",
    'source: "sources/หลักสูตร-ปวส-พืชศาสตร์-2570.pdf"',
    'source_pages: "PDF 239-269 (หน้าเอกสาร 234-264)"',
    "status: draft-for-review",
    "updated: 2026-08-21",
    "---",
    "",
    "# ร่าง CLO → K/S/A → PLO1-PLO6 สำหรับตรวจรับรอง",
    "",
    "> [!warning] สถานะเอกสาร",
    "> ถอดและจัดโครงสร้างจากตารางภาคผนวก ฐ ในเล่มหลักสูตร พ.ศ. 2570 เพื่อใช้ตรวจสอบและสร้าง Curriculum Graph ยังต้องผ่านการรับรองจากอาจารย์ประจำหลักสูตร",
    "",
    "## สรุปการตรวจข้อมูล",
    "",
    f"- รายวิชา/กิจกรรม: **{len(courses)}** รหัส",
    f"- CLO: **{len(records)}** ข้อ",
    f"- CLO ที่มี Knowledge: **{ksa_counts['K']}** ข้อ",
    f"- CLO ที่มี Skill: **{ksa_counts['S']}** ข้อ",
    f"- CLO ที่มี Attitude: **{ksa_counts['A']}** ข้อ",
    "- จำนวนจุดเชื่อม PLO: " + ", ".join(f"{key} = {value}" for key, value in sorted(plo_counts.items())),
    "",
    "## ตารางรายวิชาและ CLO",
    "",
]

for code, rows in courses.items():
    first = rows[0]
    lines.extend([
        f"### {code} {first['thai']}",
        "",
        f"*{first['english']}*" if first["english"] else "",
        "",
        "| CLO | ผลลัพธ์การเรียนรู้ | K | S | A | PLO | หน้า PDF |",
        "|---:|---|:---:|:---:|:---:|---|---:|",
    ])
    for row in rows:
        text = row["text"].replace("|", "\\|")
        lines.append(
            f"| {row['clo']} | {text} | {', '.join(row['knowledge']) or '-'} | {', '.join(row['skill']) or '-'} | {', '.join(row['attitude']) or '-'} | {', '.join(row['plos']) or '-'} | {row['sourcePage']} |"
        )
    lines.append("")

lines.extend([
    "## จุดตรวจรับรอง",
    "",
    "1. ตรวจระดับ K/S/A ของ CLO ที่มีคำกริยาหลายมิติในข้อเดียว",
    "2. ตรวจว่า PLO ที่เชื่อมแต่ละ CLO เป็นผลลัพธ์หลักหรือผลลัพธ์สนับสนุน",
    "3. ตรวจรายวิชาเลือกที่ไม่ได้เปิดในแผนการเรียนปัจจุบันก่อนนำไปนับ coverage",
    "4. เมื่อรับรองแล้วให้กำหนดระดับรายวิชา–PLO เป็น I/R/M สำหรับ Curriculum Graph",
])

MD_OUTPUT.write_text("\n".join(line for line in lines if line is not None), encoding="utf-8")
print(json.dumps(payload["meta"], ensure_ascii=False, indent=2))
