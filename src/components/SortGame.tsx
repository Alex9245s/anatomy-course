'use client';
import { useState } from 'react';

interface SortItem { word: string; emoji: string; category: 'noun' | 'verb'; }
interface Props { title: string; items: SortItem[]; lang: 'he' | 'en'; }

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function SortGame({ title, items, lang }: Props) {
  const [shuffled] = useState(() => shuffle(items));
  const [answers, setAnswers] = useState<Record<string, 'noun' | 'verb' | null>>(
    () => Object.fromEntries(items.map(it => [it.word, null]))
  );
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = Object.values(answers).every(v => v !== null);
  const score = submitted ? items.filter(it => answers[it.word] === it.category).length : 0;

  function sort(word: string, category: 'noun' | 'verb') {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [word]: category }));
  }

  function restart() {
    setAnswers(Object.fromEntries(items.map(it => [it.word, null])));
    setSubmitted(false);
  }

  return (
    <div className="bg-white rounded-2xl border border-yellow-200 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-yellow-700">📦 {title}</h3>
        {submitted && <span className="text-sm font-bold text-gray-600">{score}/{items.length} ✓</span>}
      </div>

      <p className="text-sm text-gray-500 text-center">
        {lang === 'he'
          ? 'מיין כל מילה — שם עצם (דבר/מקום) או פועל (פעולה)'
          : 'Sort each word — Noun (thing/place) or Verb (action)'}
      </p>

      <div className="space-y-2">
        {shuffled.map(item => {
          const ans = answers[item.word];
          const isCorrect = submitted && ans === item.category;
          const isWrong = submitted && ans !== null && ans !== item.category;

          return (
            <div
              key={item.word}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all
                ${isCorrect ? 'bg-green-50 border-green-400'
                : isWrong ? 'bg-red-50 border-red-400'
                : 'bg-gray-50 border-gray-200'}`}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-bold text-gray-800 flex-1">{item.word}</span>
              <div className="flex gap-2">
                {(['noun', 'verb'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => sort(item.word, cat)}
                    disabled={submitted}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all
                      ${ans === cat
                        ? submitted
                          ? isCorrect
                            ? 'bg-green-100 border-green-500 text-green-700'
                            : 'bg-red-100 border-red-500 text-red-700'
                          : 'bg-blue-100 border-blue-500 text-blue-700'
                        : submitted && item.category === cat
                        ? 'bg-green-50 border-green-300 text-green-600'
                        : 'bg-white border-gray-300 text-gray-600 hover:border-blue-300 cursor-pointer'}`}
                  >
                    {lang === 'he' ? (cat === 'noun' ? 'שם עצם' : 'פועל') : (cat === 'noun' ? 'Noun' : 'Verb')}
                  </button>
                ))}
              </div>
              {isWrong && (
                <span className="text-xs text-green-600 font-bold whitespace-nowrap">
                  → {lang === 'he' ? (item.category === 'noun' ? 'שם עצם' : 'פועל') : item.category}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          className="w-full bg-yellow-500 text-white py-3 rounded-xl font-bold hover:bg-yellow-600 disabled:opacity-40 transition-opacity"
        >
          {lang === 'he' ? '✓ בדוק תשובות' : '✓ Check Answers'}
        </button>
      ) : (
        <div className="text-center space-y-2">
          <p className={`font-bold text-lg ${score === items.length ? 'text-green-600' : 'text-orange-600'}`}>
            {score === items.length
              ? (lang === 'he' ? '🎉 מושלם! כל הכבוד!' : '🎉 Perfect!')
              : (lang === 'he' ? `${score}/${items.length} נכון — כמעט!` : `${score}/${items.length} correct — almost!`)}
          </p>
          <button onClick={restart} className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600 font-medium">
            {lang === 'he' ? '🔄 שחק שוב' : '🔄 Play Again'}
          </button>
        </div>
      )}
    </div>
  );
}
