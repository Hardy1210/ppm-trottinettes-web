'use client';

import { IntroLoader } from '@/components/animations/intro/IntroLoader';
import ScrollIndicator from '@/components/animations/intro/ScrollIndicator';
import { Section } from '@/components/layout/Section';
import { HeroBackdrop } from '@/components/sections/HeroBackdrop';
import { useIntroScrollReset } from '@/hooks/useIntroScrollReset';
import { PrimaryButton } from '@/ui/Buttons';
import gsap from 'gsap';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

export default function HomeClient() {
  const [introDone, setIntroDone] = useState(false);

  const heroRef = useRef<HTMLDivElement | null>(null);

  useIntroScrollReset(setIntroDone);

  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const items = heroRef.current!.querySelectorAll('[data-hero-item]');

      gsap.from(items, {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ScrollIndicator />

      {!introDone && (
        <IntroLoader
          imageHref="/images/intro-texture.webp"
          brandYellow="#FFC700"
        />
      )}

      <Section className="hero">
        <div ref={heroRef} className="text-white font-body">
          <div className="h-screen mx-auto flex w-full flex-col items-center justify-center px-6 py-20">
            <h1
              data-hero-item
              className="mb-6 text-4xl font-title text-ppmYellow"
            >
              Pile Power Mobilité
            </h1>

            <p
              data-hero-item
              className="mb-10 max-w-xl text-center text-lg opacity-80"
            >
              Test des nouveaux styles Tailwind v4 avec couleurs personnalisées,
              container et typographie.
            </p>

            <div data-hero-item className="flex gap-4">
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
      <Section
        aria-label="Hero Pile Power Mobilité"
        className="relative overflow-hidden bg-ppm-bg text-white"
      >
        {/* Backdrop shapes */}
        <HeroBackdrop />

        {/* Content wrapper */}
        <div className="relative z-10 grid min-h-svh grid-cols-1 items-start gap-10 pb-10 pt-10 md:grid-cols-2 md:items-center md:gap-12 md:py-20">
          {/* Left column */}
          <div className="flex flex-col">
            {/* (En tu screenshot móvil hay logo + icono menú arriba; navbar lo haces luego)
              Igual te dejo un placeholder superior para que no te rompa el layout. */}
            <div className="mb-10 flex items-center justify-between md:hidden">
              <div className="flex items-center gap-2" aria-label="PPM logo">
                <span
                  className="inline-block h-6 w-6 rounded-full bg-ppm-yellow"
                  aria-hidden="true"
                />
                <span className="text-lg font-semibold tracking-wide">PPM</span>
              </div>
              <button
                type="button"
                aria-label="Open menu"
                className="rounded-md p-2 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-ppm-yellow"
              >
                {/* icon simple */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="opacity-90"
                >
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <h1
              className="
              font-title
              text-[clamp(2.8rem,8vw,4.8rem)]
              leading-[1.1]
              tracking-wide
            "
            >
              Pile
              <br />
              Power
              <br />
              Mobilité
            </h1>

            <p
              className="
              mt-6 max-w-[42ch]
              font-body text-white/85
              text-[clamp(1rem,2.6vw,1.9rem)]
              
              leading-tight
            "
            >
              Nous accompagnons chaque utilisateur avec des solutions fiables,
              rapides et adaptées pour garantir performance et sécurité au
              quotidien.
            </p>

            {/* Desktop CTA sits under text (mobile CTA goes bottom like screenshot) */}
            <div className="mt-12 hidden md:block">
              <PrimaryButton
                href="#contact"
                ariaLabel="Prendre rendez-vous"
                className="min-w-[220px]"
              >
                Prendre RV
              </PrimaryButton>
            </div>
          </div>

          {/* Right / center media */}
          <div className="relative flex items-center justify-center md:justify-end">
            <div
              className="
              relative
              w-full max-w-[420px]
              md:max-w-[520px]
            "
              aria-label="Illustrations"
            >
              {/* “Circle” container like screenshot */}
              <div
                className="
                relative aspect-square w-full
                
              "
              >
                {/* Top image (scooter) */}
                <div
                  className="
                  absolute left-1/2 top-[18%]
                  w-[82%]
                  -translate-x-1/2
                  drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]
                  md:left-auto md:right-0 md:top-[10%] md:translate-x-0
                  md:w-[78%]
                "
                  style={{
                    clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
                  }}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-sm">
                    <Image
                      src="/images/hero-t.webp"
                      alt="Trottinette électrique en atelier"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Bottom image (repair) */}
                <div
                  className="
                  absolute left-1/2 bottom-[6%]
                  w-[82%]
                  -translate-x-1/2
                  drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]
                  md:left-auto md:right-0 md:bottom-[0%] md:translate-x-0
                  md:w-[78%]
                "
                  style={{
                    clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
                  }}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-sm">
                    <Image
                      src="/images/hero-b.webp"
                      alt="Réparation et maintenance de trottinette"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile CTA at bottom centered wide (like screenshot) */}
          <div className="md:hidden">
            <PrimaryButton
              href="#contact"
              ariaLabel="Prendre rendez-vous"
              className="mx-auto w-full max-w-[360px]"
            >
              Prendre RV
            </PrimaryButton>
          </div>
        </div>
      </Section>
    </>
  );
}
