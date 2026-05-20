'use server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase/server';

export async function setStudentPassword(userId: string, password: string): Promise<{ error?: string }> {
  if (!password || password.length < 6) {
    return { error: '\u05e1\u05d9\u05e1\u05de\u05d4 \u05d7\u05d9\u05d9\u05d1\u05ea \u05dc\u05d4\u05d9\u05d5\u05ea \u05dc\u05e4\u05d7\u05d5\u05ea 6 \u05ea\u05d5\u05d5\u05d9\u05dd' };
  }

  try {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: '\u05dc\u05d0 \u05de\u05d7\u05d5\u05d1\u05e8' };

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (!profile || profile.role !== 'admin') return { error: '\u05d0\u05d9\u05df \u05d4\u05e8\u05e9\u05d0\u05d4' };

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) return { error: 'SUPABASE_SERVICE_ROLE_KEY \u05d7\u05e1\u05e8 \u05d1\u05e1\u05d1\u05d9\u05d1\u05d4' };

    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey
    );

    const { error } = await adminClient.auth.admin.updateUserById(userId, { password });
    if (error) return { error: error.message };

    return {};
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : '\u05e9\u05d2\u05d9\u05d0\u05d4 \u05dc\u05d0 \u05d9\u05d3\u05d5\u05e2\u05d4';
    return { error: msg };
  }
}
