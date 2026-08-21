import { stakeholders } from "./obeData";

const FIELD_META = {
  group: { label: "กลุ่มผู้มีส่วนได้ส่วนเสีย", color: "#2d6a4f" },
  method: { label: "วิธีเก็บข้อมูล", color: "#3c7d87" },
  sampleSize: { label: "ขนาดกลุ่มตัวอย่าง", color: "#b68445" },
  period: { label: "ช่วงเวลาที่เก็บ", color: "#8b6a9d" },
  priority: { label: "ระดับความสำคัญ", color: "#b85c55" },
};

const makeId = (field, value) => `${field}:${value}`;

function buildFlow(fields) {
  const nodes = [];
  const nodeIds = new Set();
  const linkValues = new Map();

  fields.forEach((field, col) => {
    stakeholders.forEach((row) => {
      const value = field === "group" ? `${row.id} · ${row.group}` : row[field];
      const id = makeId(field, value);
      if (!nodeIds.has(id)) {
        nodeIds.add(id);
        nodes.push({
          id,
          col: field,
          label: value,
          sub: field === "group" ? row.id : undefined,
          color: FIELD_META[field].color,
        });
      }
      if (col === fields.length - 1) return;
      const nextField = fields[col + 1];
      const nextValue = nextField === "group" ? `${row.id} · ${row.group}` : row[nextField];
      const key = `${id}\u0000${makeId(nextField, nextValue)}`;
      linkValues.set(key, (linkValues.get(key) || 0) + 1);
    });
  });

  return {
    nodes,
    links: [...linkValues].map(([key, value]) => {
      const [from, to] = key.split("\u0000");
      return { from, to, value };
    }),
    cols: fields.map((key) => ({ key, label: FIELD_META[key].label })),
  };
}

export const VIEWS = [
  { id: "collection", name: "กลุ่ม → วิธีเก็บข้อมูล", desc: "เปรียบเทียบวิธีรับฟังเสียงของผู้มีส่วนได้ส่วนเสียแต่ละกลุ่ม", build: () => buildFlow(["group", "method"]) },
  { id: "sample", name: "กลุ่ม → ขนาดตัวอย่าง", desc: "ตรวจความพร้อมด้านจำนวนผู้ให้ข้อมูลของแต่ละกลุ่ม", build: () => buildFlow(["group", "sampleSize"]) },
  { id: "timeline", name: "กลุ่ม → ช่วงเวลา", desc: "ติดตามสถานะและช่วงเวลาการเก็บข้อมูล", build: () => buildFlow(["group", "period"]) },
  { id: "priority", name: "กลุ่ม → ความสำคัญ", desc: "แสดงสถานะการประเมินระดับความสำคัญ", build: () => buildFlow(["group", "priority"]) },
  { id: "method-status", name: "วิธีเก็บ → สถานะ", desc: "ดูภาพรวมวิธีเก็บข้อมูลเทียบกับช่วงเวลาและการประเมิน", build: () => buildFlow(["method", "period", "priority"]) },
  { id: "full-journey", name: "สายธารข้อมูลทั้งหมด", desc: "มองครบตั้งแต่กลุ่มเป้าหมาย วิธีเก็บ ขนาดตัวอย่าง ช่วงเวลา จนถึงความสำคัญ", build: () => buildFlow(["group", "method", "sampleSize", "period", "priority"]) },
];
