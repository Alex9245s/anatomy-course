'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import type { Lang } from '@/types';

interface LangContextType { lang: Lang; setLang: (l: Lang) => void; }
const LangContext = createContext<LangContextType>({ lang: 'he', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('he');
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() { return useContext(LangContext); }
