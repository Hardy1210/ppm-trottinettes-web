'use client';

const IntroBlock = () => (
  <section className="container py-16">
    <div
      className="max-w-3xl mx-auto text-center space-y-4 animate-fade-in opacity-0"
      style={{ animationDelay: '0.2s' }}
    >
      <div className="w-16 h-[2px] bg-primary mx-auto mb-6" />
      <p className="text-lg text-muted-foreground leading-relaxed">
        Notre sélection comprend des trottinettes neuves issues des meilleures
        marques, ainsi que des modèles d&apos;occasion soigneusement révisés en
        atelier. Chaque trottinette est contrôlée, testée et prête à rouler.
      </p>
      <p className="text-muted-foreground">
        Contactez-nous pour connaître la disponibilité, obtenir un conseil
        personnalisé ou réserver un modèle.
      </p>
    </div>
  </section>
);

export default IntroBlock;
