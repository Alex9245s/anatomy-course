import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AdminLessonDetailClient from './AdminLessonDetailClient';

export default async function LessonDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const [{ data: lesson }, { data: images }, { data: questions }] = await Promise.all([
    supabase.from('lessons').select('*, topics(id, title_he)').eq('id', params.id).single(),
    supabase.from('lesson_images').select('*').eq('lesson_id', params.id).order('order_index'),
    supabase.from('questions').select('*').eq('lesson_id', params.id).order('order_index'),
  ]);
  if (!lesson) notFound();
  return <AdminLessonDetailClient lesson={lesson} images={images ?? []} questions={questions ?? []} />;
}
