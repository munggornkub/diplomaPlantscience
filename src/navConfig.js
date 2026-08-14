export const NAV_GROUPS = [
  { id: "home", label: "หน้าแรก", hint: "ภาพรวมเว็บไซต์", to: "/", solo: true },
  {
    id: "curriculum", label: "หลักสูตร", hint: "โครงสร้าง รายวิชา และแผนการเรียน",
    items: [
      { to: "/structure", label: "โครงสร้างหลักสูตร", desc: "พื้นที่สำหรับโครงสร้างหลักสูตร" },
      { to: "/courses", label: "รายวิชา", desc: "พื้นที่สำหรับข้อมูลรายวิชา" },
      { to: "/plan", label: "แผนการเรียน", desc: "พื้นที่สำหรับแผนการเรียน" },
      { to: "/graph", label: "กราฟหลักสูตร", desc: "พื้นที่สำหรับความเชื่อมโยงรายวิชา" },
      { to: "/faculty", label: "อาจารย์", desc: "พื้นที่สำหรับข้อมูลผู้รับผิดชอบหลักสูตร" },
    ],
  },
  {
    id: "outcomes", label: "ผลลัพธ์การเรียนรู้", hint: "ผลลัพธ์ระดับหลักสูตร ชั้นปี และรายวิชา",
    items: [
      { to: "/obe", label: "OBE", desc: "พื้นที่สำหรับกระบวนการ OBE" },
      { to: "/plo", label: "PLO", desc: "พื้นที่สำหรับผลลัพธ์ระดับหลักสูตร" },
      { to: "/ylo", label: "YLO", desc: "พื้นที่สำหรับผลลัพธ์ระดับชั้นปี" },
      { to: "/clo", label: "CLO", desc: "พื้นที่สำหรับผลลัพธ์ระดับรายวิชา" },
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
