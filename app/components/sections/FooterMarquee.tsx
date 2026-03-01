import { Section } from '@/app/components/layout/Section';

export function FooterMarquee() {
  return (
    <footer className="border-t border-white/10">
      <Section className="py-10">
        <div className="flex items-center justify-between gap-6">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Pile Power Mobilité
          </p>
          <div className="text-white/50 text-sm">Instagram • Facebook</div>
        </div>

        {/* Marquee placeholder: normalmente svg con imagen fija + overlay amarillo */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-10 whitespace-nowrap">
            <MarqueeWord />
            <MarqueeWord />
            <MarqueeWord />
            <MarqueeWord />
          </div>
          <p className="mt-4 text-xs text-white/40">
            Placeholder marquee (luego lo cambias por SVG real + animación
            infinita).
          </p>
        </div>
      </Section>
    </footer>
  );
}

function MarqueeWord() {
  return (
    <div className="relative">
      <span className="font-title text-5xl md:text-7xl tracking-tight text-white/20">
        PPM
      </span>
      <span className="absolute inset-0 font-title text-5xl md:text-7xl tracking-tight text-ppmYellow/60 mix-blend-screen">
        PPM
      </span>
    </div>
  );
}
