import { futureSkills, stakeholderGroups, stakeholderNeeds, surveySummary, topPriorities } from "../stakeholderData";
import { PageHead } from "./ui";

export default function StakeholderNeeds() {
  return <>
    <PageHead title="Stakeholder Needs" subtitle={`เสียงผู้มีส่วนได้ส่วนเสียจากแบบสอบถามจริง ${surveySummary.responses} คำตอบ · ${surveySummary.period}`} />
    <section className="metric-grid">
      <div><strong>{surveySummary.responses}</strong><span>คำตอบทั้งหมด</span></div>
      <div><strong>{stakeholderGroups.length}</strong><span>กลุ่มผู้มีส่วนได้ส่วนเสีย</span></div>
      <div><strong>{stakeholderNeeds.length}</strong><span>ความต้องการที่สังเคราะห์</span></div>
      <div><strong>{surveySummary.targetLearnerPct}%</strong><span>ผู้เรียนเป้าหมายในกลุ่มตัวอย่าง</span></div>
    </section>

    <p className="source-note">ผลสำรวจมีผู้เรียนเป้าหมายเป็นสัดส่วนสูง จึงแสดงหลักฐานเฉพาะกลุ่มนายจ้าง ศิษย์เก่า และนักศึกษาปัจจุบันควบคู่กับภาพรวม</p>

    <section className="content-section">
      <h2>ความต้องการหลัก</h2>
      <div className="outcome-list">
        {stakeholderNeeds.map(([code, title, evidence]) => <article key={code}>
          <span>{code}</span><div><h3>{title}</h3><p>{evidence}</p></div>
        </article>)}
      </div>
    </section>

    <section className="sh-grid">
      <article className="content-section">
        <h2>5 ด้านที่ถูกเลือกมากที่สุด</h2>
        <ol className="rank-list">{topPriorities.map(([label, count, pct]) => <li key={label}><div><strong>{label}</strong><small>{count} คน</small></div><b>{pct}</b></li>)}</ol>
      </article>
      <article className="content-section">
        <h2>ทักษะสำคัญใน 3–5 ปี</h2>
        <ol className="rank-list">{futureSkills.map(([label, mean, high]) => <li key={label}><div><strong>{label}</strong><small>ระดับ 4–5: {high}</small></div><b>{mean.toFixed(2)}</b></li>)}</ol>
      </article>
    </section>

    <section className="content-section">
      <h2>องค์ประกอบผู้ตอบ</h2>
      <div className="group-grid">{stakeholderGroups.map(([label, count, pct]) => <div key={label}><strong>{count}</strong><span>{label}</span><small>{pct}</small></div>)}</div>
    </section>

    <p className="source-note">ที่มา: แบบสอบถามความต้องการของผู้มีส่วนได้ส่วนเสียฯ ชีต “การตอบแบบฟอร์ม 1” ข้อมูล ณ 21 สิงหาคม 2569 เวลา 10:51 น. · คำถามเลือกหลายข้ออาจมียอดรวมมากกว่าจำนวนผู้ตอบ</p>
  </>;
}
