'use client';

import { Section } from '@/components/layout/Section';
import dynamic from 'next/dynamic';
import styles from './WhyChooseUs.module.scss';

const ScooterScene = dynamic(() => import('@/components/three/ScooterScene'), {
  ssr: false,
});

type Item = {
  title: string;
  desc: string;
  iconSlot?: React.ReactNode; // aquí metes TU icono luego
};

const items: Item[] = [
  {
    title: 'Qualité certifiée',
    desc: 'Chaque trottinette est révisée par nos techniciens.',
  },
  {
    title: 'Expertise technique',
    desc: 'Un diagnostic complet assure votre sécurité.',
  },
  {
    title: 'Geste éco-responsable',
    desc: 'Donnez une seconde vie au matériel et réduisez votre empreinte carbone.',
  },
];

export default function WhyChooseUs() {
  return (
    <Section className={styles.section}>
      <div className={styles.inner}>
        {/* LEFT: 3D scooter */}
        <div className={styles.left}>
          <div className={styles.scooterStage} aria-hidden="true">
            <ScooterScene modelUrl="/3d/scooter.glb" />
          </div>
        </div>

        {/* RIGHT: text */}
        <div className={styles.right}>
          <p className={styles.kicker}>Pourquoi nous choisir ?</p>

          <ul className={styles.list}>
            {items.map((it) => (
              <li key={it.title} className={styles.item}>
                <span className={styles.iconWrap} aria-hidden="true">
                  {/* Placeholder: reemplaza por tus icons */}
                  <span className={styles.iconPlaceholder} />
                </span>

                <div className={styles.text}>
                  <h3 className={styles.title}>{it.title}</h3>
                  <p className={styles.desc}>{it.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
