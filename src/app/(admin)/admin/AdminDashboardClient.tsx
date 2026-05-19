'use client';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';

export default function AdminDashboardClient({ students, topics, lessons }: { students: number; topics: number; lessons: number }) {
  const { lang } = useLang();
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">{tr('adminPanel', lang)}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label={tr('totalStudents', lang)} value={students} color="blue" />
        <Stat label={tr('totalTopics', lang)} value={topics} color="green" />
        <Stat label={tr('totalLessons', lang)} value={lessons} color="purple" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <QuickLink href="/admin/topics" icon="📚" title={tr('topics', lang)} desc={lang === 'he' ? 'נהל נושאים ושיעורים' : 'Manage topics & lessons'} />
        <QuickLink href="/admin/students" icon="👥" title={tr('students', lang)} desc={lang === 'he' ? 'צפה בציוני תלמידים' : 'View student scores'} />
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  const c: Record<string,string> = { blue:'bg-blue-50 border-blue-200 text-blue-700', green:'bg-green-50 border-green-200 text-green-700', purple:'bg-purple-50 border-purple-200 text-purple-700' };
  return (
    <div className={`rounded-xl border p-5 ${c[color]}`}>
      <p className="text-sm opacity-70">{label}</p>
      <p className="text-4xl font-black mt-1">{value}</p>
    </div>
  );
}

function QuickLink({ href, icon, title, desc }: { href: string; icon: string; title: string; desc: string }) {
  return (
    <Link href={href} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-sm transition-all flex items-start gap-4">
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="font-bold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
      </div>
    </Link>
  );
}
