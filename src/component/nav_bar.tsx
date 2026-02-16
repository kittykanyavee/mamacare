'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Home, FileText, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function Nav_bar() {
  const router = useRouter();

  const baseBtn =
    'flex items-center gap-2 bg-[#B7E0DD] px-6 py-2 border-2 border-white rounded-lg hover:scale-105 transition';
  const navItems = [
    {
      title: 'Home',
      icon: '/assets/home.png',
      path: '/',
    },
    {
      title: 'Content',
      icon: '/assets/lightbumb.png',
      path: '/content',
    },

    {
      title: 'Quiz',
      icon: '/assets/test.png',
      path: '/quiz',
    },
    {
      title: 'Ai',
      icon: '/assets/chatbot.png',
      path: '/chatbot',
    },
  ];
  return (
    <div className="sticky bottom-0 flex gap-8 px-10 rounded-t-full w-full justify-evenly z-20 border-2 border-[#F0818C] bg-white">
      {navItems.map(nav => (
        <button
          key={nav.title}
          onClick={() => router.push(nav.path)}
          className="flex flex-col items-center pt-2"
        >
          <Image src={nav.icon} alt="frame" width={30} height={30} />
          <p className="font-baloo text-black">{nav.title}</p>
        </button>
      ))}
    </div>
  );
}
