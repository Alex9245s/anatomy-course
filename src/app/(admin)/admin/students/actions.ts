'use server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase/server';

export async function setStudentPassword(userId: string, password: string): Promise<{ error?: string }> {
  if (!password || password.length < 6) {
    return { error: 'סיסמה חייבת להיות לפחות 6 תווים' };
  }

  // Verify caller is admin
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'לא מחובר' };

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || profile.role !== 'admin') return { error: 'אין הרשאה' };

  // Use service role to update password
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await adminClient.auth.admin.updateUserById(userId, { password });
  if (error) return { error: error.message };

  return {};
}
