
import React from 'react';
import { Filter } from '../types/types';
import { specialties } from '../data/mockData';
import { Check, Filter as FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (filter: Partial<Filter>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="sticky top-0 z-10 bg-background pb-4 pt-4">
      <div className="mx-auto flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center">
          <FilterIcon className="mr-2 h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-medium">Filter Doctors</h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Specialty Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <span>{filter.specialty}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup
                value={filter.specialty}
                onValueChange={(value) => onFilterChange({ specialty: value })}
              >
                {specialties.map((specialty) => (
                  <DropdownMenuRadioItem
                    key={specialty}
                    value={specialty}
                    className="cursor-pointer"
                  >
                    {specialty}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Available Today Filter */}
          <div className="flex items-center space-x-2">
            <Switch
              id="available-today"
              checked={filter.availableToday}
              onCheckedChange={(checked) => onFilterChange({ availableToday: checked })}
            />
            <Label htmlFor="available-today">Available Today</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
