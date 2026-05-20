'use client';
import { stopImpersonation } from '@/app/(admin)/admin/students/impersonation-actions';

export default function ImpersonationBanner({ studentName }: { studentName: string }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[999] bg-amber-500 text-white px-4 py-2 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2">
        <span className="text-lg">👁️</span>
        <span className="text-sm">
          {' '}צופה כ: <strong>{studentName}</strong>{' '}
          <span className="text-amber-200 text-xs">(מצב תצוגה בלבד)</span>
        </span>
      </div>
      <form action={stopImpersonation}>
        <button
          type="submit"
          className="bg-white text-amber-700 px-4 py-1 rounded-lg text-sm font-bold hover:bg-amber-50 transition-colors"
        >
          ← חזור לניהול
        </button>
      </form>
    </div>
  );
}
