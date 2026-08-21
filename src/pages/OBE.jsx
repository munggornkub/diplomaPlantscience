import { Link } from "react-router-dom";
import { plos, ylos } from "../curriculumData";
import { surveySummary } from "../stakeholderData";
import { PageHead } from "./ui";

export default function OBE(){const steps=[["01","Stakeholder Needs",`วิเคราะห์ข้อมูลสำรวจจริง ${surveySummary.responses} คำตอบ และสังเคราะห์เป็น 13 ความต้องการ`],["02","ปรัชญาและวัตถุประสงค์","กำหนดนักปฏิบัติพืชศาสตร์ที่ใช้เทคโนโลยี บริหารฟาร์ม และรับผิดชอบต่อสังคม"],["03","PLO",`${plos.length} ผลลัพธ์ระดับหลักสูตร`],["04","YLO",`${ylos.length} ผลลัพธ์รายปีสำหรับชั้นปีที่ 1-2`],["05","CLO และ KSA","ผลลัพธ์รายวิชาเชื่อม Knowledge, Skill, Attitude และ PLO"],["06","การสอนและประเมิน","Work-based, Practice-based, PBL, Project-based และ Rubric"]];return <><PageHead title="การออกแบบหลักสูตรแบบ OBE" subtitle="เริ่มจากเสียงผู้มีส่วนได้ส่วนเสีย เชื่อมสู่ผลลัพธ์ การเรียนรู้ และการประเมิน"/><div className="outcome-list">{steps.map(([n,t,d])=><article key={n}><span>{n}</span><div><h2>{t}</h2><p>{d}</p>{n==="01"&&<small><Link className="text-link" to="/sh-needs">เปิดผลวิเคราะห์ SH Needs →</Link></small>}</div></article>)}</div></>}
