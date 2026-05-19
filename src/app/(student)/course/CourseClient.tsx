'use client';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import type { Topic } from '@/types';

interface Props {
  topics: (Topic & { lessons: { id: string; title_he: string; title_en: string; order_index: number }[] })[];
  progress: { lesson_id: string }[];
  scores: { assessment_type: string; reference_id: string | null; score: number; max_score: number }[];
}

export default function CourseClient({ topics, progress, scores }: Props) {
  const { lang } = useLang();
  const completedIds = new Set(progress.map(p => p.lesson_id));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{tr('myCourse', lang)}</h1>
      {topics.length === 0 && <p className="text-gray-400">{tr('noTopics', lang)}</p>}
      {topics.map((topic, ti) => {
        const topicLessons = [...(topic.lessons ?? [])].sort((a, b) => a.order_index - b.order_index);
        const topicDone = topicLessons.length > 0 && topicLessons.every(l => completedIds.has(l.id));
        const testScore = scores.find(s => s.assessment_type === 'test' && s.reference_id === topic.id);
        return (
          <div key={topic.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-l from-blue-600 to-indigo-600 px-6 py-4 text-white flex items-center justify-between">
              <div>
                <span className="text-xs opacity-70">{tr('topics', lang)} {ti + 1}</span>
                <h2 className="text-lg font-bold">{lang === 'he' ? topic.title_he : topic.title_en}</h2>
              </div>
              {topicDone && (
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">{tr('completed', lang)}</span>
              )}
            </div>
            <div className="p-4 space-y-2">
              {topicLessons.length === 0 && <p className="text-gray-400 text-sm">{tr('noLessons', lang)}</p>}
              {topicLessons.map((lesson, li) => {
                const done = completedIds.has(lesson.id);
                return (
                  <Link key={lesson.id} href={`/lesson/${lesson.id}`}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors border ${done ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300'}`}>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {done ? '✓' : li + 1}
                    </span>
                    <span className="flex-1 font-medium text-gray-800">{lang === 'he' ? lesson.title_he : lesson.title_en}</span>
                    {!done && <span className="text-xs text-blue-600">{tr('startLesson', lang)} →</span>}
                  </Link>
                );
              })}
              {topicDone && (
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{tr('topicTest', lang)}</span>
                  {testScore
                    ? <span className="text-sm font-bold text-green-600">{testScore.score}/{testScore.max_score}</span>
                    : <Link href={`/test/${topic.id}`} className="bg-orange-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600">{tr('takeTest', lang)}</Link>
                  }
                </div>
              )}
            </div>
          </div>
        );
      })}
      {topics.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-purple-800">{tr('finalExam', lang)}</h3>
            <p className="text-sm text-purple-600 mt-1">{tr('examTitle', lang)}</p>
          </div>
          <Link href="/exam" className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 font-medium">{tr('startExam', lang)}</Link>
        </div>
      )}
    </div>
  );
}
