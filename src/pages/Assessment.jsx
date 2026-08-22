import { PageHead } from "./ui";

const assessments = [
  { title:"Rubric และ Checklist การปฏิบัติงานจริง", image:"/images/assessment/rubric-checklist.webp", desc:"ประเมินคุณภาพ ขั้นตอน ความถูกต้อง ความปลอดภัย และความรับผิดชอบด้วยเกณฑ์ที่กำหนดไว้อย่างชัดเจน", tags:["เกณฑ์ชัดเจน","งานปฏิบัติ","K/S/A"] },
  { title:"Performance Assessment", image:"/images/assessment/performance.webp", desc:"ให้ผู้เรียนสาธิตการปฏิบัติงานจริงตามขั้นตอนและมาตรฐาน เพื่อแสดงสมรรถนะในการใช้เครื่องมือและเทคโนโลยี", tags:["สาธิตงาน","มาตรฐาน","สมรรถนะ"] },
  { title:"Case/Problem-based Assessment", image:"/images/assessment/case-problem.webp", desc:"ประเมินการวิเคราะห์ข้อมูล การระบุสาเหตุ และการเลือกแนวทางแก้ปัญหาจากสถานการณ์ด้านการผลิตพืช", tags:["วิเคราะห์","หลักฐาน","แก้ปัญหา"] },
  { title:"แผนการผลิต แผนธุรกิจ และโครงการ", image:"/images/assessment/plan-project.webp", desc:"ประเมินความเป็นไปได้ของแผน กระบวนการดำเนินงาน ต้นทุน ผลลัพธ์ และการนำเสนอผลงานอย่างเป็นระบบ", tags:["ผลงาน","วางแผน","นำเสนอ"] },
  { title:"Portfolio และบันทึกการปฏิบัติงาน", image:"/images/assessment/portfolio.webp", desc:"รวบรวมหลักฐานการเรียนรู้และพัฒนาการจากผลงาน ภาพกิจกรรม ข้อมูลแปลง และการสะท้อนผลของผู้เรียน", tags:["พัฒนาการ","หลักฐาน","สะท้อนผล"] },
  { title:"Peer Assessment และข้อมูลสะท้อนกลับจากสถานประกอบการ", image:"/images/assessment/peer-workplace.webp", desc:"ใช้ข้อมูลจากเพื่อนร่วมทีม ผู้สอน และผู้ควบคุมงาน เพื่อประเมินการทำงานร่วมกัน ความรับผิดชอบ และความพร้อมทางวิชาชีพ", tags:["เพื่อนร่วมทีม","สถานประกอบการ","Feedback"] },
  { title:"การสอบข้อเขียนและการทดสอบความรู้", image:"/images/assessment/written-exam.webp", desc:"ประเมินความรู้ หลักการ การคำนวณ และการวิเคราะห์ที่จำเป็นต่อการตัดสินใจและการปฏิบัติงานด้านพืชศาสตร์", tags:["ความรู้","การคำนวณ","การวิเคราะห์"] },
];

export default function Assessment(){return <>
  <PageHead title="การวัดและประเมินผล" subtitle="ประเมินความรู้ ทักษะปฏิบัติ ผลงาน การแก้ปัญหา และคุณลักษณะตามผลลัพธ์การเรียนรู้"/>
  <section className="teaching-intro assessment-intro"><p className="section-kicker">AUTHENTIC ASSESSMENT</p><h2>ประเมินจากความรู้<br/>การลงมือทำ และผลงานจริง</h2><p>ใช้วิธีประเมินที่หลากหลายเพื่อสะท้อนพัฒนาการและสมรรถนะของผู้เรียนทั้งด้าน Knowledge, Skill และ Attitude</p></section>
  <section className="teaching-grid assessment-grid">{assessments.map((item,index)=><article className="teaching-card" key={item.title}>
    <div className="teaching-image"><img src={item.image} alt={`ภาพประกอบ${item.title}`} loading="lazy"/><span>{String(index+1).padStart(2,"0")}</span></div>
    <div className="teaching-copy"><small>ASSESSMENT METHOD</small><h2>{item.title}</h2><p>{item.desc}</p><div>{item.tags.map((tag)=><span key={tag}>{tag}</span>)}</div></div>
  </article>)}</section>
</>}
