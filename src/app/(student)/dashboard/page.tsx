import { createClient } from '@/lib/supabase/server';
import { getEffectiveUserId } from '@/lib/impersonation';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = await getEffectiveUserId(user!.id);

  const [{ data: courses }, { data: progress }, { data: profile }] = await Promise.all([
    supabase.from('courses').select('*, topics(id, lessons(id))').order('order_index'),
    supabase.from('student_progress').select('lesson_id').eq('user_id', userId),
    supabase.from('profiles').select('full_name').eq('id', userId).single(),
  ]);

  return (
    <DashboardClient
      userName={profile?.full_name ?? user!.email ?? ''}
      courses={courses ?? []}
      completedLessonIds={progress?.map(p => p.lesson_id) ?? []}
    />
  );
}
