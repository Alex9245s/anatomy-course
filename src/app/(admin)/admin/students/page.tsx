import { createClient } from '@/lib/supabase/server';
import StudentsClient from './StudentsClient';

export default async function StudentsPage() {
  const supabase = await createClient();
  const [{ data: profiles }, { data: scores }, { data: progress }] = await Promise.all([
    supabase.from('profiles').select('*').eq('role', 'student').order('created_at'),
    supabase.from('student_scores').select('*').order('completed_at'),
    supabase.from('student_progress').select('*'),
  ]);
  return <StudentsClient profiles={profiles ?? []} scores={scores ?? []} progress={progress ?? []} />;
}
