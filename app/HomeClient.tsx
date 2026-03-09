'use client';

import { HeroWindowsStack } from '@/components/animations/hero-window/HeroWindowsStack';
import { IntroLoader } from '@/components/animations/intro/IntroLoader';
import ScrollIndicator from '@/components/animations/intro/ScrollIndicator';
import { Bosch } from '@/components/icons/Bosch';
import { Hikoki } from '@/components/icons/Hikoki';
import { Kaabo } from '@/components/icons/Kaabo';
import LogoHeroBg from '@/components/icons/LogoHeroBg';
import { Makita } from '@/components/icons/Makita';
import { Xiaomi } from '@/components/icons/Xiaomi';
import { Section } from '@/components/layout/Section';
import { QualityBlock } from '@/components/sections/QualityBlock';
import { WhiteSectionServices } from '@/components/sections/WhiteSectionServices';
import WhyChooseUs from '@/components/sections/why-choose-us/WhyChooseUs';
import { useIntroScrollReset } from '@/hooks/useIntroScrollReset';
import { PrimaryButton } from '@/ui/Buttons';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useLayoutEffect, useRef, useState } from 'react';
import { servicesItems } from './_data/WhiteServices';

gsap.registerPlugin(SplitText);

//import { getHomeData } from "@/lib/sanity.queries";

