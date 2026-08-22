import { jobThaiRoles, labourMarketRoles } from "./labourMarketData";

const groups = [
  { id: "production", label: "การผลิตและฟาร์ม", icon: "PF", match: /ผลิต|แปลง|farm|agronom|crop|น้ำ|ปุ๋ย|plantation/i, plos: ["PLO2", "PLO4", "PLO5"] },
  { id: "seed", label: "เมล็ดพันธุ์", icon: "SE", match: /เมล็ด|seed|nursery|propagation|พันธุ์/i, plos: ["PLO1", "PLO2", "PLO3"] },
  { id: "data", label: "เทคโนโลยีและข้อมูล", icon: "DT", match: /GIS|ดาวเทียม|data|IoT|sensor|precision|mechanization|เครื่องจักร|ฐานข้อมูล/i, plos: ["PLO3", "PLO4"] },
  { id: "quality", label: "คุณภาพและสุขภาพพืช", icon: "QS", match: /คุณภาพ|โรค|ศัตรู|HSE|HACCP|GHP|traceability|sustainability|risk/i, plos: ["PLO1", "PLO2", "PLO4"] },
  { id: "extension", label: "ส่งเสริมและภาคสนาม", icon: "EX", match: /ส่งเสริม|เกษตรกร|field|สาธิต|ประสาน|stakeholder/i, plos: ["PLO1", "PLO4", "PLO6"] },
  { id: "business", label: "ตลาดและธุรกิจ", icon: "BM", match: /ตลาด|sales|business|ลูกค้า|เจรจา|ต้นทุน/i, plos: ["PLO4", "PLO5", "PLO6"] },
];

const cleanSkills = (value) => value.split(" · ").map((skill) => skill.trim()).filter(Boolean);

const classify = (role, skills) => {
  const text = `${role} ${skills}`;
  return groups.find((group) => group.match.test(text)) || groups[0];
};

export const jobRecords = [
  ...jobThaiRoles.map(([company, role, skills, url], index) => ({ id: `jt-${index}`, company, role, skills: cleanSkills(skills), url, source: "JobThai" })),
  ...labourMarketRoles.map(([company, role, skills], index) => ({ id: `jd-${index}`, company, role, skills: cleanSkills(skills), source: "Jobsdb" })),
].map((job) => ({ ...job, group: classify(job.role, job.skills.join(" ")) }));

export const skillGroups = groups.map((group) => ({
  ...group,
  jobs: jobRecords.filter((job) => job.group.id === group.id).length,
  skills: [...new Set(jobRecords.filter((job) => job.group.id === group.id).flatMap((job) => job.skills))].slice(0, 6),
}));

export const topSkills = Object.entries(jobRecords.flatMap((job) => job.skills).reduce((counts, skill) => {
  counts[skill] = (counts[skill] || 0) + 1;
  return counts;
}, {})).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([skill, count]) => ({ skill, count }));

