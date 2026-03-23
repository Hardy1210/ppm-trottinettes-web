'use client';

import { formatPrice } from '@/app/lib/formatPrice';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
//import type { Scooter } from '@/data/scooter';
import scooterPlaceholder from '@/public/images/trottinettes/E-Glide.webp';
import { PrimaryButton } from '@/ui/Buttons';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Battery,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Gauge,
  MessageCircle,
  ShieldCheck,
  Weight,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import type { CatalogueScooter } from '@/app/catalogue/catalogue.type';

type ScooterModalProps = {
  scooter: CatalogueScooter | null;
  open: boolean;
  onClose: () => void;
};

const specIcons = {
  autonomie: Battery,
  vitesse: Gauge,
  puissance: Zap,
  poids: Weight,
  pneus: CircleDot,
  freins: ShieldCheck,
};

const specLabels: Record<string, string> = {
  autonomie: 'Autonomie',
  vitesse: 'Vitesse max',
  puissance: 'Puissance',
  poids: 'Poids',
  pneus: 'Pneus',
  freins: 'Freins',
};

function ScooterImageGallery({
  scooter,
  fallbackSrc,
}: {
  scooter: CatalogueScooter;
  fallbackSrc: string;
}) {
  const images = scooter.images?.length ? scooter.images : [fallbackSrc];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: images.length > 1,
    align: 'start',
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(images.length > 1);
  const [canScrollNext, setCanScrollNext] = useState(images.length > 1);

  const updateEmblaState = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', updateEmblaState);
    emblaApi.on('reInit', updateEmblaState);

    return () => {
      emblaApi.off('select', updateEmblaState);
      emblaApi.off('reInit', updateEmblaState);
    };
  }, [emblaApi, updateEmblaState]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative bg-secondary/30">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((imageSrc, index) => (
            <div
              key={`${scooter._id}-${index}`}
              className="min-w-0 shrink-0 grow-0 basis-full"
            >
              <div className="relative h-60 sm:h-60 md:h-60">
                <Image
                  src={imageSrc}
                  alt={`${scooter.name} - image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 700px, 800px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <span
        className={`absolute top-4 left-4 z-10 rounded-sm ${
          scooter.status === 'neuf' ? 'badge-neuf' : 'badge-occasion'
        }`}
      >
        {scooter.status === 'neuf' ? 'Neuf' : 'Occasion'}
      </span>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Image suivante"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}

const ScooterModal = ({ scooter, open, onClose }: ScooterModalProps) => {
  if (!scooter) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border p-0 overflow-hidden">
        <ScooterImageGallery
          key={scooter._id}
          scooter={scooter}
          fallbackSrc={scooterPlaceholder.src}
        />

        <div className="p-6 space-y-5 max-h-[calc(90vh-260px)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-body text-brandBbgSecondary text-2xl font-bold">
              {scooter.name}
            </DialogTitle>
            <p className="text-muted-foreground font-body text-sm mt-1">
              {scooter.shortDescription}
            </p>
          </DialogHeader>

          <div className="font-body text-3xl font-bold text-primary">
            {scooter.price !== null
              ? `${formatPrice(scooter.price)} €`
              : 'Sur demande'}
          </div>

          <Separator className="bg-border" />

          <div className="grid grid-cols-2 gap-4">
            {(
              [
                'autonomie',
                'vitesse',
                'puissance',
                'poids',
                'pneus',
                'freins',
              ] as const
            ).map((key) => {
              const Icon = specIcons[key];
              return (
                <div key={key} className="flex items-center gap-3 font-body">
                  <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      {specLabels[key]}
                    </p>
                    <p className="text-sm font-medium text-brandBbgSecondary">
                      {scooter.specs[key]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {scooter.conditionNote && (
            <>
              <Separator className="bg-border" />
              <div className="bg-secondary/50 rounded-md p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                  État du véhicule
                </p>
                <p className="text-sm text-foreground">
                  {scooter.conditionNote}
                </p>
              </div>
            </>
          )}

          <PrimaryButton className="w-full gap-2 font-display font-semibold">
            <MessageCircle className="w-4 h-4" />
            Demander des infos
          </PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScooterModal;
