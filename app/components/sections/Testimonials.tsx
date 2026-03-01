import { Section } from '@/app/components/layout/Section';

export type Testimonial = {
  _id: string;
  name: string;
  role?: string;
  quote: string;
};

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <Section className="py-14 md:py-20">
      <div className="flex items-end justify-between gap-6">
        <h2 className="font-title text-2xl md:text-4xl">
          La confiance <br /> de nos clients.
        </h2>
        <p className="max-w-lg text-white/60">
          Géré depuis Sanity (ajout/suppression/modification libre).
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((t) => (
          <figure
            key={t._id}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <blockquote className="text-white/80">“{t.quote}”</blockquote>
            <figcaption className="mt-5 text-sm text-white/60">
              <span className="font-title text-white/80">{t.name}</span>
              {t.role ? <span className="block">{t.role}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
