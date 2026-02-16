// /app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { app } from '@/app/firebase/server';
import crypto from 'crypto';

const db = getFirestore(app);

function buildInitialQuizMap(n = 10) {
  const obj: Record<string, { quiz_plays: number; score: boolean | null }> = {};
  for (let i = 1; i <= n; i++) {
    obj[String(i)] = { quiz_plays: 0, score: null };
  }
  return obj;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email }: { name?: string; email?: string } = await req
      .json()
      .catch(() => ({}));

    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, message: 'name is required' },
        { status: 400 }
      );
    }

    // 1. หา User ID จาก Cookie หรือสร้างใหม่
    const existingUid = req.cookies.get('uID')?.value;
    const uid = existingUid ?? crypto.randomUUID();

    const userRef = db.collection('UsersCollection').doc(uid);
    const quizRef = db.collection('QuizCollection').doc(uid);

    const userSnap = await userRef.get();
    let res: NextResponse;

    if (userSnap.exists) {
      await userRef.update({
        name,
        login_count: FieldValue.increment(1),
        last_login: FieldValue.serverTimestamp(),
      });

      const quizSnap = await quizRef.get();
      if (quizSnap.exists) {
        const quizData = quizSnap.data()?.quiz || {};
        let completedCount = 0;
        const totalQuestions = 10;

        for (let i = 1; i <= totalQuestions; i++) {
          if (
            quizData[String(i)]?.score !== null &&
            quizData[String(i)]?.score !== undefined
          ) {
            completedCount++;
          }
        }

        if (completedCount === totalQuestions) {
          const resetQuizMap: Record<string, any> = {};

          for (let i = 1; i <= totalQuestions; i++) {
            const key = String(i);
            resetQuizMap[key] = {
              quiz_plays: quizData[key]?.quiz_plays || 0,
              score: null,
            };
          }

          await quizRef.update({ quiz: resetQuizMap });
          console.log(
            `User ${uid} finished all questions. Quiz reset for next loop.`
          );
        }
      }

      res = NextResponse.json({
        success: true,
        message: 'User updated and quiz checked',
        uid,
      });
    } else {
      const batch = db.batch();

      batch.set(userRef, {
        uid,
        name,
        email: email ?? null,
        created_at: FieldValue.serverTimestamp(),
        last_login: FieldValue.serverTimestamp(),
        login_count: 1,
        provider: 'local',
      });

      batch.set(quizRef, { uid, quiz: buildInitialQuizMap(10) });

      await batch.commit();

      res = NextResponse.json({
        success: true,
        message: 'User created and quiz record initialized',
        uid,
      });
    }

    res.cookies.set('uID', uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });

    return res;
  } catch (err) {
    console.error('Create/Update user error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name');
  if (!name) {
    return NextResponse.json(
      { success: false, message: 'name is required' },
      { status: 400 }
    );
  }

  const snap = await db
    .collection('UsersCollection')
    .where('name', '==', name)
    .limit(1)
    .get();
  if (snap.empty) {
    return NextResponse.json(
      { success: false, message: 'User not found' },
      { status: 404 }
    );
  }

  const doc = snap.docs[0];
  return NextResponse.json({ success: true, uid: doc.id, ...doc.data() });
}
