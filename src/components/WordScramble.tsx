'use client';
import { useState, useCallback } from 'react';

interface CardItem {
  word: string;
  emoji: string;
  translation: string;
}

interface Props {
  title: string;
  items: CardItem[];
  lang: 'he' | 'en';
}

function shuffleLetters(word: string): string {
  const letters = word.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  if (letters.join('') === word && word.length > 1) {
    [letters[0], letters[1]] = [letters[1], letters[0]];
  }
  return letters.join('');
}

export default function WordScramble({ title, items, lang }: Props) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = items[index];
  const [scrambled] = useState(() => items.map(it => shuffleLetters(it.word)));

  const checkAnswer = useCallback(() => {
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
        }
      }, 800);
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
  }

  if (done) {
    return (
      <div className="bg-white rounded-2xl border border-orange-200 p-5 text-center space-y-3">
        <div className="text-5xl">🏆</div>
        <h3 className="text-xl font-bold text-orange-600">
          {lang === 'he' ? `${score}/${items.length} \u05e0\u05db\u05d5\u05df!` : `${score}/${items.length} correct!`}
        </h3>
        <button onClick={restart}
          className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 font-medium">
          {lang === 'he' ? '\ud83d\udd04 \u05e9\u05d7\u05e7 \u05e9\u05d5\u05d1' : '\ud83d\udd04 Play Again'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-orange-200 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-orange-600">🔤 {title}</h3>
        <span className="text-sm text-gray-500">{index + 1}/{items.length}</span>
      </div>

      <div className="text-center space-y-3">
        <div className="text-5xl">{current.emoji}</div>
        <p className="text-sm text-gray-500">{current.translation}</p>

        <div className="flex gap-1 justify-center flex-wrap">
          {scrambled[index].split('').map((letter, i) => (
            <span key={i} className="w-9 h-9 bg-orange-100 border-2 border-orange-300 rounded-lg flex items-center justify-center font-bold text-orange-700 text-lg uppercase">
              {letter}
            </span>
          ))}
        </div>

        <input
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setStatus('idle'); }}
          onKeyDown={e => e.key === 'Enter' && checkAnswer()}
          placeholder={lang === 'he' ? '\u05db\u05ea\u05d5\u05d1 \u05d0\u05ea \u05d4\u05de\u05d9\u05dc\u05d4...' : 'Type the word...'}
          className={`w-full max-w-xs border-2 rounded-xl px-4 py-2 text-center text-lg font-medium outline-none transition-colors
            ${status === 'correct' ? 'border-green-400 bg-green-50 text-green-700'
              : status === 'wrong' ? 'border-red-400 bg-red-50 text-red-700'
              : 'border-gray-300 focus:border-orange-400'}`}
        />

        <button
          onClick={checkAnswer}
          className="block mx-auto bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 font-medium"
        >
          {lang === 'he' ? '\u2713 \u05d1\u05d3\u05d5\u05e7' : '\u2713 Check'}
        </button>

        {status === 'correct' && <p className="text-green-600 font-bold">\u2705 {lang === 'he' ? '\u05de\u05e2\u05d5\u05dc\u05d4!' : 'Correct!'}</p>}
        {status === 'wrong' && <p className="text-red-500 font-bold">\u274c {lang === 'he' ? '\u05e0\u05e1\u05d4 \u05e9\u05d5\u05d1!' : 'Try again!'}</p>}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{lang === 'he' ? `\u05e0\u05d9\u05e7\u05d5\u05d3: ${score}` : `Score: ${score}`}</span>
        <button onClick={restart} className="text-orange-500 hover:text-orange-700 underline text-xs">
          {lang === 'he' ? '\u05d4\u05ea\u05d7\u05dc \u05de\u05d7\u05d3\u05e9' : 'Restart'}
        </button>
      </div>
    </div>
  );
}
