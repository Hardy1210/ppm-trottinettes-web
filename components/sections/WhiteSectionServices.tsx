import { Section } from '@/app/components/layout/Section';
import { PrimaryButton } from '@/app/components/ui/buttons';

type ShowcaseItem = {
  title: string;
  description: string;
  imageAlt: string;
};

type Props = {
  title?: string;
  items: ShowcaseItem[]; // 3 items
  ctaHref: string;
  ctaLabel: string;
};

export function WhiteServicesShowcase({
  title = 'Diagnostic Technique',
  items,
  ctaHref,
  ctaLabel,
}: Props) {
  return (
    <section className="w-full bg-white text-black">
      <Section innerClassName="py-14 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-title text-2xl md:text-4xl tracking-tight">
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-black/70">
              Section blanche prête pour: (desktop) pin + swaps, (mobile)
              carousel.
            </p>
          </div>

          <div className="hidden md:block">
            <PrimaryButton href={ctaHref}>{ctaLabel}</PrimaryButton>
          </div>
        </div>

        {/* DESKTOP: tu metes GSAP (pin + change content) */}
        <div className="hidden md:block mt-10">
          <DesktopShowcase items={items} />
        </div>

        {/* MOBILE: aquí integras Embla/Swiper luego */}
        <div className="block md:hidden mt-8">
          <MobileCarouselStub items={items} />
          <div className="mt-8">
            <PrimaryButton href={ctaHref} className="w-full">
              {ctaLabel}
            </PrimaryButton>
          </div>
        </div>
      </Section>
    </section>
  );
}

function DesktopShowcase({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="grid grid-cols-12 gap-8 items-start">
      {/* Col izquierda: lista/steps (para scroll swap) */}
      <div className="col-span-5">
        <ul className="space-y-6">
          {items.map((it, idx) => (
            <li
              key={idx}
              className="rounded-xl border border-black/10 p-5 hover:bg-black/2 transition"
              data-showcase-trigger
            >
              <p className="font-title text-sm uppercase tracking-widest text-black/60">
                Service {idx + 1}
              </p>
              <h3 className="mt-2 font-title text-xl">{it.title}</h3>
              <p className="mt-2 text-black/70">{it.description}</p>

              {/* Hooks para tus animaciones */}
              <div className="mt-4 text-xs text-black/50">
                <span data-anim="polygon-text">Hook: polygon text</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Col derecha: visual */}
      <div className="col-span-7">
        <div
          className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-black/10 bg-black/3"
          data-showcase-visual
        >
          {/* Placeholder, luego pones tu img + overlay polygons */}
          <div className="absolute inset-0 grid place-items-center text-black/40">
            <p className="font-title text-sm">
              VISUAL / IMAGE AREA (GSAP target)
            </p>
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            data-anim="polygons-overlay"
          />
        </div>

        <p className="mt-3 text-sm text-black/60">
          Tip: En desktop puedes “pinnear” esta columna y cambiar el contenido
          al scrollear (sin carousel).
        </p>
      </div>
    </div>
  );
}

function MobileCarouselStub({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="rounded-2xl border border-black/10 overflow-hidden">
      {/* wrapper que luego reemplazas por Embla/Swiper */}
      <div className="flex overflow-x-auto snap-x snap-mandatory">
        {items.map((it, idx) => (
          <article
            key={idx}
            className="min-w-[85%] snap-center p-6 border-r border-black/10"
          >
            <p className="font-title text-xs uppercase tracking-widest text-black/60">
              Slide {idx + 1}
            </p>
            <h3 className="mt-2 font-title text-xl">{it.title}</h3>
            <p className="mt-2 text-black/70">{it.description}</p>

            <div className="mt-5 aspect-4/3 rounded-xl bg-black/3 border border-black/10 grid place-items-center text-black/40">
              IMAGE (mobile)
            </div>
          </article>
        ))}
      </div>

      <div className="p-4 text-xs text-black/50">
        Mobile carousel stub (reemplazar por librería).
      </div>
    </div>
  );
}
