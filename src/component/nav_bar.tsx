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
      title: 'content',
      icon: '/assets/lightbumb.png',
      path: '/content',
    },
    {
      title: 'Home',
      icon: '/assets/home.png',
      path: '/',
    },
    {
      title: 'test',
      icon: '/assets/test.png',
      path: '/quiz',
    },
  ];
  return (
    <div
      className="fixed bottom-4 left-1/2
    -translate-x-1/2 flex gap-8 px-10 rounded-full w-fit z-20 border-2 border-[#F0818C] bg-white"
    >
      {navItems.map(nav => (
        <button
          key={nav.title}
          onClick={() => router.push(nav.path)}
          className="flex flex-col items-center pt-2"
        >
          <Image src={nav.icon} alt="frame" width={40} height={40} />
          <p className="font-baloo text-black">{nav.title}</p>
        </button>
      ))}
    </div>
  );
}
