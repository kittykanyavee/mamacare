import React from 'react';
import MenuBar from '@/component/menu_bar';
import Nav_bar from '@/component/nav_bar';
import BackButton from '@/component/back_button';

export default function SymptomsPage() {
  const symptomsData = [
    {
      id: 1,
      text: 'ปวด บวม แดง บริเวณแผล',
      img: '/assets/15.webp',
    },
    {
      id: 2,
      text: 'แผลแยกหรือปริออก',
      img: '/assets/19.webp',
    },
    {
      id: 3,
      text: 'ไข้สูงเกิน 38 องศาเซลเซียส',
      img: '/assets/17.webp',
    },
    {
      id: 4,
      text: 'มีฝีหนองบริเวณแผล',
      img: '/assets/16.webp',
    },
    {
      id: 5,
      text: 'นํ้าคาวปลามีกลิ่นแรงหรือมีเลือดปน',
      img: '/assets/18.webp',
    },
  ];

  return (
    <div className="mobile flex flex-col items-center justify-between pt-12 relative">
      <img
        src="/assets/5.webp"
        alt="frame"
        className="fixed top-0 object-cover w-[447.96px] h-[36.5px] z-50"
      />

      <MenuBar />
      <BackButton path="/content" />
      <section className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center p-2">
          <img
            alt="chem"
            src="/assets/13.webp"
            width={35}
            className="mr-2 drop-shadow-sm"
          />
          <h1 className="text-[26px] text-[#F0818C] font-bold font-sarabun tracking-wide text-center">
            อาการและอาการแสดง
          </h1>
        </div>
        <div className="relative p-4 w-full flex flex-col items-center">
          {/* --- Symptoms List --- */}
          <div className="flex flex-col gap-5 w-full max-w-md">
            {symptomsData.map((item, index) => {
              const isPink = index % 2 === 0;
              const borderColor = isPink
                ? 'border-[#FF8EAF]'
                : 'border-[#73B8B3]';
              const shadowColor = isPink
                ? 'shadow-[4px_6px_0_#FFB7C5]'
                : 'shadow-[4px_6px_0_#AADAD5]';

              return (
                <div
                  key={item.id}
                  className={`
                    flex flex-col items-center bg-white justify-center rounded-3xl border-2 p-4
                    ${borderColor} ${shadowColor}
                    transition-transform hover:scale-[1.02] duration-300
                `}
                >
                  <div className="w-full flex justify-center gap-3">
                    {/* Image Section */}
                    <img
                      src={item.img}
                      alt="symptom"
                      className="object-cover h-40 w-auto max-w-full"
                    />
                  </div>
                  {/* Text Section */}
                  <p className="font-sarabun text-center font-bold text-[#444] text-lg leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Nav_bar />
    </div>
  );
}
