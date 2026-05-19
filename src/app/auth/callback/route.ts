import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const nextPathParam = searchParams.get('next');
  const safeNextPath = nextPathParam && nextPathParam.startsWith('/') && !nextPathParam.startsWith('//')
    ? nextPathParam
    : '/dashboard';

  if (!code) {
    return NextResponse.redirect(`${origin}/login?message=auth-missing-code`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login?message=auth-error`);
  }

  return NextResponse.redirect(`${origin}${safeNextPath}`);
}
