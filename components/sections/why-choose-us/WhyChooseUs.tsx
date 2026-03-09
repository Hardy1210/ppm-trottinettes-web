'use client';

import { useIntro } from '@/context/IntroContext';
import type { ReactNode } from 'react';

import { IconShape2 } from '@/components/icons/IconShape2';
import { Section } from '@/components/layout/Section';

import { Gear } from '@/components/icons/Gear';
import { Leaf } from '@/components/icons/Leaf';
import { Shield } from '@/components/icons/Shield';

import ScooterMobile from '@/components/three/ScooterMobile';
import styles from './WhyChooseUs.module.scss';

type Item = {
  title: string;
  desc: string;
  iconTop: ReactNode; // icono que va ENCIMA del IconShape2
};

const items: Item[] = [
  {
    title: 'Qualité certifiée',
    desc: 'Chaque trottinette est révisée par nos techniciens.',
    iconTop: <Shield size={50} style={{ color: '#E4E700' }} />,
  },
  {
    title: 'Expertise technique',
    desc: 'Un diagnostic complet assure votre sécurité.',
    iconTop: <Gear size={50} />,
  },
  {
    title: 'Geste éco-responsable',
    desc: 'Donnez une seconde vie au matériel et réduisez votre empreinte carbone.',
    iconTop: <Leaf size={70} />,
  },
];

export default function WhyChooseUs() {
  const { introDoneLogo } = useIntro();
  return (
    <Section className={styles.section}>
      <div className={styles.inner}>
        {/* LEFT: 3D scooter */}
        <div className={styles.left}>
          <div className={styles.scooterStage} aria-hidden="true">
            {introDoneLogo && <ScooterMobile />}
          </div>
        </div>

        {/* RIGHT: text */}
        <div className={styles.right}>
          <p className={styles.kicker}>Pourquoi nous choisir ?</p>

          <ul className={styles.list}>
            {items.map((it) => (
              <li key={it.title} className={styles.item}>
                <span className={styles.iconWrap} aria-hidden="true">
                  <span className={styles.iconShape}>
                    <IconShape2 size={60} />
                  </span>
                  <span className={styles.iconTop}>{it.iconTop}</span>
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
