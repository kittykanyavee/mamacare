import React from 'react';
import MenuBar from '@/component/menu_bar';
import Nav_bar from '@/component/nav_bar';
import BackButton from '@/component/back_button';

export default function Page() {
  return (
    <div className="mobile flex flex-col items-center justify-between pt-12 relative">
      <img
        src="/assets/5.webp"
        alt="frame"
        className="absolute object-cover top-0 w-[447.96px] h-[36.5px]"
      />

      <MenuBar />
      <BackButton path="/content/care" />

      {/* --- Main Title Redesigned --- */}
      <div className="mt-2 mb-8 flex items-center justify-center">
        <img
          alt="care"
          src="/assets/14.webp"
          width={35}
          className="mr-3 drop-shadow-sm"
        />
        <h1 className="text-[26px] text-[#F0818C] font-bold font-sarabun tracking-wide text-center">
          การดูแลแผลผ่าตัด
        </h1>
      </div>

      <section className="flex flex-col px-4">
        <div className="w-full max-w-md bg-white p-5 rounded-3xl border-[3px] border-[#BCE0DD] shadow-[0_8px_20px_rgba(172,218,213,0.5)] flex flex-col mb-8">
          <div className="rounded-2xl overflow-hidden shadow-sm border border-[#BCE0DD]">
            <video
              width="100%"
              controls
              playsInline
              preload="none"
              className="bg-[#f0f0f0]"
            >
              <source
                src="/assets/video/B271E34E-69A6-4ECD-9F06-24E9C39D6216.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <p className="font-sarabun mt-5 text-[#555] leading-relaxed text-base px-1">
            คลิปนี้แนะนำเทคนิคดูแลแผลผ่าคลอดให้หายไว
            โดยเน้นการปฏิบัติตัวที่ถูกต้อง เช่น หลีกเลี่ยง ยกของหนัก
            ใช้ผ้ารัดหน้าท้อง พักผ่อนให้เพียงพอ และดูแลแผลให้แห้งสะอาด
            ควรรับประทานอาหารที่มีโปรตีนสูงเพื่อช่วยซ่อมแซมแผลและฟื้นตัวเร็วขึ้น
          </p>
        </div>

        <div className="w-full max-w-md bg-white p-5 rounded-3xl border-[3px] border-[#FFC4D6] shadow-[0_8px_20px_rgba(255,196,214,0.6)] flex flex-col mb-8">
          <div className="rounded-2xl overflow-hidden shadow-sm border border-[#FFC4D6]">
            <video
              width="100%"
              controls
              playsInline
              preload="none"
              className="bg-[#f0f0f0]"
            >
              <source
                src="/assets/video/B271E34E-69A6-4ECD-9F06-24E9C39D6216.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <p className="font-sarabun mt-5 text-[#555] leading-relaxed text-base px-1">
            คลิปนี้ให้ความรู้เกี่ยวกับการดูแลแผลผ่าคลอดอย่างถูกวิธี
            เพื่อช่วยให้แผลหายเร็ว ลดการอักเสบ ป้องกันการติดเชื้อ
            และลดการเกิดแผลเป็นคีลอยด์ โดยแนะนำการทำความสะอาดแผล
            การใช้ผลิตภัณฑ์ลดรอยแผล และข้อควรระวังหลังคลอด
            เหมาะสำหรับคุณแม่ที่ต้องการดูแลแผลผ่าคลอดด้วยตนเองที่บ้านอย่างปลอดภัยและได้ผลดี
          </p>
        </div>
      </section>
      <Nav_bar />
    </div>
  );
}
