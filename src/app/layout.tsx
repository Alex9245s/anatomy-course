import type { Metadata } from 'next';
import './globals.css';
import { LangProvider } from '@/contexts/LangContext';

export const metadata: Metadata = {
  title: 'קורס אנטומיה',
  description: 'לומדים אנטומיה בקלות',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
