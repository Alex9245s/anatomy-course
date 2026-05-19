import { createClient } from '@/lib/supabase/server';
import ScoresClient from './ScoresClient';

export default async function ScoresPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: scores } = await supabase.from('student_scores').select('*').eq('user_id', user!.id).order('completed_at', { ascending: false });
  return <ScoresClient scores={scores ?? []} />;
}
