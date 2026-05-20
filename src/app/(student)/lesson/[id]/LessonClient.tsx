'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import Calculator from '@/components/Calculator';
import ContentRenderer from '@/components/ContentRenderer';
import MemoryGame from '@/components/MemoryGame';
import WordScramble from '@/components/WordScramble';
import type { LessonImage, Question, LessonExercise, MiniGame } from '@/types';

interface Props {
  lesson: { id: string; title_he: string; title_en: string; content_he: string | null; content_en: string | null; topics: { title_he: string; title_en: string } | null };
  images: LessonImage[];
  questions: Question[];
  exercises: LessonExercise[];
  miniGames: MiniGame[];
  isCompleted: boolean;
  userId: string;
}

interface ExerciseState {
  input: string;
  submitted: boolean;
  correct: boolean | null;
  showHint: boolean;
}

function MathLine({ text, className }: { text: string; className?: string }) {
  const colonIdx = text.indexOf(': ');
  const hasHebrew = /[\u0590-\u05FF]/.test(text);

  if (colonIdx > -1) {
    const label = text.slice(0, colonIdx + 1);
    const math  = text.slice(colonIdx + 2);
    return (
      <span className={className}>
        <span dir="rtl">{label} </span>
        <span dir="ltr" className="inline-block">{math}</span>
      </span>
    );
  }
  const firstChar = text.trimStart()[0] ?? '';
  const startsHebrew = /[\u0590-\u05FF]/.test(firstChar);
  return (
    <span className={className} dir={startsHebrew && hasHebrew ? 'rtl' : 'ltr'}>
      {text}
    </span>
  );
}

