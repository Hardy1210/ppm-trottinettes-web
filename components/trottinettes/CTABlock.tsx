'use client';
import { PrimaryButton } from '@/ui/Buttons';
import { MessageCircle } from 'lucide-react';

const CTABlock = () => (
  <section className="container py-20 max-w-container mx-auto px-5 xl:px-0">
    <div className="relative bg-card border border-border rounded-lg p-10 md:p-16 text-center overflow-hidden">
      {/* Geometric accents */}
      <div className="absolute top-0 left-0 w-32 h-120 bg-primary/5 -translate-x-1/2 -translate-y-1/2 rotate-[30deg]" />
      <div className="absolute bottom-0 right-0 w-48 h-120 bg-primary/5 translate-x-1/3 translate-y-1/3 rotate-[30deg]" />

      <div className="relative z-10 max-w-xl mx-auto space-y-5">
        <h2 className="text-brandBbgSecondary text-3xl md:text-4xl font-bold font-title">
          Besoin d’un conseil avant de choisir ?
        </h2>
        <p className="text-muted-foreground text-lg font-body">
          Dites-nous votre usage (trajet, poids, budget) et on vous oriente.
        </p>
        <PrimaryButton
          href="mailto:tonmail@example.com?subject=Demande%20de%20contact"
          className="gap-2 font-display font-semibold mt-4"
        >
          <MessageCircle className="w-4 h-4" />
          Nous contacter
        </PrimaryButton>
      </div>
    </div>
  </section>
);

export default CTABlock;
