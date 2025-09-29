import { Recipe, Substitution } from '@/data/mockData';

export interface RecipeMatch {
  recipe: Recipe;
  matchPercentage: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  possibleSubstitutions: Array<{
    missing: string;
    substitution: Substitution;
  }>;
}

/**
 * Greedy algorithm to match recipes with available ingredients
 * Prioritizes recipes with highest ingredient match percentage
 */
export const matchRecipes = (
  availableIngredients: string[],
  recipes: Recipe[],
  substitutions: Substitution[]
): RecipeMatch[] => {
  const matches: RecipeMatch[] = [];

  for (const recipe of recipes) {
    const matched: string[] = [];
    const missing: string[] = [];

    // Check each ingredient in the recipe
    for (const ingredient of recipe.ingredients) {
      if (availableIngredients.includes(ingredient)) {
        matched.push(ingredient);
      } else {
        missing.push(ingredient);
      }
    }

    // Calculate match percentage (greedy: immediate score)
    const matchPercentage = Math.round(
      (matched.length / recipe.ingredients.length) * 100
    );

    // Find possible substitutions for missing ingredients
    const possibleSubstitutions = missing
      .map((missingIngredient) => {
        const sub = substitutions.find(
          (s) =>
            s.original === missingIngredient &&
            availableIngredients.includes(s.substitute)
        );
        return sub
          ? { missing: missingIngredient, substitution: sub }
          : null;
      })
      .filter((s): s is { missing: string; substitution: Substitution } => s !== null);

    matches.push({
      recipe,
      matchPercentage,
      matchedIngredients: matched,
      missingIngredients: missing,
      possibleSubstitutions,
    });
  }

  // Sort by match percentage (greedy: best first)
  return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
};

/**
 * Calculate ingredient gap - what's missing to unlock more recipes
 */
export const analyzeIngredientGap = (
  availableIngredients: string[],
  recipes: Recipe[]
): { ingredient: string; unlocksRecipes: number }[] => {
  const ingredientImpact = new Map<string, Set<string>>();

  for (const recipe of recipes) {
    const matched = recipe.ingredients.filter((ing) =>
      availableIngredients.includes(ing)
    );
    const missing = recipe.ingredients.filter(
      (ing) => !availableIngredients.includes(ing)
    );

    // Only consider recipes that are close to being complete
    if (matched.length >= recipe.ingredients.length * 0.5) {
      for (const missingIng of missing) {
        if (!ingredientImpact.has(missingIng)) {
          ingredientImpact.set(missingIng, new Set());
        }
        ingredientImpact.get(missingIng)!.add(recipe.id);
      }
    }
  }

  return Array.from(ingredientImpact.entries())
    .map(([ingredient, recipeIds]) => ({
      ingredient,
      unlocksRecipes: recipeIds.size,
    }))
    .sort((a, b) => b.unlocksRecipes - a.unlocksRecipes)
    .slice(0, 5);
};
