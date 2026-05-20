'use client';
import { useState } from 'react';

export default function Calculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNext, setWaitingForNext] = useState(false);

  function inputDigit(digit: string) {
    if (waitingForNext) {
      setDisplay(digit);
      setWaitingForNext(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }

  function inputDecimal() {
    if (waitingForNext) { setDisplay('0.'); setWaitingForNext(false); return; }
    if (!display.includes('.')) setDisplay(display + '.');
  }

  function calc(a: number, b: number, op: string): number {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '\u00d7') return a * b;
    if (op === '\u00f7') return b !== 0 ? a / b : 0;
    return b;
  }

  function handleOp(op: string) {
    const current = parseFloat(display);
    if (prevValue !== null && !waitingForNext) {
      const result = calc(prevValue, current, operation!);
      const rounded = parseFloat(result.toFixed(8));
      setDisplay(String(rounded));
      setPrevValue(rounded);
    } else {
      setPrevValue(current);
    }
    setOperation(op);
    setWaitingForNext(true);
  }

  function handleEquals() {
    if (prevValue === null || operation === null) return;
    const current = parseFloat(display);
    const result = calc(prevValue, current, operation);
    const rounded = parseFloat(result.toFixed(8));
    setDisplay(String(rounded));
    setPrevValue(null);
    setOperation(null);
    setWaitingForNext(true);
  }

  function handleClear() {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForNext(false);
  }

  function handleBackspace() {
    if (waitingForNext) return;
    const next = display.length > 1 ? display.slice(0, -1) : '0';
    setDisplay(next);
  }

  const btnClass = (type: 'num' | 'op' | 'eq' | 'clear') => {
    const base = 'flex items-center justify-center rounded-xl text-sm font-semibold h-10 transition-all active:scale-95 ';
    if (type === 'op')    return base + 'bg-orange-500 text-white hover:bg-orange-400';
    if (type === 'eq')    return base + 'bg-green-500 text-white hover:bg-green-400';
    if (type === 'clear') return base + 'bg-red-500 text-white hover:bg-red-400';
    return base + 'bg-gray-700 text-white hover:bg-gray-600';
  };

  return (
    <div className="fixed bottom-6 left-6 z-50" dir="ltr">
      {isOpen && (
        <div className="mb-3 bg-gray-900 rounded-2xl shadow-2xl p-3 w-52 select-none">
          <div className="bg-gray-800 rounded-xl px-3 py-2 mb-3 text-right font-mono text-xl text-white overflow-hidden min-h-[48px] flex flex-col items-end justify-center">
            {prevValue !== null && operation && (
              <span className="text-xs text-gray-400">{prevValue} {operation}</span>
            )}
            <span>{display}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <button className={btnClass('clear')} onClick={handleClear}>C</button>
            <button className={btnClass('num')}   onClick={handleBackspace}>⌫</button>
            <button className={btnClass('num')}   onClick={() => setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display)}>+/−</button>
            <button className={btnClass('op')}    onClick={() => handleOp('\u00f7')}>÷</button>
            {['7','8','9'].map(d => <button key={d} className={btnClass('num')} onClick={() => inputDigit(d)}>{d}</button>)}
            <button className={btnClass('op')} onClick={() => handleOp('\u00d7')}>×</button>
            {['4','5','6'].map(d => <button key={d} className={btnClass('num')} onClick={() => inputDigit(d)}>{d}</button>)}
            <button className={btnClass('op')} onClick={() => handleOp('-')}>−</button>
            {['1','2','3'].map(d => <button key={d} className={btnClass('num')} onClick={() => inputDigit(d)}>{d}</button>)}
            <button className={btnClass('op')} onClick={() => handleOp('+')}>+</button>
            <button className={`${btnClass('num')} col-span-2`} onClick={() => inputDigit('0')}>0</button>
            <button className={btnClass('num')} onClick={inputDecimal}>.</button>
            <button className={btnClass('eq')} onClick={handleEquals}>=</button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(o => !o)}
        className="bg-indigo-600 text-white rounded-full w-14 h-14 shadow-xl hover:bg-indigo-700 flex items-center justify-center text-2xl transition-all hover:scale-110"
        title="\u05de\u05d7\u05e9\u05d1\u05d5\u05df"
      >
        🧮
      </button>
    </div>
  );
}
