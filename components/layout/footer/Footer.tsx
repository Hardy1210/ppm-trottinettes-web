'use client';

import { gsap, SplitText } from '@/lib/gsap';
import { PrimaryButton } from '@/ui/Buttons';
import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import styles from './Footer.module.scss';

type FooterProps = {
  titleTop?: string;
  titleBottom?: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  buttonLabel?: string;
};

export default function Footer({
  titleTop = 'Besoin d’aide ?',
  titleBottom = 'Parlons-nous.',
  email = 'rrepartrot@gmail.com',
  phone = '0676326473',
  addressLine1 = '40 rue d’Alembert',
  addressLine2 = '21000, Dijon',
  buttonLabel = 'Contact',
}: FooterProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  const titleLine1Ref = useRef<HTMLSpanElement | null>(null);
  const titleLine2Ref = useRef<HTMLSpanElement | null>(null);

  const yellowLinkRefs = useRef<HTMLAnchorElement[]>([]);
  const yellowSplitWrappersRef = useRef<HTMLSpanElement[]>([]);
  const ctaArrowRef = useRef<HTMLSpanElement | null>(null);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const splitInstances: SplitText[] = [];

      const titleEls = [titleLine1Ref.current, titleLine2Ref.current].filter(
        Boolean,
      ) as HTMLElement[];

      titleEls.forEach((el) => {
        const split = new SplitText(el, {
          type: 'chars',
          charsClass: styles.splitChar,
        });

        splitInstances.push(split);

        gsap.set(split.chars, {
          yPercent: 110,
          opacity: 0,
          willChange: 'transform, opacity',
        });

        gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 0.9,
          stagger: 0.025,
          delay: 0.1,
        });
      });

      yellowSplitWrappersRef.current.forEach((wrapper) => {
        if (!wrapper) return;

        const split = new SplitText(wrapper, {
          type: 'chars',
          charsClass: styles.splitChar,
        });

        splitInstances.push(split);

        gsap.set(split.chars, {
          yPercent: 0,
          opacity: 1,
        });
      });

      yellowLinkRefs.current.forEach((link) => {
        if (!link) return;

        const inner = link.querySelector(
          `.${styles.yellowLinkInner}`,
        ) as HTMLElement | null;

        const chars = link.querySelectorAll(`.${styles.splitChar}`);

        const onEnter = () => {
          gsap.to(link, {
            color: 'rgba(226, 230, 0, 0.75)',
            duration: 0.25,
            ease: 'power2.out',
          });

          gsap.to(chars, {
            yPercent: -12,
            duration: 0.28,
            stagger: 0.012,
            ease: 'power2.out',
          });

          if (inner) {
            gsap.to(inner, {
              x: 2,
              duration: 0.28,
              ease: 'power2.out',
            });
          }
        };

        const onLeave = () => {
          gsap.to(link, {
            color: 'rgba(226, 230, 0, 1)',
            duration: 0.25,
            ease: 'power2.out',
          });

          gsap.to(chars, {
            yPercent: 0,
            duration: 0.28,
            stagger: 0.012,
            ease: 'power2.out',
          });

          if (inner) {
            gsap.to(inner, {
              x: 0,
              duration: 0.28,
              ease: 'power2.out',
            });
          }
        };

        link.addEventListener('mouseenter', onEnter);
        link.addEventListener('mouseleave', onLeave);

        cleanups.push(() => {
          link.removeEventListener('mouseenter', onEnter);
          link.removeEventListener('mouseleave', onLeave);
        });
      });

      if (ctaWrapRef.current && ctaArrowRef.current) {
        const onEnter = () => {
          gsap.to(ctaArrowRef.current, {
            x: 8,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        const onLeave = () => {
          gsap.to(ctaArrowRef.current, {
            x: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        ctaWrapRef.current.addEventListener('mouseenter', onEnter);
        ctaWrapRef.current.addEventListener('mouseleave', onLeave);

        cleanups.push(() => {
          ctaWrapRef.current?.removeEventListener('mouseenter', onEnter);
          ctaWrapRef.current?.removeEventListener('mouseleave', onLeave);
        });
      }

      const marqueeTrack = rootRef.current?.querySelector(
        `.${styles.marqueeTrack}`,
      ) as HTMLElement | null;

      if (marqueeTrack) {
        gsap.to(marqueeTrack, {
          xPercent: -50,
          ease: 'none',
          duration: 18,
          repeat: -1,
        });
      }

      return () => {
        cleanups.forEach((fn) => fn());
        splitInstances.forEach((split) => split.revert());
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topGrid}>
          <div className={styles.brandCol}>
            <Link
              href="#"
              className={styles.brandMark}
              aria-label="Pile Power Mobilité"
            >
              <Image
                src="/logo-navbar2.svg"
                alt="PPM"
                width={130}
                height={40}
                priority
              />
            </Link>

            <div ref={ctaWrapRef} className={styles.ctaWrap}>
              <Link href="#" className={styles.ctaButton}>
                <PrimaryButton>{buttonLabel}</PrimaryButton>
              </Link>

              <span
                ref={ctaArrowRef}
                className={styles.ctaArrow}
                aria-hidden="true"
              >
                <span className={styles.ctaArrowTexture} />
                <svg
                  viewBox="0 0 24 24"
                  className={styles.ctaArrowIcon}
                  fill="none"
                >
                  <path
                    d="M8 5L15 12L8 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className={styles.contentCol}>
            <div className={styles.titleBlock}>
              <span className={styles.titleLineMask}>
                <span ref={titleLine1Ref} className={styles.titleLine}>
                  {titleTop}
                </span>
              </span>

              <span className={styles.titleLineMask}>
                <span ref={titleLine2Ref} className={styles.titleLineStrong}>
                  {titleBottom}
                </span>
              </span>
            </div>

            <div className={styles.linksGrid}>
              <div className={styles.linksGroup}>
                <h3 className={styles.groupTitle}>Website map</h3>

                <nav className={styles.navList} aria-label="Website map">
                  {['Accueil', 'Services', 'À propos', 'Contact'].map(
                    (item) => (
                      <Link key={item} href="#" className={styles.whiteLink}>
                        {item}
                      </Link>
                    ),
                  )}
                </nav>
              </div>

              <div className={styles.linksGroup}>
                <h3 className={styles.groupTitle}>AIDE & CONTACT</h3>

                <div className={styles.infoList}>
                  <Link href="#" className={styles.whiteLink}>
                    {email}
                  </Link>

                  <Link href="#" className={styles.whiteLink}>
                    Tel : {phone}
                  </Link>

                  <Link href="#" className={styles.whiteLink}>
                    {addressLine1}
                  </Link>

                  <Link href="#" className={styles.whiteLink}>
                    {addressLine2}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomArea}>
          <div className={styles.socialRow}>
            <a
              href="#"
              className={styles.yellowLink}
              ref={(el) => {
                if (el) yellowLinkRefs.current[0] = el;
              }}
            >
              <span className={styles.yellowLinkOverflow}>
                <span className={styles.yellowLinkInner}>
                  <span
                    ref={(el) => {
                      if (el) yellowSplitWrappersRef.current[0] = el;
                    }}
                  >
                    INSTAGRAM
                  </span>
                </span>
              </span>
            </a>

            <a
              href="#"
              className={styles.yellowLink}
              ref={(el) => {
                if (el) yellowLinkRefs.current[1] = el;
              }}
            >
              <span className={styles.yellowLinkOverflow}>
                <span className={styles.yellowLinkInner}>
                  <span
                    ref={(el) => {
                      if (el) yellowSplitWrappersRef.current[1] = el;
                    }}
                  >
                    FACEBOOK
                  </span>
                </span>
              </span>
            </a>
          </div>

          <div className={styles.marqueeWrap} aria-hidden="true">
            <span className={styles.marqueeBg} />
            <span className={styles.marqueeOverlay} />
            <span className={styles.marqueeNoise} />

            <div className={styles.marqueeTrack}>
              <div className={styles.logoMaskItem} />
              <div className={styles.logoMaskItem} />
              <div className={styles.logoMaskItem} />
              <div className={styles.logoMaskItem} />
            </div>
          </div>

          <div className={styles.legalRow}>
            <a
              href="#"
              className={styles.yellowLink}
              ref={(el) => {
                if (el) yellowLinkRefs.current[2] = el;
              }}
            >
              <span className={styles.yellowLinkOverflow}>
                <span className={styles.yellowLinkInner}>
                  <span
                    ref={(el) => {
                      if (el) yellowSplitWrappersRef.current[2] = el;
                    }}
                  >
                    Mentions légales
                  </span>
                </span>
              </span>
            </a>

            <a
              href="#"
              className={styles.yellowLink}
              ref={(el) => {
                if (el) yellowLinkRefs.current[3] = el;
              }}
            >
              <span className={styles.yellowLinkOverflow}>
                <span className={styles.yellowLinkInner}>
                  <span
                    ref={(el) => {
                      if (el) yellowSplitWrappersRef.current[3] = el;
                    }}
                  >
                    By Kalé Studio
                  </span>
                </span>
              </span>
            </a>

            <p className={styles.copyright}>© 2026 Pile Power Mobilité</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
