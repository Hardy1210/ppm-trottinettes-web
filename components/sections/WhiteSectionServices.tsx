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

  const triggerRef = useRef<ScrollTrigger | null>(null);
  const currentTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const isSectionActiveRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const lastDirectionRef = useRef<1 | -1>(1);

  const wheelAccumRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = items[activeIndex];
  const titleParts = splitTitle(activeItem.title);

  // FIX 1: eliminada syncScrollToIndex — mover el scroll programáticamente
  // mientras el pin de ScrollTrigger está activo provoca que ScrollTrigger
  // reposicione el elemento pinneado en medio de la animación GSAP, causando
  // los saltos y parpadeos visibles. El scroll interno no necesita sincronizarse
  // porque todos los wheel/touch events tienen preventDefault activo.

  const exitSection = useCallback((direction: 1 | -1) => {
    const st = triggerRef.current;
    if (!st) return;

    // FIX 2: desactivar de inmediato antes de llamar st.scroll().
    // Sin esto, los wheel events que llegan en el mismo frame siguen viendo
    // isSectionActiveRef=true y llaman exitSection en bucle, manteniendo el
    // scroll pegado al borde hasta que onLeave del ScrollTrigger finalmente
    // dispara (que puede tardar varios frames).
    isSectionActiveRef.current = false;
    wheelAccumRef.current = 0;

    const epsilon = 4;
    const target =
      direction > 0 ? st.end + epsilon : Math.max(0, st.start - epsilon);

    st.scroll(target);
  }, []);

  const goToIndex = useCallback(
    (nextIndex: number) => {
      const currentIndex = activeIndexRef.current;

      if (nextIndex === currentIndex) return;
      if (nextIndex < 0 || nextIndex > items.length - 1) return;

      const direction: 1 | -1 = nextIndex > currentIndex ? 1 : -1;
      lastDirectionRef.current = direction;
      isAnimatingRef.current = true;

      currentTimelineRef.current?.kill();

      const outTl = gsap.timeline({
        defaults: {
          duration: 0.34,
          ease: 'power2.in',
        },
        onComplete: () => {
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        },
      });

      outTl
        .to(
          imageWrapRef.current,
          {
            opacity: 0,
            x: direction > 0 ? -56 : 56,
            scale: 0.985,
          },
          0,
        )
        .to(
          shapeTopRef.current,
          {
            opacity: 0,
            x: direction > 0 ? -110 : 110,
            scale: 1,
          },
          0.02,
        )
        .to(
          shapeBottomRef.current,
          {
            opacity: 0,
            x: direction > 0 ? -80 : 80,
            scale: 1,
          },
          0.05,
        )
        .to(
          titleRef.current,
          {
            opacity: 0,
            y: direction > 0 ? -24 : 24,
          },
          0.04,
        )
        .to(
          descRef.current,
          {
            opacity: 0,
            y: direction > 0 ? -18 : 18,
          },
          0.08,
        );

      if (metaRef.current) {
        outTl.to(
          metaRef.current,
          {
            opacity: 0,
            y: direction > 0 ? -14 : 14,
          },
          0.1,
        );
      }

      currentTimelineRef.current = outTl;
      // FIX 1: syncScrollToIndex eliminado de aquí
    },
    [items.length],
  );

  const requestStep = useCallback(
    (direction: 1 | -1) => {
      if (!isSectionActiveRef.current) return;
      if (isAnimatingRef.current) return;

      const current = activeIndexRef.current;
      const next = current + direction;

      if (next < 0 || next > items.length - 1) {
        exitSection(direction);
        return;
      }

      goToIndex(next);
    },
    [exitSection, goToIndex, items.length],
  );

  useLayoutEffect(() => {
    if (!wrapperRef.current || !stickyRef.current) return;

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

      triggerRef.current = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * Math.max(items.length - 1, 1)}`,
        pin: stickyRef.current,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          isSectionActiveRef.current = true;
        },
        onEnterBack: () => {
          isSectionActiveRef.current = true;
        },
        onLeave: () => {
          isSectionActiveRef.current = false;
        },
        onLeaveBack: () => {
          isSectionActiveRef.current = false;
        },
      });
    }, wrapperRef);

    return () => {
      currentTimelineRef.current?.kill();
      triggerRef.current?.kill();
      triggerRef.current = null;
      ctx.revert();
    };
  }, [items.length]);

  useLayoutEffect(() => {
    if (!imageWrapRef.current || !titleRef.current || !descRef.current) return;

    currentTimelineRef.current?.kill();

    const direction = lastDirectionRef.current;

    gsap.set(imageWrapRef.current, {
      opacity: 0,
      x: direction > 0 ? 56 : -56,
      scale: 0.985,
    });

    gsap.set(titleRef.current, {
      opacity: 0,
      y: direction > 0 ? 24 : -24,
    });

    gsap.set(descRef.current, {
      opacity: 0,
      y: direction > 0 ? 18 : -18,
    });

    if (metaRef.current) {
      gsap.set(metaRef.current, {
        opacity: 0,
        y: direction > 0 ? 14 : -14,
      });
    }

    gsap.set(shapeTopRef.current, {
      opacity: 0,
      x: direction > 0 ? 110 : -110,
      scale: 1.03,
    });

    gsap.set(shapeBottomRef.current, {
      opacity: 0,
      x: direction > 0 ? 80 : -80,
      scale: 1.02,
    });

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        // FIX 3: limpiar el acumulador al terminar la animación de entrada.
        // Sin esto, los wheel events que llegan durante la animación siguen
        // sumando en wheelAccumRef y al completarse disparan pasos de golpe.
        wheelAccumRef.current = 0;
      },
    });

    tl.to(
      imageWrapRef.current,
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.72,
      },
      0,
    )
      .to(
        shapeTopRef.current,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.78,
        },
        0.08,
      )
      .to(
        shapeBottomRef.current,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
        },
        0.14,
      )
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
        },
        0.12,
      )
      .to(
        descRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
        },
        0.22,
      );

    if (metaRef.current) {
      tl.to(
        metaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
        },
        0.3,
      );
    }

    currentTimelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!isSectionActiveRef.current) return;

      e.preventDefault();

      if (isAnimatingRef.current) return;

      wheelAccumRef.current += e.deltaY;

      if (Math.abs(wheelAccumRef.current) < 60) return;

      const direction: 1 | -1 = wheelAccumRef.current > 0 ? 1 : -1;
      wheelAccumRef.current = 0;

      requestStep(direction);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!isSectionActiveRef.current) return;
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isSectionActiveRef.current) return;
      if (touchStartYRef.current == null) return;

      e.preventDefault();

      if (isAnimatingRef.current) return;

      const currentY = e.touches[0]?.clientY ?? touchStartYRef.current;
      const delta = touchStartYRef.current - currentY;

      if (Math.abs(delta) < 50) return;

      const direction: 1 | -1 = delta > 0 ? 1 : -1;
      touchStartYRef.current = null;

      requestStep(direction);
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [requestStep]);

  return (
    <div ref={wrapperRef} className="relative">
      <div
        ref={stickyRef}
        className="h-screen overflow-hidden"
        style={{ touchAction: 'none' }}
      >
        <div className="flex h-full items-center">
          <Section innerClassName="w-full">
            <div className="mx-auto mt-5 flex max-h-[820px] min-h-[620px] flex-col xl:mt-0">
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
                  <div className="col-span-6">
                    <div ref={titleRef} className="max-w-[40rem] text-black/70">
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

                      <p
                        ref={descRef}
                        className="mt-10 max-w-[35rem] font-body text-[clamp(1.5rem,1.25vw,1.85rem)] leading-normal"
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

                  <div className="col-span-6">
                    <div className="relative z-0 mx-auto flex w-full max-w-[46rem] items-center justify-center">
                      <div
                        ref={shapeTopRef}
                        className="pointer-events-none absolute right-0 top-[-5%] z-10 h-[38%] w-[54%]"
                      >
                        <Shape className="h-full w-full" opacity={0.045} />
                      </div>

                      <div
                        ref={shapeBottomRef}
                        className="pointer-events-none absolute bottom-[4%] left-[-2%] z-10 h-[26%] w-[30%]"
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
            {items.map((_, idx) => {
              const isActive = idx === selectedIndex;

              return (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Ir al slide ${idx + 1}`}
                  onClick={() => scrollTo(idx)}
                  className={`cursor-pointer rounded-full border transition-all duration-300 ${
                    isActive
                      ? 'h-3 w-3 border-black bg-transparent'
                      : 'h-2.5 w-2.5 border-black/10 bg-black/6'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-3 rounded-[1.2rem] bg-white/45 px-3 py-2 backdrop-blur-sm">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Slide précédent"
              className="grid h-14 w-14 cursor-pointer place-items-center rounded-full border-2 border-black/10 bg-white/70 text-black transition-opacity disabled:opacity-35"
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
              className="grid h-14 w-14 cursor-pointer place-items-center rounded-full border-2 border-black/10 bg-white/70 text-black transition-opacity disabled:opacity-35"
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
