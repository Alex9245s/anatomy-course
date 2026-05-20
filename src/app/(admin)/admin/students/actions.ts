'use server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase/server';

async function getAdminClient() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'לא מחובר' as string, adminClient: null };

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || profile.role !== 'admin') return { error: 'אין הרשאה' as string, adminClient: null };

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return { error: 'SUPABASE_SERVICE_ROLE_KEY חסר' as string, adminClient: null };

  const adminClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey);
  return { error: null, adminClient };
}

export async function setStudentPassword(userId: string, password: string): Promise<{ error?: string }> {
  if (!password || password.length < 6) return { error: 'סיסמה חייבת להיות לפחות 6 תווים' };
  const { error: authError, adminClient } = await getAdminClient();
  if (authError || !adminClient) return { error: authError! };

  const { error } = await adminClient.auth.admin.updateUserById(userId, { password });
  if (error) return { error: error.message };
  return {};
}

export async function setStudentUsername(userId: string, username: string): Promise<{ error?: string }> {
  const trimmed = username.trim().toLowerCase().replace(/\s+/g, '_');
  if (!trimmed || trimmed.length < 2) return { error: 'שם משתמש חייב להכיל לפחות 2 תווים' };
  if (!/^[a-z0-9_.\u0590-\u05FF]+$/.test(trimmed)) return { error: 'שם משתמש יכול להכיל אותיות, מספרים, _ ו-.' };

  const { error: authError, adminClient } = await getAdminClient();
  if (authError || !adminClient) return { error: authError! };

  const { error } = await adminClient.from('profiles').update({ username: trimmed }).eq('id', userId);
  if (error) {
    if (error.code === '23505') return { error: 'שם המשתמש הזה כבר תפוס' };
    return { error: error.message };
  }
  return {};
}

export async function lookupEmailByUsername(username: string): Promise<{ email?: string; error?: string }> {
  const trimmed = username.trim().toLowerCase();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return { error: 'שגיאת שרת' };

  const adminClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey);
  const { data, error } = await adminClient
    .from('profiles')
    .select('email')
    .eq('username', trimmed)
    .single();

  if (error || !data?.email) return { error: 'שם משתמש לא נמצא' };
  return { email: data.email };
}
