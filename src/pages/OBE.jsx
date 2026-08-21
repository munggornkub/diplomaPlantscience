import { useMemo } from "react";
import { Link } from "react-router-dom";
import { VIEWS } from "../alluvialViews";
import { surveySummary } from "../stakeholderData";
import { PageHead } from "./ui";

function ribbonPath(x1, y1, x2, y2) {
  const curve = Math.max(90, (x2 - x1) * 0.46);
  return `M ${x1} ${y1} C ${x1 + curve} ${y1}, ${x2 - curve} ${y2}, ${x2} ${y2}`;
}

function AlluvialChart({ view }) {
  const graph = useMemo(() => view.build(), [view]);
  const width = 1180;
  const height = Math.max(680, graph.nodes.filter((node) => node.col === "need").length * 52 + 100);
  const left = graph.nodes.filter((node) => node.col === graph.cols[0].key);
  const right = graph.nodes.filter((node) => node.col === graph.cols[1].key);
  const positions = new Map();

  const place = (nodes, x) => {
    const gap = (height - 120) / Math.max(nodes.length, 1);
    nodes.forEach((node, index) => positions.set(node.id, { x, y: 92 + gap * (index + 0.5) }));
  };
  place(left, 245);
  place(right, 935);

  const maxValue = Math.max(...graph.links.map((link) => link.value), 1);

  return (
    <section className="alluvial-panel" aria-labelledby="alluvial-title">
      <div className="alluvial-heading">
        <div>
          <p className="section-kicker">EVIDENCE FLOW</p>
          <h2 id="alluvial-title">{view.name}</h2>
          <p>{view.desc}</p>
        </div>
        <div className="alluvial-stat"><strong>{surveySummary.responses}</strong><span>คำตอบทั้งหมด</span></div>
      </div>
      <div className="alluvial-scroll">
        <svg className="alluvial-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="แผนภาพสายธารจากกลุ่มผู้มีส่วนได้ส่วนเสียไปยังความต้องการ">
          <defs>
            <linearGradient id="flow-gradient" x1="0" x2="1"><stop offset="0" stopColor="#4d997b"/><stop offset="1" stopColor="#d49a4b"/></linearGradient>
          </defs>
          {graph.cols.map((col, index) => <text key={col.key} className="alluvial-col-label" x={index === 0 ? 36 : 774} y="42">{col.label}</text>)}
          <g className="alluvial-links">
            {graph.links.map((link) => {
              const from = positions.get(link.from);
              const to = positions.get(link.to);
              return <path key={`${link.from}-${link.to}`} d={ribbonPath(from.x, from.y, to.x, to.y)} strokeWidth={Math.max(0.65, 8 * link.value / maxValue)} />;
            })}
          </g>
          {graph.nodes.map((node) => {
            const pos = positions.get(node.id);
            const isLeft = node.col === graph.cols[0].key;
            return <g key={node.id} className="alluvial-node" transform={`translate(${pos.x},${pos.y})`}>
              <circle r="7" fill={node.color} />
              <text x={isLeft ? -15 : 15} y="-3" textAnchor={isLeft ? "end" : "start"}>{node.label}</text>
              {node.sub && <text className="alluvial-node-sub" x={isLeft ? -15 : 15} y="15" textAnchor={isLeft ? "end" : "start"}>{node.sub}</text>}
            </g>;
          })}
        </svg>
      </div>
      <p className="source-note">หมายเหตุ: แบบสอบถามมีผลรวมแยกตามกลุ่มและความต้องการ แต่ไม่มีตารางไขว้ระดับผู้ตอบ เส้นจึงคำนวณแบบจัดสัดส่วนจากผลรวมจริง ไม่ใช่จำนวนการเลือกโดยตรงของแต่ละกลุ่ม</p>
    </section>
  );
}

export default function OBE() {
  const view = VIEWS[0];
  return <>
    <PageHead title="การออกแบบหลักสูตรแบบ OBE" subtitle="เริ่มจากเสียงผู้มีส่วนได้ส่วนเสีย และแปลงข้อมูลจริงให้เห็นความต้องการของหลักสูตร" />
    <AlluvialChart view={view} />
    <div className="obe-followup"><Link className="text-link" to="/sh-needs">เปิดผลวิเคราะห์ Stakeholder Needs ฉบับเต็ม →</Link></div>
  </>;
}
