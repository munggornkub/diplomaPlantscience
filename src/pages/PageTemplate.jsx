import { PageHead, Section } from "./ui";

export default function PageTemplate({ title, step }) {
  return (
    <>
      <PageHead title={title} subtitle="พื้นที่เตรียมไว้สำหรับเนื้อหาที่จะจัดทำในขั้นถัดไป" />
      <Section id="placeholder" title="สถานะเนื้อหา">
        <p>ยังไม่มีข้อมูล — ดูขั้นที่ {step} ของคู่มือ</p>
      </Section>
    </>
  );
}
