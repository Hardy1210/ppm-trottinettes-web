import type { ReactNode } from 'react';

// Reemplaza estos imports por tus iconos reales

// Reemplaza esto por tu textura/componente real
//import { IconPlateTexture } from '@/components/ui/IconPlateTexture';
import { IconShape2 } from '../icons/IconShape2';
import { Sav } from '../icons/Sav';
import { Shieldd } from '../icons/Shieldd';
import { Wrench } from '../icons/Wrench';

type CardsCatalogueProps = {
  sectionTitle?: string;

  revisionTitle?: string;
  revisionDescription?: string;

  garantieTitle?: string;
  garantieDescription?: string;

  savTitle?: string;
  savDescription?: string;

  className?: string;
};

type InternalCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

function InternalCard({ title, description, icon }: InternalCardProps) {
  return (
    <article
      className="
        relative isolate flex min-h-[clamp(19rem,28vw,23rem)] flex-col
        overflow-hidden rounded-lg border border-ppmYellow/15 bg-card/70
        px-[clamp(1.2rem,2vw,2rem)] pt-[clamp(1.4rem,2.2vw,2rem)]
        pb-[clamp(1.2rem,2vw,1.6rem)] backdrop-blur-[2px]
      "
    >
      <div className="flex flex-1 flex-col items-center text-center">
        <div className="relative mb-[clamp(1rem,1.8vw,1.5rem)]  w-[clamp(3.6rem,5.5vw,4.2rem)] aspect-square">
          <div className="absolute inset-0 ">
            <IconShape2 className="w-full h-full" color="#E4E700" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center text-ppmYellow">
            {icon}
          </div>
        </div>

        <h3
          className="
            font-title text-brandText
            text-[clamp(1.15rem,1.8vw,1.9rem)]
            leading-[1.18] tracking-[-0.02em]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-[clamp(0.9rem,1.6vw,1.25rem)]
            max-w-[40ch]
            text-[clamp(0.88rem,1vw,1rem)]
            leading-[1.8]
            text-brandText/75
          "
        >
          {description}
        </p>

        <div className="mt-auto w-full pb-[clamp(1.75rem,3vw,2.5rem)]">
          <div className="mx-auto h-px w-full max-w-[95%] bg-ppmYellow/35" />
        </div>
      </div>
    </article>
  );
}

export default function CardsCatalogue({
  sectionTitle = 'Pourquoi nous choisir ?',

  revisionTitle = 'Révision Expert',
  revisionDescription = 'Chaque trottinette est minutieusement inspectée par nos techniciens certifiés avant la vente.',

  garantieTitle = 'Garantie Atelier',
  garantieDescription = "Bénéficiez d’une garantie complète pièces et main-d'œuvre pour rouler l’esprit tranquille.",

  savTitle = 'SAV Permanent',
  savDescription = 'Un service après-vente réactif et disponible pour tous vos besoins d’entretien et de réparation.',

  className = '',
}: CardsCatalogueProps) {
  return (
    <section
      className={`
        relative w-full overflow-hidden px-5
        py-[clamp(3rem,6vw,6rem)]
        ${className}
      `}
    >
      <div className="mx-auto w-full max-w-container">
        <div className="mb-[clamp(2rem,4vw,4.5rem)]">
          <h2
            className="
              font-title text-brandText
              text-[clamp(2rem,5vw,4.5rem)]
              leading-[1.02] tracking-[-0.03em]
            "
          >
            {sectionTitle}
          </h2>

          <div
            className="mt-[clamp(1.3rem,1.8vw,2.3rem)] flex items-center gap-3"
            aria-hidden="true"
          >
            <svg
              viewBox="2 0 355 16"
              preserveAspectRatio="none"
              className="block h-[12px] w-full text-white/45"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="44"
                x2="3.5"
                y2="1"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="square"
              />
              <line
                x1="3.5"
                y1="8"
                x2="355"
                y2="8"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </div>

        <div
          className="
            grid grid-cols-1
            gap-[clamp(0.9rem,2vw,2rem)]
            sm:grid-cols-2
            md:grid-cols-3
          "
        >
          <InternalCard
            title={revisionTitle}
            description={revisionDescription}
            icon={
              <Wrench className="h-[clamp(1.7rem,2vw,2.25rem)] w-[clamp(1.7rem,2vw,2.25rem)]" />
            }
          />

          <InternalCard
            title={garantieTitle}
            description={garantieDescription}
            icon={
              <Shieldd className="h-[clamp(1.7rem,2vw,2.25rem)] w-[clamp(1.7rem,2vw,2.25rem)]" />
            }
          />

          <InternalCard
            title={savTitle}
            description={savDescription}
            icon={
              <Sav className="h-[clamp(1.7rem,2vw,2.25rem)] w-[clamp(1.7rem,2vw,2.25rem)]" />
            }
          />
        </div>
      </div>
    </section>
  );
}
