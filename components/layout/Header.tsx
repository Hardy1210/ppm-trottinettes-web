'use client';

import { useIntro } from '@/context/IntroContext';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { MenuOverlayPortal } from '../MenuOverlayPortal';
import styles from './Header.module.scss';

type NavItem = {
  label: string;
  href: string;
  sectionId?: string;
};

type HeaderProps = {
  items?: NavItem[];
  phoneE164?: string;
  whatsapp?: boolean;
};

function toDigitsOnly(phoneE164: string) {
  return phoneE164.replace(/[^\d]/g, '');
}

export function Header({
  items,
  phoneE164 = '+33676326473',
  whatsapp = true,
}: HeaderProps) {
  const { introDoneLogo } = useIntro();
  const headerRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const [activeId, setActiveId] = useState<string | null>(null);

  // --- Desktop menu (burger) state/refs
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const openBtnRef = useRef<HTMLButtonElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const navItems = useMemo<NavItem[]>(
    () =>
      items ?? [
        { label: 'Accueil', href: '/#accueil', sectionId: 'accueil' },
        { label: 'À propos', href: '/#apropos', sectionId: 'apropos' },
        { label: 'Services', href: '/#services', sectionId: 'services' },
        { label: 'Contact', href: '/#contact', sectionId: 'contact' },
        {
          label: 'Nos trottinettes',
          href: '/catalogue',
        },
      ],
    [items],
  );

  const pathname = usePathname();
  const isHome = pathname === '/';
  const isCatalogue = pathname === '/catalogue';

  // Fade in header (sin desplazamiento)
  useLayoutEffect(() => {
    const header = headerRef.current;
    const inner = innerRef.current;
    const backdrop = backdropRef.current;

    if (!header || !inner || !backdrop) return;

    gsap.killTweensOf([header, inner, backdrop]);

    // 1) Si NO es home -> visible directo
    if (!isHome) {
      gsap.set(header, { autoAlpha: 1 });
      gsap.set(backdrop, { autoAlpha: 1 });
      gsap.set(inner, {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
      });
      return;
    }

    // 2) Si es home y la intro no terminó -> oculto
    if (!introDoneLogo) {
      gsap.set(header, { autoAlpha: 0 });
      gsap.set(backdrop, { autoAlpha: 0 });
      gsap.set(inner, {
        autoAlpha: 0,
        y: -8,
        filter: 'blur(12px)',
      });
      return;
    }

    // 3) Home + intro terminada -> animación
    gsap.set(header, { autoAlpha: 1 });

    const tl = gsap.timeline();

    tl.fromTo(
      backdrop,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
      0,
    );

    tl.fromTo(
      inner,
      { autoAlpha: 0, y: -8 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      0,
    );

    tl.fromTo(
      inner,
      { filter: 'blur(12px)' },
      { filter: 'blur(0px)', duration: 1.4, ease: 'power2.out' },
      0,
    );

    return () => {
      tl.kill();
    };
  }, [introDoneLogo, isHome]);

  // One-page active link (IntersectionObserver)
  useEffect(() => {
    if (!isHome) return;

    const sectionIds = navItems
      .map((i) => i.sectionId)
      .filter(Boolean) as string[];

    if (!sectionIds.length) return;

    let frameId = 0;

    const getSections = () =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

    const updateActive = () => {
      const sections = getSections();
      if (!sections.length) return;

      const marker = window.innerHeight * 0.35;
      let nextActiveId = sections[0].id;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= marker && rect.bottom > marker) {
          nextActiveId = section.id;
          break;
        }
      }

      setActiveId((prev) => (prev === nextActiveId ? prev : nextActiveId));
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateActive);
    };

    const waitForSectionsAndInit = () => {
      const sections = getSections();

      if (sections.length !== sectionIds.length) {
        frameId = requestAnimationFrame(waitForSectionsAndInit);
        return;
      }

      scheduleUpdate();

      window.addEventListener('scroll', scheduleUpdate, { passive: true });
      window.addEventListener('resize', scheduleUpdate);
      window.addEventListener('hashchange', scheduleUpdate);
    };

    frameId = requestAnimationFrame(waitForSectionsAndInit);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('hashchange', scheduleUpdate);
    };
  }, [isHome, navItems]);

  const phoneHref = whatsapp
    ? `https://wa.me/${toDigitsOnly(phoneE164)}`
    : `tel:${phoneE164}`;

  const closeDesktopMenu = () => setDesktopMenuOpen(false);

  // Cerrar con ESC
  useEffect(() => {
    if (!desktopMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDesktopMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [desktopMenuOpen]);

  // Animación GSAP del panel desktop (overlay + panel)
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;

    if (!overlay || !panel) return;

    gsap.killTweensOf([overlay, panel]);

    if (desktopMenuOpen) {
      // preparar estados
      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(panel, { y: -14, autoAlpha: 0, scale: 0.985 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.to(overlay, { autoAlpha: 1, duration: 0.18 }, 0).to(
        panel,
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.28 },
        0,
      );

      // focus al primer link del panel
      requestAnimationFrame(() => {
        const firstLink = panel.querySelector<HTMLAnchorElement>('a[href]');
        firstLink?.focus();
      });
    } else {
      // cerrar (si ya estaba abierto)
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          // devolver foco al botón
          openBtnRef.current?.focus();
        },
      });

      tl.to(panel, { y: -10, autoAlpha: 0, scale: 0.99, duration: 0.18 }, 0).to(
        overlay,
        { autoAlpha: 0, duration: 0.18 },
        0,
      );
    }
  }, [desktopMenuOpen]);

  // Si haces click en un item del panel: cerrar
  const onMenuItemClick = () => {
    closeDesktopMenu();
  };

  return (
    <>
      <header ref={headerRef} className={styles.header}>
        {/* blur con tailwind */}
        <div
          ref={backdropRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#1e2126]/80 backdrop-blur-xl "
        />

        <div className={styles.inner} ref={innerRef}>
          <Link href="/" className={styles.brand} aria-label="Accueil">
            <Image
              src="/logo-navbar2.svg"
              alt="PPM"
              width={130}
              height={40}
              className={styles.logo}
            />
          </Link>

          <nav aria-label="Main navigation" className={styles.nav}>
            {/* Inline list (se oculta en desktop >= lg) */}
            <ul className={styles.navList}>
              {navItems.map((item) => {
                const isActive =
                  (isHome && !!item.sectionId && item.sectionId === activeId) ||
                  (item.href === '/catalogue' && isCatalogue);

                return (
                  <li key={item.label} className={styles.navItem}>
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${isActive ? styles.isActive : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <a
              className={styles.phoneBtn}
              href={phoneHref}
              target={whatsapp ? '_blank' : undefined}
              rel={whatsapp ? 'noreferrer noopener' : undefined}
              aria-label={whatsapp ? 'Contacter sur WhatsApp' : 'Appeler'}
            >
              <span className={styles.phoneBtnText}>{phoneE164}</span>
            </a>
            {/* Burger (solo mobil <= lg) */}
            <button
              ref={openBtnRef}
              type="button"
              className={`${styles.burgerBtn} ${desktopMenuOpen ? styles.isOpen : ''}`}
              aria-label={desktopMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={desktopMenuOpen}
              aria-controls="desktop-menu-panel"
              onClick={() => setDesktopMenuOpen((v) => !v)}
            >
              <span className={styles.burgerIcon} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </nav>
        </div>
      </header>
      {/* Overlay + Panel (solo mobil < lg) */}
      <MenuOverlayPortal>
        <div
          className={[
            'fixed inset-0 z-51',
            'bg-black/30 backdrop-blur-xl',
            'transition-opacity duration-200',
            desktopMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none',
          ].join(' ')}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDesktopMenuOpen(false);
          }}
        >
          <div
            className={[
              'absolute right-4 top-20',
              'w-[min(320px,calc(100vw-2rem))]',
              'rounded-2xl p-4',
              'bg-black/80 text-white border border-white/10',
              'shadow-[0_22px_60px_rgba(0,0,0,0.45)]',
            ].join(' ')}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <ul className="grid gap-2">
              {navItems.map((item) => {
                const isActive =
                  (isHome && !!item.sectionId && item.sectionId === activeId) ||
                  (item.href === '/catalogue' && isCatalogue);

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setDesktopMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'block px-6 py-3 text-sm border-b border-white/10 transition-colors',
                        isActive ? 'bg-[#e4e700]/10' : 'hover:bg-[#e4e700]/10',
                      ].join(' ')}
                      style={{
                        clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 border-t border-white/10 pt-3 flex justify-end">
              <a
                href={phoneHref}
                target={whatsapp ? '_blank' : undefined}
                rel={whatsapp ? 'noreferrer noopener' : undefined}
                onClick={() => setDesktopMenuOpen(false)}
                className="
                relative inline-flex items-center justify-center
                h-9 px-4
                border-3 border-white/60
                text-sm text-white
                opacity-90 hover:opacity-100
                transition-all duration-200
                hover:bg-white hover:text-black
                "
                style={{
                  clipPath:
                    'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                }}
              >
                {phoneE164}
              </a>
            </div>
          </div>
        </div>
      </MenuOverlayPortal>
    </>
  );
}
