import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import StudentNav from '@/components/layout/StudentNav';
import ImpersonationBanner from '@/components/layout/ImpersonationBanner';

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const cookieStore = await cookies();
  const impersonatingId = cookieStore.get('admin_impersonating')?.value;
  let banner: React.ReactNode = null;

  if (impersonatingId) {
    const { data: adminProfile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single();
    if (adminProfile?.role === 'admin') {
      const { data: student } = await supabase
        .from('profiles').select('full_name').eq('id', impersonatingId).single();
      banner = <ImpersonationBanner studentName={student?.full_name ?? 'תלמיד'} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {banner}
      <div className={banner ? 'pt-10' : ''}>
        <StudentNav userId={user.id} userEmail={user.email ?? ''} />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  );
}
