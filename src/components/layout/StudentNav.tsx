'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';

export default function StudentNav({ userId, userEmail }: { userId: string; userEmail: string }) {
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
    { href: '/dashboard', label: tr('dashboard', lang) },
    { href: '/scores',    label: tr('myScores', lang) },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold text-blue-700">📚 {tr('appName', lang)}</span>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`text-sm font-medium transition-colors ${pathname.startsWith(l.href) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
            className="text-xs text-gray-500 hover:text-blue-600 border border-gray-300 rounded px-2 py-1">
            {lang === 'he' ? 'EN' : 'HE'}
          </button>
          <span className="text-xs text-gray-400 hidden sm:block">{userEmail}</span>
          {userEmail?.toLowerCase() === 'dribbens91@gmail.com' && (
            <Link href="/admin"
              className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 font-medium">
              🛡️ Admin
            </Link>
          )}
          <button onClick={logout} className="text-sm text-red-500 hover:text-red-700">{tr('logout', lang)}</button>
        </div>
      </div>
    </nav>
  );
}
