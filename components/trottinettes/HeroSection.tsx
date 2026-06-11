'use client';

import heroImage from '@/public/images/scooter-hero.webp';
import { PrimaryButton } from '@/ui/Buttons';
import { ChevronDown, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { BadgeCheck } from '../icons/BadgeCheck';
import { Shieldd } from '../icons/Shieldd';
import { Wrench } from '../icons/Wrench';

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    document.getElementById(id)?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  const scrollToCatalog = () => scrollToSection('catalogue');
  const scrollToSpare = () => scrollToSection('spare');

  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden px-5 mt-10">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          priority
          alt="Trottinette électrique"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/40" />
      </div>

      {/* Diagonal geometric accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-[-12deg] translate-x-20" />

      <div className="container relative z-10 max-w-container mx-auto">
        <div className="max-w-2xl space-y-12">
          <h1
            className=" text-[clamp(1.85rem,8vw,4.8rem)] font-title text-ppmYellow leading-[1.3] animate-fade-in opacity-0"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="sr-only">Catalogue trottinettes électriques & pièces détachées — Dijon — </span>
            NOS TROTTINETTES
          </h1>
          {/*iconos */}
          <div
            className="flex w-full items-center gap-[clamp(2rem,2vw,2rem)] animate-fade-in opacity-0"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex items-center gap-[clamp(0.35rem,1vw,0.75rem)]">
              <BadgeCheck className="h-[clamp(1rem,1.5vw,1.4rem)] w-[clamp(1rem,1.5vw,1.4rem)] shrink-0 text-ppmYellow" />
              <span className="text-[clamp(0.75rem,1.2vw,1.1rem)] font-medium uppercase tracking-[0.14em] text-slate-300">
                Testées
              </span>
            </div>

            <div className="flex items-center gap-[clamp(0.35rem,1vw,0.75rem)]">
              <Wrench className="h-[clamp(1rem,1.5vw,1.4rem)] w-[clamp(1rem,1.5vw,1.4rem)] shrink-0 text-ppmYellow" />
              <span className="text-[clamp(0.75rem,1.2vw,1.1rem)] font-medium uppercase tracking-[0.14em] text-slate-300">
                Révisées
              </span>
            </div>

            <div className="flex items-center gap-[clamp(0.35rem,1vw,0.75rem)]">
              <Shieldd className="h-[clamp(1rem,1.5vw,1.4rem)] w-[clamp(1rem,1.5vw,1.4rem)] shrink-0 text-ppmYellow" />
              <span className="text-[clamp(0.75rem,1.2vw,1.1rem)] font-medium uppercase tracking-[0.14em] text-slate-300">
                Garanties
              </span>
            </div>
          </div>

          <p
            className="text-[clamp(1.45rem,2vw,1.5rem)] text-muted-foreground font-body font-light leading-tight animate-fade-in opacity-0"
            style={{ animationDelay: '0.4s' }}
          >
            Profitez de la liberté urbaine avec nos trottinettes d’occasion
            contrôlées, performantes et prêtes à rouler. Économiques,
            écologiques et garanties.
          </p>

          <p
            className="hidden sm:block text-sm text-muted-foreground font-body tracking-wide uppercase animate-fade-in opacity-0"
            style={{ animationDelay: '0.5s' }}
          >
            Disponibles rapidement&ensp;•&ensp;Révisées&ensp;•&ensp;Conseils
            atelier
          </p>

          <div
            className="flex flex-wrap gap-10 pt-4 animate-fade-in opacity-0 justify-center"
            style={{ animationDelay: '0.6s' }}
          >
            <PrimaryButton
              onClick={scrollToCatalog}
              className="gap-2 font-title font-semibold"
            >
              Voir le catalogue
              <ChevronDown className="w-4 h-4" />
            </PrimaryButton>
            <PrimaryButton
              onClick={scrollToSpare}
              className="gap-2 border-4 border-neutral-500 bg-transparent font-title text-neutral-300"
            >
              <MessageCircle className="w-4 h-4" />
              Pièces détachées
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
