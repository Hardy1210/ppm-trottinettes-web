'use client';

import { IntroLoader } from '@/components/animations/intro/IntroLoader';
import ScrollIndicator from '@/components/animations/intro/ScrollIndicator';
import { Section } from '@/components/layout/Section';
import { useState } from 'react';
import { useIntroScrollReset } from './hooks/useIntroScrollReset';

export default function HomeClient() {
  const [introDone, setIntroDone] = useState(false);

  // 👇 Hook que controla scroll y reinicio seguro
  useIntroScrollReset(setIntroDone);

  return (
    <>
      <ScrollIndicator />
      {!introDone && (
        <IntroLoader
          onComplete={() => setIntroDone(true)}
          imageHref="/images/intro-texture.webp"
          brandYellow="#FFC700"
        />
      )}
      <Section className="">
        <div className=" text-white font-body">
          <div className="h-screen mx-auto flex w-full flex-col items-center justify-center px-6 py-20">
            <h1 className="mb-6 text-4xl font-title text-ppmYellow">
              Pile Power Mobilité
            </h1>

            <p className="mb-10 max-w-xl text-center text-lg opacity-80">
              Test des nouveaux styles Tailwind v4 avec couleurs personnalisées,
              container et typographie.
            </p>

            <div className="flex gap-4">
              <button className="rounded-lg bg-ppmYellow px-6 py-3 font-semibold text-black transition hover:opacity-80">
                Bouton primaire
              </button>

              <button className="rounded-lg border border-ppmYellow px-6 py-3 text-ppmYellow transition hover:bg-ppmYellow hover:text-black">
                Bouton secondaire
              </button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
