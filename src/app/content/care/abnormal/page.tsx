import React from 'react';
import MenuBar from '@/component/menu_bar';
import Nav_bar from '@/component/nav_bar';
import BackButton from '@/component/back_button';

export default function AbnormalSymptomsPage() {
  // ข้อมูลอาการผิดปกติ
  const symptomsData = [
    {
      id: 1,
      text: 'แผลมีรอยปริแยก มีอาการบวม แดง รอบ ๆ แผล',
      img: '/assets/39.webp',
    },
    {
      id: 2,
      text: 'มีอาการปวดแผลมาก รับประทานยาบรรเทาปวดแต่อาการไม่ดีขึ้น',
      img: '/assets/40.webp',
    },
    {
      id: 3,
      text: 'แผลมีสารคัดหลั่งซึม ออกมาผิดปกติ เช่น หนอง หรือเลือด',
      img: '/assets/41.webp',
    },
    {
      id: 4,
      text: 'มีไข้สูง หนาวสั่น',
      img: '/assets/42.webp',
    },
    {
      id: 5,
      text: 'ภายหลังคลอด 2 สัปดาห์ ยังสามารถคลำได้ก้อนบริเวณหน้าท้อง',
      img: '/assets/43.webp',
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
      {/* --- Main Title --- */}
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

        {/* --- Sub-Header (Warning Box) --- */}
        <div className="bg-[#FFF5E6] w-full max-w-sm rounded-2xl p-4 border-2 border-[#FFA07A] border-dashed shadow-sm mb-8 relative overflow-hidden">
          {/* Icon ตกแต่งเพิ่มความระวัง */}
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#FFA07A] rounded-full opacity-20"></div>

          <h2 className="text-center font-bold font-sarabun text-[24px] text-[#D35400] leading-tight">
            อาการผิดปกติ
          </h2>
          <p className="text-center font-bold font-sarabun text-[20px] text-[#E67E22]">
            ที่ควรมาพบแพทย์ที่โรงพยาบาล
          </p>
        </div>

        {/* --- Cards Section --- */}
        <div className="flex flex-col gap-8 w-full max-w-sm">
          {symptomsData.map((item, index) => {
            // สลับสีขอบ (เขียว/ชมพู) แต่ยังคงความรู้สึก "เตือนภัย" ด้วยข้อความสีแดง
            const isPink = index % 2 !== 0;
            const borderColor = isPink
              ? 'border-[#FF8EAF]'
              : 'border-[#73B8B3]';
            const shadowColor = isPink
              ? 'shadow-[0_10px_0_#FFB7C5]'
              : 'shadow-[0_10px_0_#AADAD5]';

            return (
              <div
                key={item.id}
                className={`
                    bg-white rounded-3xl overflow-hidden border-[3px]
                    flex flex-col items-center
                    ${borderColor} ${shadowColor}
                    transform transition-all hover:scale-[1.02]
                `}
              >
                {/* Image Area */}
                <div className="w-full h-40 bg-[#FAFAFA] border-b border-gray-100 p-2">
                  <img
                    src={item.img}
                    alt="abnormal symptom"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>

                {/* Text Area */}
                <div className="p-4 w-full bg-white min-h-[80px] flex items-center justify-center">
                  <p className="font-sarabun text-center font-bold text-[#C0392B] text-lg leading-snug">
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
