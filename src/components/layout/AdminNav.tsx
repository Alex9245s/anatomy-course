'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';

export default function AdminNav({ userEmail }: { userEmail: string }) {
  const { lang, setLang } = useLang();
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  const links = [
    { href: '/admin', label: tr('adminPanel', lang) },
    { href: '/admin/topics', label: tr('topics', lang) },
    { href: '/admin/students', label: tr('students', lang) },
  ];

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="font-bold text-yellow-400">🔧 Admin</span>
        {links.map(l => (
          <Link key={l.href} href={l.href}
            className={`text-sm transition-colors ${pathname === l.href ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}`}>
            {l.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
          className="text-xs text-gray-400 hover:text-white border border-gray-600 rounded px-2 py-1">
          {lang === 'he' ? 'EN' : 'HE'}
        </button>
        <Link href="/dashboard" className="text-xs text-gray-400 hover:text-white">← {tr('myCourse', lang)}</Link>
        <button onClick={logout} className="text-sm text-red-400 hover:text-red-300">{tr('logout', lang)}</button>
      </div>
    </nav>
  );
}
