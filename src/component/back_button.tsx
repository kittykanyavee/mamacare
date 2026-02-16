'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

type BackButtonProps = {
  path: string;
};

const BackButton: React.FC<BackButtonProps> = ({ path }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(path)}
      className="flex bg-white border-2 rounded-full border-[#F0818C] p-1 absolute top-16 left-8 items-center z-1"
    >
      <ChevronLeft className="text-[#F0818C]" />
    </button>
  );
};

export default BackButton;
