'use client';
import Quiz from '@/component/game/quiz';
import React, { useEffect, useState } from 'react';
import question from '@/quiz.json';
import { useParams } from 'next/navigation';
import BackButton from 'src/component/back_button';
import Nav_bar from '@/component/nav_bar';
interface Question {
  id: number;
  question: string;
  choices: string[];
  answer: number;
  reason: string;
}

const Page = () => {
  const params = useParams();
  const [quiz, setQuiz] = useState<Question | null>(null);
  useEffect(() => {
    const id = Number(params.quiz_id);
    if (!isNaN(id)) {
      const found = question.find((q: Question) => q.id === id);
      if (found) setQuiz(found);
    }
  }, [params.quiz_id]);
  return (
    <div className="mobile flex flex-col items-center justify-between pt-13 relative">
      <BackButton path="/quiz" />
      <img
        src="/assets/5.webp"
        alt="frame"
        className="absolute top-0 object-cover w-[447.96px] h-[36.5px]"
      />
      <div className="flex flex-col justify-center items-center w-full px-4">
        <Quiz question={quiz} />
      </div>
      <Nav_bar />
    </div>
  );
};

export default Page;
