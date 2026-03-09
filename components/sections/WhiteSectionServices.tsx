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

  return (
    <section className="w-full bg-[#FEFEFE] text-black">
      {isDesktop ? (
        <DesktopPinnedShowcase
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

function DesktopPinnedShowcase({
  items,
  ctaHref,
  ctaLabel,
}: {
  items: ShowcaseItem[];
  ctaHref: string;
  ctaLabel: string;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  const titleRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const shapeTopRef = useRef<HTMLDivElement | null>(null);
  const shapeBottomRef = useRef<HTMLDivElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLParagraphElement | null>(null);

  const isAnimatingRef = useRef(false);
  const currentTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);

  const activeItem = items[activeIndex];

  useLayoutEffect(() => {
    if (!wrapperRef.current || !stickyRef.current || items.length === 0) return;

    const ctx = gsap.context(() => {
      const baseTargets = [
        imageWrapRef.current,
        titleRef.current,
        descRef.current,
        metaRef.current,
        shapeTopRef.current,
        shapeBottomRef.current,
      ].filter(Boolean);

      gsap.set(baseTargets, {
        opacity: 0,
        willChange: 'transform, opacity',
      });

      gsap.set(imageWrapRef.current, {
        x: 80,
        scale: 0.975,
      });

      gsap.set(titleRef.current, {
        y: 30,
      });

      gsap.set(descRef.current, {
        y: 22,
      });

      if (metaRef.current) {
        gsap.set(metaRef.current, {
          y: 18,
        });
      }

      gsap.set(shapeTopRef.current, {
        x: 120,
        scale: 1.04,
      });

      gsap.set(shapeBottomRef.current, {
        x: 190,
        scale: 1.03,
      });

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top+=40',
        end: `+=${window.innerHeight * items.length * 0.75}`,
        pin: stickyRef.current,
        scrub: 0.3,
        //markers: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            items.length - 1,
            Math.floor(self.progress * items.length),
          );

          if (nextIndex !== prevIndexRef.current && !isAnimatingRef.current) {
            isAnimatingRef.current = true;
            currentTimelineRef.current?.kill();

            const outTl = gsap.timeline({
              defaults: {
                duration: 0.42,
                ease: 'power3.in',
              },
              onComplete: () => {
                prevIndexRef.current = nextIndex;
                setActiveIndex(nextIndex);
              },
            });

            outTl
              .to(
                imageWrapRef.current,
                {
                  opacity: 0,
                  x: -80,
                  scale: 0.985,
                },
                0,
              )
              .to(
                shapeTopRef.current,
                {
                  opacity: 0,
                  x: -180,
                  scale: 1,
                },
                0.02,
              )
              .to(
                shapeBottomRef.current,
                {
                  opacity: 0,
                  x: -120,
                  scale: 1,
                },
                0.06,
              )
              .to(
                titleRef.current,
                {
                  opacity: 0,
                  y: -30,
                },
                0.04,
              )
              .to(
                descRef.current,
                {
                  opacity: 0,
                  y: -22,
                },
                0.08,
              );

            if (metaRef.current) {
              outTl.to(
                metaRef.current,
                {
                  opacity: 0,
                  y: -18,
                },
                0.12,
              );
            }

            currentTimelineRef.current = outTl;
          }
        },
      });
    }, wrapperRef);

    return () => {
      currentTimelineRef.current?.kill();
      ctx.revert();
    };
  }, [items]);

  //Entrada del nuevo contenido
  useLayoutEffect(() => {
    if (!imageWrapRef.current || !titleRef.current || !descRef.current) return;

    currentTimelineRef.current?.kill();

    gsap.set(imageWrapRef.current, {
      opacity: 0,
      x: 80,
      scale: 0.975,
    });

    gsap.set(titleRef.current, {
      opacity: 0,
      y: 30,
    });

    gsap.set(descRef.current, {
      opacity: 0,
      y: 22,
    });

    if (metaRef.current) {
      gsap.set(metaRef.current, {
        opacity: 0,
        y: 18,
      });
    }

    gsap.set(shapeTopRef.current, {
      opacity: 0,
      x: 180,
      scale: 1.04,
    });

    gsap.set(shapeBottomRef.current, {
      opacity: 0,
      x: 120,
      scale: 1.03,
    });

    const tl = gsap.timeline({
      defaults: {
        ease: 'power4.out',
      },
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    tl.to(
      imageWrapRef.current,
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.05,
      },
      0,
    )
      .to(
        shapeTopRef.current,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.1,
        },
        0.15,
      )
      .to(
        shapeBottomRef.current,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.15,
        },
        0.22,
      )
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
        },
        0.2,
      )
      .to(
        descRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
        },
        0.34,
      );

    if (metaRef.current) {
      tl.to(
        metaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
        },
        0.46,
      );
    }

    currentTimelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [activeIndex]);
  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${items.length * 85}vh` }}
    >
      <div ref={stickyRef} className="h-screen overflow-hidden">
        <div className="flex h-full items-center">
          <Section innerClassName="w-full">
            <div className="flex mx-auto max-h-[820px] min-h-[620px] flex-col mt-5 xl:mt-0">
              <div className="mb-8 flex items-end justify-between gap-6">
                <div>
                  <p className="font-title text-[clamp(1.15rem,1.2vw,1.5rem)] tracking-tight text-black/55">
                    Services
                  </p>
                </div>

                <div>
                  <PrimaryButton href={ctaHref}>{ctaLabel}</PrimaryButton>
                </div>
              </div>

              <div className="flex flex-1 items-center">
                <div className="grid flex-1 grid-cols-12 items-center gap-8 lg:gap-10">
                  {/* COL IZQUIERDA */}
                  <div className="col-span-6">
                    <div
                      ref={titleRef}
                      className="max-w-[40rem]  text-black/70"
                      key={`left-${activeIndex}`}
                    >
                      <div className="leading-[1.2] tracking-tight">
                        <h2 className="font-title text-[clamp(2.5rem,4.7vw,3.9rem)] font-normal">
                          {splitTitle(activeItem.title).top}
                        </h2>

                        {splitTitle(activeItem.title).bottom && (
                          <h3 className="font-title text-[clamp(2.5rem,4.7vw,3.9rem)] font-semibold">
                            {splitTitle(activeItem.title).bottom}
                          </h3>
                        )}
                      </div>

                      <p
                        ref={descRef}
                        className="mt-10 max-w-[35rem] text-[clamp(1.5rem,1.25vw,1.85rem)] font-body leading-normal"
                      >
                        {activeItem.description}
                      </p>

                      {activeItem.meta && (
                        <p
                          ref={metaRef}
                          className="mt-12 text-[0.88rem] tracking-tight text-black/70"
                        >
                          {activeItem.meta}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* COL DERECHA */}
                  <div className="col-span-6">
                    <div
                      className="relative z-0 mx-auto flex w-full max-w-[46rem] items-center justify-center"
                      key={`right-${activeIndex}`}
                    >
                      {/* SVG decorativo superior - placeholder */}
                      <div
                        ref={shapeTopRef}
                        className="pointer-events-none absolute z-10 right-0 top-[-5%] h-[38%] w-[54%]"
                      >
                        <Shape className="h-full w-full" opacity={0.045} />
                      </div>

                      <div
                        ref={shapeBottomRef}
                        className="pointer-events-none absolute z-10 bottom-[4%] left-[-2%] h-[26%] w-[30%]"
                      >
                        <Shape className="h-full w-full" opacity={0.09} />
                      </div>

                      <div
                        ref={imageWrapRef}
                        className="relative z-0 aspect-[1.2/1] w-full"
                      >
                        <Image
                          src={activeItem.image}
                          alt={activeItem.imageAlt}
                          fill
                          priority={activeIndex === 0}
                          className="object-contain"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicador inferior */}
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

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
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
      <div className="relative  bg-[#FEFEFE] pb-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {items.map((item, idx) => {
              const title = splitTitle(item.title);

              return (
                <article
                  key={item.title}
                  className="min-w-0 flex-[0_0_100%] px-3"
                >
                  <div className="flex  h-full flex-col justify-between lg:px-5 pt-6 pb-8">
                    {/* TEXTOS */}
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

                      {/*{item.meta && (
                        <p className="font-body mt-8 text-[0.72rem] tracking-tight text-black/70">
                          {item.meta}
                        </p>
                      )} */}
                    </div>

                    {/* VISUAL */}
                    <div className="relative z-0 mt-10 flex flex-1 items-center justify-center min-h-[300px]">
                      {/*formas visuales , shpaes */}
                      <Shape
                        className="pointer-events-none absolute z-10 right-0 top-[-7%] h-[38%] w-[54%]"
                        opacity={0.035}
                      />
                      <Shape
                        className="pointer-events-none absolute z-10 bottom-[4%] left-[2%] h-[16%] w-[18%]"
                        opacity={0.05}
                      />
                      <div className="relative w-full max-w-[20rem] aspect-[1/1]">
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

        {/* CONTROLES inferiores */}
        <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-5">
          {/* dots */}
          <div className="flex items-center justify-center gap-2">
            {items.map((_, idx) => {
              const isActive = idx === selectedIndex;

              return (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Ir al slide ${idx + 1}`}
                  onClick={() => scrollTo(idx)}
                  className={`rounded-full border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'h-3 w-3 border-black bg-transparent'
                      : 'h-2.5 w-2.5 border-black/10 bg-black/6'
                  }`}
                />
              );
            })}
          </div>

          {/* arrows */}
          <div className="flex items-center gap-3 rounded-[1.2rem] bg-white/45 px-3 py-2 backdrop-blur-sm">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Slide précédent"
              className="grid h-14 w-14 place-items-center cursor-pointer rounded-full border-2 border-black/10 bg-white/70 text-black transition-opacity disabled:opacity-35"
            >
              <span className="flex items-center justify-center">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </span>
            </button>

            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Slide suivant"
              className="grid h-14 w-14 place-items-center cursor-pointer rounded-full border-2 border-black/10 bg-white/70 text-black transition-opacity disabled:opacity-35"
            >
              <span className="flex items-center justify-center">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* CTA opcional abajo en mobile */}
        <div className="pointer-events-none absolute inset-x-5 bottom-28 hidden">
          <PrimaryButton href={ctaHref} className="pointer-events-auto w-full">
            {ctaLabel}
          </PrimaryButton>
        </div>
      </div>
    </Section>
  );
}

function splitTitle(title: string) {
  const words = title.trim().split(/\s+/);

  if (words.length <= 1) {
    return { top: title, bottom: '' };
  }

  return {
    top: words[0],
    bottom: words.slice(1).join(' '),
  };
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
