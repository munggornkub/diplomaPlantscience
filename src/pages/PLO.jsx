import { plos } from "../curriculumData"; import { PageHead } from "./ui";
export default function PLO(){return <><PageHead title="ผลลัพธ์การเรียนรู้ระดับหลักสูตร" subtitle="Program Learning Outcomes · 6 ข้อตามเล่มหลักสูตรฉบับล่าสุด"/><div className="outcome-list">{plos.map((p,i)=><article key={p}><span>PLO{i+1}</span><p>{p}</p></article>)}</div></>}

