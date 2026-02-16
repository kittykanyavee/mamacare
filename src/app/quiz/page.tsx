'use client';

import React, { useEffect, useState } from 'react';
import BackButton from '@/component/back_button';
import State from '@/component/game/state';
import MenuBar from '@/component/menu_bar';
import Nav_bar from '@/component/nav_bar';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/app/firebase/client';

const Page = () => {
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const uID =
        typeof window !== 'undefined' ? localStorage.getItem('uID') : null;

      if (!uID) {
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore(app);
        const quizRef = doc(db, 'QuizCollection', uID);
        const docSnap = await getDoc(quizRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const quizMap = data.quiz || {};

          let completedCount = 0;
          for (let i = 1; i <= 10; i++) {
            const q = quizMap[String(i)];
            if (q && q.score !== null && q.score !== undefined) {
              completedCount++;
            } else {
              break;
            }
          }

          setUnlockedLevel(completedCount + 1);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="mobile flex flex-col items-center justify-between pt-12 relative min-h-screen bg-[#FCF9DA]">
      <section className="flex flex-col items-center w-full">
        <img
          src="/assets/5.webp"
          alt="frame"
          className="absolute top-0 object-cover w-[447.96px] h-[36.5px] z-0"
        />
        <div className="relative z-10 w-full flex flex-col items-center">
          <BackButton path="/" />
          <MenuBar />

          <div className="relative py-8">
            <img
              src={'/assets/state/sparkle.webp'}
              alt="sparkle"
              width={60}
              className="rotate-180 absolute left-[-80px] top-0"
            />
            <header className="flex flex-col items-end">
              <h1 className="font-baloo text-[48px] leading-[48px] font-extrabold text-[#F0818C]">
                QUIZ
              </h1>
              <span className="font-sarabun text-[14px] font-bold">
                แบบทดสอบความรู้
              </span>
            </header>
            <img
              src={'/assets/state/sparkle.webp'}
              alt="sparkle"
              width={60}
              className="absolute right-[-80px] bottom-4"
            />
          </div>

          {loading ? (
            <div className="mt-20 font-baloo text-[#F0818C] animate-pulse">
              Loading Progress...
            </div>
          ) : (
            <State unlockedLevel={unlockedLevel} />
          )}
        </div>
      </section>
      <Nav_bar />
    </div>
  );
};

export default Page;
