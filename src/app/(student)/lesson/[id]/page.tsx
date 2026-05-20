import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import LessonClient from './LessonClient';

export default async function LessonPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: lesson }, { data: images }, { data: questions }, { data: progress }, { data: exercises }, { data: miniGames }] = await Promise.all([
    supabase.from('lessons').select('*, topics(title_he, title_en)').eq('id', params.id).single(),
    supabase.from('lesson_images').select('*').eq('lesson_id', params.id).order('order_index'),
    supabase.from('questions').select('*').eq('lesson_id', params.id).eq('type', 'quiz').order('order_index'),
    supabase.from('student_progress').select('id').eq('user_id', user!.id).eq('lesson_id', params.id).maybeSingle(),
    supabase.from('lesson_exercises').select('*').eq('lesson_id', params.id).order('order_index'),
    supabase.from('mini_games').select('*').eq('lesson_id', params.id).order('order_index'),
  ]);

  if (!lesson) notFound();
  return (
    <LessonClient
      lesson={lesson}
      images={images ?? []}
      questions={questions ?? []}
      exercises={exercises ?? []}
      miniGames={miniGames ?? []}
      isCompleted={!!progress}
      userId={user!.id}
    />
  );
}
