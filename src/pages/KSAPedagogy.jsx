import { ksaDomains } from "../ksaLevelData";
import { PageHead } from "./ui";

export default function KSAPedagogy(){return <>
  <PageHead title="Knowledge · Skill · Attitude" subtitle="ระดับการเรียนรู้ด้านความรู้ ทักษะปฏิบัติ และเจตคติ ตามกรอบที่ใช้ในหลักสูตร"/>
  <section className="ksa-overview">{ksaDomains.map((domain)=><article key={domain.id} style={{"--ksa-color":domain.color}}><span>{domain.range}</span><div><small>{domain.title}</small><h2>{domain.thai}</h2><p>{domain.intro}</p></div></article>)}</section>
  <div className="ksa-domains">{ksaDomains.map((domain)=><section className="ksa-domain" key={domain.id} style={{"--ksa-color":domain.color}}>
    <header><span>{domain.code}</span><div><p className="section-kicker">{domain.title} · {domain.range}</p><h2>{domain.thai}</h2><p>{domain.intro}</p></div></header>
    <div className={`ksa-level-grid ${domain.code === "K" ? "knowledge" : ""}`}>{domain.levels.map((level)=><article className="ksa-level-card" key={level.code}>
      <div className="ksa-level-image"><img src={level.image} alt={`ภาพประกอบระดับ ${level.code} ${level.title}`} loading="lazy"/><strong>{level.code}</strong></div>
      <div className="ksa-level-copy"><small>{level.en}</small><h3>{level.title}</h3><p>{level.desc}</p><div><span>ตัวอย่างพืชศาสตร์</span>{level.example}</div></div>
    </article>)}</div>
  </section>)}</div>
  <p className="source-note">อ้างอิง KSA Codebook ในภาคผนวกหลักสูตร หน้า PDF 236–237 · PLO และ CLO ของรายวิชาเชื่อมโยงระดับ K/S/A กลับไปยังผลลัพธ์การเรียนรู้ของหลักสูตร</p>
</>}
