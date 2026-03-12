import { Section } from '@/components/layout/Section';
import YellowPanelLeftShape from '@/ui/YellowPanelLeftShape';
import Image from 'next/image';
import styles from './WorkshopSection.module.scss';

type WorkshopSectionProps = {
  imageSrc: string;
  imageAlt?: string;
};

export function WorkshopSection({
  imageSrc = '/images/chris.webp',
  imageAlt = 'Technicien réparant une carte électronique dans l’atelier',
}: WorkshopSectionProps) {
  return (
    <section
      className={styles.workshopSection}
      aria-labelledby="workshop-title"
    >
      <Section innerClassName={styles.inner}>
        <div>
          <div className={styles.topBlock}>
            <div className={styles.headingWrap}>
              <h2 id="workshop-title" className={styles.title}>
                Notre atelier
              </h2>
            </div>

            <div className={styles.introWrap}>
              <p className={styles.introText}>
                Spécialisé dans la réparation et la maintenance de trottinettes
                électriques, l’atelier est né de la volonté de proposer une
                alternative fiable face aux coûts élevés et aux délais souvent
                trop longs du service après-vente traditionnel.
              </p>
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
        </div>
        <div className={styles.bottomBlock}>
          <article
            className={styles.quoteBlock}
            aria-labelledby="workshop-quote-author"
          >
            <div className={styles.quoteMark} aria-hidden="true">
              &#10077;
            </div>

            <blockquote className={styles.quote}>
              <p className={styles.quoteText}>
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
            {/* formes discrètes de fond */}

            {/* image principale */}
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
      {/* forme jaune principale */}
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
