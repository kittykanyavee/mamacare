import React from 'react';
import MenuBar from '@/component/menu_bar';
import Nav_bar from '@/component/nav_bar';
import BackButton from '@/component/back_button';

export default function CausePage() {
  // สร้าง Data Array เพื่อให้จัดการข้อมูลง่าย และโค้ดสะอาดขึ้น
  const causes = [
    { id: 1, img: '/assets/9.webp', title: 'รูปร่างอ้วน' },
    { id: 2, img: '/assets/11.webp', title: 'เป็นเบาหวาน' },
    { id: 3, img: '/assets/12.webp', title: 'การใช้ Steroid' },
    { id: 4, img: '/assets/10.webp', title: 'มีภูมิต้านทานตํ่า' },
    { id: 5, img: '/assets/21.webp', title: 'มีภาวะซีด' },
    { id: 6, img: '/assets/22.webp', title: 'มีก้อนเลือดคั่งที่แผล' },
    {
      id: 7,
      img: '/assets/23.webp',
      title: 'ติดเชื้อเยื่อหุ้มเด็ก',
      special: true,
    }, // ตัวสุดท้ายอาจจะยาวหน่อย
  ];

  return (
    <div className="mobile flex flex-col items-center justify-between pt-12 relative">
      <img
        src="/assets/5.webp"
        alt="frame"
        className="fixed top-0 object-cover w-[447.96px] h-[36.5px]"
      />
      <MenuBar />
      <BackButton path="/content" />

      <div className="mt-2 mb-8 flex items-center justify-center">
        <img alt="glass" src="/assets/8.webp" width={30} className="mr-2" />
        <h1 className="text-[26px] text-[#F0818C] font-bold font-sarabun tracking-wide text-center">
          สาเหตุของการติดเชื้อ
        </h1>
      </div>

      {/* --- Grid Layout for Cards --- */}
      <div className="grid grid-cols-2 gap-5 w-full max-w-md px-4 pb-4">
        {causes.map((item, index) => (
          <div
            key={item.id}
            // ถ้าเป็นตัวสุดท้าย (เลขคี่) ให้เต็มความกว้าง (col-span-2) หรือจัดกึ่งกลางตามดีไซน์
            className={`
                bg-white rounded-3xl p-4 flex flex-col items-center justify-between
                shadow-[0_6px_0_rgb(247,203,206)] border-2 border-[#FFF0F3]
                transition-all duration-300 hover:-translate-y-1 active:translate-y-1 active:shadow-none
                ${index === causes.length - 1 ? 'col-span-2 w-3/4 mx-auto' : ''}
              `}
          >
            <div className="w-full h-24 flex items-center justify-center mb-2 overflow-hidden rounded-xl bg-[#FFF9F9]">
              <img
                src={item.img}
                alt={item.title}
                className="object-contain h-full w-full p-1"
              />
            </div>

            <div className="w-full bg-[#FFEFF4] rounded-xl py-1 px-2 mt-1">
              <p className="font-sarabun text-[#D65A7F] text-center font-bold text-sm leading-tight">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Nav_bar />
    </div>
  );
}
