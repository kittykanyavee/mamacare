'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import MenuBar from '@/component/menu_bar';
import Nav_bar from '@/component/nav_bar';
import BackButton from '@/component/back_button';

// --- Reusable Component สำหรับปุ่มเมนู ---
const MenuCard = ({
  title,
  subtitle,
  onClick,
  colorClass = 'bg-white',
}: {
  title: string;
  subtitle?: string;
  onClick: () => void;
  colorClass?: string;
}) => (
  <button
    onClick={onClick}
    className={`
      w-full max-w-[340px] p-6 rounded-3xl 
      flex flex-col items-center justify-center text-center
      shadow-[0_8px_0_rgba(230,230,230,1)] border-2 border-white
      transform transition-all duration-150 active:translate-y-1 active:shadow-none
      ${colorClass}
    `}
  >
    <h2 className="font-sarabun font-bold text-2xl text-[#D65A7F]">{title}</h2>
    {subtitle && (
      <p className="font-sarabun text-lg mt-1 leading-tight">{subtitle}</p>
    )}
  </button>
);

export default function Page() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(`/content/care/${path}`);
  };

  return (
    <div className="mobile flex flex-col items-center justify-between pt-12 relative">
      <img
        src="/assets/5.webp"
        alt="frame"
        className="absolute top-0 object-cover w-[447.96px] h-[36.5px]"
      />
      <MenuBar />
      <BackButton path="/content" />
      <div>
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

        <div className="flex flex-col gap-6 w-full items-center">
          <MenuCard
            title="คำแนะนำ"
            subtitle="การดูแลแผลผ่าคลอดทางหน้าท้อง"
            onClick={() => handleNavigate('guidelines')}
            colorClass="bg-[#FAF0D9]"
          />

          <MenuCard
            title="อาการผิดปกติ"
            subtitle="ที่ควรมาพบแพทย์ทันที"
            onClick={() => handleNavigate('abnormal')}
            colorClass="bg-[#FAF0D9]"
          />

          <MenuCard
            title="วิดีโอสาธิต"
            subtitle="การดูแลแผลผ่าคลอดเพิ่มเติม"
            onClick={() => handleNavigate('video')}
            colorClass="bg-[#FAF0D9]"
          />
        </div>
      </div>
      <Nav_bar />
    </div>
  );
}
