'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import type { LessonImage, Question } from '@/types';

interface Props {
  lesson: { id: string; title_he: string; title_en: string; content_he: string | null; content_en: string | null; topics: { title_he: string; title_en: string } | null };
  images: LessonImage[];
  questions: Question[];
  isCompleted: boolean;
  userId: string;
}

export default function LessonClient({ lesson, images, questions, isCompleted, userId }: Props) {
  const { lang } = useLang();
  const router = useRouter();
  const [imgIndex, setImgIndex] = useState(0);
  const [completed, setCompleted] = useState(isCompleted);
  const [saving, setSaving] = useState(false);

  async function markComplete() {
    if (completed) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from('student_progress').upsert({ user_id: userId, lesson_id: lesson.id });
    setCompleted(true);
    setSaving(false);
  }

  const title = lang === 'he' ? lesson.title_he : lesson.title_en;
  const content = lang === 'he' ? lesson.content_he : lesson.content_en;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/course" className="text-gray-400 hover:text-blue-600">←</Link>
        <div>
          <p className="text-xs text-gray-400">{lesson.topics ? (lang === 'he' ? lesson.topics.title_he : lesson.topics.title_en) : ''}</p>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
      </div>

      {images.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="relative bg-gray-100 h-72">
            <Image src={images[imgIndex].image_url} alt={lang === 'he' ? (images[imgIndex].caption_he ?? '') : (images[imgIndex].caption_en ?? '')}
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
        <div className="bg-white rounded-2xl border border-gray-200 p-6 prose prose-blue max-w-none">
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{content}</p>
        </div>
      )}

      <div className="flex gap-4 items-center">
        {!completed ? (
          <button onClick={markComplete} disabled={saving}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50">
            {saving ? tr('saving', lang) : tr('completed', lang)}
          </button>
        ) : (
          <span className="bg-green-100 text-green-700 px-6 py-3 rounded-xl font-medium border border-green-300">
            {tr('completed', lang)}
          </span>
        )}
        {completed && questions.length > 0 && (
          <Link href={`/quiz/${lesson.id}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700">
            {tr('takeQuiz', lang)} →
          </Link>
        )}
      </div>
    </div>
  );
}
