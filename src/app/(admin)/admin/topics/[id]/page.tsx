import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AdminTopicDetailClient from './AdminTopicDetailClient';

export default async function TopicDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const [{ data: topic }, { data: lessons }] = await Promise.all([
    supabase.from('topics').select('*').eq('id', params.id).single(),
    supabase.from('lessons').select('*').eq('topic_id', params.id).order('order_index'),
  ]);
  if (!topic) notFound();
  return <AdminTopicDetailClient topic={topic} lessons={lessons ?? []} />;
}
