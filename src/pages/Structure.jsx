import { program, structure } from "../curriculumData";
import { PageHead } from "./ui";
export default function Structure(){return <><PageHead title="โครงสร้างหลักสูตร" subtitle="ระบบทวิภาค · ไม่น้อยกว่า 80 หน่วยกิต"/><div className="structure-cards">{structure.map(x=><article key={x.label}><span>{x.credits}</span><div><h2>{x.label}</h2><p>{x.detail}</p></div></article>)}</div><section className="content-section"><h2>เงื่อนไขสำคัญ</h2><ul><li>1 ปีการศึกษาแบ่งเป็น 2 ภาคเรียน ภาคเรียนละไม่น้อยกว่า 15 สัปดาห์</li><li>ผู้ไม่มีพื้นฐานวิชาชีพเรียนปรับพื้นฐานเพิ่ม 12 หน่วยกิต โดยไม่นับรวมใน {program.credits} หน่วยกิต</li><li>กิจกรรมเสริมหลักสูตร 2 ชั่วโมงต่อสัปดาห์หรือไม่น้อยกว่า 30 ชั่วโมงต่อภาคเรียน</li><li>มีการฝึกวิชาชีพพืชศาสตร์ 4 หน่วยกิตในภาคฤดูร้อน</li></ul></section></>}

