'use client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import type { Profile, StudentScore, StudentProgress } from '@/types';

export default function StudentsClient({ profiles, scores, progress }: { profiles: Profile[]; scores: StudentScore[]; progress: StudentProgress[] }) {
  const { lang } = useLang();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{tr('students', lang)}</h1>
      {profiles.length === 0 && <p className="text-gray-400">{tr('noStudents', lang)}</p>}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-right px-4 py-3 font-medium text-gray-600">{tr('studentName', lang)}</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">{tr('email', lang)}</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600">{tr('lessonsCompleted', lang)}</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600">{tr('examScore', lang)}</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">{tr('joinedAt', lang)}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {profiles.map(p => {
              const userProgress = progress.filter(x => x.user_id === p.id);
              const finalScore = scores.find(s => s.user_id === p.id && s.assessment_type === 'final');
              return (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{p.full_name}</td>
                  <td className="px-4 py-3 text-gray-500" dir="ltr">{(p as any).email ?? '—'}</td>
                  <td className="px-4 py-3 text-center">{userProgress.length}</td>
                  <td className="px-4 py-3 text-center">
                    {finalScore ? <span className="font-bold text-blue-600">{finalScore.score}/{finalScore.max_score}</span> : <span className="text-gray-400">{tr('notTaken', lang)}</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{new Date(p.created_at).toLocaleDateString(lang==='he'?'he-IL':'en-US')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
