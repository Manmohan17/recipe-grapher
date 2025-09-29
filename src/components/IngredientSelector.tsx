import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Search } from 'lucide-react';
import { Ingredient } from '@/data/mockData';

interface IngredientSelectorProps {
  ingredients: Ingredient[];
  selectedIngredients: string[];
  onToggleIngredient: (ingredient: string) => void;
}

const IngredientSelector = ({
  ingredients,
  selectedIngredients,
  onToggleIngredient,
}: IngredientSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const groupedIngredients = useMemo(() => {
    const filtered = ingredients.filter((ing) =>
      ing.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const grouped = filtered.reduce((acc, ing) => {
      if (!acc[ing.category]) {
        acc[ing.category] = [];
      }
      acc[ing.category].push(ing);
      return acc;
    }, {} as Record<string, Ingredient[]>);

    return grouped;
  }, [ingredients, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-border focus-visible:ring-primary"
        />
      </div>

      {/* Selected Count */}
      {selectedIngredients.length > 0 && (
        <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
          <span className="text-sm font-medium text-foreground">
            {selectedIngredients.length} ingredient{selectedIngredients.length !== 1 ? 's' : ''} selected
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => selectedIngredients.forEach(onToggleIngredient)}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Ingredient Groups */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {Object.entries(groupedIngredients).map(([category, ings]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {ings.map((ing) => {
                const isSelected = selectedIngredients.includes(ing.name);
                return (
                  <Badge
                    key={ing.id}
                    variant={isSelected ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      isSelected
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'hover:bg-muted border-border'
                    }`}
                    onClick={() => onToggleIngredient(ing.name)}
                  >
                    {ing.name}
                    {isSelected && <X className="ml-1 w-3 h-3" />}
                  </Badge>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientSelector;
