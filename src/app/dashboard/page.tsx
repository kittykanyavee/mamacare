'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  Users,
  FileText,
  Star,
  Activity,
  Loader2,
  Search,
  RefreshCcw,
  Layers,
  ChevronRight,
  CalendarIcon,
  MessageSquare,
} from 'lucide-react';
import {
  format,
  isWithinInterval,
  startOfDay,
  endOfDay,
  subDays,
} from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// --- Helpers ---
const toDate = (dateVal: any) => {
  if (!dateVal) return null;

  let date;
  if (dateVal.seconds) {
    date = new Date(dateVal.seconds * 1000);
  } else {
    date = new Date(dateVal);
  }

  return isNaN(date.getTime()) ? null : date;
};

const calculateAssessmentAverage = (assessment: any) => {
  if (!assessment?.sections) return 0;

  let totalStars = 0;
  let itemCount = 0;

  assessment.sections.forEach((section: any) => {
    if (section.items) {
      section.items.forEach((item: any) => {
        if (typeof item.star === 'number') {
          totalStars += item.star;
          itemCount++;
        }
      });
    }
  });

  return itemCount > 0 ? totalStars / itemCount : 0;
};

// 3. คำนวณคะแนนเฉลี่ยรวมของทั้งระบบ
function getRating(filtered: any) {
  if (!filtered?.assessments || filtered.assessments.length === 0) return '0.0';

  const allAverages = filtered.assessments
    .map((a: any) => calculateAssessmentAverage(a))
    .filter((val: number) => val > 0);

  if (allAverages.length === 0) return '0.0';

  const sum = allAverages.reduce((acc: number, curr: number) => acc + curr, 0);
  const finalAvg = sum / allAverages.length;

  return isNaN(finalAvg) ? '0.0' : finalAvg.toFixed(1);
}

