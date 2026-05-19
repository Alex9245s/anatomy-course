import { createClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: topics }, { data: progress }, { data: scores }, { data: profile }] = await Promise.all([
    supabase.from('topics').select('id, title_he, title_en, lessons(id)').order('order_index'),
    supabase.from('student_progress').select('lesson_id').eq('user_id', user!.id),
    supabase.from('student_scores').select('*').eq('user_id', user!.id),
    supabase.from('profiles').select('full_name').eq('id', user!.id).single(),
  ]);

  const completedLessons = progress?.length ?? 0;
  const totalLessons = topics?.reduce((s, t) => s + (t.lessons?.length ?? 0), 0) ?? 0;
  const completedTopics = topics?.filter(t =>
    (t.lessons as {id:string}[] ?? []).every(l => progress?.some(p => p.lesson_id === l.id))
  ).length ?? 0;
  const finalScore = scores?.find(s => s.assessment_type === 'final');

  return (
    <DashboardClient
      userName={profile?.full_name ?? user!.email ?? ''}
      completedLessons={completedLessons}
      totalLessons={totalLessons}
      completedTopics={completedTopics}
      totalTopics={topics?.length ?? 0}
      finalScore={finalScore ?? null}
    />
  );
}
