'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface FilterBarProps {
  activeFilter: 'tous' | 'neuf' | 'occasion';
  onFilterChange: (filter: 'tous' | 'neuf' | 'occasion') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOrder: string;
  onSortChange: (sort: string) => void;
}

const filters = [
  { key: 'tous' as const, label: 'Tous' },
  { key: 'neuf' as const, label: 'Neuf' },
  { key: 'occasion' as const, label: 'Occasion' },
];

const FilterBar = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortChange,
}: FilterBarProps) => (
  <div className="container pb-8 max-w-container mx-auto">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
      {/* Tabs */}
      <div className="flex gap-1 bg-secondary/50 p-1 rounded-md">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`px-5 py-2 text-sm font-display font-medium rounded-sm transition-all duration-200 ${
              activeFilter === f.key
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex gap-3 w-full sm:w-auto">
        {/* Search */}
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un modèle"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-secondary/50 border-border w-full sm:w-56"
          />
        </div>

        {/* Sort */}
        <Select value={sortOrder} onValueChange={onSortChange}>
          <SelectTrigger className="w-40 bg-secondary/50 border-border">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Par défaut</SelectItem>
            <SelectItem value="price-asc">Prix croissant</SelectItem>
            <SelectItem value="price-desc">Prix décroissant</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
);

export default FilterBar;
