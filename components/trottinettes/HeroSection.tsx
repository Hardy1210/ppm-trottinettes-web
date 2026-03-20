'use client';

import { Button } from '@/components/ui/button';
import heroImage from '@/public/images/scooter-hero.webp';
import { ChevronDown, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  const scrollToCatalog = () => {
    document
      .getElementById('catalogue')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Trottinette électrique"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/40" />
      </div>

      {/* Diagonal geometric accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-[-12deg] translate-x-20" />

      <div className="container relative z-10 py-20">
        <div className="max-w-2xl space-y-6">
          <div
            className="inline-block animate-fade-in opacity-0"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="badge-neuf rounded-sm text-xs">
              Catalogue 2025
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1] animate-fade-in opacity-0"
            style={{ animationDelay: '0.2s' }}
          >
            Trottinettes
          </h1>

          <p
            className="text-xl md:text-2xl text-muted-foreground font-light animate-fade-in opacity-0"
            style={{ animationDelay: '0.3s' }}
          >
            Sélection de modèles neufs et d&apos;occasion
          </p>

          <p
            className="text-sm text-muted-foreground tracking-wide uppercase animate-fade-in opacity-0"
            style={{ animationDelay: '0.4s' }}
          >
            Disponibles rapidement&ensp;•&ensp;Révisées&ensp;•&ensp;Conseils
            atelier
          </p>

          <div
            className="flex flex-wrap gap-4 pt-4 animate-fade-in opacity-0"
            style={{ animationDelay: '0.5s' }}
          >
            <Button
              size="lg"
              onClick={scrollToCatalog}
              className="gap-2 font-display font-semibold"
            >
              Voir le catalogue
              <ChevronDown className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 font-display">
              <MessageCircle className="w-4 h-4" />
              Nous contacter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
