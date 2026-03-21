'use client';
import { Button } from '@/components/ui/button';
import type { SparePart } from '@/data/spareParts';
import Image from 'next/image';

interface SparePartCardProps {
  part: SparePart;
  onDetails: (part: SparePart) => void;
  index: number;
}
const scooterPlaceholder = '/images/trottinettes/E-Glide.webp';
const SparePartCard = ({ part, onDetails, index }: SparePartCardProps) => (
  <div
    className="group bg-card border border-border rounded-lg overflow-hidden card-hover animate-fade-in-up opacity-0"
    style={{ animationDelay: `${0.1 * index}s` }}
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
      <Image
        src={part.image || scooterPlaceholder}
        alt={part.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    <div className="p-5 space-y-3">
      <h3 className="font-display font-bold text-lg text-foreground">
        {part.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {part.description}
      </p>

      <div className="flex items-center justify-between pt-2">
        <span className="font-display font-bold text-xl text-foreground">
          {part.price ? `${part.price} €` : 'Sur demande'}
        </span>
        <Button
          size="sm"
          onClick={() => onDetails(part)}
          className="font-display font-semibold"
        >
          {part.buttonLabel || "Plus d'infos"}
        </Button>
      </div>
    </div>
  </div>
);

export default SparePartCard;
