'use client';

import { testimonials } from '@/_data/testimoniasl';
import { IconShape2 } from '@/components/icons/IconShape2';
import { Quote } from '@/components/icons/Quote';
import { TrustIcon } from '@/components/icons/TrustIcon';
import { gsap, registerGsapPlugins, SplitText } from '@/lib/gsap';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
type Props = {
  className?: string;
};

export function TestimonialsTrustSection({ className }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null); 
  const introRef = useRef<HTMLDivElement | null>(null);
  const cardTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLElement[]>([]);

  useLayoutEffect(() => {
    registerGsapPlugins();

    let ctx: gsap.Context | undefined;
    let titleSplit: SplitText | undefined;
    let introSplit: SplitText | undefined;
    let cardsSplits: SplitText[] = [];

    const init = async () => {
      await document.fonts.ready;

      if (!sectionRef.current || !titleRef.current || !introRef.current) return;

      ctx = gsap.context(() => {
        titleSplit = SplitText.create(titleRef.current!, {
          type: 'chars',
          charsClass: 'char',
          mask: 'chars',
        });

        introSplit = SplitText.create(introRef.current!, {
          type: 'lines',
          linesClass: 'line',
          mask: 'lines',
        });

        cardsSplits = cardTextRefs.current.filter(Boolean).map((el) =>
          SplitText.create(el, {
            type: 'lines',
            linesClass: 'line',
            mask: 'lines',
          }),
        );

        const cards = cardRefs.current.filter(Boolean);

        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        });

        mainTl
          .from(titleSplit.chars, {
            yPercent: 110,
            opacity: 0,
            duration: 0.85,
            stagger: 0.018,
            ease: 'power4.out',
          })
          .from(
            introSplit.lines,
            {
              yPercent: 100,
              opacity: 0,
              duration: 0.9,
              stagger: 0.08,
              ease: 'expo.out',
            },
            '-=0.55',
          )
          .from(
            dividerRef.current,
            {
              scaleX: 0,
              transformOrigin: 'left center',
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.65',
          )
          .from(
            cards,
            {
              y: 28,
              opacity: 0,
              duration: 0.7,
              stagger: 0.06,
              ease: 'power3.out',
            },
            '-=0.35',
          );

        gsap.from(
          cardsSplits.flatMap((split) => split.lines),
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.65,
            stagger: 0.045,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
              once: true,
            },
            delay: 0.45,
          },
        );
      }, sectionRef);
    };

    init();

    return () => {
      ctx?.revert();
      titleSplit?.revert();
      introSplit?.revert();
      cardsSplits.forEach((split) => split.revert());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={[
        'relative text-primary-white',
        'py-[clamp(4.5rem,8vw,8rem)]',
        className ?? '',
      ].join(' ')}
    >
      {/* Fondos decorativos */}
      <div className="pointer-events-none overflow-hidden opacity-20">
        {/* shape top */}
        <IconShape2
          className="absolute top-[20%] left-[20%]"
          size={400}
          color="#FEFEFE"
        />
        {/* shape 2 */}
        <IconShape2
          className="absolute top-[50%] left-[70%]"
          size={200}
          color="#FEFEFE"
        />
        {/* shape bottom */}
        <IconShape2
          className="absolute top-[70%] left-[40%]"
          size={500}
          color="#FEFEFE"
        />
      </div>

      <div className="relative mx-auto w-full max-w-container px-[clamp(1.2rem,1vw,2.5rem)] xl:px-0">
        {/* Header */}
        {/* Header */}
  <div className="flex flex-col gap-y-[clamp(1.25rem,2vw,2rem)] lg:flex-row lg:items-end">
    <div className="lg:max-w-[63ch]">
      {/* Titre réel sémantique */}
      <h2 className="sr-only">La confiance de nos clients.</h2>

      {/* Titre visuel animé */}
      <div
        ref={titleRef}
        aria-hidden="true"
        className="
          max-w-[13ch]
          font-title
          leading-[0.95]
          tracking-[-0.04em]
          text-[clamp(2rem,9vw,3.5rem)]
        "
      >
        La confiance de nos clients.
      </div>
    </div>

    <div className="lg:ml-auto w-full lg:max-w-[55ch]">
      {/* Texte réel sémantique */}
      <p className="sr-only">
        Nous accompagnons chaque client avec sérieux et transparence.
        Notre priorité est d’assurer un service fiable, rapide et durable,
        afin de garantir votre sécurité et la performance de votre
        mobilité au quotidien.
      </p>

      {/* Texte visuel animé */}
      <div
        ref={introRef}
        aria-hidden="true"
        className="
          text-primary-white/90
          leading-[1.55]
          text-[clamp(0.95rem,1.1vw,1.2rem)]
        "
      >
        Nous accompagnons chaque client avec sérieux et transparence.
        Notre priorité est d’assurer un service fiable, rapide et durable,
        afin de garantir votre sécurité et la performance de votre
        mobilité au quotidien.
      </div>
    </div>
  </div>

        {/* Divider */}
        <div ref={dividerRef} className="w-full mt-[3.2rem]" aria-hidden="true">
          <svg
            viewBox="2 0 355 16"
            preserveAspectRatio="none"
            className="block w-full h-[12px] text-white/45"
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

        {/* Cards */}
        <div
          className="
            mt-[clamp(3rem,5vw,4.5rem)]
            grid grid-cols-1
            gap-[clamp(2rem,4vw,4rem)]
            md:grid-cols-3 
            
          "
        >
          {testimonials.map((item, index) => (
            <article
              key={item.id}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              className="
                js-trust-card
                relative flex h-full flex-col
                gap-[clamp(1rem,1.6vw,1.5rem)]
                mb-10
                rounded-[clamp(1rem,1.5vw,1.25rem)]
                bg-transparent
                
              "
            >
              <div className="text-primary-white/95">
                <Quote size={50} />
              </div>

              {/* Texte réel sémantique */}
      <p className="sr-only">{item.quote}</p>

      {/* Texte visuel animé */}
      <div
        ref={(el) => {
          if (el) cardTextRefs.current[index] = el;
        }}
        aria-hidden="true"
        className="
          max-w-[40h]
          text-primary-white/92
          leading-[1.45]
          text-[clamp(1rem,1.15vw,1.3rem)]
          pt-3
        "
      >
        {item.quote}
      </div>

              <div className="mt-[clamp(0.5rem,1vw,1rem)] flex items-end gap-[clamp(0.75rem,1vw,1rem)]">
                {/* icono marca */}

                {/* cambia esto por tu svg/logo */}
                <div className="">
                  <TrustIcon size={60} />
                </div>

                {/* avatar */}
                <div className="relative top-3 -ml-[clamp(2.2rem,1.6vw,1.5rem)] h-[clamp(3.8rem,3.6vw,3.8rem)]  w-[clamp(3.9rem,3.6vw,3.9rem)] overflow-hidden rounded-full border border-white/10">
                  <Image
                    src={item.avatar}
                    alt={`Photo de ${item.name},       
                    ${item.role}`}
                    fill
                    className="object-cover"
                    sizes="76px"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[clamp(0.95rem,1vw,1.12rem)] leading-[1.1] text-primary-white">
                    {item.name}
                  </p>
                  <p className="mt-[0.18rem] text-[clamp(0.7rem,0.8vw,0.85rem)] uppercase tracking-[0.08em] text-primary-white/55">
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
