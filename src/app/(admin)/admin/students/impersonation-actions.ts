'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function startImpersonation(studentId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/dashboard');

  const cookieStore = await cookies();
  cookieStore.set('admin_impersonating', studentId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  });
  redirect('/dashboard');
}

export async function stopImpersonation() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_impersonating');
  redirect('/admin/students');
}
