import React from 'react';
import MenuBar from '@/component/menu_bar';
import Nav_bar from '@/component/nav_bar';
import BackButton from '@/component/back_button';

export default function CareGuidelinesPage() {
  // ข้อมูลคำแนะนำ (รวมรูปภาพและข้อความไว้ที่นี่ แก้ไขง่าย)
  const guidelinesData = [
    {
      id: 1,
      text: 'ห้ามให้แผลโดนนํ้า หากปิดแผลด้วยพลาส-เตอร์กันน้ำสามารถอาบน้ำได้ปกติ',
      imgs: ['/assets/24.webp'],
    },
    {
      id: 2,
      text: 'ห้ามแกะ หรือเกา บริเวณแผล',
      imgs: ['/assets/25.webp'],
    },
    {
      id: 3,
      text: 'ห้ามยกของหนัก อย่างน้อย 6 สัปดาห์หลังคลอด',
      imgs: ['/assets/26.webp'],
    },
    {
      id: 4,
      text: 'งดการมีเพศสัมพันธ์ อย่างน้อย 6 สัปดาห์หลังคลอด',
      imgs: ['/assets/27.webp'],
    },
    {
      id: 5,
      text: 'รับประทานอาหารให้ครบ 5 หมู่ เน้นโปรตีน (เนื้อสัตว์ นม ไข่) เพื่อซ่อมแซมแผล',
      imgs: ['/assets/28.webp'],
    },
    {
      id: 6,
      text: 'หลีกเลี่ยงอาหารรสจัด ของหมักดอง และอาหารสุกๆ ดิบๆ',
      imgs: ['/assets/29.webp'],
    },
    {
      id: 7,
      text: 'หลีกเลี่ยงเครื่องดื่มที่มีแอลกอฮอล์ และการสูบบุหรี่',
      imgs: ['/assets/30.webp', '/assets/31.webp'], // กรณีมี 2 รูป
    },
    {
      id: 8,
      text: 'ดื่มน้ำให้เพียงพอ อย่างน้อย 8-10 แก้ว หรือวันละ 2 ลิตร',
      imgs: ['/assets/36.webp'],
    },
    {
      id: 9,
      text: 'พักผ่อนให้เพียงพอ อย่างน้อย 6-8 ชั่วโมง',
      imgs: ['/assets/32.webp'],
    },
    {
      id: 10,
      text: 'มาพบแพทย์เพื่อตรวจดูแผล ทำแผล และตรวจหลังคลอดตามนัด',
      imgs: ['/assets/33.webp'],
    },
    {
      id: 11,
      text: 'สังเกตอาการผิดปกติ หากมีปัญหาให้รีบมาพบแพทย์ก่อนนัด',
      imgs: ['/assets/34.webp'],
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
      <BackButton path="/content/care" />

      {/* --- Header Section --- */}
      <section className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center p-2">
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

        {/* --- Grid Content --- */}
        <div className="grid grid-cols-1 gap-8 w-full max-w-sm">
          {guidelinesData.map((item, index) => {
            const isPink = index % 2 === 0;
            const borderColor = isPink
              ? 'border-[#FF8EAF]'
              : 'border-[#73B8B3]';
            const shadowColor = isPink
              ? 'shadow-[8px_10px_0_#FFB7C5]'
              : 'shadow-[8px_10px_0_#AADAD5]';

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
                  {item.imgs.map((imgSrc, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                    >
                      <img
                        src={imgSrc}
                        alt="illustration"
                        className="object-cover h-40 w-auto max-w-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="min-h-[60px] flex items-center justify-center w-full mb-4">
                  <p className="font-sarabun text-center font-bold text-[#444] text-lg leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Nav_bar />
    </div>
  );
}
