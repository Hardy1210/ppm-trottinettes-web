'use client';

import { serviceListData } from '@/_data/ServiceList';
import useEmblaCarousel from 'embla-carousel-react';
import { gsap } from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ServiceList.module.scss';

type ServiceListItem = {
  key?: string;
  _key?: string;
  title: string;
  description: string;
  priceLabel?: string;
  priceValue?: string;
  order?: number;
};

type ServiceListProps = {
  title?: string;
  intro?: string;
  items?: ServiceListItem[];
  footnote?: string;
};

const DEFAULT_FOOTNOTE =
  '(*)Tous les tarifs sont donnés à titre indicatif et peuvent varier en fonction du modèle, de la marque et de la complexité d’intervention. Un devis est exclusivement proposé sur demande pour les interventions complexes ou spécifiques.';

function normalizeItems(items?: ServiceListItem[]) {
  const base: ServiceListItem[] = items?.length ? items : serviceListData;

  return [...base]
    .map((item, index) => ({
      key: item.key || item._key || `${item.title}-${index}`,
      title: item.title || '',
      description: item.description || '',
      priceLabel: item.priceLabel,
      priceValue: item.priceValue,
      order: item.order ?? index + 1,
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function useIsDesktop(query = '(min-width: 992px)') {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`${styles.plusIcon} ${open ? styles.plusIconOpen : ''}`}
      aria-hidden="true"
    >
      <span className={styles.plusLineHorizontal} />
      <span className={styles.plusLineVertical} />
    </span>
  );
}

function ServiceAccordionItem({
  item,
  open,
  onMouseEnter,
}: {
  item: ReturnType<typeof normalizeItems>[number];
  open: boolean;
  onMouseEnter: () => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const content = contentRef.current;
    const inner = innerRef.current;

    if (!content || !inner) return;

    const nextHeight = open ? inner.offsetHeight : 0;

    gsap.to(content, {
      height: nextHeight,
      opacity: open ? 1 : 0,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: true,
    });
  }, [open]);

  return (
    <article
      role="button"
      tabIndex={0}
      className={`${styles.item} ${open ? styles.itemOpen : ''}`}
      onMouseEnter={onMouseEnter}
      onFocus={onMouseEnter}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onMouseEnter();
        }
      }}
    >
      <div className={styles.itemInner}>
        <div className={styles.itemHeaderRow}>
          <h3 className={styles.itemTitle}>{item.title}</h3>

          <div className={styles.itemHeaderAside}>
            <PlusIcon open={open} />
          </div>
        </div>

        <div ref={contentRef} className={styles.itemContentWrap}>
          <div ref={innerRef} className={styles.itemContentInner}>
            <div className={styles.itemOpenContent}>
              <p className={styles.itemDescription}>{item.description}</p>

              <div className={styles.priceBox}>
                <span className={styles.priceLabel}>
                  {item.priceLabel || 'Prix indicatif'}
                </span>
                <span className={styles.priceValue}>{item.priceValue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ServiceList({
  title = 'Nos services',
  intro,
  items,
  footnote = DEFAULT_FOOTNOTE,
}: ServiceListProps) {
  const isDesktop = useIsDesktop();
  const normalizedItems = useMemo(() => normalizeItems(items), [items]);

  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const canScrollPrev = selectedIndex > 0;
  const canScrollNext = selectedIndex < normalizedItems.length - 1;

  useEffect(() => {
    if (!emblaApi || isDesktop !== false) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, isDesktop]);

  if (isDesktop === null) return null;

  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.srOnly}>
          <h2 className={styles.sectionTitle}>{title}</h2>
          {intro ? <p className={styles.sectionIntro}>{intro}</p> : null}
        </header>

        {isDesktop ? (
          <div className={styles.desktopList}>
            {normalizedItems.map((item, index) => (
              <ServiceAccordionItem
                key={item.key}
                item={item}
                open={activeIndex === index}
                onMouseEnter={() => setActiveIndex(index)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.mobileWrapper}>
            <div className={styles.embla} ref={emblaRef}>
              <div className={styles.emblaContainer}>
                {normalizedItems.map((item) => (
                  <article key={item.key} className={styles.emblaSlide}>
                    <div className={styles.mobileCard}>
                      <h3 className={styles.mobileTitle}>{item.title}</h3>

                      <p className={styles.mobileDescription}>
                        {item.description}
                      </p>

                      <div className={styles.mobileBottom}>
                        {(item.priceLabel || item.priceValue) && (
                          <div className={styles.mobilePriceRow}>
                            <span className={styles.mobilePriceLabel}>
                              {item.priceLabel || 'Prix indicatif'}
                            </span>
                            <span className={styles.mobilePriceValue}>
                              {item.priceValue}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.mobileControls}>
              <div className={styles.dots}>
                {normalizedItems.map((item, index) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`${styles.dot} ${
                      selectedIndex === index ? styles.dotActive : ''
                    }`}
                    onClick={() => emblaApi?.scrollTo(index)}
                    aria-label={`Aller au service ${index + 1}`}
                  />
                ))}
              </div>

              <div className={styles.arrows}>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={() => emblaApi?.scrollPrev()}
                  disabled={!canScrollPrev}
                  aria-label="Service précédent"
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
                  className={styles.arrowBtn}
                  onClick={() => emblaApi?.scrollNext()}
                  disabled={!canScrollNext}
                  aria-label="Service suivant"
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
          </div>
        )}

        <p className={styles.footnote}>{footnote}</p>
      </div>
    </section>
  );
}
