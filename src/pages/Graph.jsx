import { useMemo, useState } from "react";
import mapping from "../courseOutcomeMap.json";
import { courses as activeCourses, plos } from "../curriculumData";
import { PageHead } from "./ui";

const activeCodes = new Set(activeCourses.map(([code]) => code));
const activeMap = mapping.courses.filter(course => activeCodes.has(course.code));

export default function Graph() {
  const [selectedPlo, setSelectedPlo] = useState("PLO2");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = useMemo(() => activeMap.filter(course => course.plos.includes(selectedPlo)), [selectedPlo]);
  const detail = activeMap.find(course => course.code === selectedCourse);

  return <>
    <PageHead title="Curriculum Graph" subtitle="สำรวจความเชื่อมโยง PLO → รายวิชา → CLO → Knowledge / Skill / Attitude จากตารางภาคผนวกหลักสูตร" />
    <section className="metric-grid">
      <div><strong>{mapping.meta.courseCount}</strong><span>รายวิชา/กิจกรรมในตารางต้นฉบับ</span></div>
      <div><strong>{mapping.meta.cloCount}</strong><span>CLO ที่จัดโครงสร้างแล้ว</span></div>
      <div><strong>{activeMap.length}</strong><span>รายวิชาในแผนหลักสูตร</span></div>
      <div><strong>6</strong><span>PLO ที่ตรวจสอบได้</span></div>
    </section>
    <p className="source-note">สถานะ: ร่างสำหรับอาจารย์ตรวจรับรอง · ข้อมูลจากภาคผนวก ฐ หน้า PDF 239–269 · คลิก PLO แล้วเลือกรายวิชาเพื่อดู CLO และ K/S/A</p>

    <section className="graph-shell">
      <div className="plo-rail">
        {plos.map((text, index) => {
          const code = `PLO${index + 1}`;
          const count = activeMap.filter(course => course.plos.includes(code)).length;
          return <button className={selectedPlo === code ? "active" : ""} key={code} onClick={() => { setSelectedPlo(code); setSelectedCourse(null); }}>
            <span>{code}</span><strong>{count}</strong><small>{text}</small>
          </button>;
        })}
      </div>

      <div className="course-graph-panel">
        <header><div><p className="section-kicker">SELECTED OUTCOME</p><h2>{selectedPlo}</h2><p>{plos[Number(selectedPlo.slice(3)) - 1]}</p></div><strong>{courses.length}<small> รายวิชา</small></strong></header>
        <div className="graph-course-grid">{courses.map(course => <button className={selectedCourse === course.code ? "active" : ""} key={course.code} onClick={() => setSelectedCourse(course.code)}><code>{course.code}</code><strong>{course.thai}</strong><small>{course.outcomes.filter(outcome => outcome.plos.includes(selectedPlo)).length} CLO เชื่อม {selectedPlo}</small></button>)}</div>
      </div>
    </section>

    {detail && <section className="content-section graph-detail">
      <header><div><p className="section-kicker">COURSE OUTCOMES</p><h2>{detail.code} {detail.thai}</h2><p>{detail.english}</p></div><button onClick={() => setSelectedCourse(null)}>ปิด ×</button></header>
      <div className="clo-table"><table><thead><tr><th>CLO</th><th>ผลลัพธ์การเรียนรู้</th><th>K</th><th>S</th><th>A</th><th>PLO</th></tr></thead><tbody>{detail.outcomes.map(outcome => <tr key={outcome.clo} className={outcome.plos.includes(selectedPlo) ? "highlight" : ""}><td>{outcome.clo}</td><td>{outcome.text}</td><td>{outcome.knowledge.join(", ") || "–"}</td><td>{outcome.skill.join(", ") || "–"}</td><td>{outcome.attitude.join(", ") || "–"}</td><td>{outcome.plos.join(", ")}</td></tr>)}</tbody></table></div>
    </section>}
  </>;
}
