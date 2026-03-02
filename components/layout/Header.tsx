'use client';

import { useIntro } from '@/context/IntroContext';
import gsap from 'gsap';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import styles from './Header.module.scss';

export function Header() {
  const { introDoneLogo } = useIntro();
  const headerRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (!introDoneLogo) return;

    gsap.fromTo(
      headerRef.current,
      { autoAlpha: 0, y: -20 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    );
  }, [introDoneLogo]);
  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.backdrop} aria-hidden="true" />
      <nav aria-label="Main navigation" className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
