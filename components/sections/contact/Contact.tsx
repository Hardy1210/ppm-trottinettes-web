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
  ctaHref = 'https://calendar.app.google/qNJHSjsfdHy12Hrz6',
  routeLabel = 'Voir l’itinéraire',
  routeHref = 'https://www.google.com/maps/dir/?api=1&destination=40+rue+d%27Alembert,+21000+Dijon,+France',
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
  const headingRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const title = titleRef.current;
    const infoTitle = infoTitleRef.current;
    const mapCard = mapCardRef.current;
    const infoCard = infoCardRef.current;
    const ctaWrap = ctaWrapRef.current;

    if (
      !section ||
      !heading ||
      !title ||
      !infoTitle ||
      !mapCard ||
      !infoCard ||
      !ctaWrap
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);

    let splitTitle: SplitText | undefined;
    let splitInfoTitle: SplitText | undefined;
    let lineSplits: SplitText[] = [];
    let ctx: gsap.Context | undefined;

    const init = async () => {
      if ('fonts' in document) {
        await document.fonts.ready;
      }

      const validLineTextRefs = lineTextRefs.current.filter(
        Boolean,
      ) as HTMLElement[];
      const validItemRefs = itemRefs.current.filter(Boolean) as HTMLElement[];

      ctx = gsap.context(() => {
        splitTitle = SplitText.create(title, {
          type: 'chars',
          charsClass: styles.char,
          mask: 'chars',
        });

        splitInfoTitle = SplitText.create(infoTitle, {
          type: 'chars',
          charsClass: styles.char,
          mask: 'chars',
        });

        lineSplits = validLineTextRefs.map((el) =>
          SplitText.create(el, {
            type: 'lines',
            linesClass: styles.line,
            mask: 'lines',
          }),
        );

        gsap.set(splitTitle.chars, {
          yPercent: 110,
          autoAlpha: 0,
          rotateX: -70,
          transformOrigin: '50% 100%',
          willChange: 'transform, opacity',
        });

        gsap.set(splitInfoTitle.chars, {
          yPercent: 110,
          autoAlpha: 0,
          rotateX: -70,
          transformOrigin: '50% 100%',
          willChange: 'transform, opacity',
        });

        lineSplits.forEach((split) => {
          gsap.set(split.lines, {
            yPercent: 120,
            autoAlpha: 0,
            willChange: 'transform, opacity',
          });
        });

        gsap.set([mapCard, infoCard], {
          y: 40,
          autoAlpha: 0,
          willChange: 'transform, opacity',
        });

        gsap.set(validItemRefs, {
          y: 24,
          autoAlpha: 0,
          willChange: 'transform, opacity',
        });

        gsap.set(ctaWrap, {
          y: 20,
          autoAlpha: 0,
          willChange: 'transform, opacity',
        });

        const tl = gsap.timeline({
          defaults: {
            ease: 'power3.out',
          },
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            once: true,
            invalidateOnRefresh: true,
            //markers: true,
          },
        });

        tl.to(splitTitle.chars, {
          yPercent: 0,
          autoAlpha: 1,
          rotateX: 0,
          duration: 0.75,
          stagger: {
            amount: 0.32,
          },
          ease: 'power3.out',
        })
          .to(
            mapCard,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: 'power3.out',
            },
            '-=0.42',
          )
          .to(
            infoCard,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: 'power3.out',
            },
            '<',
          )
          .to(
            splitInfoTitle.chars,
            {
              yPercent: 0,
              autoAlpha: 1,
              rotateX: 0,
              duration: 0.7,
              stagger: {
                amount: 0.22,
              },
            },
            '-=0.45',
          )
          .addLabel('infoContentStart', '-=0.2');

        lineSplits.forEach((split, index) => {
          tl.to(
            split.lines,
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.6,
              stagger: {
                amount: 0.18,
              },
              ease: 'expo.out',
            },
            index === 0 ? 'infoContentStart' : 'infoContentStart+=0.08',
          );
        });

        tl.to(
          validItemRefs,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            stagger: {
              amount: 0.18,
            },
            ease: 'power3.out',
          },
          'infoContentStart+=0.12',
        ).to(
          ctaWrap,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power3.out',
          },
          'infoContentStart+=0.2',
        );

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, section);
    };

    init();

    return () => {
      ctx?.revert();
      splitTitle?.revert();
      splitInfoTitle?.revert();
      lineSplits.forEach((split) => split.revert());
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={styles.contactSection}
      aria-labelledby="contact-title"
    >
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.heading}>
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
            <a
              href={routeHref}
              target="_blank"
              rel="noreferrer"
              className={styles.mapVisual}
              aria-label="Ouvrir l’itinéraire dans l’application de navigation"
            >
              <Image
                src="/images/map-visual-1.webp"
                alt={mapAriaLabel}
                fill
                className={styles.mapImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <span className={styles.pin} aria-hidden="true">
                <span className={styles.pinCore} />
              </span>
            </a>
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
                  <PrimaryButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href={ctaHref}
                    className="text-[0.85rem]"
                  >
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
