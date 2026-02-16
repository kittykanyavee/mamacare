'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

interface Question {
  id: number;
  question: string;
  choices: string[];
  answer: number;
  reason: string;
}

const Quiz = ({ question }: { question: Question | null }) => {
  const [answer, setAnswer] = useState<number | undefined>(undefined);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [uID, setUID] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const router = useRouter();
  const currentQuizId = Number(params.quiz_id);

  async function checkQuizStatus(uid: string) {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/quiz?uid=${uid}`);
      const data = await response.json();

      if (data.success && data.quiz) {
        const thisQuestion = data.quiz[String(currentQuizId)];

        if (
          thisQuestion &&
          thisQuestion.score !== null &&
          thisQuestion.score !== undefined
        ) {
          setAnswer(question?.answer);
        } else {
          setAnswer(undefined);
        }
      }
    } catch (error) {
      console.error('Failed to check status:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUID = localStorage.getItem('uID');
      setUID(storedUID);

      if (storedUID && question) {
        checkQuizStatus(storedUID);
      }
    }
  }, [currentQuizId, question]);

  async function updateQuizScore(uid: string, isCorrect: boolean) {
    try {
      await fetch('/api/quiz', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uID: uid,
          quizNumber: currentQuizId,
          score: isCorrect,
        }),
      });
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async function handleAnswer(selectedIndex: number, isCorrect: boolean) {
    if (answer !== undefined || !uID) return;

    setAnswer(selectedIndex + 1);
    setShowFeedback(true);
    await updateQuizScore(uID, isCorrect);
  }

  useEffect(() => {
    if (answer !== undefined && showFeedback) {
      const timeout = setTimeout(() => setShowFeedback(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [answer, showFeedback]);

  function handleNextStage() {
    if (currentQuizId >= 10) {
      router.push('/quiz');
    } else {
      router.push(`/quiz/${currentQuizId + 1}`);
    }
  }

  if (isLoading || !question)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F0818C]"></div>
      </div>
    );

  return (
    <div className="bg-white min-h-[600px] flex flex-col items-center w-full py-[40px] px-5 rounded-[20px] relative overflow-hidden">
      <div className="relative py-4 mb-4">
        <img
          src="/assets/state/sparkle.webp"
          alt="sparkle"
          width={60}
          className="rotate-180 absolute left-[-80px] top-0"
        />
        <header className="flex flex-col items-end">
          <h1 className="font-baloo text-[48px] leading-[48px] font-extrabold text-[#F0818C]">
            QUIZ
          </h1>
          <span className="font-sarabun text-[14px] font-bold text-gray-600">
            แบบทดสอบความรู้
          </span>
        </header>
        <img
          src="/assets/state/sparkle.webp"
          alt="sparkle"
          width={60}
          className="absolute right-[-80px] bottom-4"
        />
      </div>

      <AnimatePresence>
        {answer !== undefined && showFeedback && (
          <>
            {[...Array(10)].map((_, i) => {
              const randomX = Math.floor(Math.random() * 80) + 10;
              return (
                <motion.div
                  key={i}
                  className="z-50 absolute text-6xl pointer-events-none"
                  initial={{ y: -100, opacity: 0, x: `${randomX}%` }}
                  animate={{ y: 600, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                >
                  {question.answer === answer ? '🥳' : '😭'}
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md">
        <p className="mt-4 text-lg font-sarabun font-bold text-[#D65A7F] text-center">
          ข้อที่ {currentQuizId} :{' '}
          <span className="text-black font-medium">{question.question}</span>
        </p>

        <ul className="mt-8 space-y-4 w-full flex flex-col items-center">
          {question.choices.map((choice, index) => {
            const choiceId = index + 1;
            const isCorrectAnswer = question.answer === choiceId;
            const isImageChoice = currentQuizId === 8;
            const isSelected = answer === choiceId;

            let bgClass = 'bg-[#FFD0D8] hover:bg-[#ffb6c1]';
            if (answer !== undefined) {
              if (isCorrectAnswer)
                bgClass = 'bg-[#9EE76B] ring-2 ring-[#7ec252]';
              else if (isSelected)
                bgClass = 'bg-[#FF6C6C] ring-2 ring-[#d95353] text-white';
              else bgClass = 'bg-[#FFD0D8] opacity-50';
            }

            return (
              <li
                key={index}
                className={`relative w-full ${isImageChoice ? 'flex justify-center' : ''}`}
              >
                <button
                  onClick={() => handleAnswer(index, isCorrectAnswer)}
                  disabled={answer !== undefined}
                  className={`
                    relative w-full min-h-[56px] rounded-[16px] pl-[60px] pr-4 py-3
                    text-left transition-all duration-300 font-sarabun text-base
                    ${bgClass}
                    ${isImageChoice ? 'w-auto pl-4 flex flex-col items-center gap-2 h-auto' : ''}
                  `}
                >
                  <div
                    className={`
                    absolute left-2 top-1/2 -translate-y-1/2 
                    w-[40px] h-[40px] rounded-full border-2 border-dashed border-[#F0818C] bg-white
                    flex justify-center items-center font-baloo text-[20px] font-extrabold text-[#F0818C]
                    ${isImageChoice ? 'static translate-y-0 mb-2' : ''}
                  `}
                  >
                    {choiceId}
                  </div>

                  {isImageChoice ? (
                    <div className="relative w-[200px] h-[150px] rounded-lg overflow-hidden border-2 border-white">
                      <Image
                        alt={`choice-${index}`}
                        src={choice}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <span>{choice}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {answer !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center gap-4 w-full"
          >
            <div className="text-center">
              <p className="font-sarabun font-bold text-lg text-[#F0818C]">
                เฉลย
              </p>
              <p className="font-sarabun text-sm text-gray-700 mt-1">
                <span className="font-bold">ตอบข้อ {question.answer}:</span>{' '}
                {question.reason}
              </p>
            </div>

            <button
              className="bg-[#F0818C] hover:bg-[#d65a7f] transition-colors h-[40px] px-8 rounded-full font-sarabun font-bold text-white shadow-md active:scale-95"
              onClick={handleNextStage}
            >
              {currentQuizId === 10 ? 'กลับสู่หน้าหลัก' : 'ข้อถัดไป'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
