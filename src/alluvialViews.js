import { stakeholderGroups, stakeholderNeeds, surveySummary } from "./obeData";

const COLORS = ["#256f53", "#35866a", "#509b80", "#70ae96", "#8fbea9", "#4c7e8a", "#6a91a0", "#8aa7b1", "#a0b9be"];

function numberFromEvidence(evidence) {
  const match = evidence.match(/(?:เลือก(?:เป็น 5 ด้านสำคัญ)?|ถูกเลือก)\s*(\d+)/);
  return match ? Number(match[1]) : null;
}

function buildStakeholderNeeds() {
  const stakeholders = stakeholderGroups.map(([label, count, pct], index) => ({
    id: `sh:${index + 1}`,
    col: "stakeholder",
    label,
    sub: `${count} คน · ${pct}`,
    color: COLORS[index % COLORS.length],
    count,
  }));

  const needs = stakeholderNeeds.map(([code, label, evidence]) => {
    const count = numberFromEvidence(evidence);
    return {
      id: `need:${code}`,
      col: "need",
      label: `${code} · ${label}`,
      sub: count ? `${count} คำตอบ` : "หลักฐานเชิงคุณภาพ",
      color: "#d18b32",
      count: count || 1,
    };
  });

  const links = stakeholders.flatMap((stakeholder) =>
    needs.map((need) => ({
      from: stakeholder.id,
      to: need.id,
      // The survey file exposes marginal totals, not a respondent-level cross-tab.
      // This proportional allocation therefore visualises both real margins without
      // inventing a hand-authored relationship.
      value: (stakeholder.count * need.count) / surveySummary.responses,
    })),
  );

  return {
    nodes: [...stakeholders, ...needs].map(({ count, ...node }) => node),
    links,
    cols: [
      { key: "stakeholder", label: "Stakeholder (SH)" },
      { key: "need", label: "ความต้องการ (Needs)" },
    ],
  };
}

export const VIEWS = [
  {
    id: "stakeholder-needs",
    name: "Stakeholder → Needs",
    desc: "ภาพรวมสัดส่วนกลุ่มผู้มีส่วนได้ส่วนเสียและความต้องการที่สังเคราะห์จากผลสำรวจจริง",
    build: buildStakeholderNeeds,
  },
];
