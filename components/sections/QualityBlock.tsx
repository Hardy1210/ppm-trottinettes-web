import { Section } from '@/components/layout/Section';
import TitleAccentLine from '@/ui/TitleAccentLine';
import YellowPanelShape from '@/ui/YellowPanelShape';
import Image from 'next/image';
import BrandsMarquee from '../animations/marquee/BrandsMarquee';

type BrandItem = {
  name: string;
  logo: React.ReactNode;
};

type VisualItem = {
  title: string;
  imageSrc: string;
  imageAlt: string;
};

type QualityBlockProps = {
  title?: string;
  description: string;
  visuals: VisualItem[];
  brands: BrandItem[];
  brandsMobile: BrandItem[];
};

export function QualityBlock({
  title = 'Qualité\nFiabilité\nInnovation',
  description,
  visuals,
  brands,
  brandsMobile,
}: QualityBlockProps) {
  const titleLines = title.split('\n');

  return (
    <section className="relative -mt-96 sm:-mt-100 md:mt-22 lg:mt-[10.3rem] w-full overflow-hidden bg-ppmBg">
      {/* fondo desktop/tablet */}
      <YellowPanelShape className="absolute left-[-40%] hidden h-full w-full md:block" />

      <Section innerClassName="px-0 py-0">
        <div className="relative">
          {/* Desktop / tablet */}
          <div className="hidden min-h-[520px] md:grid md:grid-cols-[minmax(0,1.2fr)_170px_minmax(220px,0.9fr)] lg:grid-cols-[minmax(0,1.3fr)_240px_minmax(260px,0.9fr)]">
            {/* Columna 1 */}
            <div className="relative min-h-[520px]">
              <div className="relative z-10 flex h-full flex-col justify-center py-12 md:px-5 xl:px-0">
                <h2 className="font-title leading-[1.2] tracking-[-0.03em] text-black">
                  {titleLines.map((line, i) => (
                    <span
                      key={i}
                      className="block text-[clamp(2rem,6vw,3.5rem)]"
                    >
                      {line}
                    </span>
                  ))}
                </h2>

                <TitleAccentLine className="mt-4 h-[12px] w-[clamp(120px,30vw,400px)]  text-black/70" />

                <p className="mt-5 max-w-[30ch] text-[clamp(1rem,2.2vw,1.45rem)] font-body leading-[1.15] text-black/85">
                  {description}
                </p>
              </div>
            </div>

            {/* Columna 2 */}
            <div className="relative flex flex-col items-center justify-center gap-24 ">
              {visuals.slice(0, 2).map((item, idx) => (
                <div
                  key={idx}
                  className="relative flex h-[118px] w-[118px] items-center justify-center rounded-[18px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] lg:h-[142px] lg:w-[142px]"
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={100}
                    height={100}
                    className="h-auto w-full object-contain rounded-[18px]"
                  />
                </div>
              ))}
            </div>

            {/* Columna 3 */}
            <div className="relative min-h-[520px] md:mr-5 xl:mr-0">
              {brands[0] && (
                <div className="absolute top-[2%] right-[0%] text-white/90">
                  <div className="max-w-[170px] lg:max-w-[190px] [&_img]:max-h-[28px] [&_img]:w-auto [&_svg]:max-h-[28px] [&_svg]:w-auto">
                    {brands[0].logo}
                  </div>
                </div>
              )}

              {brands[1] && (
                <div className="absolute top-[20%] left-[8%] text-white/90">
                  <div className="max-w-[170px] lg:max-w-[190px] [&_img]:max-h-[28px] [&_img]:w-auto [&_svg]:max-h-[28px] [&_svg]:w-auto">
                    {brands[1].logo}
                  </div>
                </div>
              )}

              {brands[2] && (
                <div className="absolute top-[42%] right-[0%] text-white/90">
                  <div className="max-w-[170px] lg:max-w-[190px] [&_img]:max-h-[28px] [&_img]:w-auto [&_svg]:max-h-[28px] [&_svg]:w-auto">
                    {brands[2].logo}
                  </div>
                </div>
              )}

              {brands[3] && (
                <div className="absolute top-[65%] left-[10%] text-white/90">
                  <div className="max-w-[170px] lg:max-w-[190px] [&_img]:max-h-[28px] [&_img]:w-auto [&_svg]:max-h-[28px] [&_svg]:w-auto">
                    {brands[3].logo}
                  </div>
                </div>
              )}

              {brands[4] && (
                <div className="absolute bottom-[2%] right-[0%] text-white/90">
                  <div className="max-w-[170px] lg:max-w-[190px] [&_img]:max-h-[28px] [&_img]:w-auto [&_svg]:max-h-[28px] [&_svg]:w-auto">
                    {brands[4].logo}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div className="relative z-0 grid grid-cols-[minmax(0,1fr)_134px] md:grid-cols-[minmax(0,1fr)_250px] grid-rows-[auto_auto_auto] gap-x-4 gap-y-4 px-0 py-0 md:hidden">
            {/* bloque amarillo izquierda ocupando dos filas */}
            <div className="relative row-span-2 min-h-[380px] ">
              <YellowPanelShape
                points="0,0 900,0 600,620 0,620"
                className="absolute  h-full w-[120%] right-[-20%] sm:left-[-10%]"
              />

              <div className="relative z-10 flex h-full flex-col px-5 pt-7 pb-6">
                <h2 className="font-title leading-[1.2] tracking-[-0.03em] text-black">
                  {titleLines.map((line, i) => (
                    <span
                      key={i}
                      className="block text-[clamp(1.7rem,8vw,2.7rem)]"
                    >
                      {line}
                    </span>
                  ))}
                </h2>

                <TitleAccentLine className="mt-7 h-[10px] w-[clamp(120px,50vw,300px)] text-black/70" />

                <p className="mt-5 max-w-[clamp(24ch,35ch,39ch)] text-[clamp(0.92rem,3.6vw,1rem)] leading-[1.18] text-black/85">
                  {description}
                </p>
              </div>
            </div>

            {/* visual 1 */}
            {visuals[0] && (
              <div className="relative right-5 z-10 flex h-[110px] w-[110px] items-center justify-center self-center justify-self-center rounded-[16px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                <Image
                  src={visuals[0].imageSrc}
                  alt={visuals[0].imageAlt}
                  width={100}
                  height={100}
                  className="h-auto w-auto object-contain rounded-[16px]"
                />
              </div>
            )}

            {/* visual 2 */}
            {visuals[1] && (
              <div className="relative right-5 z-10 flex h-[110px] w-[110px] items-center justify-center self-center justify-self-center rounded-[16px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                <Image
                  src={visuals[1].imageSrc}
                  alt={visuals[1].imageAlt}
                  width={100}
                  height={100}
                  className="h-auto w-auto object-contain rounded-[16px]"
                />
              </div>
            )}

            {/* marcas abajo */}
            <div className="col-span-2">
              <BrandsMarquee brandsMobile={brandsMobile} />
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
