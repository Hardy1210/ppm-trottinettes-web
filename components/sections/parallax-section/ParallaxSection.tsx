'use client';

import { IconShape2 } from '@/components/icons/IconShape2';
import {
  gsap,
  registerGsapPlugins,
  ScrollTrigger,
  SplitText,
} from '@/lib/gsap';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import styles from './ParallaxSection.module.scss';

type Props = {
  title?: string;
  description?: string;
  backgroundSrc?: string;
  grainSrc?: string;
};

export default function ParallaxSection({
  title = 'Nos services',
  description = `Nous accompagnons chaque client avec sérieux et transparence. Notre priorité est d’assurer un service fiable, rapide et durable, afin de garantir votre sécurité et la performance de votre mobilité au quotidien.`,
  backgroundSrc = '/image/parallax/parallax.webp',
  grainSrc = '/image/parallax/gran.webp',
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgParallaxRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const descriptionBottomRef = useRef<HTMLParagraphElement | null>(null);
  const topRowRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();

    const section = sectionRef.current;
    const bgParallax = bgParallaxRef.current;

    let titleSplit: SplitText | undefined;
    let introSplit: SplitText | undefined;
    let descriptionBottomSplit: SplitText | undefined;

    if (!section || !bgParallax) return;

    const mm = gsap.matchMedia();

    const initAnimations = () => {
      mm.add('(min-width: 768px)', () => {
        const ctx = gsap.context(() => {
          gsap.set(bgParallax, {
            yPercent: -8,
            scale: 1.08,
            willChange: 'transform',
          });

          gsap.to(bgParallax, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          if (
            !titleRef.current ||
            !introRef.current ||
            !dividerRef.current ||
            !topRowRef.current
          )
            return;

          titleSplit = SplitText.create(titleRef.current, {
            type: 'chars',
            charsClass: 'char',
            mask: 'chars',
          });

          introSplit = SplitText.create(introRef.current, {
            type: 'lines',
            linesClass: 'line',
            mask: 'lines',
          });

          gsap.set(titleSplit.chars, {
            yPercent: 110,
            autoAlpha: 0,
          });

          gsap.set(introSplit.lines, {
            yPercent: 100,
            autoAlpha: 0,
          });

          gsap.set(dividerRef.current, {
            scaleX: 0,
            transformOrigin: 'left center',
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: topRowRef.current,
              start: 'top 82%',
              once: true,
              //markers: true,
              invalidateOnRefresh: true,
            },
          });

          tl.to(titleSplit.chars, {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.018,
            ease: 'power4.out',
          })
            .to(
              introSplit.lines,
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.9,
                stagger: 0.08,
                ease: 'expo.out',
              },
              '-=0.55',
            )
            .to(
              dividerRef.current,
              {
                scaleX: 1,
                duration: 0.8,
                ease: 'power3.out',
              },
              '-=0.65',
            );

          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        }, section);

        return () => {
          ctx.revert();
          titleSplit?.revert();
          introSplit?.revert();
        };
      });

      mm.add('(max-width: 767px)', () => {
        const ctx = gsap.context(() => {
          gsap.set(bgParallax, {
            clearProps: 'transform,willChange',
          });

          if (
            !titleRef.current ||
            !dividerRef.current ||
            !descriptionBottomRef.current
          )
            return;

          titleSplit = SplitText.create(titleRef.current, {
            type: 'chars',
            charsClass: 'char',
            mask: 'chars',
          });

          descriptionBottomSplit = SplitText.create(
            descriptionBottomRef.current,
            {
              type: 'lines',
              linesClass: 'line',
              mask: 'lines',
            },
          );

          gsap.set(titleSplit.chars, {
            yPercent: 110,
            autoAlpha: 0,
          });

          gsap.set(descriptionBottomSplit.lines, {
            yPercent: 100,
            autoAlpha: 0,
          });

          gsap.set(dividerRef.current, {
            scaleX: 0,
            transformOrigin: 'left center',
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
              invalidateOnRefresh: true,
            },
          });

          tl.to(titleSplit.chars, {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.018,
            ease: 'power4.out',
          })
            .to(
              dividerRef.current,
              {
                scaleX: 1,
                duration: 0.8,
                ease: 'power3.out',
              },
              '-=0.25',
            )
            .to(
              descriptionBottomSplit.lines,
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.9,
                stagger: 0.08,
                ease: 'expo.out',
              },
              '-=0.15',
            );

          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        }, section);

        return () => {
          ctx.revert();
          titleSplit?.revert();
          descriptionBottomSplit?.revert();
        };
      });
    };

    if ('fonts' in document) {
      document.fonts.ready.then(initAnimations);
    } else {
      initAnimations();
    }

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.Parallax}>
      <div className={styles.mediaLayer}>
        <div className={styles.parallaxViewport}>
          <div ref={bgParallaxRef} className={styles.parallaxInner}>
            <Image
              src={backgroundSrc}
              alt="Illustration des services"
              fill
              priority
              className={styles.bgImage}
              sizes="100vw"
            />
          </div>
        </div>

        <div className={styles.darkOverlay} />

        <div
          className={styles.grainLayer}
          style={{ backgroundImage: `url(${grainSrc})` }}
          aria-hidden="true"
        />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div ref={topRowRef} className={styles.topRow}>
            <h2 ref={titleRef} className={styles.title}>
              {title}
            </h2>

            <div className={styles.textBox}>
              <p ref={introRef} className={styles.description}>
                {description}
              </p>
            </div>
          </div>

          <div
            ref={dividerRef}
            className={styles.titleLineWrap}
            aria-hidden="true"
          >
            <svg
              viewBox="2 0 355 16"
              preserveAspectRatio="none"
              className={styles.titleLine}
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

          <p ref={descriptionBottomRef} className={styles.descriptionBottom}>
            {description}
          </p>
        </div>

        <IconShape2
          size={400}
          color="#FEFEFE"
          className={styles.topShape}
          aria-hidden="true"
        />
        <IconShape2
          size={400}
          color="#FEFEFE"
          className={styles.bottomShape}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
