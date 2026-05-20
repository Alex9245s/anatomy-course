'use client';
import { useState } from 'react';

interface FillItem {
  sentence: string;
  answer: string;
  choices: string[];
  translation: string;
}

interface Props {
  title: string;
  items: FillItem[];
  lang: 'he' | 'en';
}

export default function FillBlankGame({ title, items, lang }: Props) {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = items[index];

  function choose(word: string) {
    if (chosen !== null) return;
    setChosen(word);
    if (word === current.answer) setScore(s => s + 1);
    setTimeout(() => {
      if (index + 1 >= items.length) {
        setDone(true);
      } else {
        setIndex(i => i + 1);
        setChosen(null);
      }
    }, 1300);
  }

  function restart() {
    setIndex(0);
    setChosen(null);
    setScore(0);
    setDone(false);
  }

  if (done) {
    return (
      <div className="bg-white rounded-2xl border border-green-200 p-5 text-center space-y-3">
        <div className="text-5xl">🏆</div>
        <h3 className="text-xl font-bold text-green-600">
          {lang === 'he' ? `${score}/${items.length} נכון!` : `${score}/${items.length} correct!`}
        </h3>
        <button onClick={restart} className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 font-medium">
          {lang === 'he' ? '🔄 שחק שוב' : '🔄 Play Again'}
        </button>
      </div>
    );
  }

  const parts = current.sentence.split('___');

  return (
    <div className="bg-white rounded-2xl border border-green-200 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-green-700">📝 {title}</h3>
        <span className="text-sm text-gray-500">{index + 1}/{items.length}</span>
      </div>

      <div className="bg-green-50 rounded-xl p-5 space-y-2 text-center">
        <p className="text-xl font-bold text-gray-800" dir="ltr">
          {parts[0]}
          {chosen ? (
            <span className={`font-bold px-2 py-0.5 rounded-lg ${chosen === current.answer ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
              {chosen}
            </span>
          ) : (
            <span className="inline-block w-24 border-b-4 border-gray-400 align-bottom mx-1" />
          )}
          {parts[1] ?? ''}
        </p>
        <p className="text-sm text-gray-500" dir="rtl">{current.translation}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {current.choices.map(choice => {
          const isChosen = chosen === choice;
          const isCorrect = choice === current.answer;
          return (
            <button
              key={choice}
              onClick={() => choose(choice)}
              disabled={chosen !== null}
              className={`py-3 px-4 rounded-xl font-bold text-base border-2 transition-all
                ${chosen === null
                  ? 'bg-gray-50 border-gray-200 hover:border-green-400 hover:bg-green-50 cursor-pointer'
                  : isChosen && isCorrect
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : isChosen && !isCorrect
                  ? 'bg-red-100 border-red-500 text-red-700'
                  : isCorrect && chosen !== null
                  ? 'bg-green-50 border-green-300 text-green-600'
                  : 'bg-gray-50 border-gray-200 text-gray-400 cursor-default'}`}
            >
              {choice}
              {chosen !== null && isCorrect && ' ✓'}
              {isChosen && !isCorrect && ' ✗'}
            </button>
          );
        })}
      </div>

      {chosen && (
        <p className={`text-center font-bold ${chosen === current.answer ? 'text-green-600' : 'text-red-600'}`}>
          {chosen === current.answer
            ? (lang === 'he' ? '✅ מעולה!' : '✅ Correct!')
            : (lang === 'he' ? `❌ התשובה הנכונה: ${current.answer}` : `❌ Correct answer: ${current.answer}`)}
        </p>
      )}
    </div>
  );
}
