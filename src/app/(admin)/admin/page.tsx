import { createClient } from '@/lib/supabase/server';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminPage() {
  const supabase = await createClient();
  const [{ count: students }, { count: topics }, { count: lessons }] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
    supabase.from('topics').select('*', { count: 'exact', head: true }),
    supabase.from('lessons').select('*', { count: 'exact', head: true }),
  ]);
  return <AdminDashboardClient students={students ?? 0} topics={topics ?? 0} lessons={lessons ?? 0} />;
}
