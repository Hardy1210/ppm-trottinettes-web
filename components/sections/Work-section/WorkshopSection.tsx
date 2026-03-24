'use client';

import { Quote } from '@/components/icons/Quote';
import { Section } from '@/components/layout/Section';
import { gsap, registerGsapPlugins, SplitText } from '@/lib/gsap';
import YellowPanelLeftShape from '@/ui/YellowPanelLeftShape';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import styles from './WorkshopSection.module.scss';

type WorkshopSectionProps = {
  imageSrc: string;
  imageAlt?: string;
};

export function WorkshopSection({
  imageSrc,
  imageAlt = 'Technicien réparant une carte électronique dans l’atelier',
}: WorkshopSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();

    let titleSplit: SplitText | undefined;
    let introSplit: SplitText | undefined;
    let descriptionSplit: SplitText | undefined;
    let ctx: gsap.Context | undefined;

    const init = async () => {
      await document.fonts.ready;

      if (
        !sectionRef.current ||
        !titleRef.current ||
        !introRef.current ||
        !descriptionRef.current ||
        !dividerRef.current
      ) {
        return;
      }

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

        descriptionSplit = SplitText.create(descriptionRef.current!, {
          type: 'lines',
          linesClass: 'line',
          mask: 'lines',
        });

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
            '-=0.5',
          )
          .from(
            dividerRef.current,
            {
              scaleX: 0,
              transformOrigin: 'left center',
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.69',
          )
          .from(
            descriptionSplit.lines,
            {
              yPercent: 100,
              opacity: 0,
              duration: 0.85,
              stagger: 0.06,
              ease: 'power2.out',
            },
            '-=0.48',
          );
      }, sectionRef);
    };

    init();

    return () => {
      ctx?.revert();
      titleSplit?.revert();
      introSplit?.revert();
      descriptionSplit?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.workshopSection}
      aria-labelledby="workshop-title"
    >
      <Section id="apropos" innerClassName={styles.inner}>
        <div>
          <div className={styles.topBlock}>
            <div className={styles.headingWrap}>
              <h2 ref={titleRef} id="workshop-title" className={styles.title}>
                Notre atelier
              </h2>
            </div>

            <div className={styles.introWrap}>
              <p ref={introRef} className={styles.introText}>
                Spécialisé dans la réparation et la maintenance de trottinettes
                électriques, l’atelier est né de la volonté de proposer une
                alternative fiable face aux coûts élevés et aux délais souvent
                trop longs du service après-vente traditionnel.
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
        </div>

        <div className={styles.bottomBlock}>
          <article
            className={styles.quoteBlock}
            aria-labelledby="workshop-quote-author"
          >
            <div className="text-primary-white/95">
              <Quote size={50} />
            </div>

            <blockquote className={styles.quote}>
              <p ref={descriptionRef} className={styles.quoteText}>
                Passionnés de mécanique et utilisateurs quotidiens de
                trottinettes électriques, nous développons des solutions fiables
                pour particuliers et professionnels avec un service rapide et
                honnête.
              </p>
            </blockquote>

            <footer className={styles.author}>
              <p id="workshop-quote-author" className={styles.authorName}>
                Barbarin Christophe
              </p>
              <p className={styles.authorRole}>Fondateur</p>
            </footer>
          </article>

          <div className={styles.mediaBlock}>
            <figure className={styles.figure}>
              <div className={styles.imageMask}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 42vw, 520px"
                />
              </div>
            </figure>
          </div>
        </div>
      </Section>

      <div className={styles.yellowPanelWrap} aria-hidden="true">
        <YellowPanelLeftShape className={styles.yellowPanel} />

        <div className={styles.ambientShapes} aria-hidden="true">
          <span className={`${styles.ambientShape} ${styles.shapeOne}`} />
          <span className={`${styles.ambientShape} ${styles.shapeTwo}`} />
          <span className={`${styles.ambientShape} ${styles.shapeThree}`} />
        </div>
      </div>

      <span className={styles.dotGrid} />
    </section>
  );
}
