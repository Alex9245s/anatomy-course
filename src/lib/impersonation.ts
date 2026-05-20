import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export async function getEffectiveUserId(realUserId: string): Promise<string> {
  const cookieStore = await cookies();
  const studentId = cookieStore.get('admin_impersonating')?.value;
  if (!studentId) return realUserId;

  const supabase = await createClient();
  const { data } = await supabase.from('profiles').select('role').eq('id', realUserId).single();
  if (data?.role === 'admin') return studentId;
  return realUserId;
}
