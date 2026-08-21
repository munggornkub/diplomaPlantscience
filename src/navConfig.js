export const NAV_GROUPS = [
  { id: "home", label: "หน้าแรก", hint: "ภาพรวมเว็บไซต์", to: "/", solo: true },
  {
    id: "curriculum", label: "หลักสูตร", hint: "โครงสร้าง รายวิชา และแผนการเรียน",
    items: [
      { to: "/structure", label: "โครงสร้างหลักสูตร", desc: "80+ หน่วยกิต และหมวดวิชา" },
      { to: "/courses", label: "รายวิชา", desc: "ทะเบียนรายวิชาพืชศาสตร์" },
      { to: "/plan", label: "แผนการเรียน", desc: "แผน 2 ปีและภาคฤดูร้อน" },
      { to: "/graph", label: "กราฟหลักสูตร", desc: "พื้นที่สำหรับความเชื่อมโยงรายวิชา" },
      { to: "/faculty", label: "อาจารย์", desc: "ผู้รับผิดชอบและอาจารย์ผู้สอน" },
    ],
  },
  {
    id: "outcomes", label: "ผลลัพธ์การเรียนรู้", hint: "ผลลัพธ์ระดับหลักสูตร ชั้นปี และรายวิชา",
    items: [
      { to: "/obe", label: "OBE", desc: "พื้นที่สำหรับกระบวนการ OBE" },
      { to: "/sh-needs", label: "SH Needs", desc: "ผลสำรวจผู้มีส่วนได้ส่วนเสีย 424 คำตอบ" },
      { to: "/benchmark", label: "Benchmark", desc: "เปรียบเทียบหลักสูตรและวิเคราะห์ช่องว่าง" },
      { to: "/labour-market", label: "Labour Market", desc: "หลักฐานจากประกาศงานด้านพืช" },
      { to: "/plo", label: "PLO", desc: "ผลลัพธ์ระดับหลักสูตร 6 ข้อ" },
      { to: "/ylo", label: "YLO", desc: "ผลลัพธ์ชั้นปี 4 ข้อ" },
      { to: "/clo", label: "CLO", desc: "ผลลัพธ์และ KSA รายวิชา" },
    ],
  },
  {
    id: "teaching", label: "การเรียนการสอน", hint: "แนวทางสอน ประเมินผล และ KSA",
    items: [
      { to: "/teaching", label: "การเรียนการสอน", desc: "พื้นที่สำหรับแนวทางการสอน" },
      { to: "/assessment", label: "การประเมินผล", desc: "พื้นที่สำหรับแนวทางประเมินผล" },
      { to: "/ksa-pedagogy", label: "KSA Pedagogy", desc: "พื้นที่สำหรับการสอนที่เชื่อมโยง KSA" },
    ],
  },
  {
    id: "market", label: "ตลาดแรงงาน", hint: "เส้นทางอาชีพและข้อมูลตำแหน่งงาน",
    items: [
      { to: "/careers", label: "เส้นทางอาชีพ", desc: "พื้นที่สำหรับเส้นทางอาชีพ" },
      { to: "/jobs", label: "งานและทักษะ", desc: "พื้นที่สำหรับข้อมูลงานและทักษะ" },
    ],
  },
  { id: "refs", label: "ข้อมูลอ้างอิง", hint: "แหล่งข้อมูลและหลักฐาน", to: "/refs", solo: true },
];

export function groupItems(group) {
  return group.solo
    ? [{ to: group.to, label: group.label, desc: group.hint }]
    : group.items;
}
