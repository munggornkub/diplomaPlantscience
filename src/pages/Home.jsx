import { Link } from "react-router-dom";
import { program, structure, plos } from "../curriculumData";
import { PageHead } from "./ui";

export default function Home() {
  return <>
    <PageHead title="ปวส. พืชศาสตร์" subtitle={`${program.englishTitle} · ${program.year}`} />
    <section className="hero-panel">
      <p className="source-chip">ข้อมูลจากเล่มหลักสูตรฉบับเสนอกรรมการบริหารคณะ · 270 หน้า</p>
      <h2>{program.title}</h2><p>{program.faculty}</p><blockquote>{program.philosophy}</blockquote>
    </section>
    <section className="metric-grid">
      <div><strong>{program.credits}+</strong><span>หน่วยกิต</span></div>
      <div><strong>{plos.length}</strong><span>PLO</span></div>
      <div><strong>2</strong><span>ปีการศึกษา</span></div>
      <div><strong>42</strong><span>รายวิชาพืชศาสตร์</span></div>
    </section>
    <section className="content-section"><h2>โครงสร้างโดยย่อ</h2><div className="structure-list">{structure.map(item => <div key={item.label}><strong>{item.credits}</strong><h3>{item.label}</h3><p>{item.detail}</p></div>)}</div><Link className="text-link" to="/structure">ดูโครงสร้างทั้งหมด →</Link></section>
  </>;
}

