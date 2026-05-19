import { createClient } from '@/lib/supabase/server';
import AssessmentClient from '@/components/assessment/AssessmentClient';

export default async function ExamPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: questions } = await supabase.from('questions').select('*').eq('type', 'final').order('order_index');
  return (
    <AssessmentClient
      questions={questions ?? []}
      title_he="מבחן מסכם"
      title_en="Final Exam"
      type="final"
      referenceId={null}
      userId={user!.id}
      backHref="/course"
      passingPct={70}
    />
  );
}
