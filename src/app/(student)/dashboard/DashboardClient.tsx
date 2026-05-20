'use client';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import type { Course } from '@/types';

type CourseWithTopics = Course & {
  topics: { id: string; lessons: { id: string }[] }[];
};

interface Props {
  userName: string;
  courses: CourseWithTopics[];
  completedLessonIds: string[];
}

const colorMap: Record<string, { bg: string; border: string; btn: string; badge: string }> = {
  blue:   { bg: 'from-blue-600 to-indigo-600',   border: 'border-blue-200',   btn: 'bg-blue-600 hover:bg-blue-700',   badge: 'bg-blue-100 text-blue-700' },
  green:  { bg: 'from-green-600 to-teal-600',    border: 'border-green-200',  btn: 'bg-green-600 hover:bg-green-700', badge: 'bg-green-100 text-green-700' },
  purple: { bg: 'from-purple-600 to-violet-600', border: 'border-purple-200', btn: 'bg-purple-600 hover:bg-purple-700', badge: 'bg-purple-100 text-purple-700' },
  orange: { bg: 'from-orange-500 to-red-500',    border: 'border-orange-200', btn: 'bg-orange-500 hover:bg-orange-600', badge: 'bg-orange-100 text-orange-700' },
};

export default function DashboardClient({ userName, courses, completedLessonIds }: Props) {
  const { lang } = useLang();
  const completedSet = new Set(completedLessonIds);

  // Only show courses that have at least one lesson
  const activeCourses = courses.filter(
    course => (course.topics ?? []).flatMap(t => t.lessons ?? []).length > 0
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{tr('welcomeBack', lang)}, {userName} 👋</h1>
        <p className="text-gray-500 mt-1">{tr('courseHub', lang)}</p>
      </div>

      {activeCourses.length === 0 && (
        <p className="text-gray-400">{tr('noCourses', lang)}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeCourses.map(course => {
          const allLessons = (course.topics ?? []).flatMap(t => t.lessons ?? []);
          const total = allLessons.length;
          const done = allLessons.filter(l => l && completedSet.has(l.id)).length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          const c = colorMap[course.color] ?? colorMap.blue;

          return (
            <div key={course.id} className={`bg-white rounded-2xl border ${c.border} shadow-sm overflow-hidden flex flex-col`}>
              <div className={`bg-gradient-to-l ${c.bg} px-6 py-5 text-white`}>
                <div className="text-4xl mb-2">{course.icon}</div>
                <h2 className="text-xl font-bold">{lang === 'he' ? course.title_he : course.title_en}</h2>
                <p className="text-sm opacity-80 mt-1">
                  {lang === 'he' ? course.description_he : course.description_en}
                </p>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{lang === 'he' ? 'התקדמות' : 'Progress'}</span>
                    <span>{done}/{total} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-l ${c.bg} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <Link
                  href={`/course?courseId=${course.id}`}
                  className={`${c.btn} text-white text-center py-2 px-4 rounded-xl font-medium transition-colors text-sm`}
                >
                  {pct > 0 ? tr('continueLesson', lang) : tr('enterCourse', lang)} ←
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
