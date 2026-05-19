import { createClient } from '@/lib/supabase/server';
import AdminTopicsClient from './AdminTopicsClient';

export default async function AdminTopicsPage() {
  const supabase = await createClient();
  const { data: topics } = await supabase.from('topics').select('*, lessons(id, title_he, title_en, order_index)').order('order_index');
  return <AdminTopicsClient topics={topics ?? []} />;
}
