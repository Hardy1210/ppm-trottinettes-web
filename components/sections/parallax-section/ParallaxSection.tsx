'use client';

import { IconShape2 } from '@/components/icons/IconShape2';
import { gsap } from '@/lib/gsap';
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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bgParallax = bgParallaxRef.current;

    if (!section || !bgParallax) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        gsap.set(bgParallax, {
          y: -30,
          scale: 1.08,
          willChange: 'transform',
        });

        gsap.to(bgParallax, {
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }, section);

      return () => ctx.revert();
    });

    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        gsap.set(bgParallax, {
          clearProps: 'transform,willChange',
        });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
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
          <div className={styles.topRow}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.textBox}>
              <p className={styles.description}>{description}</p>
            </div>
          </div>

          <div className={styles.titleLineWrap} aria-hidden="true">
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
          <p className={styles.descriptionBottom}>{description}</p>
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
