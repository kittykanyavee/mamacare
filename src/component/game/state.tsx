'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

interface StateProps {
  unlockedLevel?: number;
}

const State = ({ unlockedLevel = 1 }: StateProps) => {
  const router = useRouter();

  function handleState(state: number) {
    if (state > unlockedLevel) return;

    router.push(`/quiz/${state}`);
  }

  const getButtonClass = (level: number, top: string, left: string) => {
    const isLocked = level > unlockedLevel;
    const isCurrent = level === unlockedLevel;

    return `absolute ${top} ${left} transition-all duration-300 ${
      isLocked
        ? 'grayscale opacity-60 cursor-not-allowed filter'
        : isCurrent
          ? 'cursor-pointer drop-shadow-xl scale-110 brightness-110 z-10'
          : 'cursor-pointer drop-shadow-md hover:scale-105 hover:rotate-6 brightness-100'
    }`;
  };

  return (
    <div className="relative flex w-[350px] h-[502px]">
      {/* --- Static Assets --- */}
      <img
        src="/assets/state/finish.webp"
        alt="Finish"
        width={84}
        className="absolute top-[10px] left-[182px]"
      />
      <img
        src="/assets/state/start.webp"
        alt="Start"
        width={76}
        className="absolute top-[422px] left-[0px]"
      />

      {/* --- Ropes --- */}
      <img
        src="/assets/state/rope.webp"
        alt="Rope"
        width={57}
        className="absolute top-[73px] left-[150px] rotate-[173deg]"
      />
      <img
        src="/assets/state/rope.webp"
        alt="Rope"
        width={57}
        className="absolute top-[108px] left-[65px] rotate-[175deg]"
      />
      <img
        src="/assets/state/rope.webp"
        alt="Rope"
        width={57}
        className="absolute top-[180px] left-[16px] rotate-[122deg]"
      />
      <img
        src="/assets/state/rope.webp"
        alt="Rope"
        width={57}
        className="absolute top-[245px] left-[55px] rotate-[44deg]"
      />
      <img
        src="/assets/state/rope.webp"
        alt="Rope"
        width={57}
        className="absolute top-[250px] left-[140px] rotate-[177deg]"
      />
      <img
        src="/assets/state/rope.webp"
        alt="Rope"
        width={57}
        className="absolute top-[248px] left-[242px] rotate-[224deg]"
      />
      <img
        src="/assets/state/rope.webp"
        alt="Rope"
        width={57}
        className="absolute top-[320px] left-[270px] rotate-[-44deg]"
      />
      <img
        src="/assets/state/rope.webp"
        alt="Rope"
        width={57}
        className="absolute top-[395px] left-[206px] rotate-[7deg]"
      />
      <img
        src="/assets/state/rope.webp"
        alt="Rope"
        width={57}
        className="absolute top-[422px] left-[128px] "
      />

      {/* --- Buttons 1-10 --- */}

      <button
        disabled={10 > unlockedLevel}
        className={getButtonClass(10, 'top-[48px]', 'left-[182px]')}
        onClick={() => handleState(10)}
      >
        <img src="/assets/state/10.webp" alt="State 10" width={84} />
      </button>

      <button
        disabled={9 > unlockedLevel}
        className={getButtonClass(9, 'top-[70px]', 'left-[100px]')}
        onClick={() => handleState(9)}
      >
        <img src="/assets/state/9.webp" alt="State 9" width={84} />
      </button>

      <button
        disabled={8 > unlockedLevel}
        className={getButtonClass(8, 'top-[120px]', 'left-[20px]')}
        onClick={() => handleState(8)}
      >
        <img src="/assets/state/8.webp" alt="State 8" width={84} />
      </button>

      <button
        disabled={7 > unlockedLevel}
        className={getButtonClass(7, 'top-[214px]', 'left-[10px]')}
        onClick={() => handleState(7)}
      >
        <img src="/assets/state/7.webp" alt="State 7" width={84} />
      </button>

      <button
        disabled={6 > unlockedLevel}
        className={getButtonClass(6, 'top-[248px]', 'left-[90px]')}
        onClick={() => handleState(6)}
      >
        <img src="/assets/state/6.webp" alt="State 6" width={84} />
      </button>

      <button
        disabled={5 > unlockedLevel}
        className={getButtonClass(5, 'top-[224px]', 'left-[182px]')}
        onClick={() => handleState(5)}
      >
        <img src="/assets/state/5.webp" alt="State 5" width={84} />
      </button>

      <button
        disabled={4 > unlockedLevel}
        className={getButtonClass(4, 'top-[258px]', 'left-[266px]')}
        onClick={() => handleState(4)}
      >
        <img src="/assets/state/4.webp" alt="State 4" width={84} />
      </button>

      <button
        disabled={3 > unlockedLevel}
        className={getButtonClass(3, 'top-[350px]', 'left-[246px]')}
        onClick={() => handleState(3)}
      >
        <img src="/assets/state/3.webp" alt="State 3" width={84} />
      </button>

      <button
        disabled={2 > unlockedLevel}
        className={getButtonClass(2, 'top-[410px]', 'left-[160px]')}
        onClick={() => handleState(2)}
      >
        <img src="/assets/state/2.webp" alt="State 2" width={84} />
      </button>

      <button
        disabled={1 > unlockedLevel}
        className={getButtonClass(1, 'top-[410px]', 'left-[74px]')}
        onClick={() => handleState(1)}
      >
        <img src="/assets/state/1.webp" alt="State 1" width={84} />
      </button>
    </div>
  );
};

export default State;
