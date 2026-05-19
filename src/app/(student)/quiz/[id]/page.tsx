import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AssessmentClient from '@/components/assessment/AssessmentClient';

export default async function QuizPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const [{ data: questions }, { data: lesson }] = await Promise.all([
    supabase.from('questions').select('*').eq('lesson_id', params.id).eq('type', 'quiz').order('order_index'),
    supabase.from('lessons').select('title_he, title_en').eq('id', params.id).single(),
  ]);
  if (!lesson) notFound();
  return (
    <AssessmentClient
      questions={questions ?? []}
      title_he={'חידון: ' + lesson.title_he}
      title_en={'Quiz: ' + lesson.title_en}
      type="quiz"
      referenceId={params.id}
      userId={user!.id}
      backHref={`/lesson/${params.id}`}
    />
  );
}
