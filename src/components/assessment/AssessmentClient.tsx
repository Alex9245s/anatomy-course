'use client';
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
              <div key={q.id} className={`rounded-xl border p-4 ${correct ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
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
        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <p className="text-lg font-medium text-gray-800">{lang === 'he' ? q.question_he : q.question_en}</p>
        <div className="space-y-2">
          {opts.map((opt, i) => (
            <button key={i} onClick={() => { const a = [...answers]; a[current] = i; setAnswers(a); }}
              className={`w-full text-right p-3 rounded-xl border transition-colors ${answers[current] === i ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300'}`}>
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
