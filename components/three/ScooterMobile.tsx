'use client';

import gsap from 'gsap';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './ScooterMobile.module.scss';

const ScooterScene = dynamic(() => import('@/components/three/ScooterScene'), {
  ssr: false,
});

export default function ScooterMobile() {
  const [isDesktop, setIsDesktop] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  // ✅ Animación al montar
  useEffect(() => {
    if (!rootRef.current) return;

    gsap.fromTo(
      rootRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, delay: 1.5, duration: 1.2, ease: 'power2.out' },
    );
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
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
