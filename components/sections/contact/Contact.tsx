'use client';

import { IconShape2 } from '@/components/icons/IconShape2';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';
import { PrimaryButton } from '@/ui/Buttons';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import styles from './Contact.module.scss';

// Si ya tienes un componente de línea reutilizable,
// reemplaza este bloque por tu import real.
// import { SectionUnderline } from '@/components/ui/SectionUnderline';

type ContactProps = {
  title?: string;
  placeTitle?: string;
  address?: string;
  weekLabel?: string;
  weekHours?: string;
  weekHoursTwo?: string;
  sundayLabel?: string;
  sundayHours?: string;
  phone?: string;
  ctaLabel?: string;
  ctaHref?: string;
  routeLabel?: string;
  routeHref?: string;
  privacyNote?: string;
  mapAriaLabel?: string;
};

export default function Contact({
  title = 'Contact',
  placeTitle = 'Trouvez-nous',
  address = '40 rue d’Alembert 21000 Dijon',
  weekLabel = 'Lundi – Samedi :',
  weekHours = '10:30 - 17:00',
  weekHoursTwo = '14:00 - 19:00',
  sundayLabel = 'Dimanche :',
  sundayHours = 'Fermé',
  phone = '+33676326473',
  ctaLabel = 'Prendre rendez-vous',
  ctaHref = '#',
  routeLabel = 'Voir l’itinéraire',
  routeHref = '#',
  privacyNote = `En cliquant sur « Prendre rendez-vous », vous serez redirigé vers un service externe de réservation. Les informations que vous choisissez d’y renseigner sont traitées par ce service selon sa propre politique de confidentialité.`,
  mapAriaLabel = 'Plan de localisation',
}: ContactProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const infoTitleRef = useRef<HTMLHeadingElement | null>(null);

  const lineTextRefs = useRef<(HTMLElement | null)[]>([]);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const mapCardRef = useRef<HTMLDivElement | null>(null);
  const infoCardRef = useRef<HTMLDivElement | null>(null);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const infoTitle = infoTitleRef.current;
    const mapCard = mapCardRef.current;
    const infoCard = infoCardRef.current;
    const ctaWrap = ctaWrapRef.current;

    if (!section || !title || !infoTitle || !mapCard || !infoCard || !ctaWrap) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const validLineTextRefs = lineTextRefs.current.filter(
      Boolean,
    ) as HTMLElement[];
    const validItemRefs = itemRefs.current.filter(Boolean) as HTMLElement[];

    const splitTitle = SplitText.create(title, {
      type: 'chars',
      charsClass: styles.char,
    });

    const splitInfoTitle = SplitText.create(infoTitle, {
      type: 'chars',
      charsClass: styles.char,
    });

    const lineSplits = validLineTextRefs.map((el) =>
      SplitText.create(el, {
        type: 'lines',
        linesClass: styles.line,
        mask: 'lines',
      }),
    );

    gsap.set(splitTitle.chars, {
      yPercent: 110,
      opacity: 0,
      rotateX: -70,
      transformOrigin: '50% 100%',
      willChange: 'transform, opacity',
    });

    gsap.set(splitInfoTitle.chars, {
      yPercent: 110,
      opacity: 0,
      rotateX: -70,
      transformOrigin: '50% 100%',
      willChange: 'transform, opacity',
    });

    lineSplits.forEach((split) => {
      gsap.set(split.lines, {
        yPercent: 120,
        opacity: 0,
        willChange: 'transform, opacity',
      });
    });

    gsap.set([mapCard, infoCard], {
      y: 40,
      opacity: 0,
      willChange: 'transform, opacity',
    });

    gsap.set(validItemRefs, {
      y: 24,
      opacity: 0,
      willChange: 'transform, opacity',
    });

    gsap.set(ctaWrap, {
      y: 20,
      opacity: 0,
      willChange: 'transform, opacity',
    });

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
      scrollTrigger: {
        trigger: section,
        start: 'top 72%',
        once: true,
      },
    });

    tl.to(splitTitle.chars, {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.025,
    })
      .to(
        mapCard,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        '-=0.45',
      )
      .to(
        infoCard,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        '<',
      )
      .to(
        splitInfoTitle.chars,
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.02,
        },
        '-=0.45',
      );

    lineSplits.forEach((split, index) => {
      tl.to(
        split.lines,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
        },
        index === 0 ? '-=0.45' : '-=0.5',
      );
    });

    tl.to(
      validItemRefs,
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.08,
      },
      '-=0.35',
    ).to(
      ctaWrap,
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
      },
      '-=0.3',
    );

    return () => {
      splitTitle.revert();
      splitInfoTitle.revert();
      lineSplits.forEach((split) => split.revert());
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.contactSection}
      aria-labelledby="contact-title"
    >
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 id="contact-title" ref={titleRef} className={styles.title}>
            {title}
          </h2>

          {/* Reemplaza esto por tu componente de línea */}
          <div className={styles.underlineWrap} aria-hidden="true">
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

        <div className={styles.grid}>
          <div ref={mapCardRef} className={styles.mapCard}>
            <div
              className={styles.mapVisual}
              aria-label={mapAriaLabel}
              role="img"
            >
              <Image
                src="/images/map-visual-1.webp"
                alt={mapAriaLabel}
                fill
                className={styles.mapImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* <svg
                className={styles.routeSvg}
                viewBox="0 0 420 300"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M115 210 L155 165 L220 192 L268 118"
                  className={styles.routeLine}
                />
              </svg>
               <span className={styles.arrowMarker} aria-hidden="true" />
              */}

              <span className={styles.pin} aria-hidden="true">
                <span className={styles.pinCore} />
              </span>
            </div>
          </div>

          <div ref={infoCardRef} className={styles.infoCard}>
            <IconShape2
              size={700}
              className={styles.infoCardShape}
              aria-hidden="true"
            />

            <div className={styles.infoContent}>
              <h3 ref={infoTitleRef} className={styles.placeTitle}>
                {placeTitle}
              </h3>

              <p
                ref={(el) => {
                  lineTextRefs.current[0] = el;
                }}
                className={styles.address}
              >
                {address}
              </p>

              <div className={styles.hours}>
                <div
                  ref={(el) => {
                    itemRefs.current[0] = el;
                  }}
                  className={styles.hoursRow}
                >
                  <span>{weekLabel}</span>
                  <span className="flex flex-col">
                    <span>{weekHours}</span>
                    <span>{weekHoursTwo}</span>
                  </span>
                </div>

                <div
                  ref={(el) => {
                    itemRefs.current[1] = el;
                  }}
                  className={styles.hoursRow}
                >
                  <span>{sundayLabel}</span>
                  <span>{sundayHours}</span>
                </div>
              </div>

              <a
                ref={(el) => {
                  itemRefs.current[2] = el;
                }}
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className={styles.phone}
              >
                {phone}
              </a>

              <div ref={ctaWrapRef} className={styles.actions}>
                <div className={styles.buttonWrap}>
                  <PrimaryButton href={ctaHref} className="text-[0.85rem]">
                    {ctaLabel}
                  </PrimaryButton>
                </div>

                <a
                  href={routeHref}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.routeLink}
                >
                  {routeLabel}
                </a>

                <p
                  ref={(el) => {
                    lineTextRefs.current[1] = el;
                  }}
                  className={styles.privacyNote}
                >
                  {privacyNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
