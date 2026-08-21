import { courses } from "../curriculumData"; import { PageHead } from "./ui";
export default function Courses(){return <><PageHead title="รายวิชาพืชศาสตร์" subtitle="รายวิชาวิชาชีพพื้นฐานและวิชาชีพเฉพาะจากเล่มหลักสูตร พ.ศ. 2570"/><div className="course-list">{courses.map(([code,name,credit,group])=><article key={code}><code>{code}</code><div><h2>{name}</h2><span>{group}</span></div><strong>{credit}</strong></article>)}</div></>}

