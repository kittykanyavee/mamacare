'use client';
import Nav_bar from '@/component/nav_bar';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import MenuBar from '@/component/menu_bar';
export default function Home() {
  const router = useRouter();
  const menuItems = [
    {
      title: 'content',
      icon: '/assets/lightbumb.png',
      path: '/content',
    },
    {
      title: 'quiz',
      icon: '/assets/test.png',
      path: '/quiz',
    },
    {
      title: 'AI',
      icon: '/assets/chatbot.png',
      path: '/chatbot',
    },
    {
      title: 'review',
      icon: '/assets/review.png',
      path: '/assessment',
    },
  ];
  return (
    <div className="flex flex-col mobile items-center justify-center gap-4 pt-12 pb-9">
      <img
        src="assets/5.webp"
        alt="frame"
        className="absolute top-0 object-cover w-[447.96px] h-[36.5px]"
      />
      <MenuBar />
      <img src="assets/4.webp" alt="logo" className="w-[60%]" />
      <section className="flex flex-col w-full items-center justify-center relative">
        <div className="relative w-fit">
          <motion.img
            src="assets/person.PNG"
            alt="person"
            className="w-[80%]"
            animate={{
              x: [0, -6, 0],
              scale: [1, 1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-[15%] right-[30%]"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart fill="#F0818C" className="w-6 h-6 text-[#F0818C]" />
          </motion.div>
        </div>
        <section className="flex flex-col gap-2 w-full flex-1 px-4">
          <h2 className="font-baloo font-semibold text-[#F0818C] text-center text-2xl py-4 bg-white rounded-2xl  border-[#F0818C] z-40">
            Main menu
          </h2>
          <section className="flex w-full justify-evenly">
            {menuItems.map(menu => (
              <button
                key={menu.title}
                onClick={() => router.push(menu.path)}
                className="menu-button gap-1 "
              >
                <div className="p-4 bg-white rounded-2xl border-2 border-[#F0818C] hover:bg-[#F0818C]/30 hover:shadow-md transition-colors duration-500">
                  <Image src={menu.icon} alt="frame" width={40} height={40} />
                </div>
                <p className="font-baloo font-semibold text-[#F0818C]">
                  {menu.title}
                </p>
              </button>
            ))}
          </section>
        </section>
      </section>
      <img
        alt="curve"
        src="/assets/1.webp"
        className="absolute object-cover bottom-0 w-[447.96px] h-[36.5px]"
      />
    </div>
  );
}
