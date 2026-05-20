'use client';
import React from 'react';

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|<u>(.+?)<\/u>)/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[0].startsWith('**'))   parts.push(<strong key={key++}>{match[2]}</strong>);
    else if (match[0].startsWith('*'))   parts.push(<em key={key++}>{match[3]}</em>);
    else if (match[0].startsWith('<u>')) parts.push(<u key={key++}>{match[4]}</u>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default function ContentRenderer({ content, className }: { content: string; className?: string }) {
  const base = `prose prose-blue max-w-none ${className ?? ''}`;

  if (content.trimStart().startsWith('<')) {
    return (
      <div
        className={base}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div className={base}>
      {content.split('\n').map((line, i) => {
        if (line.startsWith('## '))
          return <h2 key={i} className="text-xl font-bold text-gray-900 mt-6 mb-2">{renderInline(line.slice(3))}</h2>;
        if (line.startsWith('### '))
          return <h3 key={i} className="text-lg font-semibold text-gray-800 mt-4 mb-1">{renderInline(line.slice(4))}</h3>;
        if (line.startsWith('> '))
          return <blockquote key={i} className="border-l-4 border-blue-500 pl-4 italic text-blue-800 bg-blue-50 py-2 rounded-r-xl my-2">{renderInline(line.slice(2))}</blockquote>;
        if (line.startsWith('---'))
          return <hr key={i} className="my-4 border-gray-200" />;
        if (line.startsWith('| ')) return null;
        if (line === '') return <div key={i} className="h-2" />;
        if (line.startsWith(':::center '))
          return <p key={i} style={{ textAlign: 'center' }} className="text-gray-700 leading-relaxed">{renderInline(line.slice(10))}</p>;
        if (line.startsWith(':::right '))
          return <p key={i} style={{ textAlign: 'right' }} className="text-gray-700 leading-relaxed">{renderInline(line.slice(9))}</p>;
        if (line.startsWith(':::left '))
          return <p key={i} style={{ textAlign: 'left' }} className="text-gray-700 leading-relaxed">{renderInline(line.slice(8))}</p>;

        const startsHebrew = /[\u0590-\u05FF]/.test(line.trimStart()[0] ?? '');
        const isLtr = !startsHebrew || /^\u2192|^[0-9(]/.test(line.trimStart());
        return (
          <p key={i} dir={isLtr ? 'ltr' : 'rtl'} className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {renderInline(line)}
          </p>
        );
      })}
    </div>
  );
}
