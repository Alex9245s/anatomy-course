'use client';
import { useState, useCallback } from 'react';

interface Item { word: string; emoji: string; translation: string; }
interface Props { title: string; items: Item[]; lang: 'he' | 'en'; }

export default function SpellingGame({ title, items, lang }: Props) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const current = items[index];

  const check = useCallback(() => {
    if (!input.trim()) return;
    if (input.trim().toLowerCase() === current.word.toLowerCase()) {
      setStatus('correct');
      setScore(s => s + 1);
      setTimeout(() => {
        if (index + 1 >= items.length) {
          setDone(true);
        } else {
          setIndex(i => i + 1);
          setInput('');
          setStatus('idle');
          setRevealed(false);
        }
      }, 900);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 800);
    }
  }, [input, current, index, items.length]);

  function restart() {
    setIndex(0);
    setInput('');
    setStatus('idle');
    setScore(0);
    setDone(false);
    setRevealed(false);
  }

  if (done) {
    return (
      <div className="bg-white rounded-2xl border border-pink-200 p-5 text-center space-y-3">
        <div className="text-5xl">🏆</div>
        <h3 className="text-xl font-bold text-pink-600">
          {lang === 'he' ? `${score}/${items.length} נכון!` : `${score}/${items.length} correct!`}
        </h3>
        <button onClick={restart} className="bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-600 font-medium">
          {lang === 'he' ? '🔄 שחק שוב' : '🔄 Play Again'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-pink-200 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-pink-600">🔡 {title}</h3>
        <span className="text-sm text-gray-500">{index + 1}/{items.length}</span>
      </div>

      <div className="text-center space-y-3">
        <div className="text-6xl">{current.emoji}</div>
        <p className="text-lg font-bold text-gray-700" dir="rtl">{current.translation}</p>
        <p className="text-sm text-gray-400">
          {lang === 'he' ? 'כתוב את המילה באנגלית:' : 'Type the English word:'}
        </p>

        <input
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setStatus('idle'); }}
          onKeyDown={e => e.key === 'Enter' && check()}
          placeholder="..."
          className={`w-full max-w-xs border-2 rounded-xl px-4 py-3 text-center text-xl font-bold outline-none transition-colors mx-auto block
            ${status === 'correct' ? 'border-green-400 bg-green-50 text-green-700'
              : status === 'wrong' ? 'border-red-400 bg-red-50 text-red-700'
              : 'border-gray-300 focus:border-pink-400'}`}
        />

        <div className="flex gap-2 justify-center">
          <button
            onClick={check}
            disabled={!input.trim()}
            className="bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-600 disabled:opacity-40 font-medium"
          >
            {lang === 'he' ? '✓ בדוק' : '✓ Check'}
          </button>
          {!revealed && status !== 'correct' && (
            <button
              onClick={() => setRevealed(true)}
              className="text-gray-400 hover:text-gray-600 text-sm underline px-2"
            >
              {lang === 'he' ? '👀 ראה תשובה' : '👀 Show answer'}
            </button>
          )}
        </div>

        {revealed && status !== 'correct' && (
          <p className="text-gray-500 text-sm bg-gray-50 rounded-lg px-3 py-2 inline-block">
            💡 {current.word}
          </p>
        )}

        {status === 'correct' && <p className="text-green-600 font-bold text-lg">✅ {lang === 'he' ? 'מעולה!' : 'Correct!'}</p>}
        {status === 'wrong' && <p className="text-red-500 font-bold">❌ {lang === 'he' ? 'נסה שוב!' : 'Try again!'}</p>}
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <span>{lang === 'he' ? `ניקוד: ${score}` : `Score: ${score}`}</span>
        <button onClick={restart} className="text-pink-500 hover:text-pink-700 underline text-xs">
          {lang === 'he' ? 'התחל מחדש' : 'Restart'}
        </button>
      </div>
    </div>
  );
}
