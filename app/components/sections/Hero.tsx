import { Section } from '@/app/components/layout/Section';
import { PrimaryButton, TechButton } from '@/app/components/ui/buttons';

export function Hero() {
  return (
    <Section className="pt-10 md:pt-16 pb-10">
      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 md:col-span-6">
          <p className="font-title text-xs uppercase tracking-[0.2em] text-white/60">
            PPM
          </p>
          <h1 className="mt-3 font-title text-4xl md:text-6xl leading-[1.05]">
            Pile Power <br /> Mobilité
          </h1>
          <p className="mt-5 max-w-xl text-white/70">
            Nous accompagnons chaque utilisateur avec des solutions fiables,
            rapides et adaptées pour garantir performance et sécurité au
            quotidien.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryButton href="#contact">Contact</PrimaryButton>
            <TechButton href="#services">Nos services</TechButton>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 aspect-4/3 overflow-hidden grid place-items-center text-white/40">
            Images / collage (placeholder)
          </div>
        </div>
      </div>
    </Section>
  );
}
