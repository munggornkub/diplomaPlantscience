import { useEffect, useState } from "react";
import { careerPaths } from "../careerData";
import { PageHead } from "./ui";

function CareerModal({ career, onClose }) {
  useEffect(() => {
    if (!career) return undefined;
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [career, onClose]);

  if (!career) return null;
  return (
    <div className="career-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="career-modal" role="dialog" aria-modal="true" aria-labelledby="career-modal-title">
        <header className="career-modal-hero">
          <img src={career.image} alt="" />
          <div className="career-modal-shade" />
          <div className="career-modal-title">
            <span>{career.number} · {career.en}</span>
            <h2 id="career-modal-title">{career.title}</h2>
            <p>{career.summary}</p>
          </div>
          <button className="career-modal-close" type="button" aria-label="ปิด" onClick={onClose}>×</button>
        </header>
        <div className="career-modal-body">
          <div className="career-detail-grid">
            <section><h3>ตำแหน่งเริ่มต้น</h3><div className="career-chip-list">{career.roles.map((item) => <span key={item}>{item}</span>)}</div></section>
            <section><h3>สถานที่ทำงาน</h3><ul>{career.workplaces.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section className="career-wide"><h3>งานที่ทำ</h3><div className="career-duty-grid">{career.duties.map((item, index) => <div key={item}><strong>0{index + 1}</strong><p>{item}</p></div>)}</div></section>
            <section><h3>ทักษะสำคัญ</h3><div className="career-chip-list soft">{career.skills.map((item) => <span key={item}>{item}</span>)}</div></section>
            <section><h3>เครื่องมือและเทคโนโลยี</h3><div className="career-chip-list soft">{career.tools.map((item) => <span key={item}>{item}</span>)}</div></section>
            <section><h3>PLO ที่เกี่ยวข้อง</h3><div className="career-plo-list">{career.plos.map((item) => <strong key={item}>{item}</strong>)}</div></section>
            <section><h3>รายวิชาที่เตรียมความพร้อม</h3><ul className="career-course-list">{career.courses.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section className="career-wide"><h3>การเติบโตในสายอาชีพ</h3><div className="career-progression">{career.progression.map((item, index) => <div key={item}><span>{index + 1}</span><strong>{item}</strong></div>)}</div></section>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function Careers() {
  const [selected, setSelected] = useState(null);
  return <>
    <PageHead title="เส้นทางอาชีพ" subtitle="จากสมรรถนะพืชศาสตร์ สู่บทบาทงานจริงในภาคการผลิต เทคโนโลยี บริการ และธุรกิจ" />
    <section className="career-intro">
      <div><p className="section-kicker">CAREER LANDSCAPE</p><h2>เติบโตได้มากกว่างานในแปลง</h2><p>ผู้สำเร็จการศึกษาสามารถเริ่มจากงานระดับผู้ช่วยหรือช่างเทคนิค แล้วพัฒนาสู่หัวหน้างาน ผู้เชี่ยวชาญ ผู้จัดการ หรือผู้ประกอบการตามประสบการณ์และคุณวุฒิ</p></div>
      <div className="career-intro-metrics"><div><strong>6</strong><span>สายอาชีพหลัก</span></div><div><strong>6</strong><span>PLO รองรับงานจริง</span></div><div><strong>4</strong><span>ระดับการเติบโต</span></div></div>
    </section>
    <section className="career-gallery" aria-label="สายอาชีพพืชศาสตร์">
      {careerPaths.map((career) => <button key={career.id} className="career-card" type="button" onClick={() => setSelected(career)}>
        <span className="career-card-image"><img src={career.image} alt={`สายอาชีพ${career.title}`} loading="lazy" /><span className="career-number">{career.number}</span></span>
        <span className="career-card-body"><small>{career.en}</small><strong>{career.title}</strong><span>{career.summary}</span><em>{career.status}</em><span className="career-card-roles">{career.roles.slice(0, 2).map((role) => <i key={role}>{role}</i>)}</span></span>
      </button>)}
    </section>
    <section className="career-next-step">
      <p className="section-kicker">NEXT STEP</p>
      <div><h2>เส้นทางต่อยอดหลังสำเร็จการศึกษา</h2><p>ทำงานเพื่อสะสมประสบการณ์ สร้างกิจการเกษตรของตนเอง หรือศึกษาต่อระดับปริญญาตรีด้านพืชศาสตร์ เกษตรศาสตร์ เทคโนโลยีการเกษตร และสาขาที่เกี่ยวข้อง</p></div>
      <div className="career-next-options"><span>ทำงานและพัฒนาสู่หัวหน้างาน</span><span>ผู้ประกอบการเกษตร</span><span>ศึกษาต่อระดับปริญญาตรี</span></div>
    </section>
    <p className="source-note">กรอบอาชีพสังเคราะห์จากสมรรถนะ PLO รายวิชา และหลักฐานตลาดแรงงานด้านพืชใน Curriculum Benchmark</p>
    <CareerModal career={selected} onClose={() => setSelected(null)} />
  </>;
}
