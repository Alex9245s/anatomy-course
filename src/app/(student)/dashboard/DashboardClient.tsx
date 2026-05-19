'use client';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';

interface Props {
  userName: string;
  completedLessons: number;
  totalLessons: number;
  completedTopics: number;
  totalTopics: number;
  finalScore: { score: number; max_score: number } | null;
}

export default function DashboardClient({ userName, completedLessons, totalLessons, completedTopics, totalTopics, finalScore }: Props) {
  const { lang } = useLang();
  const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{tr('welcomeBack', lang)}, {userName} 👋</h1>
        <p className="text-gray-500 mt-1">{tr('progress', lang)}: {pct}%</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label={tr('lessonsCompleted', lang)} value={`${completedLessons} / ${totalLessons}`} color="blue" />
        <StatCard label={tr('topicsCompleted', lang)} value={`${completedTopics} / ${totalTopics}`} color="green" />
        <StatCard
          label={tr('examScore', lang)}
          value={finalScore ? `${finalScore.score}/${finalScore.max_score}` : tr('notTaken', lang)}
          color="purple"
        />
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>

      <div className="flex gap-4">
        <Link href="/course"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
          {completedLessons > 0 ? tr('continueLesson', lang) : tr('startLesson', lang)}
        </Link>
        {completedLessons === totalLessons && totalLessons > 0 && !finalScore && (
          <Link href="/exam"
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
            {tr('finalExam', lang)}
          </Link>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };
  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <p className="text-sm opacity-70">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
