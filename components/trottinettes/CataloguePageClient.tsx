'use client';

import CTABlock from '@/components/trottinettes/CTABlock';
import FilterBar from '@/components/trottinettes/FilterBar';
import HeroSection from '@/components/trottinettes/HeroSection';
import IntroBlock from '@/components/trottinettes/IntroBlock';
import ScooterCard from '@/components/trottinettes/ScooterCard';
import ScooterModal from '@/components/trottinettes/ScooterModal';
import { scooters, type Scooter } from '@/data/scooter';

import { useMemo, useState } from 'react';

export default function CataloguePageClient() {
  const [activeFilter, setActiveFilter] = useState<
    'tous' | 'neuf' | 'occasion'
  >('tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedScooter, setSelectedScooter] = useState<Scooter | null>(null);

  const filtered = useMemo(() => {
    let list = [...scooters];

    if (activeFilter !== 'tous') {
      list = list.filter((s) => s.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }

    if (sortOrder === 'price-asc') {
      list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    } else if (sortOrder === 'price-desc') {
      list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return list;
  }, [activeFilter, searchQuery, sortOrder]);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <IntroBlock />

      <div id="catalogue">
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        <section className="container pb-16">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((scooter, i) => (
                <ScooterCard
                  key={scooter.id}
                  scooter={scooter}
                  onDetails={setSelectedScooter}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              Aucun modèle trouvé.
            </div>
          )}
        </section>
      </div>

      <CTABlock />

      <ScooterModal
        scooter={selectedScooter}
        open={!!selectedScooter}
        onClose={() => setSelectedScooter(null)}
      />
    </div>
  );
}
