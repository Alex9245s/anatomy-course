'use client';
import { useState, useEffect, useCallback } from 'react';

interface CardItem {
  word: string;
  emoji: string;
  translation: string;
}

interface MemoryCard {
  id: string;
  type: 'word' | 'emoji';
  content: string;
  word: string;
  flipped: boolean;
  matched: boolean;
}

interface Props {
  title: string;
  items: CardItem[];
  lang: 'he' | 'en';
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function MemoryGame({ title, items, lang }: Props) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const init = useCallback(() => {
    const deck: MemoryCard[] = shuffle([
      ...items.map(it => ({ id: `w-${it.word}`, type: 'word' as const, content: it.word, word: it.word, flipped: false, matched: false })),
      ...items.map(it => ({ id: `e-${it.word}`, type: 'emoji' as const, content: it.emoji, word: it.word, flipped: false, matched: false })),
    ]);
    setCards(deck);
    setSelected([]);
    setLocked(false);
    setMoves(0);
    setWon(false);
  }, [items]);

  useEffect(() => { init(); }, [init]);

  function flip(id: string) {
    if (locked) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;
    if (selected.length === 1 && selected[0] === id) return;

    const newSelected = [...selected, id];
    setCards(prev => prev.map(c => c.id === id ? { ...c, flipped: true } : c));

    if (newSelected.length === 2) {
      setMoves(m => m + 1);
      setLocked(true);
      const cardA = cards.find(c => c.id === newSelected[0])!;
      const cardB = cards.find(c => c.id === newSelected[1]) || { ...card, flipped: true };

      setTimeout(() => {
        if (cardA.word === cardB.word && cardA.type !== cardB.type) {
          setCards(prev => {
            const updated = prev.map(c =>
              newSelected.includes(c.id) ? { ...c, matched: true, flipped: true } : c
            );
            if (updated.every(c => c.matched)) setWon(true);
            return updated;
          });
        } else {
          setCards(prev => prev.map(c =>
            newSelected.includes(c.id) ? { ...c, flipped: false } : c
          ));
        }
        setSelected([]);
        setLocked(false);
      }, 900);
      setSelected(newSelected);
    } else {
      setSelected(newSelected);
    }
  }

  const matchedCount = cards.filter(c => c.matched).length / 2;

  return (
    <div className="bg-white rounded-2xl border border-purple-200 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-purple-700">🃏 {title}</h3>
        <span className="text-sm text-gray-500">{matchedCount}/{items.length} {lang === 'he' ? '\u05d6\u05d5\u05d2\u05d5\u05ea' : 'pairs'}</span>
      </div>

      {won ? (
        <div className="text-center py-8 space-y-3">
          <div className="text-5xl">🎉</div>
          <p className="text-xl font-bold text-green-600">
            {lang === 'he' ? `\u05db\u05dc \u05d4\u05db\u05d1\u05d5\u05d3! ${moves} \u05de\u05d4\u05dc\u05db\u05d9\u05dd` : `Amazing! ${moves} moves`}
          </p>
          <button onClick={init}
            className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 font-medium">
            {lang === 'he' ? '\ud83d\udd04 \u05e9\u05d7\u05e7 \u05e9\u05d5\u05d1' : '\ud83d\udd04 Play Again'}
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-2">
            {cards.map(card => (
              <button
                key={card.id}
                onClick={() => flip(card.id)}
                className={`h-16 rounded-xl text-center font-bold transition-all duration-200 border-2 text-lg
                  ${card.matched
                    ? 'bg-green-100 border-green-400 text-green-700 cursor-default'
                    : card.flipped
                    ? 'bg-purple-100 border-purple-400 text-purple-800'
                    : 'bg-purple-600 border-purple-700 text-white hover:bg-purple-700 cursor-pointer'
                  }`}
              >
                {card.flipped || card.matched ? card.content : '?'}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{lang === 'he' ? `\u05de\u05d4\u05dc\u05db\u05d9\u05dd: ${moves}` : `Moves: ${moves}`}</span>
            <button onClick={init} className="text-purple-500 hover:text-purple-700 underline text-xs">
              {lang === 'he' ? '\u05d4\u05ea\u05d7\u05dc \u05de\u05d7\u05d3\u05e9' : 'Restart'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
