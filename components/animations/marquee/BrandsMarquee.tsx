import styles from './BrandsMarquee.module.scss';

type BrandItem = {
  name: string;
  logo: React.ReactNode;
};

type BrandsMarqueeProps = {
  brandsMobile: BrandItem[];
};

export default function BrandsMarquee({ brandsMobile }: BrandsMarqueeProps) {
  const items = [...brandsMobile, ...brandsMobile];

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {items.map((brand, idx) => (
          <div key={idx} className={styles.item}>
            {brand.logo}
          </div>
        ))}
      </div>
    </div>
  );
}
