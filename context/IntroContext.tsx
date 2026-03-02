'use client';

import { createContext, useContext, useState } from 'react';

type IntroContextType = {
  introDoneLogo: boolean;
  setIntroDoneLogo: (v: boolean) => void;
};

const IntroContext = createContext<IntroContextType | null>(null);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introDoneLogo, setIntroDoneLogo] = useState(false);

  return (
    <IntroContext.Provider value={{ introDoneLogo, setIntroDoneLogo }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) throw new Error('useIntro must be used inside IntroProvider');
  return ctx;
}
