'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import type { Scooter } from '@/data/scooter';
import scooterPlaceholder from '@/public/images/trottinettes/E-Glide.webp';
import { PrimaryButton } from '@/ui/Buttons';
import {
  Battery,
  CircleDot,
  Gauge,
  MessageCircle,
  ShieldCheck,
  Weight,
  Zap,
} from 'lucide-react';
import Image from 'next/image';

interface ScooterModalProps {
  scooter: Scooter | null;
  open: boolean;
  onClose: () => void;
}

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

const ScooterModal = ({ scooter, open, onClose }: ScooterModalProps) => {
  if (!scooter) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border p-0 overflow-hidden">
        {/* Image gallery */}
        <div className="relative text-brandBbgSecondary aspect-video bg-secondary/30">
          <Image
            src={scooter.images[0] || scooterPlaceholder}
            alt={scooter.name}
            className="w-full h-full object-cover"
          />
          <span
            className={`absolute top-4 left-4 rounded-sm ${
              scooter.status === 'neuf' ? 'badge-neuf' : 'badge-occasion'
            }`}
          >
            {scooter.status === 'neuf' ? 'Neuf' : 'Occasion'}
          </span>
        </div>

        <div className="p-6 space-y-5">
          <DialogHeader>
            <DialogTitle className="font-body text-brandBbgSecondary text-2xl font-bold">
              {scooter.name}
            </DialogTitle>
            <p className="text-muted-foreground font-body text-sm mt-1">
              {scooter.shortDescription}
            </p>
          </DialogHeader>

          <div className="font-body text-3xl font-bold text-primary">
            {scooter.price ? `${scooter.price} €` : 'Sur demande'}
          </div>

          <Separator className="bg-border" />

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-4">
            {(Object.keys(scooter.specs) as (keyof typeof scooter.specs)[]).map(
              (key) => {
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
              },
            )}
          </div>

          {/* Condition note */}
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
