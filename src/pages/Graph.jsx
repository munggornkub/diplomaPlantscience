import { useEffect, useMemo, useState } from "react";
import mapping from "../courseOutcomeMap.json";
import { courses as activeCourses, plos } from "../curriculumData";
import { PageHead } from "./ui";

const activeCodes = new Set(activeCourses.map(([code]) => code));
const activeMap = mapping.courses.filter(course => activeCodes.has(course.code));

export default function Graph() {
  const [selectedPlo, setSelectedPlo] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const courses = useMemo(() => selectedPlo ? activeMap.filter(course => course.plos.includes(selectedPlo)) : [], [selectedPlo]);
  const detail = activeMap.find(course => course.code === selectedCourse);
  const ploIndex = selectedPlo ? Number(selectedPlo.slice(3)) - 1 : -1;

  const closeDialog = () => { setSelectedPlo(null); setSelectedCourse(null); };

  useEffect(() => {
    if (!selectedPlo) return undefined;
    const onKeyDown = event => event.key === "Escape" && closeDialog();
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.classList.remove("modal-open"); };
  }, [selectedPlo]);

  return <>
    <PageHead title="Curriculum Graph" subtitle="สำรวจความเชื่อมโยง PLO → รายวิชา → CLO → Knowledge / Skill / Attitude จากตารางภาคผนวกหลักสูตร" />
    <section className="metric-grid">
      <div><strong>{mapping.meta.courseCount}</strong><span>รายวิชา/กิจกรรมในตารางต้นฉบับ</span></div>
      <div><strong>{mapping.meta.cloCount}</strong><span>CLO ที่จัดโครงสร้างแล้ว</span></div>
      <div><strong>{activeMap.length}</strong><span>รายวิชาในแผนหลักสูตร</span></div>
      <div><strong>6</strong><span>PLO ที่ตรวจสอบได้</span></div>
    </section>
    <p className="source-note">คลิก PLO เพื่อเปิดรายวิชาในหน้าต่างลอย จากนั้นคลิกรายวิชาเพื่อดู CLO โดยไม่ต้องเลื่อนลงด้านล่าง · กด Esc หรือปุ่ม × เพื่อปิด</p>

    <section className="graph-launcher">
      <header><p className="section-kicker">PROGRAM LEARNING OUTCOMES</p><h2>เลือก PLO ที่ต้องการสำรวจ</h2><p>แต่ละ PLO จะแสดงรายวิชาที่สนับสนุนผลลัพธ์ พร้อมจำนวน CLO ที่เชื่อมโยง</p></header>
      <div className="plo-card-grid">{plos.map((text, index) => {
        const code = `PLO${index + 1}`;
        const count = activeMap.filter(course => course.plos.includes(code)).length;
        return <button key={code} onClick={() => { setSelectedPlo(code); setSelectedCourse(null); }}><span>{code}</span><strong>{count}<small> รายวิชา</small></strong><p>{text}</p><em>เปิดข้อมูล →</em></button>;
      })}</div>
    </section>

    {selectedPlo && <div className="graph-modal-backdrop" onMouseDown={event => event.target === event.currentTarget && closeDialog()}>
      <section className="graph-modal" role="dialog" aria-modal="true" aria-labelledby="graph-modal-title">
        <header className="graph-modal-header">
          <div><p className="section-kicker">{detail ? "COURSE LEARNING OUTCOMES" : "SELECTED PROGRAM OUTCOME"}</p><h2 id="graph-modal-title">{detail ? `${detail.code} ${detail.thai}` : selectedPlo}</h2><p>{detail ? detail.english : plos[ploIndex]}</p></div>
          <div className="graph-modal-actions">{detail && <button onClick={() => setSelectedCourse(null)}>← รายวิชาใน {selectedPlo}</button>}<button className="graph-modal-close" onClick={closeDialog} aria-label="ปิดหน้าต่าง">×</button></div>
        </header>
        <div className="graph-modal-body" key={detail?.code || selectedPlo}>
          {!detail && <><div className="graph-modal-summary"><strong>{courses.length}</strong><span>รายวิชาที่เชื่อมกับ {selectedPlo}</span></div><div className="graph-course-grid modal-course-grid">{courses.map(course => <button key={course.code} onClick={() => setSelectedCourse(course.code)}><code>{course.code}</code><strong>{course.thai}</strong><small>{course.english}</small><em>{course.outcomes.filter(outcome => outcome.plos.includes(selectedPlo)).length} CLO เชื่อม {selectedPlo} →</em></button>)}</div></>}
          {detail && <div className="clo-table modal-clo-table"><table><thead><tr><th>CLO</th><th>ผลลัพธ์การเรียนรู้</th><th>K</th><th>S</th><th>A</th><th>PLO</th></tr></thead><tbody>{detail.outcomes.map(outcome => <tr key={outcome.clo} className={outcome.plos.includes(selectedPlo) ? "highlight" : ""}><td>{outcome.clo}</td><td>{outcome.text}</td><td>{outcome.knowledge.join(", ") || "–"}</td><td>{outcome.skill.join(", ") || "–"}</td><td>{outcome.attitude.join(", ") || "–"}</td><td>{outcome.plos.join(", ")}</td></tr>)}</tbody></table></div>}
        </div>
      </section>
    </div>}
  </>;
}
