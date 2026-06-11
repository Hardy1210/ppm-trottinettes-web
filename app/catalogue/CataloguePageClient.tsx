'use client';

import CTABlock from '@/components/trottinettes/CTABlock';
import FilterBar from '@/components/trottinettes/FilterBar';
import HeroSection from '@/components/trottinettes/HeroSection';
import IntroBlock from '@/components/trottinettes/IntroBlock';
import ScooterCard from '@/components/trottinettes/ScooterCard';
import ScooterModal from '@/components/trottinettes/ScooterModal';
import type { CatalogueScooter, CatalogueSparePart } from './catalogue.type';

import { PrimaryButton } from '@/ui/Buttons';
import { useMemo, useState } from 'react';
import CardsCatalogue from '../../components/trottinettes/CardsCatalogue';
import SparePartCard from '../../components/trottinettes/SparePartCard';
import SparePartModal from '../../components/trottinettes/SparePartModal';

//SANITY

type CataloguePageClientProps = {
  scooters: CatalogueScooter[];
  spareParts: CatalogueSparePart[];
};

const SCOOTERS_INITIAL_COUNT = 8;
const SPARE_PARTS_INITIAL_COUNT = 8;
const LOAD_MORE_STEP = 8;

export default function CataloguePageClient({
  scooters,
  spareParts,
}: CataloguePageClientProps) {
  const [activeFilter, setActiveFilter] = useState<
    'tous' | 'neuf' | 'occasion'
  >('tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  const [selectedScooter, setSelectedScooter] =
    useState<CatalogueScooter | null>(null);
  const [selectedPart, setSelectedPart] = useState<CatalogueSparePart | null>(
    null,
  );

  const [visibleScooters, setVisibleScooters] = useState(
    SCOOTERS_INITIAL_COUNT,
  );
  const [visibleSpareParts, setVisibleSpareParts] = useState(
    SPARE_PARTS_INITIAL_COUNT,
  );

  const filteredScooters = useMemo(() => {
    let list = [...scooters];

    if (activeFilter !== 'tous') {
      list = list.filter((scooter) => scooter.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const normalizedQuery = searchQuery.trim().toLowerCase();

      list = list.filter((scooter) =>
        scooter.name.toLowerCase().includes(normalizedQuery),
      );
    }

    if (sortOrder === 'price-asc') {
      list.sort(
        (a, b) =>
          (a.price ?? Number.POSITIVE_INFINITY) -
          (b.price ?? Number.POSITIVE_INFINITY),
      );
    } else if (sortOrder === 'price-desc') {
      list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return list;
  }, [activeFilter, searchQuery, sortOrder, scooters]);

  const visibleFilteredScooters = useMemo(() => {
    return filteredScooters.slice(0, visibleScooters);
  }, [filteredScooters, visibleScooters]);

  const visibleParts = useMemo(() => {
    return spareParts.slice(0, visibleSpareParts);
  }, [spareParts, visibleSpareParts]);

  const canLoadMoreScooters = visibleScooters < filteredScooters.length;
  const canLoadMoreParts = visibleSpareParts < spareParts.length;

  const handleFilterChange = (filter: 'tous' | 'neuf' | 'occasion') => {
    setActiveFilter(filter);
    setVisibleScooters(SCOOTERS_INITIAL_COUNT);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisibleScooters(SCOOTERS_INITIAL_COUNT);
  };

  const handleSortChange = (sort: string) => {
    setSortOrder(sort);
    setVisibleScooters(SCOOTERS_INITIAL_COUNT);
  };

  const handleLoadMoreScooters = () => {
    setVisibleScooters((prev) => prev + LOAD_MORE_STEP);
  };

  const handleLoadMoreParts = () => {
    setVisibleSpareParts((prev) => prev + LOAD_MORE_STEP);
  };
  return (
    <div className="min-h-screen bg-background w-full">
      <HeroSection />
      <IntroBlock />

      <div id="catalogue" className="px-5 xl:px-0">
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />

        <section className="container pb-16 max-w-container mx-auto">
          {filteredScooters.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleFilteredScooters.map((scooter, index) => (
                  <ScooterCard
                    key={scooter._id}
                    scooter={scooter}
                    onDetails={setSelectedScooter}
                    index={index}
                  />
                ))}
              </div>

              {canLoadMoreScooters && (
                <div className="mt-10 flex justify-center">
                  <PrimaryButton
                    onClick={handleLoadMoreScooters}
                    className="font-display font-semibold"
                  >
                    Voir plus
                  </PrimaryButton>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              Aucun modèle trouvé.
            </div>
          )}
        </section>
      </div>
{/* PIECES DETACHEES */}
      <section
        id="spare"
        className="container py-16 max-w-container mx-auto px-5 xl:px-0"
      >
        <h2 className="font-title text-3xl md:text-4xl font-bold text-foreground mb-2">
          Nos pièces détachées
        </h2>

        <p className="text-muted-foreground mb-8 max-w-xl">
          Pièces de rechange et accessoires compatibles avec la plupart des
          trottinettes électriques.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleParts.map((part, index) => (
            <SparePartCard
              key={part._id}
              part={part}
              onDetails={setSelectedPart}
              index={index}
            />
          ))}
        </div>

        {canLoadMoreParts && (
          <div className="mt-10 flex justify-center">
            <PrimaryButton
              onClick={handleLoadMoreParts}
              className="font-display font-semibold"
            >
              Voir plus
            </PrimaryButton>
          </div>
        )}
      </section>

      <CardsCatalogue />
      <CTABlock />

      <SparePartModal
        part={selectedPart}
        open={!!selectedPart}
        onClose={() => setSelectedPart(null)}
      />

      <ScooterModal
        scooter={selectedScooter}
        open={!!selectedScooter}
        onClose={() => setSelectedScooter(null)}
      />
    </div>
  );
}
