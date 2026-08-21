import { PageHead } from "./ui";

const dimensions = [
  ["01", "โครงสร้างหลักสูตร", "หน่วยกิต กลุ่มวิชาชีพ ฝึกงาน ทวิภาคี และโครงงาน"],
  ["02", "สมรรถนะวิชาชีพ", "การผลิตพืช ดิน น้ำ ศัตรูพืช เครื่องจักร และหลังการเก็บเกี่ยว"],
  ["03", "ทักษะแห่งอนาคต", "Digital/Smart Agriculture, Data, AI, ธุรกิจ และความยั่งยืน"],
  ["04", "ประสบการณ์เรียนรู้", "Hands-on, Problem/Project/Work-based Learning และสถานการณ์จริง"],
];

const comparisons = [
  ["การผลิตพืช", "●●●", "●●●", "●●●"], ["ดิน/ธาตุอาหาร", "●●●", "●●●", "●●●"],
  ["การจัดการน้ำ", "●●", "●●●", "●●●"], ["การจัดการศัตรูพืช", "●●●", "●●●", "●●●"],
  ["เครื่องมือ/เครื่องจักร", "●●", "●●●", "●●●"], ["Digital/Data Agriculture", "●", "●●●", "●●●"],
  ["Smart Farming", "●", "●●●", "●●"], ["Business/Entrepreneurship", "●●", "●●●", "●●●"],
  ["Sustainability", "●●", "●●●", "●●●"], ["Work-based Learning", "●●●", "●●●", "●●●"],
];

const directions = ["การผลิตพืชเป็น Core Competency", "บูรณาการดิน–น้ำ–พืช–ศัตรูพืชกับแปลงจริง", "ใช้ข้อมูล Smart Farming และ AI เพื่อช่วยตัดสินใจ", "เชื่อมการผลิตกับต้นทุน ตลาด และรายได้", "เพิ่มฝึกงาน ทวิภาคี โครงงาน และ Authentic Assessment"];

export default function Benchmark(){return <>
  <PageHead title="Curriculum Benchmarking" subtitle="เปรียบเทียบโครงสร้าง สมรรถนะ ทักษะแห่งอนาคต และประสบการณ์เรียนรู้ เพื่อกำหนดทิศทางหลักสูตร ปวส. พืชศาสตร์"/>
  <section className="metric-grid"><div><strong>5</strong><span>กลุ่ม Benchmark</span></div><div><strong>84</strong><span>หน่วยกิต Direct Benchmark</span></div><div><strong>4</strong><span>มิติการเปรียบเทียบ</span></div><div><strong>13</strong><span>SH Needs ที่เชื่อมโยง</span></div></section>
  <div className="outcome-list">{dimensions.map(([n,t,d])=><article key={n}><span>{n}</span><div><h2>{t}</h2><p>{d}</p></div></article>)}</div>
  <section className="content-section"><h2>Direct Benchmark: มทร.ล้านนา</h2><p>หลักสูตร ปวส. พืชศาสตร์ ปีการศึกษา 2565 รวม 84 หน่วยกิต: สมรรถนะแกนกลาง 21 สมรรถนะวิชาชีพ 57 และวิชาเลือกเสรี 6 หน่วยกิต โดยมีฝึกประสบการณ์ 4 และโครงงาน 4 หน่วยกิต</p><p className="source-note">องค์ประกอบเด่น: ทักษะพืชศาสตร์ เครื่องจักร เทคโนโลยีสารสนเทศ ธุรกิจ/ตลาดดิจิทัล ดิน น้ำ ศัตรูพืช หลังการเก็บเกี่ยว ฟาร์มอัจฉริยะ และโดรน</p></section>
  <section className="content-section"><h2>Competency Benchmark Matrix</h2><div className="benchmark-table"><table><thead><tr><th>Competency</th><th>Traditional</th><th>Emerging</th><th>Proposed KSU</th></tr></thead><tbody>{comparisons.map(r=><tr key={r[0]}>{r.map((v,i)=><td key={i}>{v}</td>)}</tr>)}</tbody></table></div><small>●●● เน้นมาก · ●● มีชัดเจน · ● มีบางส่วน · Proposed KSU เป็นข้อเสนอเพื่อการออกแบบ</small></section>
  <section className="content-section"><h2>ทิศทางออกแบบหลักสูตร</h2><ol>{directions.map(x=><li key={x}>{x}</li>)}</ol><blockquote>หลักสูตรพืชศาสตร์เชิงปฏิบัติที่จัดการการผลิตได้ตลอดกระบวนการ ใช้เครื่องมือ เทคโนโลยีและข้อมูล แก้ปัญหาตามบริบท และเชื่อมการผลิตกับธุรกิจอย่างรับผิดชอบและยั่งยืน</blockquote></section>
  <p className="source-note">ตรวจสอบจาก มทร.ล้านนา, ชุดข้อมูลหลักสูตร ปวส. พ.ศ. 2567 ของ สอศ., วิทยาลัยเกษตรและเทคโนโลยีราชบุรี และผลสำรวจ SH Needs 424 คำตอบ</p>
</>}
