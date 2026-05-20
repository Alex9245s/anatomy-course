import { createClient } from '@/lib/supabase/server';
import StudentsClient from './StudentsClient';

export default async function StudentsPage() {
  const supabase = await createClient();
  const [
    { data: profiles },
    { data: scores },
    { data: progress },
    { data: lessons },
    { data: topics },
  ] = await Promise.all([
    supabase.from('profiles').select('*').eq('role', 'student').order('created_at'),
    supabase.from('student_scores').select('*').order('completed_at'),
    supabase.from('student_progress').select('*').order('completed_at'),
    supabase.from('lessons').select('id, title_he, title_en, topic_id, order_index').order('order_index'),
    supabase.from('topics').select('id, title_he, title_en, order_index').order('order_index'),
  ]);
  return (
    <StudentsClient
      profiles={profiles ?? []}
      scores={scores ?? []}
      progress={progress ?? []}
      lessons={lessons ?? []}
      topics={topics ?? []}
    />
  );
}
