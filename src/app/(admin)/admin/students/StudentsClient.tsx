'use client';
import React, { useState } from 'react';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import { setStudentPassword } from './actions';
import type { Profile, StudentScore, StudentProgress } from '@/types';

interface Lesson { id: string; title_he: string; title_en: string; topic_id: string; order_index: number; }
interface Topic  { id: string; title_he: string; title_en: string; order_index: number; }

interface Props {
  profiles: Profile[];
  scores: StudentScore[];
  progress: StudentProgress[];
  lessons: Lesson[];
  topics: Topic[];
}

export default function StudentsClient({ profiles, scores, progress, lessons, topics }: Props) {
  const { lang } = useLang();
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {profiles.map(p => {
              const userProgress = progress.filter(x => x.user_id === p.id);
              const finalScore = scores.find(s => s.user_id === p.id && s.assessment_type === 'final');
              const isOpen = selectedId === p.id;
              return (
                <React.Fragment key={p.id}>
                  <tr
                    className={`cursor-pointer transition-colors ${isOpen ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedId(isOpen ? null : p.id)}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">{p.full_name || '—'}</td>
                    <td className="px-4 py-3 text-gray-500" dir="ltr">{p.email ?? '—'}</td>
                    <td className="px-4 py-3 text-center">{userProgress.length}</td>
                    <td className="px-4 py-3 text-center">
                      {finalScore
                        ? <span className="font-bold text-blue-600">{finalScore.score}/{finalScore.max_score}</span>
                        : <span className="text-gray-400">{tr('notTaken', lang)}</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {new Date(p.created_at).toLocaleDateString(lang === 'he' ? 'he-IL' : 'en-US')}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs text-center">
                      {isOpen ? '▲' : '▼'}
                    </td>
                  </tr>
                  {isOpen && (
                    <tr>
                      <td colSpan={6} className="bg-blue-50 border-t border-blue-100 px-4 py-5">
                        <StudentDetail
                          profile={p}
                          progress={progress.filter(x => x.user_id === p.id)}
                          scores={scores.filter(s => s.user_id === p.id)}
                          lessons={lessons}
                          topics={topics}
                          lang={lang}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StudentDetail({
  profile, progress, scores, lessons, topics, lang,
}: {
  profile: Profile;
  progress: StudentProgress[];
  scores: StudentScore[];
  lessons: Lesson[];
  topics: Topic[];
  lang: 'he' | 'en';
}) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [pwStatus, setPwStatus] = useState<'idle' | 'saving' | 'ok' | 'error'>('idle');
  const [pwError, setPwError] = useState('');

  async function handleSetPassword() {
    if (!newPassword) return;
    setPwStatus('saving');
    const result = await setStudentPassword(profile.id, newPassword);
    if (result.error) {
      setPwError(result.error);
      setPwStatus('error');
    } else {
      setPwStatus('ok');
      setNewPassword('');
      setTimeout(() => { setShowPasswordForm(false); setPwStatus('idle'); }, 1500);
    }
  }

  const completedIds = new Set(progress.map(p => p.lesson_id));
  const totalLessons = lessons.length;
  const completedCount = progress.length;
  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const finalScore = scores.find(s => s.assessment_type === 'final');
  const quizScores = scores.filter(s => s.assessment_type === 'quiz');
  const testScores = scores.filter(s => s.assessment_type === 'test');

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
          {(profile.full_name || '?')[0].toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-gray-900 text-lg">{profile.full_name || '—'}</p>
          <p className="text-sm text-gray-500" dir="ltr">{profile.email ?? '—'}</p>
          <p className="text-xs text-gray-400">
            {lang === 'he' ? 'הצטרף:' : 'Joined:'}{' '}
            {new Date(profile.created_at).toLocaleDateString(lang === 'he' ? 'he-IL' : 'en-US')}
          </p>
        </div>
        {/* Progress bar */}
        <div className="flex-1 min-w-[160px]">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{lang === 'he' ? 'התקדמות כוללת' : 'Overall Progress'}</span>
            <span>{completedCount}/{totalLessons} ({pct}%)</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        {/* Final exam badge */}
        {finalScore && (
          <div className="bg-white border border-blue-200 rounded-lg px-4 py-2 text-center">
            <p className="text-xs text-gray-500">{tr('examScore', lang)}</p>
            <p className="text-2xl font-black text-blue-600">{finalScore.score}<span className="text-sm text-gray-400">/{finalScore.max_score}</span></p>
          </div>
        )}

        {/* Password reset */}
        <div className="mr-auto">
          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200"
            >
              🔑 {lang === 'he' ? 'שנה סיסמה' : 'Change Password'}
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
              <input
                type="text"
                value={newPassword}
                onChange={e => { setNewPassword(e.target.value); setPwStatus('idle'); }}
                placeholder={lang === 'he' ? 'סיסמה חדשה (6+ תווים)' : 'New password (6+ chars)'}
                className="text-sm border-none outline-none w-44"
              />
              <button
                onClick={handleSetPassword}
                disabled={pwStatus === 'saving' || newPassword.length < 6}
                className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {pwStatus === 'saving' ? '...' : pwStatus === 'ok' ? '✅' : lang === 'he' ? 'שמור' : 'Save'}
              </button>
              <button onClick={() => { setShowPasswordForm(false); setNewPassword(''); setPwStatus('idle'); }}
                className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
              {pwStatus === 'error' && <p className="text-red-500 text-xs">{pwError}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Progress per topic */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 text-sm">
            {lang === 'he' ? 'שיעורים שהושלמו לפי נושא' : 'Completed Lessons by Topic'}
          </h3>
          <div className="space-y-3">
            {topics.map(topic => {
              const topicLessons = lessons.filter(l => l.topic_id === topic.id);
              const done = topicLessons.filter(l => completedIds.has(l.id)).length;
              const total = topicLessons.length;
              const tpct = total > 0 ? Math.round((done / total) * 100) : 0;
              return (
                <div key={topic.id}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span className="font-medium">{lang === 'he' ? topic.title_he : topic.title_en}</span>
                    <span className={done === total && total > 0 ? 'text-green-600 font-bold' : 'text-gray-400'}>
                      {done}/{total}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${done === total && total > 0 ? 'bg-green-500' : 'bg-blue-400'}`}
                      style={{ width: `${tpct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scores */}
        <div className="space-y-4">
          {quizScores.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">
                {lang === 'he' ? 'ציוני חידונים' : 'Quiz Scores'}
              </h3>
              <div className="space-y-1">
                {quizScores.map(s => {
                  const lesson = lessons.find(l => l.id === s.reference_id);
                  return (
                    <div key={s.id} className="flex justify-between items-center text-xs bg-white rounded-lg px-3 py-2 border border-gray-100">
                      <span className="text-gray-600 truncate">
                        {lesson ? (lang === 'he' ? lesson.title_he : lesson.title_en) : '—'}
                      </span>
                      <ScoreBadge score={s.score} max={s.max_score} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {testScores.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">
                {lang === 'he' ? 'ציוני בחנים' : 'Test Scores'}
              </h3>
              <div className="space-y-1">
                {testScores.map(s => {
                  const topic = topics.find(t => t.id === s.reference_id);
                  return (
                    <div key={s.id} className="flex justify-between items-center text-xs bg-white rounded-lg px-3 py-2 border border-gray-100">
                      <span className="text-gray-600 truncate">
                        {topic ? (lang === 'he' ? topic.title_he : topic.title_en) : '—'}
                      </span>
                      <ScoreBadge score={s.score} max={s.max_score} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {scores.length === 0 && (
            <p className="text-xs text-gray-400">{lang === 'he' ? 'אין ציונים עדיין' : 'No scores yet'}</p>
          )}
        </div>
      </div>

      {progress.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-2 text-sm">
            {lang === 'he' ? 'פעילות אחרונה' : 'Recent Activity'}
          </h3>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {[...progress].reverse().slice(0, 10).map(p => {
              const lesson = lessons.find(l => l.id === p.lesson_id);
              return (
                <div key={p.id} className="flex justify-between items-center text-xs bg-white rounded-lg px-3 py-2 border border-gray-100">
                  <span className="text-green-600">✓ {lesson ? (lang === 'he' ? lesson.title_he : lesson.title_en) : p.lesson_id}</span>
                  <span className="text-gray-400 shrink-0 mr-2">
                    {new Date(p.completed_at).toLocaleDateString(lang === 'he' ? 'he-IL' : 'en-US')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreBadge({ score, max }: { score: number; max: number }) {
  const pct = max > 0 ? (score / max) * 100 : 0;
  const color = pct >= 80 ? 'text-green-600 bg-green-50' : pct >= 60 ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50';
  return (
    <span className={`font-bold px-2 py-0.5 rounded-full ${color}`}>{score}/{max}</span>
  );
}
