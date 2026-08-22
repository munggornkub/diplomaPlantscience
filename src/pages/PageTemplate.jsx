import { PageHead, Section } from "./ui";

export default function PageTemplate({ title, step }) {
  return (
    <>
      <PageHead title={title} subtitle="รายละเอียดข้อมูลหลักสูตร" />
      <Section id="placeholder" title="สถานะเนื้อหา">
        <p>ยังไม่มีข้อมูล — ดูขั้นที่ {step} ของคู่มือ</p>
      </Section>
    </>
  );
}
