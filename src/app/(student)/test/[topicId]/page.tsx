import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AssessmentClient from '@/components/assessment/AssessmentClient';

export default async function TestPage({ params }: { params: { topicId: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const [{ data: questions }, { data: topic }] = await Promise.all([
    supabase.from('questions').select('*').eq('topic_id', params.topicId).eq('type', 'test').order('order_index'),
    supabase.from('topics').select('title_he, title_en').eq('id', params.topicId).single(),
  ]);
  if (!topic) notFound();
  return (
    <AssessmentClient
      questions={questions ?? []}
      title_he={'בחן נושא: ' + topic.title_he}
      title_en={'Topic Test: ' + topic.title_en}
      type="test"
      referenceId={params.topicId}
      userId={user!.id}
      backHref="/course"
      passingPct={60}
    />
  );
}
