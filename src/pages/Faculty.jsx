import { PageHead } from "./ui";
import { responsibleNames } from "../curriculumData";

const faculty = [
  {
    name: "ปริญดา แข็งขัน",
    image: "/images/faculty/parinda-khaengkhan.webp",
    qualifications: [
      ["Ph.D. (Materials and Life Science)", "Kyoto Institute of Technology", "2552"],
      ["วท.ม. (พืชสวน)", "มหาวิทยาลัยขอนแก่น", "2540"],
      ["วท.บ. (เกษตรศาสตร์)", "มหาวิทยาลัยขอนแก่น", "2534"],
    ],
  },
  {
    name: "ปิยะพงษ์ บุญสรรค์",
    image: "/images/faculty/piyapong-boonsan.webp",
    qualifications: [
      ["วท.บ. (เกษตรศาสตร์)", "มหาวิทยาลัยเชียงใหม่", "2540"],
      ["วท.บ. (เกษตรศาสตร์)", "สถาบันเทคโนโลยีราชมงคล", "2537"],
    ],
  },
  {
    name: "สายัญ พันธ์สมบูรณ์",
    image: "/images/faculty/sayan-phansomboon.webp",
    qualifications: [
      ["ปร.ด. (เกษตรเขตร้อน)", "มหาวิทยาลัยเกษตรศาสตร์", "2563"],
      ["วท.ม. (ปริโตเคมีและวิทยาศาสตร์พอลิเมอร์)", "จุฬาลงกรณ์มหาวิทยาลัย", "2551"],
      ["วท.บ. (เคมี)", "สถาบันราชภัฏวลัยลงกรณ์", "2544"],
    ],
  },
  {
    name: "อิทธิพล ขึมภูเขียว",
    image: "/images/faculty/ittipon-khuemphukhieo.webp",
    qualifications: [
      ["Ph.D. (Plant Breeding)", "Texas A&M University, USA", "2568"],
      ["วท.ม. (เกษตรศาสตร์)", "มหาวิทยาลัยอุบลราชธานี", "2557"],
      ["วท.บ. (เกษตรศาสตร์)", "มหาวิทยาลัยอุบลราชธานี", "2554"],
    ],
  },
  {
    name: "อยุธย์ คงปั้น",
    image: "/images/faculty/ayut-kongpan.webp",
    qualifications: [
      ["วท.ด. (พืชไร่)", "มหาวิทยาลัยเชียงใหม่", "2554"],
      ["วท.ม. (เกษตรศาสตร์)", "มหาวิทยาลัยเชียงใหม่", "2545"],
      ["วท.บ. (เกษตรศาสตร์)", "มหาวิทยาลัยเชียงใหม่", "2542"],
    ],
  },
  {
    name: "เอกรินทร์ สารีพัว",
    image: "/images/faculty/ekkarin-sareepuang.webp",
    qualifications: [
      ["ปร.ด. (พืชสวน)", "มหาวิทยาลัยขอนแก่น", "2558"],
      ["วท.ม. (พืชสวน)", "มหาวิทยาลัยขอนแก่น", "2554"],
      ["วท.บ. (พืชศาสตร์)", "มหาวิทยาลัยนเรศวร", "2551"],
    ],
  },
  {
    name: "ปุญญิศา ชารีรักษ์",
    image: "/images/faculty/punyisa-chareerak.webp",
    qualifications: [
      ["ปร.ด. (โรคพืชวิทยา)", "มหาวิทยาลัยขอนแก่น", "2559"],
      ["วท.ม. (โรคพืช)", "มหาวิทยาลัยขอนแก่น", "2551"],
      ["วท.บ. (เกษตรศาสตร์)", "มหาวิทยาลัยขอนแก่น", "2548"],
    ],
  },
];

const orderedFaculty = [...faculty].sort((a, b) => {
  const aOrder = responsibleNames.indexOf(a.name);
  const bOrder = responsibleNames.indexOf(b.name);
  if (aOrder !== -1 && bOrder !== -1) return aOrder - bOrder;
  if (aOrder !== -1) return -1;
  if (bOrder !== -1) return 1;
  return 0;
});

export default function Faculty() {
  return (
    <>
      <PageHead
        title="อาจารย์ผู้รับผิดชอบและอาจารย์ผู้สอน"
        subtitle="รายชื่อตามหมวด 12 ของหลักสูตร ปวส. พืชศาสตร์ พ.ศ. 2570"
      />

      <div className="faculty-summary" aria-label="สรุปจำนวนอาจารย์">
        <strong>3</strong>
        <span>อาจารย์ผู้รับผิดชอบหลักสูตร</span>
        <small>อาจารย์ผู้สอนในสาขา {faculty.length} คน · ภาระสอน 15 ชม./สัปดาห์</small>
      </div>

      <section className="faculty-grid" aria-label="รายชื่ออาจารย์ประจำหลักสูตร">
        {orderedFaculty.map((person, index) => (
          <article className="faculty-card" key={person.name}>
            {person.image && <div className="faculty-photo"><img src={person.image} alt={`อาจารย์${person.name}`} /></div>}
            <div className="faculty-card-head">
              <span className="faculty-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p>ผู้ช่วยศาสตราจารย์</p>
                <h2>{person.name}</h2>
                {responsibleNames.includes(person.name) && <span className="role-badge">ผู้รับผิดชอบหลักสูตร</span>}
              </div>
            </div>

            <div className="qualification-list">
              {person.qualifications.map(([degree, institution, year]) => (
                <div className="qualification" key={`${degree}-${year}`}>
                  <div>
                    <strong>{degree}</strong>
                    <span>{institution}</span>
                  </div>
                  <time>{year}</time>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