export default function LessonClient({ lesson, images, questions, exercises, miniGames, isCompleted, userId }: Props) {
  const { lang } = useLang();
  const [imgIndex, setImgIndex] = useState(0);
  const [completed, setCompleted] = useState(isCompleted);
  const [saving, setSaving] = useState(false);
  const [exStates, setExStates] = useState<Record<string, ExerciseState>>(
    Object.fromEntries(exercises.map(e => [e.id, { input: '', submitted: false, correct: null, showHint: false }]))
  );

  async function markComplete() {
    if (completed) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from('student_progress').upsert({ user_id: userId, lesson_id: lesson.id });
    setCompleted(true);
    setSaving(false);
  }

  function updateEx(id: string, patch: Partial<ExerciseState>) {
    setExStates(s => ({ ...s, [id]: { ...s[id], ...patch } }));
  }

  function checkAnswer(ex: LessonExercise) {
    const state = exStates[ex.id];
    const userAns = state.input.trim().replace(/\s/g, '');
    const correctAns = ex.answer.trim().replace(/\s/g, '');
    const numUser = parseFloat(userAns);
    const numCorrect = parseFloat(correctAns);
    const correct = !isNaN(numUser) && !isNaN(numCorrect)
      ? numUser === numCorrect
      : userAns.toLowerCase() === correctAns.toLowerCase();
    updateEx(ex.id, { submitted: true, correct });
  }

  const title = lang === 'he' ? lesson.title_he : lesson.title_en;
  const content = lang === 'he' ? lesson.content_he : lesson.content_en;

  const attemptedCount = exercises.filter(e => exStates[e.id]?.submitted).length;
  const correctCount = exercises.filter(e => exStates[e.id]?.correct === true).length;

  const exerciseBlocks: { label: string | null; items: LessonExercise[] }[] = [];
  for (const ex of exercises) {
    const label = lang === 'he' ? ex.section_label_he : ex.section_label_en;
    if (label && (exerciseBlocks.length === 0 || exerciseBlocks[exerciseBlocks.length - 1].label !== label)) {
      exerciseBlocks.push({ label, items: [ex] });
    } else if (exerciseBlocks.length === 0) {
      exerciseBlocks.push({ label: null, items: [ex] });
    } else {
      exerciseBlocks[exerciseBlocks.length - 1].items.push(ex);
    }
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="flex items-center gap-3">
        <Link href="/course" className="text-gray-400 hover:text-blue-600 text-xl">←</Link>
        <div>
          <p className="text-xs text-gray-400">
            {lesson.topics ? (lang === 'he' ? lesson.topics.title_he : lesson.topics.title_en) : ''}
          </p>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
      </div>

      {images.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="relative bg-gray-100 h-72">
            <Image src={images[imgIndex].image_url}
              alt={lang === 'he' ? (images[imgIndex].caption_he ?? '') : (images[imgIndex].caption_en ?? '')}
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
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === imgIndex ? 'bg-blue-600' : 'bg-gray-300'}`} />
              ))}
            </div>
          )}
        </div>
      )}

      {content && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <ContentRenderer content={content} />
        </div>
      )}

      {exercises.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {lang === 'he' ? '\u270f\ufe0f \u05ea\u05e8\u05d2\u05d5\u05dc' : '\u270f\ufe0f Practice'}
            </h2>
            {attemptedCount > 0 && (
              <span className="text-sm font-medium text-gray-500">
                {correctCount}/{exercises.length} {lang === 'he' ? '\u05e0\u05db\u05d5\u05df' : 'correct'}
              </span>
            )}
          </div>

          {exerciseBlocks.map((block, bi) => (
            <div key={bi} className="space-y-3">
              {block.label && (
                <h3 className="text-base font-semibold text-indigo-700 bg-indigo-50 px-4 py-2 rounded-xl">
                  {block.label}
                </h3>
              )}
              {block.items.map(ex => {
                const state = exStates[ex.id];
                const q = lang === 'he' ? ex.question_he : ex.question_en;
                const hint = lang === 'he' ? ex.hint_he : ex.hint_en;
                const expl = lang === 'he' ? ex.explanation_he : ex.explanation_en;

                return (
                  <div key={ex.id}
                    className={`bg-white rounded-2xl border p-4 space-y-3 transition-all ${
                      state.submitted
                        ? state.correct ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'
                        : 'border-gray-200'
                    }`}>
                    <p className="font-medium text-gray-800 text-lg">
                      <MathLine text={q} />
                    </p>

                    <div className="flex gap-2 items-center" dir="ltr">
                      <input
                        type="text"
                        value={state.input}
                        onChange={e => updateEx(ex.id, { input: e.target.value, submitted: false, correct: null })}
                        onKeyDown={e => { if (e.key === 'Enter' && state.input.trim()) checkAnswer(ex); }}
                        disabled={state.submitted && state.correct === true}
                        placeholder={lang === 'he' ? '\u05ea\u05e9\u05d5\u05d1\u05d4...' : 'Answer...'}
                        className={`flex-1 border rounded-xl px-4 py-2 text-lg font-mono outline-none transition-all ${
                          state.submitted
                            ? state.correct ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100'
                            : 'border-gray-300 focus:border-blue-500'
                        }`}
                      />
                      {!(state.submitted && state.correct === true) && (
                        <button
                          onClick={() => checkAnswer(ex)}
                          disabled={!state.input.trim()}
                          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-40 font-medium"
                        >
                          {lang === 'he' ? '\u05d1\u05d3\u05d5\u05e7' : 'Check'}
                        </button>
                      )}
                    </div>

                    {state.submitted && (
                      <div className={`flex items-start gap-2 text-sm font-medium ${state.correct ? 'text-green-700' : 'text-red-700'}`}>
                        <span className="text-lg">{state.correct ? '\u2705' : '\u274c'}</span>
                        <div>
                          <p>{state.correct
                            ? (lang === 'he' ? '\u05e0\u05db\u05d5\u05df \u05de\u05d0\u05d5\u05d3! \ud83c�' : 'Correct! \ud83c\udf89')
                            : (lang === 'he' ? '\u05dc\u05d0 \u05e0\u05db\u05d5\u05df, \u05e0\u05e1\u05d5\u05d5 \u05e9\u05d5\u05d1.' : 'Not quite, try again.')
                          }</p>
                          {!state.correct && expl && <p className="text-gray-600 font-normal mt-1"><MathLine text={lang === 'he' ? `\u05e8\u05de\u05d6: ${expl}` : `Hint: ${expl}`} /></p>}
                          {state.correct && expl && <p className="text-gray-600 font-normal mt-1"><MathLine text={expl} /></p>}
                        </div>
                      </div>
                    )}

                    {hint && !state.submitted && (
                      <div>
                        {!state.showHint ? (
                          <button onClick={() => updateEx(ex.id, { showHint: true })}
                            className="text-xs text-indigo-500 hover:text-indigo-700">
                            \ud83d\udca1 {lang === 'he' ? '\u05e8\u05de\u05d6' : 'Hint'}
                          </button>
                        ) : (
                          <p className="text-xs text-indigo-600 bg-indigo-50 rounded-lg px-3 py-2">
                            \ud83d\udca1 <MathLine text={hint} />
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {miniGames.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            {lang === 'he' ? '\ud83c\udfae \u05de\u05e9\u05d7\u05e7\u05d9\u05dd' : '\ud83c\udfae Games'}
          </h2>
          {miniGames.map(game => {
            const gameTitle = lang === 'he' ? (game.title_he ?? '') : (game.title_en ?? '');
            return game.type === 'memory'
              ? <MemoryGame key={game.id} title={gameTitle} items={game.data} lang={lang} />
              : <WordScramble key={game.id} title={gameTitle} items={game.data} lang={lang} />;
          })}
        </div>
      )}

      <div className="flex flex-wrap gap-4 items-center">
        {!completed ? (
          <button onClick={markComplete} disabled={saving}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50">
            {saving ? tr('saving', lang) : (lang === 'he' ? '\u2705 \u05e1\u05d9\u05d9\u05de\u05ea\u05d9 \u05d0\u05ea \u05d4\u05e9\u05d9\u05e2\u05d5\u05e8' : '\u2705 Mark as Complete')}
          </button>
        ) : (
          <span className="bg-green-100 text-green-700 px-6 py-3 rounded-xl font-medium border border-green-300">
            \u2705 {lang === 'he' ? '\u05d4\u05e9\u05d9\u05e2\u05d5\u05e8 \u05d4\u05d5\u05e9\u05dc\u05dd!' : 'Lesson completed!'}
          </span>
        )}
        {completed && questions.length > 0 && (
          <Link href={`/quiz/${lesson.id}`}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700">
            {lang === 'he' ? '\ud83d\udcdd \u05de\u05d1\u05d7\u05df \u05de\u05e1\u05db\u05dd' : '\ud83d\udcdd Final Exam'} \u2192
          </Link>
        )}
      </div>

      {exercises.length > 0 && <Calculator />}
    </div>
  );
}
