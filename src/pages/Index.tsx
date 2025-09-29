import { useState, useMemo, useRef } from 'react';
import Hero from '@/components/Hero';
import IngredientSelector from '@/components/IngredientSelector';
import RecipeCard from '@/components/RecipeCard';
import GapAnalysis from '@/components/GapAnalysis';
import { ingredients, recipes, substitutions } from '@/data/mockData';
import { matchRecipes, analyzeIngredientGap } from '@/utils/recipeAlgorithm';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleToggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleGetStarted = () => {
    setShowResults(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const recipeMatches = useMemo(() => {
    if (selectedIngredients.length === 0) return [];
    return matchRecipes(selectedIngredients, recipes, substitutions);
  }, [selectedIngredients]);

  const ingredientGaps = useMemo(() => {
    if (selectedIngredients.length === 0) return [];
    return analyzeIngredientGap(selectedIngredients, recipes);
  }, [selectedIngredients]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero onGetStarted={handleGetStarted} />

      {/* Main Content */}
      {showResults && (
        <section ref={resultsRef} className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Ingredient Selector */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4 border-border bg-card">
                <h2 className="text-2xl font-bold mb-4 text-card-foreground">
                  Select Ingredients
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Choose what you have available, and our algorithm will find the best matches
                </p>
                <IngredientSelector
                  ingredients={ingredients}
                  selectedIngredients={selectedIngredients}
                  onToggleIngredient={handleToggleIngredient}
                />
              </Card>
            </div>

            {/* Right Content - Results */}
            <div className="lg:col-span-2 space-y-8">
              {selectedIngredients.length === 0 ? (
                <Card className="p-12 text-center border-border bg-card">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="text-6xl">🍳</div>
                    <h3 className="text-2xl font-bold text-card-foreground">
                      Ready to Cook?
                    </h3>
                    <p className="text-muted-foreground">
                      Select your available ingredients from the left panel to see recipe recommendations
                      powered by our intelligent matching algorithm.
                    </p>
                  </div>
                </Card>
              ) : (
                <>
                  {/* Gap Analysis */}
                  {ingredientGaps.length > 0 && (
                    <GapAnalysis gaps={ingredientGaps} />
                  )}

                  {/* Recipe Results */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">
                          Recipe Matches
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Sorted by match confidence using greedy algorithm
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {recipeMatches.length} recipe{recipeMatches.length !== 1 ? 's' : ''} found
                      </div>
                    </div>

                    <Separator />

                    {recipeMatches.length === 0 ? (
                      <Card className="p-8 text-center border-border bg-card">
                        <p className="text-muted-foreground">
                          No recipes found with current ingredients. Try adding more!
                        </p>
                      </Card>
                    ) : (
                      <div className="grid gap-6">
                        {recipeMatches.map((match) => (
                          <RecipeCard key={match.recipe.id} match={match} />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>FlavorGraph • Powered by Graph Theory & Algorithmic Intelligence</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
