'use client';

import { testimonials } from '@/_data/testimoniasl';
import { gsap, registerGsapPlugins, SplitText } from '@/lib/gsap';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

type Props = {
  className?: string;
};

export function TestimonialsTrustSection({ className }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const cardTextRefs = useRef<HTMLParagraphElement[]>([]);

  useLayoutEffect(() => {
    registerGsapPlugins();

    let titleSplit: SplitText | undefined;
    let introSplit: SplitText | undefined;
    let cardsSplits: SplitText[] = [];
    let ctx: gsap.Context | undefined;

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

        cardsSplits = cardTextRefs.current.map((el) =>
          SplitText.create(el, {
            type: 'lines',
            linesClass: 'line',
            mask: 'lines',
          }),
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        });

        tl.from(titleSplit.chars, {
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
            '.js-trust-divider',
            {
              scaleX: 0,
              transformOrigin: 'left center',
              duration: 0.9,
              ease: 'power3.out',
            },
            '-=0.55',
          )
          .from(
            '.js-trust-card',
            {
              y: 28,
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
            },
            '-=0.45',
          );

        cardsSplits.forEach((split, index) => {
          tl.from(
            split.lines,
            {
              yPercent: 100,
              opacity: 0,
              duration: 0.75,
              stagger: 0.06,
              ease: 'power3.out',
            },
            index === 0 ? '-=0.55' : '-=0.6',
          );
        });
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
        'relative overflow-hidden  text-primary-white',
        'py-[clamp(4.5rem,8vw,8rem)]',
        className ?? '',
      ].join(' ')}
    >
      {/* Fondos decorativos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* bloque inclinado izquierdo superior */}
        <div
          className="
            absolute left-[-8%] top-[clamp(9rem,12vw,14rem)]
            hidden md:block
            h-[clamp(16rem,22vw,22rem)] w-[clamp(28rem,40vw,38rem)]
            bg-white/6
            [clip-path:polygon(8%_0%,100%_0%,78%_100%,0%_100%)]
          "
        />

        {/* bloque inclinado izquierdo inferior */}
        <div
          className="
            absolute bottom-0 left-[clamp(-3rem,-2vw,0rem)]
            hidden md:block
            h-[clamp(7rem,11vw,10rem)] w-[clamp(8rem,12vw,12rem)]
            bg-white/6
            [clip-path:polygon(30%_0%,100%_0%,70%_100%,0%_100%)]
          "
        />

        {/* dot grid derecha */}
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-[clamp(1rem,3vw,2.5rem)]">
        {/* Header */}
        <div className="flex flex-col gap-y-[clamp(1.25rem,2vw,2rem)] lg:flex-row lg:items-end">
          <div className="lg:max-w-[63ch]">
            <h2
              ref={titleRef}
              className="
              max-w-[13ch]
              font-title
              leading-[0.95]
              tracking-[-0.04em]
              text-[clamp(2rem,9vw,3.5rem)]
              "
            >
              La confiance de nos clients.
            </h2>
          </div>

          <div className="lg:ml-auto w-full lg:max-w-[45ch] ">
            <p
              ref={introRef}
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
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full mt-[2.3rem]" aria-hidden="true">
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
            mt-[clamp(2rem,5vw,4.5rem)]
            grid grid-cols-1
            gap-[clamp(2rem,3vw,3rem)]
            md:grid-cols-3
            
          "
        >
          {testimonials.map((item, index) => (
            <article
              key={item.id}
              className="
                js-trust-card
                relative flex h-full flex-col
                gap-[clamp(1rem,1.6vw,1.5rem)]
                rounded-[clamp(1rem,1.5vw,1.25rem)]
                bg-transparent
                px-[clamp(0rem,0vw,0rem)]
                py-[clamp(0rem,0vw,0rem)]
              "
            >
              <div className="text-primary-white/95">
                <span className="text-[clamp(3rem,5vw,4.5rem)] leading-none">
                  “
                </span>
              </div>

              <p
                ref={(el) => {
                  if (el) cardTextRefs.current[index] = el;
                }}
                className="
                  max-w-[28ch]
                  text-primary-white/92
                  leading-[1.45]
                  text-[clamp(1rem,1.15vw,1.3rem)]
                "
              >
                {item.quote}
              </p>

              <div className="mt-[clamp(0.5rem,1vw,1rem)] flex items-center gap-[clamp(0.75rem,1vw,1rem)]">
                {/* icono marca */}
                <div className="relative flex h-[clamp(3rem,4vw,4rem)] w-[clamp(3rem,4vw,4rem)] shrink-0 items-center justify-center rounded-full bg-lime-accent">
                  {/* cambia esto por tu svg/logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-black text-[clamp(1rem,1.4vw,1.4rem)] font-semibold">
                      ⚡
                    </span>
                  </div>
                </div>

                {/* avatar */}
                <div className="relative -ml-[clamp(1.2rem,1.6vw,1.5rem)] h-[clamp(2.8rem,3.6vw,3.4rem)] w-[clamp(2.8rem,3.6vw,3.4rem)] overflow-hidden rounded-full border border-white/10">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="56px"
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
