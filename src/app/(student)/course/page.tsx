import { createClient } from '@/lib/supabase/server';
import CourseClient from './CourseClient';

export default async function CoursePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: topics }, { data: progress }, { data: scores }] = await Promise.all([
    supabase.from('topics').select('*, lessons(id, title_he, title_en, order_index)').order('order_index'),
    supabase.from('student_progress').select('lesson_id').eq('user_id', user!.id),
    supabase.from('student_scores').select('assessment_type, reference_id, score, max_score').eq('user_id', user!.id),
  ]);

  return <CourseClient topics={topics ?? []} progress={progress ?? []} scores={scores ?? []} />;
}
