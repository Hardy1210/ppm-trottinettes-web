'use client';
import { Button } from '@/components/ui/button';
import type { Scooter } from '@/data/scooter';
//import scooterPlaceholder from '@/images/trottinettes/E-Glide.webp';
import { Zap } from 'lucide-react';
import Image from 'next/image';

interface ScooterCardProps {
  scooter: Scooter;
  onDetails: (scooter: Scooter) => void;
  index: number;
}
const scooterPlaceholder = '/images/trottinettes/E-Glide.webp';
const ScooterCard = ({ scooter, onDetails, index }: ScooterCardProps) => (
  <div
    className="group bg-card border border-border rounded-lg overflow-hidden card-hover animate-fade-in-up opacity-0"
    style={{ animationDelay: `${0.1 * index}s` }}
  >
    {/* Image */}
    <div className="relative aspect-4/3 overflow-hidden bg-secondary/30">
      <Image
        src={scooter.images?.[0] || scooterPlaceholder}
        alt={scooter.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <span
        className={`absolute top-3 left-3 rounded-sm ${
          scooter.status === 'neuf' ? 'badge-neuf' : 'badge-occasion'
        }`}
      >
        {scooter.status === 'neuf' ? 'Neuf' : 'Occasion'}
      </span>
    </div>

    {/* Content */}
    <div className="p-5 space-y-3">
      <h3 className="font-body text-brandBbgSecondary font-bold text-lg">
        {scooter.name}
      </h3>

      <p className="text-sm text-muted-foreground font-body flex items-center gap-2">
        <Zap className="w-3.5 h-3.5 text-primary" />
        {scooter.specs.autonomie}&ensp;•&ensp;{scooter.specs.vitesse}
        &ensp;•&ensp;{scooter.specs.puissance}
      </p>

      <div className="flex items-center justify-between pt-2">
        <span className="font-body text-brandBbgSecondary font-bold text-xl">
          {scooter.price ? `${scooter.price} €` : 'Sur demande'}
        </span>
        <Button
          size="sm"
          onClick={() => onDetails(scooter)}
          className="font-display font-semibold"
        >
          Plus d&apos;infos
        </Button>
      </div>
    </div>
  </div>
);

export default ScooterCard;
