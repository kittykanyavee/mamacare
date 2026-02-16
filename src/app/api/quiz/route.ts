import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { app } from '@/app/firebase/server';

const db = getFirestore(app);

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { uID, quizNumber, score } = body;

    if (!uID || !quizNumber || typeof score !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'Invalid data' },
        { status: 400 }
      );
    }

    const userRef = db.collection('QuizCollection').doc(uID);
    const qKey = String(quizNumber);

    // สร้าง Object ประวัติการตอบของรอบนี้
    const attemptRecord = {
      result: score, // ผลลัพธ์: true (ถูก) หรือ false (ผิด)
      timestamp: new Date().toISOString(), // เวลาที่ตอบ
    };

    // ✅ 1. บันทึกข้อมูล:
    // - quiz_plays: บวกเพิ่ม 1 (นับจำนวนรวม)
    // - score: อัปเดตสถานะล่าสุด (เพื่อใช้ Logic ผ่านด่าน)
    // - history: เพิ่มประวัติลงใน Array (เพื่อใช้ทำ Dashboard)
    await userRef.update({
      [`quiz.${qKey}.quiz_plays`]: FieldValue.increment(1),
      [`quiz.${qKey}.score`]: score,
      [`quiz.${qKey}.history`]: FieldValue.arrayUnion(attemptRecord),
    });

    // ✅ 2. ตรวจสอบว่าครบ 10 ข้อหรือยัง (Logic Reset เดิม)
    const docSnap = await userRef.get();
    if (docSnap.exists) {
      const data = docSnap.data();
      const quizData = data?.quiz || {};
      const totalQuestions = 10;
      let completedCount = 0;

      for (let i = 1; i <= totalQuestions; i++) {
        // นับข้อที่ score ปัจจุบันไม่เป็น null
        if (
          quizData[String(i)]?.score !== null &&
          quizData[String(i)]?.score !== undefined
        ) {
          completedCount++;
        }
      }

      // ✅ 3. ถ้าครบ 10 ข้อ -> รีเซ็ต Score เป็น Null (เพื่อให้เล่นรอบใหม่ได้)
      // **แต่ History จะยังอยู่ครบ ไม่หายไปไหน**
      if (completedCount === totalQuestions) {
        const resetUpdate: Record<string, any> = {};
        for (let i = 1; i <= totalQuestions; i++) {
          resetUpdate[`quiz.${i}.score`] = null;
        }

        await userRef.update(resetUpdate);

        return NextResponse.json({
          success: true,
          message: 'Quiz completed & Score Reset (History Saved)',
          reset: true,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Quiz updated with history',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server Error' },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  const uID = req.nextUrl.searchParams.get('uid');

  if (!uID) {
    return NextResponse.json(
      { success: false, message: 'uID is required' },
      { status: 400 }
    );
  }

  try {
    const docRef = db.collection('QuizCollection').doc(uID);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      // ถ้ายังไม่มีข้อมูล Quiz เลย (User ใหม่)
      return NextResponse.json({ success: true, quiz: {} });
    }

    return NextResponse.json({ success: true, ...docSnap.data() });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
