import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getEffectiveUserId } from '@/lib/impersonation';
import CourseClient from './CourseClient';

export default async function CoursePage({ searchParams }: { searchParams: { courseId?: string } }) {
  const courseId = searchParams.courseId;
  if (!courseId) redirect('/dashboard');

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = await getEffectiveUserId(user!.id);

  const [{ data: course }, { data: topics }, { data: progress }, { data: scores }] = await Promise.all([
    supabase.from('courses').select('*').eq('id', courseId).single(),
    supabase.from('topics').select('*, lessons(id, title_he, title_en, order_index)').eq('course_id', courseId).order('order_index'),
    supabase.from('student_progress').select('lesson_id').eq('user_id', userId),
    supabase.from('student_scores').select('assessment_type, reference_id, score, max_score').eq('user_id', userId),
  ]);

  if (!course) redirect('/dashboard');

  return (
    <CourseClient
      course={course}
      topics={topics ?? []}
      progress={progress ?? []}
      scores={scores ?? []}
    />
  );
}
