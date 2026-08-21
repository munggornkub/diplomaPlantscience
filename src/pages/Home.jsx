import { Link } from "react-router-dom";
import { program, structure, plos } from "../curriculumData";

const highlights = [
  ["01", "เรียนจากการลงมือทำ", "ฝึกในแปลงจริง ห้องปฏิบัติการ โครงงาน และสถานประกอบการ"],
  ["02", "เทคโนโลยีเพื่อการผลิต", "ใช้ Smart Farming เกษตรแม่นยำ ข้อมูล และเครื่องมือสมัยใหม่"],
  ["03", "ผลิตเป็น · บริหารได้", "เชื่อมการผลิตพืช ต้นทุน ตลาด ธุรกิจ และความยั่งยืน"],
];

export default function Home() {
  return <div className="home-page">
    <section className="home-hero">
      <div className="home-hero-copy">
        <div className="institution-lockup">
          <strong>มหาวิทยาลัยกาฬสินธุ์</strong>
          <span>คณะเทคโนโลยีการเกษตร</span>
        </div>
        <p className="hero-kicker">KALASIN UNIVERSITY · FACULTY OF AGRICULTURAL TECHNOLOGY · 2570</p>
        <h1><span>Diploma in</span> Plant Science</h1>
        <p className="hero-thai">หลักสูตรประกาศนียบัตรวิชาชีพชั้นสูง<br/>สาขาวิชาพืชศาสตร์</p>
        <p className="hero-lead">พัฒนานักปฏิบัติด้านพืชศาสตร์ที่ผลิตเป็น ใช้เทคโนโลยีได้ แก้ปัญหาหน้างาน และเชื่อมการเกษตรกับธุรกิจอย่างยั่งยืน</p>
        <div className="hero-actions"><Link className="primary-action" to="/structure">สำรวจหลักสูตร <span>→</span></Link><Link className="secondary-action" to="/sh-needs">ดูหลักฐานการออกแบบ</Link></div>
      </div>
      <div className="hero-image-note" aria-hidden="true"><span>FIELD PRACTICE</span><strong>Plant × Data × Business</strong></div>
    </section>

    <section className="home-metrics">
      <div><strong>{program.credits}+</strong><span>หน่วยกิต</span></div><div><strong>{plos.length}</strong><span>ผลลัพธ์ PLO</span></div><div><strong>2</strong><span>ปีการศึกษา</span></div><div><strong>42</strong><span>รายวิชาพืชศาสตร์</span></div>
    </section>

    <section className="home-section intro-section"><div><p className="section-kicker">PROGRAM PHILOSOPHY</p><h2>จากความรู้ด้านพืช<br/>สู่ความสามารถในการทำงานจริง</h2></div><blockquote>{program.philosophy}</blockquote></section>

    <section className="highlight-grid">{highlights.map(([n,title,text])=><article key={n}><span>{n}</span><h2>{title}</h2><p>{text}</p></article>)}</section>

    <section className="home-section structure-section"><header><div><p className="section-kicker">CURRICULUM STRUCTURE</p><h2>โครงสร้างที่ชัดเจน<br/>และเน้นสมรรถนะวิชาชีพ</h2></div><Link className="round-link" to="/structure">ดูทั้งหมด →</Link></header><div className="home-structure">{structure.map(item=><article key={item.label}><strong>{item.credits}</strong><div><h3>{item.label}</h3><p>{item.detail}</p></div></article>)}</div></section>

    <section className="evidence-banner"><div><p className="section-kicker">EVIDENCE-BASED CURRICULUM</p><h2>ออกแบบจากเสียงผู้มีส่วนได้ส่วนเสีย หลักสูตรเทียบเคียง และตลาดแรงงานจริง</h2></div><div className="evidence-links"><Link to="/sh-needs">Stakeholder Needs</Link><Link to="/benchmark">Curriculum Benchmark</Link><Link to="/labour-market">Labour Market</Link></div></section>
  </div>;
}