export default function HomeClient() {
  //const data = await getHomeData()
  const [introDone, setIntroDone] = useState(false);

  useIntroScrollReset(setIntroDone);

  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useIntroScrollReset(setIntroDone);

  useLayoutEffect(() => {
    let h1Split: SplitText | undefined;
    let pSplit: SplitText | undefined;
    let tl: gsap.core.Timeline | undefined;

    const init = async () => {
      await document.fonts.ready;

      if (!h1Ref.current || !pRef.current || !ctaRef.current) return;

      h1Split = SplitText.create(h1Ref.current, {
        type: 'chars',
        charsClass: 'char',
        mask: 'chars', //oculta los caracteres como overflow hidden
      });

      pSplit = SplitText.create(pRef.current, {
        type: 'lines',
        linesClass: 'line',
        mask: 'lines',
        //autoSplit: true,
      });

      tl = gsap.timeline({ delay: 1.9 }); // ← inicio general de toda la secuencia
      tl.from(h1Split.chars, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        stagger: 0.02,
        ease: 'power4.out',
      })
        .from(
          pSplit.lines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'expo.out',
          },
          '-=0.65', // empieza antes de que el h1 termine
        )
        .from(
          ctaRef.current,
          {
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.65', // empieza antes de que el p termine
        );
    };

    init();

    return () => {
      tl?.kill();
      h1Split?.revert();
      pSplit?.revert();
    };
  }, []);

  return (
    <>
      <ScrollIndicator />

      {!introDone && <IntroLoader />}
      <div className="overflow-hidden ">
        <Section
          aria-label="Hero Pile Power Mobilité"
          className="relative bg-ppm-bg text-brandText "
        >
          {/* Backdrop shapes    <HeroBackdrop /> */}

          {/* Content wrapper */}
          <div className="relative z-10 grid  grid-cols-1 items-start gap-10 pb-10 pt-20 lg:grid-cols-2 md:items-center md:gap-10 md:py-26">
            {/* Left column */}

            <div className="flex flex-col mb-0 sm:mb-5 md:mb-0">
              {/* (En tu screenshot móvil hay logo + icono menú arriba; navbar lo haces luego)
              Igual te dejo un placeholder superior para que no te rompa el layout. */}

              <h1
                ref={h1Ref}
                className="
              font-title
              text-[clamp(2.8rem,8vw,4.8rem)]
              leading-[1.2]
              tracking-wide
            "
              >
                Pile
                <br />
                Power
                <br />
                Mobilité
              </h1>

              <p
                ref={pRef}
                className="
              mt-6 max-w-[42ch]
              font-body text-brandText
              text-[clamp(1rem,2.6vw,1.9rem)]
              
              leading-snug pr-10
            "
              >
                Nous accompagnons chaque utilisateur avec des solutions fiables,
                rapides et adaptées pour garantir performance et sécurité au
                quotidien.
              </p>

              {/* Desktop CTA sits under text (mobile CTA goes bottom like screenshot) */}
              <div ref={ctaRef} className="mt-20 hidden lg:block">
                <PrimaryButton
                  href="#contact"
                  ariaLabel="Prendre rendez-vous"
                  className="min-w-[220px]"
                >
                  Prendre RV
                </PrimaryButton>
              </div>
            </div>

            {/* Right / center media */}
            <div className="relative aspect-square isolate">
              <HeroWindowsStack
                topSrc="/images/hero-tt.webp"
                bottomSrc="/images/hero-b.webp"
                maskUrl="/svg-mask/mask-hero.svg"
                topCurtainColor="#e4e700" // color cortina ventana top
                bottomCurtainColor="#e5e0d8" // color cortina ventana bottom
                startDelay={0.5}
                logo={
                  <LogoHeroBg
                    className="w-[clamp(400px,160vw,2100px)] lg:w-[clamp(500px,80vw,1130px)] h-auto origin-right"
                    color="currentColor"
                    opacity={0.07}
                    withStroke
                    strokeWidth={0}
                    d="M1262 33.7217C1395.92 -55.8149 1560 43.6065 1560 206.615C1560 248.799 1509.42 324.574 1443.58 433.922C1349.31 590.488 1330.71 627.338 1330.67 627.407L1345.26 641.064C1847.87 1175.57 1402.17 2038.31 675.959 1936.59L657.223 1933.97L652.381 1938.93C649.718 1941.65 576.076 2021.41 488.733 2116.17C401.391 2210.94 326.89 2291.4 323.177 2294.98C283.026 2333.69 226.121 2352.88 169.153 2346.94C49.6146 2334.45 -28.1347 2212.43 9.59473 2096.52C15.6952 2077.78 21.5567 2067.6 129.104 1889.13C186.445 1793.98 233.632 1715.42 233.963 1714.56C234.369 1713.5 230.839 1709.09 223.104 1701C1.217 1468.94 -51.2063 1116.68 93.1807 827.966C241.386 531.615 564.45 361.17 889.896 407.626L907.684 410.165L911.433 406.302C913.499 404.172 986.505 325.133 1073.67 230.656C1240.49 49.8554 1245.13 45.0034 1262 33.7217ZM1391.36 198.543C1398.41 178.721 1374.84 160.726 1357.08 172.363C1355.66 173.293 1266.93 268.931 1159.89 384.892C1015.09 541.773 964.846 595.588 963.56 595.188C657.396 499.279 324.899 665.156 215.66 968.303C122.96 1225.56 218.523 1518.44 445.025 1671.26C449.162 1674.05 452.546 1676.72 452.546 1677.2C452.546 1677.68 389.167 1783.3 311.704 1911.91C168.365 2149.88 167.627 2150.51 168.356 2158.55C169.828 2174.78 183.796 2183.83 198.989 2178.42C201.129 2177.65 203.845 2176.18 205.024 2175.15C206.537 2173.82 591.692 1756.97 599.463 1748.25C599.93 1747.73 606.267 1749.12 614.352 1751.52C937.265 1847.39 1277.94 1659.96 1370.04 1335.75C1440.14 1088.97 1342.19 821.685 1126.72 671.784C1119.63 666.854 1113.69 662.677 1113.51 662.496C1113.33 662.321 1175.45 558.777 1251.55 432.399C1327.65 306.021 1390.57 200.786 1391.36 198.543ZM1255.81 342.844C1258.07 340.206 1262.52 332.793 1036.72 707.771C916.008 908.221 815.952 1074.98 814.366 1078.35C794.762 1120.05 816.568 1173.18 860.008 1189.57C874.42 1195 875.835 1195.08 958.932 1195.08C1045.77 1195.08 1040.83 1192.62 1042.84 1200.1C1045.59 1210.37 1049.22 1201.93 675.277 1604.54C264.311 2047 302.935 2007.95 304.946 2004.54C305.774 2003.14 406.844 1835.23 529.546 1631.42C652.248 1427.6 753.951 1258.04 755.552 1254.63C771.713 1220.17 753.527 1174.28 717.781 1159.33C703.24 1153.24 704.563 1153.32 612.301 1153.3C522.801 1153.28 525.091 1153.41 522.398 1148.2C519.515 1142.63 520.347 1139.4 526.298 1133.07C533.593 1125.31 1254.02 344.917 1255.81 342.844Z"
                    delay={1.25}
                  />
                }
              />
            </div>

            {/* Mobile CTA at bottom centered wide (like screenshot) */}
            <div className="lg:hidden mx-auto w-full max-w-[360px] mt-10">
              <PrimaryButton
                href="#contact"
                ariaLabel="Prendre rendez-vous"
                className="mx-auto w-full max-w-[360px]"
              >
                Prendre RV
              </PrimaryButton>
            </div>
          </div>
          <div className="absolute flex flex-col items-start gap-8 font-body text-brandTex bottom-10 md:-bottom-92">
            <span className="rotate-90 origin-left whitespace-nowrap text-[0.6rem] tracking-[0.35em] font-light">
              SCROLL FOR MORE
            </span>

            <span className="w-px h-20 md:h-40 bg-brandBbgSecondary/50 animate-pulse mt-32"></span>
          </div>
        </Section>
        <WhyChooseUs />

        <QualityBlock
          description="Atelier spécialisé en trottinettes électriques, créé pour offrir une solution plus rapide, plus fiable et moins chère que le SAV classique."
          visuals={[
            {
              title: 'Roue',
              imageSrc: '/images/wheel.webp',
              imageAlt: 'Roue de trottinette',
            },
            {
              title: 'Batterie',
              imageSrc: '/images/battery.webp',
              imageAlt: 'Batterie de trottinette',
            },
          ]}
          brands={[
            {
              name: 'Segway',
              /* eslint-disable @next/next/no-img-element */
              logo: (
                <img src="/icons/hikoki.svg" alt="Segway" className="h-5" />
              ),
            },
            {
              name: 'Bosch',
              logo: (
                <img
                  src="/icons/bosch.svg"
                  alt="Bosch"
                  className="h-[1.23rem]"
                />
              ),
            },
            {
              name: 'Kaabo',
              logo: <img src="/icons/kaabo.svg" alt="Kaabo" />,
            },
            {
              name: 'Makita',
              logo: (
                <img
                  src="/icons/makita3.svg"
                  alt="Makita"
                  className=" h-[1.20rem]"
                />
              ),
            },
            {
              name: 'Xiaomi',
              logo: <img src="/icons/xiaomi.svg" alt="Xiaomi" className="" />,
            },
          ]}
          brandsMobile={[
            {
              name: 'Segway',
              logo: <Hikoki className="h-[18px] w-auto" />,
            },
            {
              name: 'Bosch',
              logo: <Bosch className="h-[20px] w-auto" />,
            },
            {
              name: 'Kaabo',
              logo: <Kaabo className="h-[28px] w-auto" />,
            },
            {
              name: 'Makita',
              logo: <Makita className="h-[20px] w-auto" />,
            },
            {
              name: 'Xiaomi',
              logo: <Xiaomi className="h-[28px] w-auto" />,
            },
          ]}
        />
        <WhiteSectionServices
          items={servicesItems}
          ctaHref="#contact"
          ctaLabel="Contact"
        />
      </div>
    </>
  );
}

{
  /*
  
  <div
              className="
              relative
              w-full max-w-[420px]
              md:max-w-full
            "
              aria-label="Illustrations"
            >
              
              <div
                className="relative
                aspect-square w-full "
              >
                
                <div
                  className="
                  w-[82%]
                  drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]
                  md:left-auto md:right-0 md:top-0 md:translate-x-0
                  md:w%]
                "
                  style={{
                    clipPath: 'polygon(27% 0%, 100% 0%, 73% 100%, 0% 100%)',
                  }}
                >
                  <div className="relative  aspect-video w-full overflow-hidden ">
                    <Image
                      src="/images/hero-t.webp"
                      alt="Trottinette électrique en atelier"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

             
                <div
                  className="
                  absolute right-0 bottom-0
                  w-[82%]
                  
                  drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]
                 md:left-auto md:right-0 md:bottom-0 md:translate-x-0
                  md:w-[84%]
                "
                  style={{
                    clipPath: 'polygon(24% 0%, 100% 0%, 76% 100%, 0% 100%)',
                  }}
                >
                  <div className="relative aspect-video w-full overflow-hidden ">
                    <Image
                      src="/images/hero-b.webp"
                      alt="Réparation et maintenance de trottinette"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>*/
}
