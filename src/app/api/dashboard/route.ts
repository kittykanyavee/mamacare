// /app/api/dashboard/route.ts
import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { app } from '@/app/firebase/server';

const db = getFirestore(app);

export async function GET() {
  try {
    const [usersSnap, quizSnap, assessSnap] = await Promise.all([
      db.collection('UsersCollection').get(),
      db.collection('QuizCollection').get(),
      db.collection('AssessmentCollection').get(),
    ]);

    const users = usersSnap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate
          ? data.created_at.toDate().toISOString()
          : data.created_at,
      };
    });

    const quiz_results = quizSnap.docs.map(doc => {
      const data = doc.data();
      const quizMap = data.quiz || {};

      const details = Object.entries(quizMap).map(
        ([key, val]: [string, any]) => ({
          question_no: parseInt(key),
          score: val.score,
          plays: val.quiz_plays,
          history: val.history || [],
        })
      );

      return {
        userId: doc.id,
        details,
      };
    });

    const assessments = assessSnap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        submitted_at: data.submitted_at?.toDate
          ? data.submitted_at.toDate().toISOString()
          : data.submitted_at,
      };
    });

    return NextResponse.json({
      summary: {
        total_users: users.length,
        total_quiz_players: quiz_results.length,
        total_assessments: assessments.length,
      },
      users,
      quiz_results,
      assessments,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
