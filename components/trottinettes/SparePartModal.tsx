'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import type { SparePart } from '@/data/spareParts';
import scooterPlaceholder from '@/public/images/trottinettes/E-Glide.webp';
import { PrimaryButton } from '@/ui/Buttons';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';

interface SparePartModalProps {
  part: SparePart | null;
  open: boolean;
  onClose: () => void;
}

const SparePartModal = ({ part, open, onClose }: SparePartModalProps) => {
  if (!part) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card border-border p-0 overflow-hidden">
        <div className="relative aspect-video bg-secondary/30">
          <Image
            src={part.image || scooterPlaceholder}
            alt={part.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 space-y-5">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">
              {part.title}
            </DialogTitle>
            <p className="text-muted-foreground text-sm mt-1">
              {part.description}
            </p>
          </DialogHeader>

          <div className="font-display text-3xl font-bold text-primary">
            {part.price ? `${part.price} €` : 'Sur demande'}
          </div>

          <Separator className="bg-border" />

          <PrimaryButton className="w-full gap-2 font-display font-semibold">
            <MessageCircle className="w-4 h-4" />
            Demander des infos
          </PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SparePartModal;
