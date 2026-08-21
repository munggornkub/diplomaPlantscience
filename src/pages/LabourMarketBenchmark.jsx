import { labourMarketRoles, labourMarketSnapshot, ploEvidence } from "../labourMarketData";
import { PageHead } from "./ui";

export default function LabourMarketBenchmark(){return <>
  <PageHead title="Labour Market Benchmark" subtitle={`ภาพตลาดงานด้านพืชจาก Jobsdb · สำรวจ ${labourMarketSnapshot.date}`}/>
  <section className="metric-grid"><div><strong>≈{labourMarketSnapshot.agricultureJobs}</strong><span>งานเกษตรบนหน้าค้นหา</span></div><div><strong>{labourMarketSnapshot.examples}</strong><span>ตัวอย่างงานพืชที่คัดเลือก</span></div><div><strong>6</strong><span>PLO ที่ได้รับการยืนยัน</span></div><div><strong>0</strong><span>PLO ใหม่ที่จำเป็น</span></div></section>
  <p className="source-note">เป็น snapshot ของประกาศงาน ณ วันสำรวจ จำนวนและสถานะประกาศเปลี่ยนแปลงได้ และบางตำแหน่งกำหนดวุฒิสูงกว่า ปวส. จึงใช้วิเคราะห์ลักษณะงานและทักษะเป็นหลัก</p>
  <section className="content-section"><h2>ตัวอย่างตำแหน่งงาน</h2><div className="course-list compact-list labour-list">{labourMarketRoles.map(([company,role,skills])=><article key={`${company}-${role}`}><code>{company}</code><div><h2>{role}</h2><span>{skills}</span></div></article>)}</div></section>
  <section className="content-section"><h2>ตลาดแรงงานยืนยัน PLO1–PLO6</h2><div className="outcome-list">{ploEvidence.map(([code,title,evidence])=><article key={code}><span>{code}</span><div><h3>{title}</h3><p>{evidence}</p></div></article>)}</div></section>
  <section className="hero-panel"><p className="source-chip">LABOUR MARKET FINDING</p><h2>ยังไม่พบเหตุผลให้เพิ่ม PLO ใหม่</h2><p>ตลาดยืนยัน Production + Technology/Data + Problem Solving + Business + Communication พร้อมมาตรฐานและความยั่งยืน ซึ่งครอบคลุมอยู่ใน PLO1–PLO6 แล้ว</p></section>
</>}
