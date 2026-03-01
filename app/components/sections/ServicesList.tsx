import { Section } from '@/app/components/layout/Section';
import { GhostArrowButton } from '@/app/components/ui/buttons';

export type ServiceItem = {
  _id: string;
  title: string;
  priceLabel?: string; // "À partir de..."
  description?: string;
  order: number;
};

export function ServicesList({ items }: { items: ServiceItem[] }) {
  return (
    <Section id="services" className="py-14 md:py-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="font-title text-2xl md:text-4xl">Nos services</h2>
          <p className="mt-3 text-white/60 max-w-xl">
            Liste gérée par Sanity (ton client peut changer texte/prix/ordre).
          </p>
        </div>

        <div className="hidden md:block">
          <GhostArrowButton href="#contact">Demander un devis</GhostArrowButton>
        </div>
      </div>

      <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
        {items
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((s) => (
            <div
              key={s._id}
              className="flex items-start justify-between gap-6 p-5 md:p-6"
            >
              <div className="max-w-2xl">
                <h3 className="font-title text-lg">{s.title}</h3>
                {s.description ? (
                  <p className="mt-2 text-white/60">{s.description}</p>
                ) : null}
              </div>
              {s.priceLabel ? (
                <p className="font-title text-sm text-white/70 whitespace-nowrap">
                  {s.priceLabel}
                </p>
              ) : (
                <span className="text-white/30">—</span>
              )}
            </div>
          ))}
      </div>

      <div className="mt-8 md:hidden">
        <GhostArrowButton href="#contact">Demander un devis</GhostArrowButton>
      </div>
    </Section>
  );
}
