'use client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import type { StudentScore } from '@/types';

export default function ScoresClient({ scores }: { scores: StudentScore[] }) {
  const { lang } = useLang();
  const typeLabel: Record<string, string> = {
    quiz:  lang === 'he' ? 'חידון' : 'Quiz',
    test:  lang === 'he' ? 'בחן נושא' : 'Topic Test',
    final: lang === 'he' ? 'מבחן מסכם' : 'Final Exam',
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">{tr('myScores', lang)}</h1>
      {scores.length === 0 && <p className="text-gray-400">{tr('noTopics', lang)}</p>}
      {scores.map(s => {
        const pct = Math.round((s.score / s.max_score) * 100);
        return (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">{typeLabel[s.assessment_type]}</p>
              <p className="text-xs text-gray-400 mt-0.5">{new Date(s.completed_at).toLocaleDateString(lang === 'he' ? 'he-IL' : 'en-US')}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{s.score}/{s.max_score}</p>
              <p className={`text-sm font-medium ${pct >= 60 ? 'text-green-600' : 'text-red-500'}`}>{pct}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
