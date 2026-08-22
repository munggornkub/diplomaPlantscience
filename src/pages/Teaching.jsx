import { PageHead } from "./ui";

const methods = [
  { title:"Work-based & Practice-based Learning", thai:"เรียนรู้จากงานและการปฏิบัติ", image:"/images/teaching/work-based.webp", desc:"เรียนรู้กระบวนการทำงานจริงร่วมกับผู้สอนและผู้เชี่ยวชาญในแปลงผลิต โรงเรือน ห้องปฏิบัติการ และสถานประกอบการ", contexts:["งานจริง", "ฝึกปฏิบัติ", "สถานประกอบการ"] },
  { title:"Learning by Doing", thai:"ลงมือทำจากโจทย์แปลงผลิตจริง", image:"/images/teaching/learning-by-doing.webp", desc:"ฝึกวางแผน ลงมือผลิต เก็บข้อมูล และปรับปรุงการทำงานจากสถานการณ์จริงตลอดวงจรการผลิตพืช", contexts:["แปลงผลิต", "เก็บข้อมูล", "สะท้อนผล"] },
  { title:"Technology-enhanced Learning", thai:"เรียนรู้ด้วยเทคโนโลยี", image:"/images/teaching/technology-enhanced.webp", desc:"ใช้เครื่องมือดิจิทัล เซนเซอร์ ระบบควบคุม โดรน และข้อมูล สนับสนุนการเรียนรู้และการตัดสินใจด้านการผลิต", contexts:["Digital", "Smart Farm", "Data"] },
  { title:"Problem-based & Case-based Learning", thai:"เรียนรู้จากปัญหาและกรณีศึกษา", image:"/images/teaching/problem-case-based.webp", desc:"วิเคราะห์สาเหตุ เปรียบเทียบหลักฐาน และเลือกแนวทางแก้ไขจากปัญหาดิน น้ำ ศัตรูพืช ผลผลิต และคุณภาพ", contexts:["วิเคราะห์", "แก้ปัญหา", "ตัดสินใจ"] },
  { title:"Project-based & Entrepreneurial Learning", thai:"เรียนรู้ผ่านโครงงานและการเป็นผู้ประกอบการ", image:"/images/teaching/project-entrepreneurial.webp", desc:"พัฒนาผลงานหรือธุรกิจขนาดย่อม ตั้งแต่กำหนดโจทย์ ออกแบบ ทดลอง คำนวณต้นทุน ไปจนถึงนำเสนอคุณค่า", contexts:["โครงงาน", "ต้นทุน", "ผู้ประกอบการ"] },
  { title:"Collaborative & Community-based Learning", thai:"เรียนรู้ร่วมกับทีมและชุมชน", image:"/images/teaching/collaborative-community.webp", desc:"ทำงานร่วมกับเพื่อน เกษตรกร ชุมชน และเครือข่ายวิชาชีพ เพื่อแลกเปลี่ยนความรู้และพัฒนางานตามบริบทพื้นที่", contexts:["ทีม", "เกษตรกร", "ชุมชน"] },
];

export default function Teaching(){return <>
  <PageHead title="กลยุทธ์การเรียนการสอน" subtitle="วิธีการสอนที่กำหนดในหมวด 19 ของเล่มหลักสูตร"/>
  <section className="teaching-intro"><p className="section-kicker">LEARNING EXPERIENCE</p><h2>เรียนจากการปฏิบัติจริง<br/>เชื่อมแปลงผลิต เทคโนโลยี และชุมชน</h2><p>การจัดการเรียนรู้มุ่งให้ผู้เรียนพัฒนาความรู้ ทักษะ และเจตคติผ่านประสบการณ์ที่สอดคล้องกับบริบทวิชาชีพพืชศาสตร์</p></section>
  <section className="teaching-grid">{methods.map((method,index)=><article className="teaching-card" key={method.title}>
    <div className="teaching-image"><img src={method.image} alt={`ภาพประกอบ${method.thai}`} loading="lazy"/><span>{String(index+1).padStart(2,"0")}</span></div>
    <div className="teaching-copy"><small>{method.title}</small><h2>{method.thai}</h2><p>{method.desc}</p><div>{method.contexts.map((item)=><span key={item}>{item}</span>)}</div></div>
  </article>)}</section>
</>}
