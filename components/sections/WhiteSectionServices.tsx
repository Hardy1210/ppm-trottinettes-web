'use client';

import { Section } from '@/components/layout/Section';
import { PrimaryButton } from '@/ui/Buttons';
import useEmblaCarousel from 'embla-carousel-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Shape } from '../Shape';

gsap.registerPlugin(ScrollTrigger);

export type ShowcaseItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  meta?: string;
};

type Props = {
  items: ShowcaseItem[];
  ctaHref: string;
  ctaLabel: string;
};

export function WhiteSectionServices({ items, ctaHref, ctaLabel }: Props) {
  const isDesktop = useIsDesktop();

  if (isDesktop === null) return null;
  if (!items?.length) return null;

  return (
    <section className="w-full bg-[#FEFEFE] text-black">
      {isDesktop ? (
        <DesktopScrubShowcase
          items={items}
          ctaHref={ctaHref}
          ctaLabel={ctaLabel}
        />
      ) : (
        <MobileEmblaShowcase
          items={items}
          ctaHref={ctaHref}
          ctaLabel={ctaLabel}
        />
      )}
    </section>
  );
}

function DesktopScrubShowcase({
  items,
  ctaHref,
  ctaLabel,
}: {
  items: ShowcaseItem[];
  ctaHref: string;
  ctaLabel: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Refs separados: texto (Y) vs imagen/shapes (X)
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shapeTopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shapeBottomRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      // Estado inicial de todos los items
      items.forEach((_, i) => {
        if (i === 0) {
          // Primer item: visible, en posición 0
          gsap.set(
            [
              textRefs.current[0],
              imageRefs.current[0],
              shapeTopRefs.current[0],
              shapeBottomRefs.current[0],
            ].filter(Boolean),
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              willChange: 'transform, opacity',
            },
          );
        } else {
          // Resto: ocultos esperando a la derecha/abajo
          gsap.set(textRefs.current[i], {
            opacity: 0,
            y: 32,
            willChange: 'transform, opacity',
          });
          gsap.set(imageRefs.current[i], {
            opacity: 0,
            x: 80,
            scale: 0.985,
            willChange: 'transform, opacity',
          });
          gsap.set(shapeTopRefs.current[i], {
            opacity: 0,
            x: 110,
            willChange: 'transform, opacity',
          });
          gsap.set(shapeBottomRefs.current[i], {
            opacity: 0,
            x: 80,
            willChange: 'transform, opacity',
          });
        }
      });

      // Timeline en secuencia: cada transición ocupa 1 unidad
      // [offset .. offset+0.5] → sale item i
      // [offset+0.5 .. offset+1] → entra item i+1
      const tl = gsap.timeline({ defaults: { ease: 'none' } });

      for (let i = 0; i < items.length - 1; i++) {
        const o = i; // offset

        // ── OUT item i ──────────────────────────────────────────
        // Texto: sube (Y negativo)
        tl.to(
          textRefs.current[i],
          { opacity: 0, y: -28, ease: 'power1.in', duration: 0.45 },
          o,
        );
        // Imagen: sale a la izquierda (X negativo)
        tl.to(
          imageRefs.current[i],
          {
            opacity: 0,
            x: -80,
            scale: 0.985,
            ease: 'power1.in',
            duration: 0.45,
          },
          o + 0.05,
        );
        // Shapes: salen a la izquierda
        tl.to(
          shapeTopRefs.current[i],
          { opacity: 0, x: -180, ease: 'power1.in', duration: 0.4 },
          o - 0.05,
        );
        tl.to(
          shapeBottomRefs.current[i],
          { opacity: 0, x: -130, ease: 'power1.in', duration: 0.4 },
          o + 0.05,
        );

        // ── IN item i+1 ─────────────────────────────────────────
        // Texto: entra desde abajo (Y positivo → 0)
        tl.fromTo(
          textRefs.current[i + 1],
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, ease: 'power1.out', duration: 0.45 },
          o + 0.5,
        );
        // Imagen: entra desde la derecha (X positivo → 0)
        tl.fromTo(
          imageRefs.current[i + 1],
          { opacity: 0, x: 80, scale: 0.985 },
          { opacity: 1, x: 0, scale: 1, ease: 'power1.out', duration: 0.45 },
          o + 0.55,
        );
        // Shapes: entran desde la derecha
        tl.fromTo(
          shapeTopRefs.current[i + 1],
          { opacity: 0, x: 210 },
          { opacity: 1, x: 0, ease: 'power1.out', duration: 0.4 },
          o + 0.42,
        );
        tl.fromTo(
          shapeBottomRefs.current[i + 1],
          { opacity: 0, x: 150 },
          { opacity: 1, x: 0, ease: 'power1.out', duration: 0.4 },
          o + 0.48,
        );
      }

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * (items.length - 1)}`,
        pin: stickyRef.current,
        scrub: 0.8,
        animation: tl,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.round(self.progress * (items.length - 1)),
            items.length - 1,
          );
          setActiveIndex(idx);
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={wrapperRef} className="relative">
      <div ref={stickyRef} className="h-screen overflow-hidden">
        <div className="flex h-full items-center">
          <Section innerClassName="w-full">
            <div className="mx-auto mt-5 flex max-h-[820px] min-h-[620px] flex-col xl:mt-0">
              {/* Header */}
              <div className="mb-8 flex items-end justify-between gap-6">
                <p className="font-title text-[clamp(1.15rem,1.2vw,1.5rem)] tracking-tight text-black/55">
                  Services
                </p>
                <PrimaryButton href={ctaHref}>{ctaLabel}</PrimaryButton>
              </div>

              {/* Items apilados con position absolute */}
              <div className="relative flex-1">
                {items.map((item, i) => {
                  const titleParts = splitTitle(item.title);
                  return (
                    <div
                      key={i}
                      className="absolute inset-0 grid grid-cols-12 items-center gap-8 lg:gap-10"
                    >
                      {/* Izquierda: texto — animado con Y */}
                      <div
                        ref={(el) => {
                          textRefs.current[i] = el;
                        }}
                        className="col-span-6 max-w-[40rem] text-black/70"
                      >
                        <div className="leading-[1.2] tracking-tight">
                          <h2 className="font-title text-[clamp(2.5rem,4.7vw,3.9rem)] font-normal">
                            {titleParts.top}
                          </h2>
                          {titleParts.bottom && (
                            <h3 className="font-title text-[clamp(2.5rem,4.7vw,3.9rem)] font-semibold">
                              {titleParts.bottom}
                            </h3>
                          )}
                        </div>
                        <p className="mt-10 max-w-[35rem] font-body text-[clamp(1.5rem,1.25vw,1.85rem)] leading-normal">
                          {item.description}
                        </p>
                        {item.meta && (
                          <p className="mt-12 text-[0.88rem] tracking-tight text-black/70">
                            {item.meta}
                          </p>
                        )}
                      </div>

                      {/* Derecha: imagen + shapes — animados con X */}
                      <div className="col-span-6">
                        <div className="relative z-0 mx-auto flex w-full max-w-[46rem] items-center justify-center">
                          <div
                            ref={(el) => {
                              shapeTopRefs.current[i] = el;
                            }}
                            className="pointer-events-none absolute right-0 top-[-5%] z-10 h-[38%] w-[54%]"
                          >
                            <Shape className="h-full w-full" opacity={0.045} />
                          </div>
                          <div
                            ref={(el) => {
                              shapeBottomRefs.current[i] = el;
                            }}
                            className="pointer-events-none absolute bottom-[4%] left-[-2%] z-10 h-[26%] w-[30%]"
                          >
                            <Shape className="h-full w-full" opacity={0.09} />
                          </div>
                          <div
                            ref={(el) => {
                              imageRefs.current[i] = el;
                            }}
                            className="relative z-0 aspect-[1.2/1] w-full"
                          >
                            <Image
                              src={item.image}
                              alt={item.imageAlt}
                              fill
                              priority={i === 0}
                              className="object-contain"
                              sizes="(min-width: 1024px) 50vw, 100vw"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dots */}
              <div className="mt-6 flex gap-2">
                {items.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'w-12 bg-ppmYellow'
                        : 'w-6 bg-black/15'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile sin cambios ──────────────────────────────────────────────────────

function MobileEmblaShowcase({
  items,
  ctaHref,
  ctaLabel,
}: {
  items: ShowcaseItem[];
  ctaHref: string;
  ctaLabel: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  return (
    <Section innerClassName="py-5">
      <div className="relative bg-[#FEFEFE] pb-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {items.map((item, idx) => {
              const title = splitTitle(item.title);
              return (
                <article
                  key={item.title}
                  className="min-w-0 flex-[0_0_100%] px-3"
                >
                  <div className="flex h-full flex-col justify-between pb-8 pt-6 lg:px-5">
                    <div className="relative z-10 max-w-100 sm:max-w-136">
                      <div className="leading-[1.2] tracking-tight">
                        <h3 className="font-title text-[clamp(2.1rem,8.5vw,3.4rem)] font-normal">
                          {title.top}
                        </h3>
                        {title.bottom && (
                          <p className="font-title text-[clamp(2rem,8.4vw,3.2rem)] font-semibold">
                            {title.bottom}
                          </p>
                        )}
                      </div>
                      <p className="font-body mt-6 max-w-[25rem] text-[clamp(1.2rem,3.8vw,1.15rem)] leading-[1.32] text-black/88">
                        {item.description}
                      </p>
                    </div>
                    <div className="relative z-0 mt-10 flex min-h-[300px] flex-1 items-center justify-center">
                      <Shape
                        className="pointer-events-none absolute right-0 top-[-7%] z-10 h-[38%] w-[54%]"
                        opacity={0.035}
                      />
                      <Shape
                        className="pointer-events-none absolute bottom-[4%] left-[2%] z-10 h-[16%] w-[18%]"
                        opacity={0.05}
                      />
                      <div className="relative aspect-[1/1] w-full max-w-[20rem]">
                        <div className="relative z-0 h-full w-full">
                          <Image
                            src={item.image}
                            alt={item.imageAlt}
                            fill
                            className="object-contain object-bottom"
                            priority={idx === 0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Ir al slide ${idx + 1}`}
                onClick={() => scrollTo(idx)}
                className={`cursor-pointer rounded-full border transition-all duration-300 ${
                  idx === selectedIndex
                    ? 'h-3 w-3 border-black bg-transparent'
                    : 'h-2.5 w-2.5 border-black/10 bg-black/6'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 rounded-[1.2rem] bg-white/45 px-3 py-2 backdrop-blur-sm">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Slide précédent"
              className="grid h-14 w-14 cursor-pointer place-items-center rounded-full border-2 border-black/10 bg-white/70 text-black transition-opacity disabled:opacity-35"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Slide suivant"
              className="grid h-14 w-14 cursor-pointer place-items-center rounded-full border-2 border-black/10 bg-white/70 text-black transition-opacity disabled:opacity-35"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Utils ───────────────────────────────────────────────────────────────────

function splitTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return { top: title, bottom: '' };
  return { top: words[0], bottom: words.slice(1).join(' ') };
}

function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [breakpoint]);
  return isDesktop;
}
