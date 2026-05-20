'use client';
import { useState, useEffect } from 'react';

interface Item { word: string; emoji: string; translation: string; }
interface Props { title: string; items: Item[]; lang: 'he' | 'en'; }

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function MatchGame({ title, items, lang }: Props) {
  const [shuffledRight, setShuffledRight] = useState<string[]>(() =>
    shuffle(items.map(it => it.translation))
  );
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState(false);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);

  const won = matched.size === items.length;

  useEffect(() => {
    if (selectedLeft === null || selectedRight === null || locked) return;
    const word = items[selectedLeft].word;
    const translation = shuffledRight[selectedRight];

    if (items[selectedLeft].translation === translation) {
      setMatched(prev => { const s = new Set(prev); s.add(word); return s; });
      setScore(s => s + 1);
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      setLocked(true);
      setWrong(true);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrong(false);
        setLocked(false);
      }, 700);
    }
  }, [selectedLeft, selectedRight]); // eslint-disable-line react-hooks/exhaustive-deps

  function clickLeft(idx: number) {
    if (locked || matched.has(items[idx].word)) return;
    setSelectedLeft(idx);
  }

  function clickRight(idx: number) {
    const rightWord = items.find(it => it.translation === shuffledRight[idx])?.word ?? '';
    if (locked || matched.has(rightWord)) return;
    setSelectedRight(idx);
  }

  function restart() {
    setShuffledRight(shuffle(items.map(it => it.translation)));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatched(new Set());
    setWrong(false);
    setLocked(false);
    setScore(0);
  }

  return (
    <div className="bg-white rounded-2xl border border-blue-200 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-blue-700">🎯 {title}</h3>
        <span className="text-sm text-gray-500">{score}/{items.length} {lang === 'he' ? 'זוגות' : 'pairs'}</span>
      </div>

      {won ? (
        <div className="text-center py-8 space-y-3">
          <div className="text-5xl">🎉</div>
          <p className="text-xl font-bold text-green-600">
            {lang === 'he' ? 'כל הכבוד! התאמת הכל!' : 'Amazing! You matched them all!'}
          </p>
          <button onClick={restart} className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 font-medium">
            {lang === 'he' ? '🔄 שחק שוב' : '🔄 Play Again'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            {items.map((item, i) => {
              const isMatched = matched.has(item.word);
              const isSelected = selectedLeft === i;
              return (
                <button
                  key={item.word}
                  onClick={() => clickLeft(i)}
                  disabled={isMatched}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-left transition-all border-2 text-base
                    ${isMatched
                      ? 'bg-green-100 border-green-400 text-green-700 cursor-default'
                      : isSelected && wrong
                      ? 'bg-red-100 border-red-400 text-red-700'
                      : isSelected
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'}`}
                >
                  {item.emoji} {item.word}
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            {shuffledRight.map((translation, i) => {
              const ownerWord = items.find(it => it.translation === translation)?.word ?? '';
              const isMatched = matched.has(ownerWord);
              const isSelected = selectedRight === i;
              return (
                <button
                  key={i}
                  onClick={() => clickRight(i)}
                  disabled={isMatched}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-center transition-all border-2 text-base
                    ${isMatched
                      ? 'bg-green-100 border-green-400 text-green-700 cursor-default'
                      : isSelected && wrong
                      ? 'bg-red-100 border-red-400 text-red-700'
                      : isSelected
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'}`}
                >
                  {translation}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!won && (
        <div className="flex justify-end">
          <button onClick={restart} className="text-blue-500 hover:text-blue-700 underline text-xs">
            {lang === 'he' ? 'התחל מחדש' : 'Restart'}
          </button>
        </div>
      )}
    </div>
  );
}
