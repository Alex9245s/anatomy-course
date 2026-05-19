'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';

export default function RegisterPage() {
  const { lang, setLang } = useLang();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { data, error: err } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } },
    });
    if (err) {
      const dbSignupError = 'Database error saving new user';
      if (err.message?.includes(dbSignupError)) {
        setError(
          lang === 'he'
            ? 'שגיאת מסד נתונים בהרשמה. צריך לעדכן את הגדרת ה-Trigger ב-Supabase (ראה README/מיגרציה).'
            : 'Database signup configuration error. Please update the Supabase trigger setup (see README/migration).'
        );
      } else {
        setError(err.message);
      }
      setLoading(false);
      return;
    }
    router.push(data.session ? '/dashboard' : '/login?message=check-email');
    router.refresh();
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📚 {tr('appName', lang)}</h1>
          <p className="text-gray-500 text-sm mt-1">{tr('register', lang)}</p>
        </div>
        <button onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
          className="text-sm text-blue-600 hover:underline">
          {lang === 'he' ? 'English' : 'עברית'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tr('fullName', lang)}</label>
          <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tr('email', lang)}</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="ltr" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tr('password', lang)}</label>
          <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="ltr" />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {loading ? tr('loading', lang) : tr('register', lang)}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        {tr('haveAccount', lang)}{' '}
        <Link href="/login" className="text-blue-600 hover:underline">{tr('login', lang)}</Link>
      </p>
    </div>
  );
}
