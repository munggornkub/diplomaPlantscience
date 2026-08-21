import { ylos } from "../curriculumData"; import { PageHead } from "./ui";
export default function YLO(){return <><PageHead title="ผลลัพธ์การเรียนรู้รายปี" subtitle="Year Learning Outcomes · 2 ระดับชั้นปี"/>{[1,2].map(y=><section className="content-section" key={y}><h2>ชั้นปีที่ {y}</h2><div className="outcome-list">{ylos.filter(x=>x.year===y).map(x=><article key={x.code}><span>{x.code}</span><div><p>{x.text}</p><small>หลัก: {x.main} · สนับสนุน: {x.support}</small></div></article>)}</div></section>)}</>}

