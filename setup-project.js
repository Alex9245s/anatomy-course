// Run this with: node setup-project.js
const fs = require('fs');
const path = require('path');

const base = __dirname;

function mkdir(rel) {
  fs.mkdirSync(path.join(base, rel), { recursive: true });
}

function write(rel, content) {
  const full = path.join(base, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  console.log('✓', rel);
}

// ─── Types ────────────────────────────────────────────────────────────────────
write('src/types/index.ts', `export type Lang = 'he' | 'en';

export interface Profile {
  id: string;
  full_name: string;
  role: 'student' | 'admin';
  created_at: string;
}

export interface Topic {
  id: string;
  title_he: string;
  title_en: string;
  description_he: string | null;
  description_en: string | null;
  order_index: number;
  created_at: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  topic_id: string;
  title_he: string;
  title_en: string;
  content_he: string | null;
  content_en: string | null;
  order_index: number;
  created_at: string;
  images?: LessonImage[];
}

export interface LessonImage {
  id: string;
  lesson_id: string;
  image_url: string;
  caption_he: string | null;
  caption_en: string | null;
  order_index: number;
}

export interface Question {
  id: string;
  lesson_id: string | null;
  topic_id: string | null;
  type: 'quiz' | 'test' | 'final';
  question_he: string;
  question_en: string;
  options_he: string[];
  options_en: string[];
  correct_index: number;
  explanation_he: string | null;
  explanation_en: string | null;
  order_index: number;
}

export interface StudentProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed_at: string;
}

export interface StudentScore {
  id: string;
  user_id: string;
  assessment_type: 'quiz' | 'test' | 'final';
  reference_id: string | null;
  score: number;
  max_score: number;
  completed_at: string;
}
`);

// ─── i18n ─────────────────────────────────────────────────────────────────────
write('src/lib/i18n.ts', `export type Lang = 'he' | 'en';

const t = {
  appName:         { he: 'קורס אנטומיה',              en: 'Anatomy Course' },
  appTagline:      { he: 'לומדים אנטומיה בקלות',       en: 'Learn anatomy with ease' },
  login:           { he: 'התחברות',                   en: 'Login' },
  register:        { he: 'הרשמה',                     en: 'Register' },
  logout:          { he: 'התנתק',                     en: 'Logout' },
  email:           { he: 'אימייל',                    en: 'Email' },
  password:        { he: 'סיסמה',                     en: 'Password' },
  fullName:        { he: 'שם מלא',                    en: 'Full Name' },
  confirmPassword: { he: 'אשר סיסמה',                 en: 'Confirm Password' },
  noAccount:       { he: 'אין לך חשבון?',              en: "Don't have an account?" },
  haveAccount:     { he: 'יש לך חשבון?',               en: 'Already have an account?' },
  dashboard:       { he: 'לוח בקרה',                  en: 'Dashboard' },
  myCourse:        { he: 'הקורס שלי',                  en: 'My Course' },
  myScores:        { he: 'הציונים שלי',                en: 'My Scores' },
  topics:          { he: 'נושאים',                    en: 'Topics' },
  lessons:         { he: 'שיעורים',                   en: 'Lessons' },
  questions:       { he: 'שאלות',                     en: 'Questions' },
  images:          { he: 'תמונות',                    en: 'Images' },
  students:        { he: 'תלמידים',                   en: 'Students' },
  addTopic:        { he: 'הוסף נושא',                 en: 'Add Topic' },
  addLesson:       { he: 'הוסף שיעור',                en: 'Add Lesson' },
  addQuestion:     { he: 'הוסף שאלה',                 en: 'Add Question' },
  uploadImage:     { he: 'העלה תמונה',                en: 'Upload Image' },
  save:            { he: 'שמור',                      en: 'Save' },
  cancel:          { he: 'ביטול',                     en: 'Cancel' },
  delete:          { he: 'מחק',                       en: 'Delete' },
  edit:            { he: 'ערוך',                      en: 'Edit' },
  back:            { he: 'חזרה',                      en: 'Back' },
  close:           { he: 'סגור',                      en: 'Close' },
  titleHe:         { he: 'כותרת (עברית)',              en: 'Title (Hebrew)' },
  titleEn:         { he: 'כותרת (אנגלית)',             en: 'Title (English)' },
  descHe:          { he: 'תיאור (עברית)',              en: 'Description (Hebrew)' },
  descEn:          { he: 'תיאור (אנגלית)',             en: 'Description (English)' },
  contentHe:       { he: 'תוכן (עברית)',               en: 'Content (Hebrew)' },
  contentEn:       { he: 'תוכן (אנגלית)',              en: 'Content (English)' },
  captionHe:       { he: 'כיתוב (עברית)',              en: 'Caption (Hebrew)' },
  captionEn:       { he: 'כיתוב (אנגלית)',             en: 'Caption (English)' },
  order:           { he: 'סדר',                       en: 'Order' },
  startLesson:     { he: 'התחל שיעור',                en: 'Start Lesson' },
  continueLesson:  { he: 'המשך',                      en: 'Continue' },
  completed:       { he: 'הושלם ✓',                   en: 'Completed ✓' },
  locked:          { he: 'נעול',                      en: 'Locked' },
  takeQuiz:        { he: 'עשה חידון',                 en: 'Take Quiz' },
  takeTest:        { he: 'עשה בחן',                   en: 'Take Test' },
  finalExam:       { he: 'מבחן מסכם',                 en: 'Final Exam' },
  startExam:       { he: 'התחל מבחן',                 en: 'Start Exam' },
  question:        { he: 'שאלה',                      en: 'Question' },
  of:              { he: 'מתוך',                      en: 'of' },
  submit:          { he: 'הגש',                       en: 'Submit' },
  next:            { he: 'הבא',                       en: 'Next' },
  prev:            { he: 'הקודם',                     en: 'Previous' },
  finish:          { he: 'סיים',                      en: 'Finish' },
  correct:         { he: '✓ נכון!',                   en: '✓ Correct!' },
  incorrect:       { he: '✗ לא נכון',                 en: '✗ Incorrect' },
  explanation:     { he: 'הסבר:',                     en: 'Explanation:' },
  yourScore:       { he: 'הציון שלך',                 en: 'Your Score' },
  passed:          { he: '🎉 עברת!',                  en: '🎉 Passed!' },
  failed:          { he: 'לא עברת — נסה שוב',          en: 'Failed — Try again' },
  tryAgain:        { he: 'נסה שוב',                   en: 'Try Again' },
  viewCourse:      { he: 'חזרה לקורס',                en: 'Back to Course' },
  quizTitle:       { he: 'חידון',                     en: 'Quiz' },
  testTitle:       { he: 'בחן נושא',                  en: 'Topic Test' },
  examTitle:       { he: 'מבחן מסכם',                 en: 'Final Exam' },
  progress:        { he: 'התקדמות',                   en: 'Progress' },
  score:           { he: 'ציון',                      en: 'Score' },
  lessonsCompleted:{ he: 'שיעורים שהושלמו',            en: 'Lessons Completed' },
  topicsCompleted: { he: 'נושאים שהושלמו',             en: 'Topics Completed' },
  examScore:       { he: 'ציון מבחן מסכם',             en: 'Final Exam Score' },
  noTopics:        { he: 'אין נושאים עדיין',            en: 'No topics yet' },
  noLessons:       { he: 'אין שיעורים עדיין',           en: 'No lessons yet' },
  noQuestions:     { he: 'אין שאלות עדיין',             en: 'No questions yet' },
  noStudents:      { he: 'אין תלמידים עדיין',           en: 'No students yet' },
  loading:         { he: 'טוען...',                   en: 'Loading...' },
  error:           { he: 'שגיאה',                     en: 'Error' },
  success:         { he: 'נשמר בהצלחה',               en: 'Saved successfully' },
  saving:          { he: 'שומר...',                   en: 'Saving...' },
  uploading:       { he: 'מעלה...',                   en: 'Uploading...' },
  deleteConfirm:   { he: 'האם למחוק? פעולה זו אינה ניתנת לביטול.', en: 'Are you sure? This cannot be undone.' },
  deleteSuccess:   { he: 'נמחק בהצלחה',               en: 'Deleted successfully' },
  noImages:        { he: 'אין תמונות עדיין',            en: 'No images yet' },
  dragOrClick:     { he: 'גרור קובץ או לחץ להעלאה',    en: 'Drag file or click to upload' },
  allTopics:       { he: 'כל הנושאים',                 en: 'All Topics' },
  backToCourse:    { he: 'חזרה לקורס',                en: 'Back to Course' },
  backToDashboard: { he: 'חזרה ללוח',                 en: 'Back to Dashboard' },
  backToTopic:     { he: 'חזרה לנושא',                en: 'Back to Topic' },
  adminPanel:      { he: 'פאנל ניהול',                en: 'Admin Panel' },
  totalStudents:   { he: 'סה"כ תלמידים',               en: 'Total Students' },
  totalTopics:     { he: 'סה"כ נושאים',                en: 'Total Topics' },
  totalLessons:    { he: 'סה"כ שיעורים',               en: 'Total Lessons' },
  notTaken:        { he: 'לא נבחן',                   en: 'Not taken' },
  welcomeBack:     { he: 'ברוך שובך',                 en: 'Welcome back' },
  optionIndex:     { he: 'אפשרות',                    en: 'Option' },
  correctAnswer:   { he: 'תשובה נכונה (מספר)',         en: 'Correct answer (index)' },
  questionType:    { he: 'סוג שאלה',                  en: 'Question type' },
  quizType:        { he: 'חידון (אחרי שיעור)',         en: 'Quiz (after lesson)' },
  testType:        { he: 'בחן (נושא)',                 en: 'Test (topic)' },
  finalType:       { he: 'מבחן מסכם',                 en: 'Final exam' },
  studentName:     { he: 'שם תלמיד',                  en: 'Student Name' },
  joinedAt:        { he: 'הצטרף',                     en: 'Joined' },
  switchToEn:      { he: 'English',                   en: 'English' },
  switchToHe:      { he: 'עברית',                     en: 'עברית' },
  lessonImages:    { he: 'תמונות השיעור',               en: 'Lesson Images' },
  topicTest:       { he: 'בחן נושא',                  en: 'Topic Test' },
  lessonQuiz:      { he: 'חידון שיעור',               en: 'Lesson Quiz' },
  manage:          { he: 'ניהול',                     en: 'Admin' },
};

export function tr(key: keyof typeof t, lang: Lang): string {
  return t[key]?.[lang] ?? key;
}

export default t;
`);

// ─── Supabase clients ─────────────────────────────────────────────────────────
write('src/lib/supabase/client.ts', `import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
`);

write('src/lib/supabase/server.ts', `import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
`);

// ─── Lang context ─────────────────────────────────────────────────────────────
write('src/contexts/LangContext.tsx', `'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import type { Lang } from '@/types';

interface LangContextType { lang: Lang; setLang: (l: Lang) => void; }
const LangContext = createContext<LangContextType>({ lang: 'he', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('he');
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() { return useContext(LangContext); }
`);

// ─── Root layout ──────────────────────────────────────────────────────────────
write('src/app/layout.tsx', `import type { Metadata } from 'next';
import './globals.css';
import { LangProvider } from '@/contexts/LangContext';

export const metadata: Metadata = {
  title: 'קורס אנטומיה',
  description: 'לומדים אנטומיה בקלות',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
`);

// ─── Global CSS ───────────────────────────────────────────────────────────────
write('src/app/globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-sans: system-ui, 'Segoe UI', sans-serif;
}

body {
  font-family: var(--font-sans);
  background: #f8fafc;
  color: #0f172a;
}

[dir="rtl"] { direction: rtl; }
[dir="ltr"] { direction: ltr; }
`);

// ─── Root page (redirect) ─────────────────────────────────────────────────────
write('src/app/page.tsx', `import { redirect } from 'next/navigation';
export default function Root() { redirect('/dashboard'); }
`);

// ─── Auth callback ────────────────────────────────────────────────────────────
write('src/app/auth/callback/route.ts', `import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(\`\${origin}/dashboard\`);
}
`);

// ─── Auth layout ──────────────────────────────────────────────────────────────
write('src/app/(auth)/layout.tsx', `export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {children}
    </div>
  );
}
`);

// ─── Login page ───────────────────────────────────────────────────────────────
write('src/app/(auth)/login/page.tsx', `'use client';
import { useState } from 'react';
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); return; }
    router.push('/dashboard');
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
`);

// ─── Register page ────────────────────────────────────────────────────────────
write('src/app/(auth)/register/page.tsx', `'use client';
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
    const { error: err } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } },
    });
    if (err) { setError(err.message); setLoading(false); return; }
    router.push('/dashboard');
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
`);

// ─── Student layout ───────────────────────────────────────────────────────────
write('src/app/(student)/layout.tsx', `import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import StudentNav from '@/components/layout/StudentNav';

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNav userId={user.id} userEmail={user.email ?? ''} />
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
`);

// ─── Student nav ──────────────────────────────────────────────────────────────
write('src/components/layout/StudentNav.tsx', `'use client';
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
    { href: '/course',    label: tr('myCourse', lang) },
    { href: '/scores',    label: tr('myScores', lang) },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold text-blue-700">📚 {tr('appName', lang)}</span>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={\`text-sm font-medium transition-colors \${pathname.startsWith(l.href) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}\`}>
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
          <button onClick={logout} className="text-sm text-red-500 hover:text-red-700">{tr('logout', lang)}</button>
        </div>
      </div>
    </nav>
  );
}
`);

// ─── Dashboard ────────────────────────────────────────────────────────────────
write('src/app/(student)/dashboard/page.tsx', `import { createClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: topics }, { data: progress }, { data: scores }, { data: profile }] = await Promise.all([
    supabase.from('topics').select('id, title_he, title_en, lessons(id)').order('order_index'),
    supabase.from('student_progress').select('lesson_id').eq('user_id', user!.id),
    supabase.from('student_scores').select('*').eq('user_id', user!.id),
    supabase.from('profiles').select('full_name').eq('id', user!.id).single(),
  ]);

  const completedLessons = progress?.length ?? 0;
  const totalLessons = topics?.reduce((s, t) => s + (t.lessons?.length ?? 0), 0) ?? 0;
  const completedTopics = topics?.filter(t =>
    (t.lessons as {id:string}[] ?? []).every(l => progress?.some(p => p.lesson_id === l.id))
  ).length ?? 0;
  const finalScore = scores?.find(s => s.assessment_type === 'final');

  return (
    <DashboardClient
      userName={profile?.full_name ?? user!.email ?? ''}
      completedLessons={completedLessons}
      totalLessons={totalLessons}
      completedTopics={completedTopics}
      totalTopics={topics?.length ?? 0}
      finalScore={finalScore ?? null}
    />
  );
}
`);

write('src/app/(student)/dashboard/DashboardClient.tsx', `'use client';
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
        <StatCard label={tr('lessonsCompleted', lang)} value={\`\${completedLessons} / \${totalLessons}\`} color="blue" />
        <StatCard label={tr('topicsCompleted', lang)} value={\`\${completedTopics} / \${totalTopics}\`} color="green" />
        <StatCard
          label={tr('examScore', lang)}
          value={finalScore ? \`\${finalScore.score}/\${finalScore.max_score}\` : tr('notTaken', lang)}
          color="purple"
        />
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: \`\${pct}%\` }} />
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
    <div className={\`rounded-xl border p-4 \${colors[color]}\`}>
      <p className="text-sm opacity-70">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
`);

// ─── Course page ──────────────────────────────────────────────────────────────
write('src/app/(student)/course/page.tsx', `import { createClient } from '@/lib/supabase/server';
import CourseClient from './CourseClient';

export default async function CoursePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: topics }, { data: progress }, { data: scores }] = await Promise.all([
    supabase.from('topics').select('*, lessons(id, title_he, title_en, order_index)').order('order_index'),
    supabase.from('student_progress').select('lesson_id').eq('user_id', user!.id),
    supabase.from('student_scores').select('assessment_type, reference_id, score, max_score').eq('user_id', user!.id),
  ]);

  return <CourseClient topics={topics ?? []} progress={progress ?? []} scores={scores ?? []} />;
}
`);

write('src/app/(student)/course/CourseClient.tsx', `'use client';
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
                  <Link key={lesson.id} href={\`/lesson/\${lesson.id}\`}
                    className={\`flex items-center gap-3 p-3 rounded-xl transition-colors border \${done ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300'}\`}>
                    <span className={\`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold \${done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}\`}>
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
                    : <Link href={\`/test/\${topic.id}\`} className="bg-orange-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600">{tr('takeTest', lang)}</Link>
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
`);

// ─── Lesson page ──────────────────────────────────────────────────────────────
write('src/app/(student)/lesson/[id]/page.tsx', `import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import LessonClient from './LessonClient';

export default async function LessonPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: lesson }, { data: images }, { data: questions }, { data: progress }] = await Promise.all([
    supabase.from('lessons').select('*, topics(title_he, title_en)').eq('id', params.id).single(),
    supabase.from('lesson_images').select('*').eq('lesson_id', params.id).order('order_index'),
    supabase.from('questions').select('*').eq('lesson_id', params.id).eq('type', 'quiz').order('order_index'),
    supabase.from('student_progress').select('id').eq('user_id', user!.id).eq('lesson_id', params.id).maybeSingle(),
  ]);

  if (!lesson) notFound();
  return <LessonClient lesson={lesson} images={images ?? []} questions={questions ?? []} isCompleted={!!progress} userId={user!.id} />;
}
`);

write('src/app/(student)/lesson/[id]/LessonClient.tsx', `'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import type { LessonImage, Question } from '@/types';

interface Props {
  lesson: { id: string; title_he: string; title_en: string; content_he: string | null; content_en: string | null; topics: { title_he: string; title_en: string } | null };
  images: LessonImage[];
  questions: Question[];
  isCompleted: boolean;
  userId: string;
}

export default function LessonClient({ lesson, images, questions, isCompleted, userId }: Props) {
  const { lang } = useLang();
  const router = useRouter();
  const [imgIndex, setImgIndex] = useState(0);
  const [completed, setCompleted] = useState(isCompleted);
  const [saving, setSaving] = useState(false);

  async function markComplete() {
    if (completed) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from('student_progress').upsert({ user_id: userId, lesson_id: lesson.id });
    setCompleted(true);
    setSaving(false);
  }

  const title = lang === 'he' ? lesson.title_he : lesson.title_en;
  const content = lang === 'he' ? lesson.content_he : lesson.content_en;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/course" className="text-gray-400 hover:text-blue-600">←</Link>
        <div>
          <p className="text-xs text-gray-400">{lesson.topics ? (lang === 'he' ? lesson.topics.title_he : lesson.topics.title_en) : ''}</p>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
      </div>

      {images.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="relative bg-gray-100 h-72">
            <Image src={images[imgIndex].image_url} alt={lang === 'he' ? (images[imgIndex].caption_he ?? '') : (images[imgIndex].caption_en ?? '')}
              fill className="object-contain" />
          </div>
          {images[imgIndex].caption_he && (
            <p className="text-center text-sm text-gray-500 py-2">
              {lang === 'he' ? images[imgIndex].caption_he : images[imgIndex].caption_en}
            </p>
          )}
          {images.length > 1 && (
            <div className="flex justify-center gap-2 pb-3">
              {images.map((_, i) => (
                <button key={i} onClick={() => setImgIndex(i)}
                  className={\`w-2.5 h-2.5 rounded-full transition-colors \${i === imgIndex ? 'bg-blue-600' : 'bg-gray-300'}\`} />
              ))}
            </div>
          )}
        </div>
      )}

      {content && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 prose prose-blue max-w-none">
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{content}</p>
        </div>
      )}

      <div className="flex gap-4 items-center">
        {!completed ? (
          <button onClick={markComplete} disabled={saving}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50">
            {saving ? tr('saving', lang) : tr('completed', lang)}
          </button>
        ) : (
          <span className="bg-green-100 text-green-700 px-6 py-3 rounded-xl font-medium border border-green-300">
            {tr('completed', lang)}
          </span>
        )}
        {completed && questions.length > 0 && (
          <Link href={\`/quiz/\${lesson.id}\`}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700">
            {tr('takeQuiz', lang)} →
          </Link>
        )}
      </div>
    </div>
  );
}
`);

// ─── Quiz page ────────────────────────────────────────────────────────────────
write('src/app/(student)/quiz/[id]/page.tsx', `import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AssessmentClient from '@/components/assessment/AssessmentClient';

export default async function QuizPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const [{ data: questions }, { data: lesson }] = await Promise.all([
    supabase.from('questions').select('*').eq('lesson_id', params.id).eq('type', 'quiz').order('order_index'),
    supabase.from('lessons').select('title_he, title_en').eq('id', params.id).single(),
  ]);
  if (!lesson) notFound();
  return (
    <AssessmentClient
      questions={questions ?? []}
      title_he={'חידון: ' + lesson.title_he}
      title_en={'Quiz: ' + lesson.title_en}
      type="quiz"
      referenceId={params.id}
      userId={user!.id}
      backHref={\`/lesson/\${params.id}\`}
    />
  );
}
`);

// ─── Topic test page ──────────────────────────────────────────────────────────
write('src/app/(student)/test/[topicId]/page.tsx', `import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AssessmentClient from '@/components/assessment/AssessmentClient';

export default async function TestPage({ params }: { params: { topicId: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const [{ data: questions }, { data: topic }] = await Promise.all([
    supabase.from('questions').select('*').eq('topic_id', params.topicId).eq('type', 'test').order('order_index'),
    supabase.from('topics').select('title_he, title_en').eq('id', params.topicId).single(),
  ]);
  if (!topic) notFound();
  return (
    <AssessmentClient
      questions={questions ?? []}
      title_he={'בחן נושא: ' + topic.title_he}
      title_en={'Topic Test: ' + topic.title_en}
      type="test"
      referenceId={params.topicId}
      userId={user!.id}
      backHref="/course"
      passingPct={60}
    />
  );
}
`);

// ─── Final exam page ──────────────────────────────────────────────────────────
write('src/app/(student)/exam/page.tsx', `import { createClient } from '@/lib/supabase/server';
import AssessmentClient from '@/components/assessment/AssessmentClient';

export default async function ExamPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: questions } = await supabase.from('questions').select('*').eq('type', 'final').order('order_index');
  return (
    <AssessmentClient
      questions={questions ?? []}
      title_he="מבחן מסכם"
      title_en="Final Exam"
      type="final"
      referenceId={null}
      userId={user!.id}
      backHref="/course"
      passingPct={70}
    />
  );
}
`);

// ─── Scores page ──────────────────────────────────────────────────────────────
write('src/app/(student)/scores/page.tsx', `import { createClient } from '@/lib/supabase/server';
import ScoresClient from './ScoresClient';

export default async function ScoresPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: scores } = await supabase.from('student_scores').select('*').eq('user_id', user!.id).order('completed_at', { ascending: false });
  return <ScoresClient scores={scores ?? []} />;
}
`);

write('src/app/(student)/scores/ScoresClient.tsx', `'use client';
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
              <p className={\`text-sm font-medium \${pct >= 60 ? 'text-green-600' : 'text-red-500'}\`}>{pct}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
`);

// ─── Assessment component ─────────────────────────────────────────────────────
write('src/components/assessment/AssessmentClient.tsx', `'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import type { Question } from '@/types';

interface Props {
  questions: Question[];
  title_he: string;
  title_en: string;
  type: 'quiz' | 'test' | 'final';
  referenceId: string | null;
  userId: string;
  backHref: string;
  passingPct?: number;
}

export default function AssessmentClient({ questions, title_he, title_en, type, referenceId, userId, backHref, passingPct = 50 }: Props) {
  const { lang } = useLang();
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const title = lang === 'he' ? title_he : title_en;

  if (questions.length === 0) return (
    <div className="text-center py-20 space-y-4">
      <p className="text-5xl">📭</p>
      <p className="text-gray-500">{tr('noQuestions', lang)}</p>
      <Link href={backHref} className="text-blue-600 hover:underline">{tr('back', lang)}</Link>
    </div>
  );

  async function handleSubmit() {
    setSaving(true);
    const score = answers.filter((a, i) => a === questions[i].correct_index).length;
    const supabase = createClient();
    await supabase.from('student_scores').upsert({
      user_id: userId,
      assessment_type: type,
      reference_id: referenceId,
      score,
      max_score: questions.length,
    });
    setSubmitted(true);
    setSaving(false);
  }

  if (submitted) {
    const score = answers.filter((a, i) => a === questions[i].correct_index).length;
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= passingPct;
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-12">
        <p className="text-6xl">{passed ? '🎉' : '😕'}</p>
        <h2 className="text-2xl font-bold text-gray-900">{passed ? tr('passed', lang) : tr('failed', lang)}</h2>
        <p className="text-5xl font-black text-blue-600">{score}/{questions.length}</p>
        <p className="text-gray-500">{pct}%</p>
        <div className="flex justify-center gap-4">
          {!passed && (
            <button onClick={() => { setAnswers(Array(questions.length).fill(null)); setCurrent(0); setSubmitted(false); }}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600">{tr('tryAgain', lang)}</button>
          )}
          <Link href={backHref} className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200">{tr('back', lang)}</Link>
        </div>
        <div className="text-left space-y-3 mt-8">
          {questions.map((q, i) => {
            const correct = answers[i] === q.correct_index;
            const opts = lang === 'he' ? q.options_he : q.options_en;
            const expl = lang === 'he' ? q.explanation_he : q.explanation_en;
            return (
              <div key={q.id} className={\`rounded-xl border p-4 \${correct ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}\`}>
                <p className="font-medium text-gray-800 text-sm">{lang === 'he' ? q.question_he : q.question_en}</p>
                <p className="text-xs mt-1">
                  <span className={correct ? 'text-green-600' : 'text-red-600'}>{correct ? tr('correct', lang) : tr('incorrect', lang)}</span>
                  {!correct && <span className="text-gray-600"> — {tr('explanation', lang)} {opts[q.correct_index]}</span>}
                </p>
                {expl && <p className="text-xs text-gray-500 mt-1">{expl}</p>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const q = questions[current];
  const opts = lang === 'he' ? q.options_he : q.options_en;
  const allAnswered = answers.every(a => a !== null);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <span className="text-sm text-gray-500">{tr('question', lang)} {current + 1} {tr('of', lang)} {questions.length}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full" style={{ width: \`\${((current + 1) / questions.length) * 100}%\` }} />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <p className="text-lg font-medium text-gray-800">{lang === 'he' ? q.question_he : q.question_en}</p>
        <div className="space-y-2">
          {opts.map((opt, i) => (
            <button key={i} onClick={() => { const a = [...answers]; a[current] = i; setAnswers(a); }}
              className={\`w-full text-right p-3 rounded-xl border transition-colors \${answers[current] === i ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300'}\`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
          className="px-5 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40">
          {tr('prev', lang)}
        </button>
        {current < questions.length - 1 ? (
          <button onClick={() => setCurrent(c => c + 1)} disabled={answers[current] === null}
            className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40">
            {tr('next', lang)}
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={!allAnswered || saving}
            className="px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-40">
            {saving ? tr('saving', lang) : tr('finish', lang)}
          </button>
        )}
      </div>
    </div>
  );
}
`);

// ─── Admin layout ─────────────────────────────────────────────────────────────
write('src/app/(admin)/layout.tsx', `import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminNav from '@/components/layout/AdminNav';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/dashboard');
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav userEmail={user.email ?? ''} />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
`);

write('src/components/layout/AdminNav.tsx', `'use client';
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
            className={\`text-sm transition-colors \${pathname === l.href ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}\`}>
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
`);

// ─── Admin dashboard ──────────────────────────────────────────────────────────
write('src/app/(admin)/admin/page.tsx', `import { createClient } from '@/lib/supabase/server';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminPage() {
  const supabase = await createClient();
  const [{ count: students }, { count: topics }, { count: lessons }] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
    supabase.from('topics').select('*', { count: 'exact', head: true }),
    supabase.from('lessons').select('*', { count: 'exact', head: true }),
  ]);
  return <AdminDashboardClient students={students ?? 0} topics={topics ?? 0} lessons={lessons ?? 0} />;
}
`);

write('src/app/(admin)/admin/AdminDashboardClient.tsx', `'use client';
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
    <div className={\`rounded-xl border p-5 \${c[color]}\`}>
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
`);

// ─── Admin topics page ────────────────────────────────────────────────────────
write('src/app/(admin)/admin/topics/page.tsx', `import { createClient } from '@/lib/supabase/server';
import AdminTopicsClient from './AdminTopicsClient';

export default async function AdminTopicsPage() {
  const supabase = await createClient();
  const { data: topics } = await supabase.from('topics').select('*, lessons(id, title_he, title_en, order_index)').order('order_index');
  return <AdminTopicsClient topics={topics ?? []} />;
}
`);

write('src/app/(admin)/admin/topics/AdminTopicsClient.tsx', `'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import type { Topic } from '@/types';

type TopicWithLessons = Topic & { lessons: { id: string; title_he: string; title_en: string; order_index: number }[] };

export default function AdminTopicsClient({ topics: initial }: { topics: TopicWithLessons[] }) {
  const { lang } = useLang();
  const router = useRouter();
  const [topics, setTopics] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title_he: '', title_en: '', description_he: '', description_en: '', order_index: topics.length + 1 });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function saveTopic(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase.from('topics').insert(form).select().single();
    if (error) { setMsg(error.message); } else { setTopics(t => [...t, { ...data, lessons: [] }]); setShowForm(false); setMsg(tr('success', lang)); setForm({ title_he:'', title_en:'', description_he:'', description_en:'', order_index: topics.length + 2 }); }
    setSaving(false);
  }

  async function deleteTopic(id: string) {
    if (!confirm(tr('deleteConfirm', lang))) return;
    const supabase = createClient();
    await supabase.from('topics').delete().eq('id', id);
    setTopics(t => t.filter(x => x.id !== id));
    setMsg(tr('deleteSuccess', lang));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{tr('topics', lang)}</h1>
        <button onClick={() => setShowForm(v => !v)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ {tr('addTopic', lang)}</button>
      </div>
      {msg && <p className="text-sm text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">{msg}</p>}

      {showForm && (
        <form onSubmit={saveTopic} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-gray-700">{tr('addTopic', lang)}</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField label={tr('titleHe', lang)} value={form.title_he} onChange={v => setForm(f => ({...f, title_he: v}))} required />
            <FormField label={tr('titleEn', lang)} value={form.title_en} onChange={v => setForm(f => ({...f, title_en: v}))} required dir="ltr" />
            <FormField label={tr('descHe', lang)} value={form.description_he} onChange={v => setForm(f => ({...f, description_he: v}))} textarea />
            <FormField label={tr('descEn', lang)} value={form.description_en} onChange={v => setForm(f => ({...f, description_en: v}))} textarea dir="ltr" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">{saving ? tr('saving', lang) : tr('save', lang)}</button>
            <button type="button" onClick={() => setShowForm(false)} className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50">{tr('cancel', lang)}</button>
          </div>
        </form>
      )}

      {topics.length === 0 && <p className="text-gray-400">{tr('noTopics', lang)}</p>}
      {topics.map(topic => (
        <div key={topic.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-200">
            <div>
              <p className="font-bold text-gray-800">{topic.title_he}</p>
              <p className="text-sm text-gray-500">{topic.title_en}</p>
            </div>
            <div className="flex gap-2">
              <Link href={\`/admin/topics/\${topic.id}\`} className="text-sm text-blue-600 border border-blue-300 px-3 py-1 rounded-lg hover:bg-blue-50">{tr('edit', lang)}</Link>
              <button onClick={() => deleteTopic(topic.id)} className="text-sm text-red-600 border border-red-300 px-3 py-1 rounded-lg hover:bg-red-50">{tr('delete', lang)}</button>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {topic.lessons.length === 0 && <p className="text-sm text-gray-400">{tr('noLessons', lang)}</p>}
            {[...topic.lessons].sort((a,b) => a.order_index - b.order_index).map(l => (
              <div key={l.id} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-4 py-2">
                <span className="text-gray-700">{l.title_he}</span>
                <Link href={\`/admin/lessons/\${l.id}\`} className="text-blue-600 hover:underline">{tr('edit', lang)}</Link>
              </div>
            ))}
            <Link href={\`/admin/topics/\${topic.id}\`} className="block text-center text-sm text-blue-600 hover:underline pt-1">+ {tr('addLesson', lang)}</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function FormField({ label, value, onChange, required, textarea, dir }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; textarea?: boolean; dir?: string }) {
  const cls = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      {textarea
        ? <textarea value={value} onChange={e => onChange(e.target.value)} className={cls} rows={3} dir={dir} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} required={required} className={cls} dir={dir} />
      }
    </label>
  );
}
`);

// ─── Admin topic detail (edit + add lesson) ───────────────────────────────────
write('src/app/(admin)/admin/topics/[id]/page.tsx', `import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AdminTopicDetailClient from './AdminTopicDetailClient';

export default async function TopicDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const [{ data: topic }, { data: lessons }] = await Promise.all([
    supabase.from('topics').select('*').eq('id', params.id).single(),
    supabase.from('lessons').select('*').eq('topic_id', params.id).order('order_index'),
  ]);
  if (!topic) notFound();
  return <AdminTopicDetailClient topic={topic} lessons={lessons ?? []} />;
}
`);

write('src/app/(admin)/admin/topics/[id]/AdminTopicDetailClient.tsx', `'use client';
import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import type { Topic, Lesson } from '@/types';

export default function AdminTopicDetailClient({ topic, lessons: initial }: { topic: Topic; lessons: Lesson[] }) {
  const { lang } = useLang();
  const [lessons, setLessons] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title_he: '', title_en: '', content_he: '', content_en: '', order_index: initial.length + 1 });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function saveLesson(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase.from('lessons').insert({ ...form, topic_id: topic.id }).select().single();
    if (error) { setMsg(error.message); } else { setLessons(l => [...l, data]); setShowForm(false); setMsg(tr('success', lang)); }
    setSaving(false);
  }

  async function deleteLesson(id: string) {
    if (!confirm(tr('deleteConfirm', lang))) return;
    const supabase = createClient();
    await supabase.from('lessons').delete().eq('id', id);
    setLessons(l => l.filter(x => x.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/topics" className="text-gray-400 hover:text-blue-600">←</Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{topic.title_he}</h1>
          <p className="text-sm text-gray-500">{topic.title_en}</p>
        </div>
      </div>
      {msg && <p className="text-sm text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">{msg}</p>}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-gray-700">{tr('lessons', lang)}</h2>
        <button onClick={() => setShowForm(v => !v)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">+ {tr('addLesson', lang)}</button>
      </div>
      {showForm && (
        <form onSubmit={saveLesson} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <F label={tr('titleHe', lang)} value={form.title_he} set={v => setForm(f=>({...f,title_he:v}))} required />
            <F label={tr('titleEn', lang)} value={form.title_en} set={v => setForm(f=>({...f,title_en:v}))} required dir="ltr" />
            <F label={tr('contentHe', lang)} value={form.content_he} set={v => setForm(f=>({...f,content_he:v}))} textarea />
            <F label={tr('contentEn', lang)} value={form.content_en} set={v => setForm(f=>({...f,content_en:v}))} textarea dir="ltr" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50">{saving ? tr('saving', lang) : tr('save', lang)}</button>
            <button type="button" onClick={() => setShowForm(false)} className="border border-gray-300 px-5 py-2 rounded-lg">{tr('cancel', lang)}</button>
          </div>
        </form>
      )}
      {lessons.length === 0 && <p className="text-gray-400 text-sm">{tr('noLessons', lang)}</p>}
      {[...lessons].sort((a,b)=>a.order_index-b.order_index).map(l => (
        <div key={l.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">{l.title_he}</p>
            <p className="text-sm text-gray-500">{l.title_en}</p>
          </div>
          <div className="flex gap-2">
            <Link href={\`/admin/lessons/\${l.id}\`} className="text-sm text-blue-600 border border-blue-300 px-3 py-1 rounded-lg hover:bg-blue-50">{tr('edit', lang)}</Link>
            <button onClick={() => deleteLesson(l.id)} className="text-sm text-red-600 border border-red-300 px-3 py-1 rounded-lg hover:bg-red-50">{tr('delete', lang)}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function F({ label, value, set, required, textarea, dir }: { label: string; value: string; set: (v:string)=>void; required?: boolean; textarea?: boolean; dir?: string }) {
  const cls = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      {textarea ? <textarea value={value} onChange={e=>set(e.target.value)} className={cls} rows={4} dir={dir}/> : <input type="text" value={value} onChange={e=>set(e.target.value)} required={required} className={cls} dir={dir}/>}
    </label>
  );
}
`);

// ─── Admin lesson detail ──────────────────────────────────────────────────────
write('src/app/(admin)/admin/lessons/[id]/page.tsx', `import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AdminLessonDetailClient from './AdminLessonDetailClient';

export default async function LessonDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const [{ data: lesson }, { data: images }, { data: questions }] = await Promise.all([
    supabase.from('lessons').select('*, topics(id, title_he)').eq('id', params.id).single(),
    supabase.from('lesson_images').select('*').eq('lesson_id', params.id).order('order_index'),
    supabase.from('questions').select('*').eq('lesson_id', params.id).order('order_index'),
  ]);
  if (!lesson) notFound();
  return <AdminLessonDetailClient lesson={lesson} images={images ?? []} questions={questions ?? []} />;
}
`);

write('src/app/(admin)/admin/lessons/[id]/AdminLessonDetailClient.tsx', `'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import type { LessonImage, Question } from '@/types';

interface Lesson { id: string; topic_id: string; title_he: string; title_en: string; content_he: string|null; content_en: string|null; order_index: number; topics: { id: string; title_he: string } | null; }

export default function AdminLessonDetailClient({ lesson, images: initImgs, questions: initQs }: { lesson: Lesson; images: LessonImage[]; questions: Question[] }) {
  const { lang } = useLang();
  const [images, setImages] = useState(initImgs);
  const [questions, setQuestions] = useState(initQs);
  const [uploading, setUploading] = useState(false);
  const [showQForm, setShowQForm] = useState(false);
  const [qForm, setQForm] = useState({ question_he:'', question_en:'', options_he:['','','',''], options_en:['','','',''], correct_index:0, explanation_he:'', explanation_en:'', type:'quiz' as 'quiz'|'test'|'final', order_index: initQs.length+1 });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const path = \`lessons/\${lesson.id}/\${Date.now()}.\${ext}\`;
    const { error: upErr } = await supabase.storage.from('anatomy-images').upload(path, file);
    if (upErr) { setMsg(upErr.message); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from('anatomy-images').getPublicUrl(path);
    const { data, error } = await supabase.from('lesson_images').insert({ lesson_id: lesson.id, image_url: urlData.publicUrl, caption_he: '', caption_en: '', order_index: images.length+1 }).select().single();
    if (error) { setMsg(error.message); } else { setImages(i => [...i, data]); setMsg(tr('success', lang)); }
    setUploading(false);
  }

  async function deleteImage(id: string, url: string) {
    if (!confirm(tr('deleteConfirm', lang))) return;
    const supabase = createClient();
    const path = url.split('/anatomy-images/')[1];
    await supabase.storage.from('anatomy-images').remove([path]);
    await supabase.from('lesson_images').delete().eq('id', id);
    setImages(i => i.filter(x => x.id !== id));
  }

  async function saveQuestion(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase.from('questions').insert({ ...qForm, lesson_id: lesson.id, topic_id: null }).select().single();
    if (error) { setMsg(error.message); } else { setQuestions(q => [...q, data]); setShowQForm(false); setMsg(tr('success', lang)); }
    setSaving(false);
  }

  async function deleteQuestion(id: string) {
    if (!confirm(tr('deleteConfirm', lang))) return;
    const supabase = createClient();
    await supabase.from('questions').delete().eq('id', id);
    setQuestions(q => q.filter(x => x.id !== id));
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Link href={\`/admin/topics/\${lesson.topic_id}\`} className="text-gray-400 hover:text-blue-600">←</Link>
        <div>
          <p className="text-xs text-gray-400">{lesson.topics?.title_he}</p>
          <h1 className="text-xl font-bold">{lesson.title_he}</h1>
          <p className="text-sm text-gray-500">{lesson.title_en}</p>
        </div>
      </div>
      {msg && <p className="text-sm text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">{msg}</p>}

      {/* Images */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-700">{tr('images', lang)}</h2>
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 disabled:opacity-50">
            {uploading ? tr('uploading', lang) : tr('uploadImage', lang)}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={uploadImage} />
        </div>
        {images.length === 0 && <p className="text-gray-400 text-sm">{tr('noImages', lang)}</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map(img => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden border border-gray-200">
              <div className="relative h-32 bg-gray-100">
                <Image src={img.image_url} alt="" fill className="object-cover" />
              </div>
              <div className="p-2 text-xs text-gray-500">{img.caption_he || '—'}</div>
              <button onClick={() => deleteImage(img.id, img.image_url)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
            </div>
          ))}
        </div>
      </section>

      {/* Questions */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-700">{tr('questions', lang)}</h2>
          <button onClick={() => setShowQForm(v => !v)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">+ {tr('addQuestion', lang)}</button>
        </div>
        {showQForm && (
          <form onSubmit={saveQuestion} className="border border-gray-200 rounded-xl p-5 space-y-4 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <F label={tr('questionType', lang)} value={qForm.type} set={v => setQForm(f=>({...f,type:v as 'quiz'|'test'|'final'}))}>
                <select value={qForm.type} onChange={e => setQForm(f=>({...f,type:e.target.value as 'quiz'|'test'|'final'}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="quiz">{tr('quizType', lang)}</option>
                  <option value="test">{tr('testType', lang)}</option>
                  <option value="final">{tr('finalType', lang)}</option>
                </select>
              </F>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Tf label={tr('contentHe', lang)} value={qForm.question_he} set={v => setQForm(f=>({...f,question_he:v}))} required />
              <Tf label={tr('contentEn', lang)} value={qForm.question_en} set={v => setQForm(f=>({...f,question_en:v}))} dir="ltr" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[0,1,2,3].map(i => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <Tf label={\`\${tr('optionIndex',lang)} \${i+1} (HE)\`} value={qForm.options_he[i]} set={v => { const a=[...qForm.options_he]; a[i]=v; setQForm(f=>({...f,options_he:a})); }} required />
                  <Tf label={\`\${tr('optionIndex',lang)} \${i+1} (EN)\`} value={qForm.options_en[i]} set={v => { const a=[...qForm.options_en]; a[i]=v; setQForm(f=>({...f,options_en:a})); }} dir="ltr" required />
                </div>
              ))}
            </div>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">{tr('correctAnswer', lang)} (0-3)</span>
              <input type="number" min={0} max={3} value={qForm.correct_index} onChange={e => setQForm(f=>({...f,correct_index:Number(e.target.value)}))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-20" />
            </label>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50">{saving ? tr('saving', lang) : tr('save', lang)}</button>
              <button type="button" onClick={() => setShowQForm(false)} className="border border-gray-300 px-5 py-2 rounded-lg">{tr('cancel', lang)}</button>
            </div>
          </form>
        )}
        {questions.length === 0 && <p className="text-gray-400 text-sm">{tr('noQuestions', lang)}</p>}
        {questions.map(q => (
          <div key={q.id} className="flex items-start justify-between border border-gray-200 rounded-xl p-4 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">{q.type}</p>
              <p className="font-medium text-gray-800 text-sm">{q.question_he}</p>
              <p className="text-xs text-gray-500 mt-0.5">{q.question_en}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {q.options_he.map((opt, i) => (
                  <span key={i} className={\`text-xs px-2 py-0.5 rounded-full border \${i === q.correct_index ? 'bg-green-100 border-green-300 text-green-700' : 'bg-gray-100 border-gray-200 text-gray-600'}\`}>{opt}</span>
                ))}
              </div>
            </div>
            <button onClick={() => deleteQuestion(q.id)} className="text-red-500 hover:text-red-700 text-sm shrink-0">{tr('delete', lang)}</button>
          </div>
        ))}
      </section>
    </div>
  );
}

function F({ label, value, set, children }: { label: string; value: string; set: (v:string)=>void; children?: React.ReactNode }) {
  return <label className="block"><span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>{children}</label>;
}
function Tf({ label, value, set, required, dir }: { label: string; value: string; set:(v:string)=>void; required?:boolean; dir?: string }) {
  return <label className="block"><span className="block text-sm font-medium text-gray-700 mb-1">{label}</span><input type="text" value={value} onChange={e=>set(e.target.value)} required={required} dir={dir} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></label>;
}
`);

// ─── Admin students page ──────────────────────────────────────────────────────
write('src/app/(admin)/admin/students/page.tsx', `import { createClient } from '@/lib/supabase/server';
import StudentsClient from './StudentsClient';

export default async function StudentsPage() {
  const supabase = await createClient();
  const [{ data: profiles }, { data: scores }, { data: progress }] = await Promise.all([
    supabase.from('profiles').select('*').eq('role', 'student').order('created_at'),
    supabase.from('student_scores').select('*').order('completed_at'),
    supabase.from('student_progress').select('*'),
  ]);
  return <StudentsClient profiles={profiles ?? []} scores={scores ?? []} progress={progress ?? []} />;
}
`);

write('src/app/(admin)/admin/students/StudentsClient.tsx', `'use client';
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
`);

// ─── Supabase migration ───────────────────────────────────────────────────────
write('supabase/migrations/001_init.sql', `-- Enable UUID
create extension if not exists "uuid-ossp";

-- Profiles
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'student' check (role in ('student','admin')),
  created_at timestamptz not null default now()
);
alter table profiles enable row level security;
create policy "Users read own profile" on profiles for select using (auth.uid() = id);
create policy "Users update own profile" on profiles for update using (auth.uid() = id);
create policy "Admins read all profiles" on profiles for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Trigger: create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;
create or replace trigger on_auth_user_created
  after insert on auth.users for each row execute procedure handle_new_user();

-- Topics
create table if not exists topics (
  id uuid primary key default uuid_generate_v4(),
  title_he text not null,
  title_en text not null,
  description_he text,
  description_en text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);
alter table topics enable row level security;
create policy "Anyone can read topics" on topics for select using (true);
create policy "Admin full access topics" on topics using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Lessons
create table if not exists lessons (
  id uuid primary key default uuid_generate_v4(),
  topic_id uuid not null references topics(id) on delete cascade,
  title_he text not null,
  title_en text not null,
  content_he text,
  content_en text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);
alter table lessons enable row level security;
create policy "Anyone can read lessons" on lessons for select using (true);
create policy "Admin full access lessons" on lessons using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Lesson images
create table if not exists lesson_images (
  id uuid primary key default uuid_generate_v4(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  image_url text not null,
  caption_he text,
  caption_en text,
  order_index int not null default 0
);
alter table lesson_images enable row level security;
create policy "Anyone can read images" on lesson_images for select using (true);
create policy "Admin full access images" on lesson_images using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Questions
create table if not exists questions (
  id uuid primary key default uuid_generate_v4(),
  lesson_id uuid references lessons(id) on delete cascade,
  topic_id uuid references topics(id) on delete cascade,
  type text not null check (type in ('quiz','test','final')),
  question_he text not null,
  question_en text not null,
  options_he jsonb not null default '[]',
  options_en jsonb not null default '[]',
  correct_index int not null default 0,
  explanation_he text,
  explanation_en text,
  order_index int not null default 0
);
alter table questions enable row level security;
create policy "Anyone can read questions" on questions for select using (true);
create policy "Admin full access questions" on questions using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Student progress
create table if not exists student_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);
alter table student_progress enable row level security;
create policy "Users manage own progress" on student_progress using (auth.uid() = user_id);
create policy "Admins read all progress" on student_progress for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Student scores
create table if not exists student_scores (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  assessment_type text not null check (assessment_type in ('quiz','test','final')),
  reference_id uuid,
  score int not null,
  max_score int not null,
  completed_at timestamptz not null default now()
);
alter table student_scores enable row level security;
create policy "Users manage own scores" on student_scores using (auth.uid() = user_id);
create policy "Admins read all scores" on student_scores for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Storage bucket for images
insert into storage.buckets (id, name, public) values ('anatomy-images', 'anatomy-images', true)
  on conflict (id) do nothing;
create policy "Anyone can view images" on storage.objects for select using (bucket_id = 'anatomy-images');
create policy "Admins can upload images" on storage.objects for insert using (
  bucket_id = 'anatomy-images' and
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete images" on storage.objects for delete using (
  bucket_id = 'anatomy-images' and
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
`);

// ─── README ───────────────────────────────────────────────────────────────────
write('README.md', `# קורס אנטומיה אינטראקטיבי

## הגדרה ראשונית

### 1. Supabase
1. צור פרויקט חינמי ב-[supabase.com](https://supabase.com)
2. לך ל-**SQL Editor** והרץ את הקובץ \`supabase/migrations/001_init.sql\`
3. העתק את ה-URL וה-ANON KEY מ-Settings → API

### 2. קובץ .env.local
צור קובץ \`.env.local\` בתיקייה הראשית:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
\`\`\`

### 3. הרצה מקומית
\`\`\`bash
npm install
npm run dev
\`\`\`
פתח [http://localhost:3000](http://localhost:3000)

### 4. הגדרת אדמין
לאחר שנרשמת, הרץ ב-Supabase SQL Editor:
\`\`\`sql
update profiles set role = 'admin' where id = 'YOUR_USER_ID';
\`\`\`

## מבנה הפרויקט
- \`/login\` \`/register\` — מסכי כניסה
- \`/dashboard\` — לוח בקרה לתלמיד
- \`/course\` — רשימת נושאים ושיעורים
- \`/lesson/[id]\` — שיעור עם תמונות
- \`/quiz/[id]\` — חידון אחרי שיעור
- \`/test/[topicId]\` — בחן נושאי
- \`/exam\` — מבחן מסכם
- \`/admin\` — פאנל ניהול למורה

## העלאה ל-Vercel
1. \`git init && git add . && git commit -m "init"\`
2. העלה ל-GitHub
3. חבר ב-[vercel.com](https://vercel.com) + הגדר את משתני הסביבה
`);

console.log('\n✅ Project setup complete!');
console.log('Next steps:');
console.log('  1. npm install');
console.log('  2. Create .env.local with Supabase keys');
console.log('  3. npm run dev');
