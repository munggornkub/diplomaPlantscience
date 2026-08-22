import { useMemo, useState } from "react";
import { jobRecords, skillGroups, topSkills } from "../jobSkillsData";
import { jobThaiSnapshot, labourMarketSnapshot } from "../labourMarketData";
import { PageHead } from "./ui";

export default function Jobs() {
  const [group, setGroup] = useState("all");
  const [source, setSource] = useState("all");
  const filtered = useMemo(() => jobRecords.filter((job) =>
    (group === "all" || job.group.id === group) && (source === "all" || job.source === source)
  ), [group, source]);

  return <>
    <PageHead title="งานและทักษะ" subtitle={`ภาพตลาดงานด้านพืชจาก JobThai และ Jobsdb · ข้อมูลสำรวจ ${jobThaiSnapshot.date}`} />
    <section className="jobs-overview">
      <div className="jobs-overview-copy"><p className="section-kicker">JOB & SKILL SIGNALS</p><h2>ตลาดต้องการคนที่เชื่อม “พืช–เทคโนโลยี–ข้อมูล–ผู้คน”</h2><p>ประกาศงานสะท้อนว่าความสามารถด้านการผลิตพืชเพียงอย่างเดียวยังไม่พอ ผู้ปฏิบัติงานต้องเก็บข้อมูล แก้ปัญหา ทำงานตามมาตรฐาน และสื่อสารกับเกษตรกรหรือธุรกิจได้</p></div>
      <div className="jobs-overview-stats"><div><strong>{jobThaiSnapshot.agricultureJobs}</strong><span>งานในหมวดเกษตร JobThai</span></div><div><strong>{jobRecords.length}</strong><span>ตัวอย่างงานที่นำมาวิเคราะห์</span></div><div><strong>{skillGroups.length}</strong><span>กลุ่มสมรรถนะงาน</span></div><div><strong>6</strong><span>PLO ที่ตลาดสนับสนุน</span></div></div>
    </section>

    <section className="jobs-skill-section">
      <header><div><p className="section-kicker">SKILL CLUSTERS</p><h2>กลุ่มงานและสมรรถนะสำคัญ</h2></div><p>สังเคราะห์จากคำที่ปรากฏในรายละเอียดตำแหน่งงานตัวอย่าง</p></header>
      <div className="jobs-skill-grid">{skillGroups.map((item) => <button className={group === item.id ? "active" : ""} key={item.id} type="button" onClick={() => setGroup(group === item.id ? "all" : item.id)}>
        <span className="jobs-skill-icon">{item.icon}</span><span className="jobs-skill-copy"><strong>{item.label}</strong><small>{item.jobs} ตำแหน่งตัวอย่าง</small><span>{item.skills.slice(0, 3).join(" · ") || "สมรรถนะสนับสนุนงานพืช"}</span></span><span className="jobs-skill-plos">{item.plos.map((plo) => <i key={plo}>{plo}</i>)}</span>
      </button>)}</div>
    </section>

    <section className="jobs-demand-section">
      <div><p className="section-kicker">DEMAND SIGNALS</p><h2>ทักษะที่พบซ้ำในประกาศ</h2><p>ขนาดแถบแสดงจำนวนครั้งที่คำทักษะปรากฏในชุดตัวอย่าง ไม่ใช่สัดส่วนของตลาดงานทั้งหมด</p></div>
      <div className="jobs-skill-bars">{topSkills.map(({ skill, count }) => <div key={skill}><span>{skill}</span><i><b style={{ width: `${Math.max(18, count / topSkills[0].count * 100)}%` }} /></i><strong>{count}</strong></div>)}</div>
    </section>

    <section className="jobs-list-section">
      <header><div><p className="section-kicker">EVIDENCE SET</p><h2>ตำแหน่งงานตัวอย่าง</h2><p>{filtered.length} ตำแหน่งในมุมมองนี้</p></div><div className="jobs-source-filter">{[["all","ทุกแหล่ง"],["JobThai","JobThai"],["Jobsdb","Jobsdb"]].map(([id,label]) => <button className={source === id ? "active" : ""} key={id} type="button" onClick={() => setSource(id)}>{label}</button>)}</div></header>
      <div className="jobs-card-grid">{filtered.map((job) => {
        const content = <><span className="jobs-card-top"><i>{job.group.icon}</i><small>{job.source}</small></span><strong>{job.role}</strong><span className="jobs-company">{job.company}</span><span className="jobs-tags">{job.skills.map((skill) => <em key={skill}>{skill}</em>)}</span><span className="jobs-plo">{job.group.plos.map((plo) => <b key={plo}>{plo}</b>)}</span></>;
        return job.url ? <a className="jobs-card" href={job.url} target="_blank" rel="noreferrer" key={job.id}>{content}</a> : <article className="jobs-card" key={job.id}>{content}</article>;
      })}</div>
    </section>
    <section className="jobs-conclusion"><span>CURRICULUM IMPLICATION</span><div><h2>PLO1–PLO6 ครอบคลุมทิศทางตลาดแล้ว</h2><p>หลักสูตรควรเน้นประสบการณ์จริงเพิ่มเติมในด้านข้อมูลภาคสนาม ภาษาอังกฤษทางเทคนิค GIS/IoT การตรวจสอบย้อนกลับ การนำเสนอข้อมูล และการทำงานร่วมกับเกษตรกร</p></div></section>
    <p className="source-note">ข้อมูลเป็น snapshot ณ วันสำรวจ · จำนวน {jobThaiSnapshot.agricultureJobs} ตำแหน่งเป็นหมวดเกษตรรวม · หลายตำแหน่งอาจกำหนดปริญญาตรี จึงใช้เป็นหลักฐานด้านภาระงานและทักษะ ไม่ใช่การรับรองสิทธิสมัครงานของผู้จบ ปวส. · ชุด Jobsdb บันทึกไว้ {labourMarketSnapshot.examples} ตัวอย่าง</p>
  </>;
}