export default function MobileOnlyDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string>('all');
  const [selectedRound, setSelectedRound] = useState<string>('latest');

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  const maxRounds = useMemo(() => {
    if (!data) return 1;
    let max = 1;
    data.quiz_results.forEach((q: any) => {
      q.details?.forEach((d: any) => {
        if (d.history?.length > max) max = d.history.length;
      });
    });
    return max;
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return null;
    let u = data.users;
    let q = data.quiz_results;
    let a = data.assessments || [];

    if (selectedUserId !== 'all') {
      u = u.filter((i: any) => i.id === selectedUserId);
      q = q.filter((i: any) => i.userId === selectedUserId);
      a = a.filter((i: any) => i.userId === selectedUserId);
    }

    return { users: u, quiz_results: q, assessments: a };
  }, [data, selectedUserId]);

  const quizAnalytics = useMemo(() => {
    if (!filtered) return [];

    return Array.from({ length: 10 }, (_, i) => {
      const qNum = i + 1;
      let correct = 0;
      let wrong = 0;
      let notDone = 0;

      filtered.quiz_results.forEach((userQuiz: any) => {
        const qData = userQuiz.details?.find(
          (d: any) => d.question_no === qNum
        );
        const history = qData?.history || [];
        let result: boolean | null = null;

        if (selectedRound === 'latest') {
          result =
            history.length > 0 ? history[history.length - 1].result : null;
        } else {
          const idx = parseInt(selectedRound) - 1;
          if (history[idx]) result = history[idx].result;
        }

        if (result === true) correct++;
        else if (result === false) wrong++;
        else notDone++;
      });

      const totalResponses = correct + wrong;
      return {
        name: `${qNum}`,
        ถูก: correct,
        ผิด: wrong,
        ยังไม่ทำ: notDone,
        successRate:
          totalResponses > 0 ? Math.round((correct / totalResponses) * 100) : 0,
      };
    });
  }, [filtered, selectedRound]);

  const roundStats = useMemo(() => {
    let total = 0,
      correct = 0;
    quizAnalytics.forEach(q => {
      total += q.ถูก + q.ผิด;
      correct += q.ถูก;
    });
    return {
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      totalAnswers: total,
    };
  }, [quizAnalytics]);

  if (loading)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="h-10 w-10 animate-spin text-[#73B8B3]" />
        <p className="mt-4 text-[#73B8B3] font-medium">กำลังโหลดข้อมูลแอป...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-[480px] bg-[#FDFBF7] min-h-screen shadow-2xl relative flex flex-col font-sarabun text-slate-700">
        {/* --- Header Area --- */}
        <div className="p-5 pt-8 bg-white rounded-b-[32px] shadow-sm">
          <h1 className="text-2xl font-bold text-[#D65A7F] mb-1">
            Quiz Analytics
          </h1>
          <p className="text-slate-400 text-xs mb-5">
            สรุปผล:{' '}
            {selectedRound === 'latest'
              ? 'รอบล่าสุด'
              : `รอบที่ ${selectedRound}`}
          </p>

          <div className="space-y-3">
            <div className="relative">
              <select
                className="h-10 w-full pl-9 pr-4 rounded-xl border border-slate-100 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-[#73B8B3]"
                value={selectedRound}
                onChange={e => setSelectedRound(e.target.value)}
              >
                <option value="latest">เลือกรอบ: ล่าสุด</option>
                {Array.from({ length: maxRounds }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    เลือกรอบ: รอบที่ {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <select
                  className="h-10 w-full pl-9 pr-4 rounded-xl border border-slate-100 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-[#73B8B3]"
                  value={selectedUserId}
                  onChange={e => setSelectedUserId(e.target.value)}
                >
                  <option value="all">นักเรียนทุกคน</option>
                  {data?.users.map((u: any) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl bg-slate-50 border-slate-100"
                onClick={() => {
                  setSelectedRound('latest');
                  setSelectedUserId('all');
                }}
              >
                <RefreshCcw size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* --- Content Area --- */}
        <div className="p-4 space-y-6 pb-10">
          <div className="grid grid-cols-2 gap-3">
            <StatBox
              label="ผู้เข้าสอบ"
              value={filtered?.users.length}
              color="bg-blue-50"
              icon={<Users size={16} className="text-blue-500" />}
            />
            <StatBox
              label="การตอบรอบนี้"
              value={roundStats.totalAnswers}
              color="bg-pink-50"
              icon={<FileText size={16} className="text-pink-500" />}
            />
            <StatBox
              label="ความแม่นยำ"
              value={`${roundStats.accuracy}%`}
              color="bg-teal-50"
              icon={<Activity size={16} className="text-teal-500" />}
            />
            <StatBox
              label="ความพึงพอใจ"
              value={getRating(filtered)}
              color="bg-amber-50"
              icon={
                <Star size={16} className="text-amber-500 fill-amber-500" />
              }
            />
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-[28px] shadow-sm border border-slate-50">
            <h3 className="font-bold mb-4 text-sm text-slate-800">
              สถานะการตอบรายข้อ
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={quizAnalytics}
                  margin={{ top: 0, right: 0, left: -30, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f8fafc"
                  />
                  <XAxis
                    dataKey="name"
                    fontSize={10}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="ถูก" fill="#73B8B3" stackId="a" barSize={16} />
                  <Bar dataKey="ผิด" fill="#FF8EAF" stackId="a" />
                  <Bar
                    dataKey="ยังไม่ทำ"
                    fill="#E5E7EB"
                    stackId="a"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Area Chart */}
          <div className="bg-white p-4 rounded-[28px] shadow-sm border border-slate-50">
            <h3 className="font-bold mb-4 text-sm text-center text-slate-800">
              พัฒนาการการตอบถูก (%)
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={quizAnalytics}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#73B8B3" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#73B8B3" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    fontSize={10}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8' }}
                  />
                  <YAxis
                    fontSize={10}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8' }}
                    domain={[0, 100]}
                    unit="%"
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="successRate"
                    stroke="#73B8B3"
                    fill="url(#colorAcc)"
                    strokeWidth={3}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Individual Table */}
          <div className="bg-white rounded-[28px] shadow-sm border border-slate-50 overflow-hidden">
            <div className="p-4 border-b border-slate-50">
              <h3 className="font-bold text-sm">สถิติรายบุคคล</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] min-w-[320px]">
                <thead className="bg-slate-50/50 text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-4 py-3 font-semibold">ชื่อ</th>
                    <th className="px-2 py-3 text-center">คะแนน</th>
                    <th className="px-2 py-3 text-center">รอบ</th>
                    <th className="px-4 py-3 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered &&
                    filtered.users.slice(0, 8).map((u: any, idx: number) => {
                      const qRes = data.quiz_results.find(
                        (q: any) => q.userId === u.id
                      );
                      let latestScore = 0;
                      let totalRounds = 0;
                      qRes?.details?.forEach((d: any) => {
                        const h = d.history || [];
                        if (h.length > totalRounds) totalRounds = h.length;
                        if (h.length > 0 && h[h.length - 1].result === true)
                          latestScore++;
                      });
                      return (
                        <tr
                          key={idx}
                          className="active:bg-slate-50 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-[#FFDEE9] text-[#D65A7F] flex items-center justify-center font-bold text-[10px] mr-2">
                                {u.name?.charAt(0)}
                              </div>
                              <span className="font-bold text-slate-700 truncate w-20">
                                {u.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-2 py-3 text-center font-bold text-[#73B8B3]">
                            {latestScore}/10
                          </td>
                          <td className="px-2 py-3 text-center text-slate-400">
                            {totalRounds}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <ChevronRight
                              size={14}
                              className="text-slate-300 inline"
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          {/* --- ASSESSMENT SUMMARY SECTION --- */}
          <div className="bg-white p-6 rounded-[28px] shadow-sm border border-slate-50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                <Star size={18} className="text-amber-400 fill-amber-400" />{' '}
                คะแนนความพึงพอใจ
              </h3>
              <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-1 rounded-lg font-bold">
                {filtered?.assessments.length} การประเมิน
              </span>
            </div>

            <div className="flex items-center gap-5 mb-8 bg-slate-50/50 p-4 rounded-3xl border border-white">
              <div className="text-center border-r border-slate-200 pr-5">
                <div className="text-4xl font-black text-slate-800 leading-none">
                  {getRating(filtered)}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 uppercase">
                  คะแนนเฉลี่ย
                </div>
              </div>
              <div className="flex-1 space-y-1">
                {[5, 4, 3, 2, 1].map(star => {
                  const count =
                    filtered?.assessments.filter(
                      (a: any) =>
                        Math.round(calculateAssessmentAverage(a)) === star
                    ).length || 0;
                  const percent =
                    filtered?.assessments.length > 0
                      ? (count / filtered.assessments.length) * 100
                      : 0;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-slate-400 w-3">
                        {star}
                      </span>
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                ความเห็นล่าสุดจากผู้ใช้
              </p>
              {filtered?.assessments.length > 0 ? (
                filtered.assessments.slice(0, 3).map((a: any, idx: number) => {
                  const user = data?.users.find((u: any) => u.id === a.userId);
                  const date = toDate(a.submittedAt);
                  const userAvg = calculateAssessmentAverage(a);
                  return (
                    <div
                      key={idx}
                      className="p-4 bg-[#FDFBF7] rounded-2xl border border-orange-50 relative group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-[#D65A7F] border border-orange-100">
                            {user?.name?.charAt(0) || 'U'}
                          </div>
                          <span className="text-xs font-bold text-slate-700">
                            {user?.name || 'Anonymous'}
                          </span>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={8}
                              className={
                                i < Math.round(userAvg)
                                  ? 'fill-amber-400'
                                  : 'text-slate-200'
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed italic">
                        "{a.comment || 'good'}"
                      </p>
                      <div className="mt-2 text-[9px] text-slate-300 flex items-center gap-1">
                        <CalendarIcon size={10} />
                        {date ? format(date, 'dd/MM/yyyy') : '-'}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <MessageSquare
                    size={24}
                    className="mx-auto text-slate-300 mb-2"
                  />
                  <p className="text-xs text-slate-400 font-medium">
                    ยังไม่มีข้อมูลการประเมิน
                  </p>
                </div>
              )}
            </div>
            {filtered && filtered.assessments.length > 3 && (
              <button className="w-full mt-4 py-3 text-[11px] font-bold text-[#D65A7F] bg-[#FFF5F7] rounded-xl active:scale-95 transition-transform">
                ดูผลประเมินทั้งหมด ({filtered.assessments.length})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon, color }: any) {
  return (
    <div className="bg-white p-4 rounded-[20px] shadow-sm border border-slate-50 flex flex-col items-start gap-2">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <h3 className="text-lg font-bold text-slate-800">{value}</h3>
      </div>
    </div>
  );
}
