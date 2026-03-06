'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './ScooterMobile.module.scss';

const ScooterScene = dynamic(() => import('@/components/three/ScooterScene'), {
  ssr: false,
});

export default function ScooterMobile() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');

    const update = () => setIsDesktop(media.matches);
    update();

    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <div className={styles.root}>
      {isDesktop ? (
        <div className={styles.desktopMedia}>
          <ScooterScene modelUrl="/3d/scooter2.glb" />
        </div>
      ) : (
        <div className={styles.mobileMedia}>
          <Image
            src="/images/scooter.webp"
            alt="Scooter"
            width={1800}
            height={1800}
            priority
            className={styles.mobileImage}
          />
        </div>
      )}
    </div>
  );
}
