'use client';

import { useIntro } from '@/context/IntroContext';
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';

type IntroLoaderProps = {
  brandYellow?: string;
  brandBlue?: string;
};

export function IntroLoader({
  brandYellow = '#e4e700',
  brandBlue = '#6f86ff',
}: IntroLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { setIntroDoneLogo } = useIntro();

  useLayoutEffect(() => {
    history.scrollRestoration = 'manual'; // 👈 esto
    window.scrollTo(0, 0); // fuerza al top

    const scrollY = window.scrollY;

    const prev = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflowY: document.body.style.overflowY,
    };

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflowY = 'scroll';

    const ctx = gsap.context(() => {
      const layersGroup = rootRef.current?.querySelector<SVGGElement>(
        '[data-layers-group]',
      );

      const curtain = rootRef.current?.querySelector('[data-curtain]');
      const logoWrap = rootRef.current?.querySelector('[data-logo-wrap]');

      const whiteLayer = rootRef.current?.querySelector<SVGRectElement>(
        '[data-layer="white"]',
      );
      const blueLayer = rootRef.current?.querySelector<SVGRectElement>(
        '[data-layer="blue"]',
      );
      const yellowLayer = rootRef.current?.querySelector<SVGRectElement>(
        '[data-layer="yellow"]',
      );

      if (
        !layersGroup ||
        !curtain ||
        !logoWrap ||
        !whiteLayer ||
        !blueLayer ||
        !yellowLayer
      )
        return;

      const layers = [whiteLayer, blueLayer, yellowLayer];

      const fullMask = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
      const hideDown = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';

      const setLayer = (el: SVGRectElement) => {
        gsap.set(el, {
          opacity: 1,
          clipPath: fullMask,
          transformOrigin: '50% 50%',
          transformBox: 'fill-box',
        });
      };
      //grupo de texturas viene de arriba

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          document.body.style.position = prev.position;
          document.body.style.top = prev.top;
          document.body.style.left = prev.left;
          document.body.style.right = prev.right;
          document.body.style.width = prev.width;
          document.body.style.overflowY = prev.overflowY;
          window.scrollTo(0, scrollY);
          setIntroDoneLogo(true);
        },
      });

      gsap.set(curtain, { autoAlpha: 1, yPercent: 0 });
      gsap.set(logoWrap, { autoAlpha: 1 });
      gsap.set(curtain, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      });

      layers.forEach(setLayer);

      gsap.set(whiteLayer, { opacity: 1, clipPath: fullMask });
      gsap.set(blueLayer, { opacity: 1, clipPath: fullMask });
      gsap.set(yellowLayer, { opacity: 1, clipPath: fullMask });
      gsap.set(layersGroup, { y: -100, autoAlpha: 0 });
      //el grupo de layers viene primero

      tl.to(
        layersGroup,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          delay: 0.5,
          ease: 'power4.out',
        },
        'dropIn',
      );

      // 1) sale blanca -> revela azul
      tl.to(
        whiteLayer,
        {
          clipPath: hideDown,
          duration: 0.9,
          ease: 'power3.in',
        },
        'dropIn+=0.26',
      );
      // 2) sale azul -> revela amarilla
      tl.to(
        blueLayer,
        {
          clipPath: hideDown,
          duration: 1.35,
          ease: 'power2.inOut',
        },
        'dropIn+=0.95',
      );

      // 3) la amarilla se queda más tiempo
      tl.to(
        yellowLayer,
        {
          opacity: 1,
          duration: 0.2,
          ease: 'none',
        },
        'dropIn+=0.12',
      );

      // CURTAIN negra del fondo conserva su animación

      tl.to(
        curtain,
        {
          duration: 1.55,
          yPercent: 100,
          ease: 'power3.inOut',
        },
        'dropIn+=0.85',
      );

      tl.to(
        curtain,
        {
          duration: 1.2,
          clipPath: 'polygon(0% 45%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power2.inOut',
        },
        'reveal',
      );

      tl.to(
        curtain,
        {
          duration: 0.95,
          yPercent: 105,
          ease: 'power2.out',
        },
        'reveal',
      );

      tl.to(
        curtain,
        {
          duration: 1.5,
          clipPath: 'polygon(0% 8%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power2.inOut',
        },
        'reveal',
      );

      tl.set(curtain, { autoAlpha: 0 }, 'reveal+=0.5');

      // 5) al final sale amarilla, más lenta y con freno
      tl.to(
        yellowLayer,
        {
          clipPath: hideDown,
          duration: 1.15,
          ease: 'power3.in',
        },
        'reveal-=1.1', //aqui adelantamos la salida de el color amarillo
      );

      // fade del wrap más tarde, para ver terminar la amarilla
      tl.to(
        logoWrap,
        {
          autoAlpha: 0,
          duration: 0.45,
        },
        'reveal+=1',
      );
      //esto acelera la ausencia del overlay invisible
      tl.set(rootRef.current, { display: 'none' }, 'reveal+=0.2');
      //esto controla toda la animacion en general calculando todo los tiempos
      tl.timeScale(1.2);
      tl.play();
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.left = prev.left;
      document.body.style.right = prev.right;
      document.body.style.width = prev.width;
      document.body.style.overflowY = prev.overflowY;
      window.scrollTo(0, scrollY);
    };
  }, [setIntroDoneLogo, brandYellow, brandBlue]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      <div data-curtain className="absolute inset-0 bg-black" />

      <div
        data-logo-wrap
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg
          className="w-[clamp(60px,5vw,300px)] select-none overflow-visible"
          viewBox="0 0 31 51"
          role="img"
          aria-label="Intro logo"
        >
          <defs>
            <mask
              id="logoMask"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="31"
              height="51"
            >
              <rect x="0" y="0" width="31" height="51" fill="black" />
              <g transform="translate(0.55 0.55) scale(0.31)" fill="white">
                <path d="M94.501,0l-0.165,0.015c-0.434,0.027 -0.876,0.197 -1.192,0.539l-30.483,33.079c-4.359,-1.302 -9.311,-2.179 -14.062,-2.179c-26.307,0 -47.645,21.294 -47.645,47.553c0,16.54 8.628,31.205 21.467,39.728l-22.187,36.905c-0.244,0.403 -0.278,0.873 -0.187,1.296c0.092,0.423 0.311,0.817 0.653,1.072c0.342,0.255 0.774,0.351 1.207,0.321c0.433,-0.03 0.882,-0.198 1.201,-0.547l30.874,-33.499c4.607,1.481 9.519,2.284 14.618,2.284c26.308,0 47.643,-21.3 47.643,-47.559c0,-16.63 -9.012,-31.612 -21.977,-40.126l21.804,-36.277l0,-0.027c0.185,-0.375 0.204,-0.793 0.121,-1.177c-0.091,-0.421 -0.296,-0.815 -0.637,-1.07c-0.274,-0.205 -0.627,-0.232 -0.969,-0.248l-0.083,-0.084Zm-8.835,13.523l-34.547,57.466c-2.559,4.258 0.598,9.822 5.573,9.822l11.334,0c0.383,0 0.498,0.133 0.621,0.412c0.121,0.277 0.134,0.451 -0.127,0.735l-57.943,62.864l35.283,-58.702c2.233,-3.716 -0.527,-8.596 -4.868,-8.596l-12.443,0c-0.442,0 -0.615,-0.169 -0.758,-0.493c-0.143,-0.326 -0.149,-0.559 0.151,-0.884l57.725,-62.625Zm-51.866,110.7c0.022,0.008 0.045,0.016 0.067,0.023l-0.06,-0.015l-0.008,-0.008Z" />
              </g>
            </mask>
          </defs>

          <g mask="url(#logoMask)">
            <g
              data-layers-group
              style={{ opacity: 0, transform: 'translateY(-80px)' }}
            >
              <rect
                data-layer="yellow"
                x="-12"
                y="-12"
                width="56"
                height="76"
                fill={brandYellow}
                opacity="1"
              />

              <rect
                data-layer="blue"
                x="-12"
                y="-12"
                width="56"
                height="76"
                fill={brandBlue}
                opacity="1"
              />

              <rect
                data-layer="white"
                x="-12"
                y="-12"
                width="56"
                height="76"
                fill="#ffffff"
                opacity="1"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
