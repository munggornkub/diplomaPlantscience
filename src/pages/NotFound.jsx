import { Link } from "react-router-dom";
import { PageHead, Section } from "./ui";

export default function NotFound() {
  return <><PageHead title="ไม่พบหน้าที่ต้องการ" subtitle="เส้นทางนี้ยังไม่ได้อยู่ในโครงเว็บไซต์" /><Section id="return" title="กลับสู่หน้าหลัก"><Link to="/">ไปหน้าแรก</Link></Section></>;
}
