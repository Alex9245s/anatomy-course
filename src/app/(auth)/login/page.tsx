'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';

export default function LoginPage() {
  const { lang, setLang } = useLang();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [safeNextPath, setSafeNextPath] = useState('/dashboard');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const messageParam = params.get('message');
    const nextPathParam = params.get('next');
    const safePath = nextPathParam && nextPathParam.startsWith('/') && !nextPathParam.startsWith('//')
      ? nextPathParam
      : '/dashboard';

    setMessage(messageParam);
    setSafeNextPath(safePath);
  }, []);

  const infoMessage = message === 'check-email'
    ? (lang === 'he' ? 'נרשמת בהצלחה. בדוק את האימייל לאישור החשבון ואז התחבר.' : 'Sign-up successful. Check your email to confirm your account, then sign in.')
    : message === 'auth-error'
      ? (lang === 'he' ? 'ההתחברות נכשלה. נסה שוב.' : 'Authentication failed. Please try again.')
      : message === 'auth-missing-code'
        ? (lang === 'he' ? 'חסר קוד אימות. נסה להתחבר מחדש.' : 'Missing authentication code. Please sign in again.')
        : '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); return; }
    router.push(safeNextPath);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📚 {tr('appName', lang)}</h1>
          <p className="text-gray-500 text-sm mt-1">{tr('login', lang)}</p>
        </div>
        <button onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
          className="text-sm text-blue-600 hover:underline">
          {lang === 'he' ? 'English' : 'עברית'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {infoMessage && <p className="text-emerald-700 text-sm bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">{infoMessage}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tr('email', lang)}</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="ltr" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tr('password', lang)}</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="ltr" />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {loading ? tr('loading', lang) : tr('login', lang)}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        {tr('noAccount', lang)}{' '}
        <Link href="/register" className="text-blue-600 hover:underline">{tr('register', lang)}</Link>
      </p>
    </div>
  );
}
