import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ChefHat, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { RecipeMatch } from '@/utils/recipeAlgorithm';
import { Progress } from '@/components/ui/progress';

interface RecipeCardProps {
  match: RecipeMatch;
}

const RecipeCard = ({ match }: RecipeCardProps) => {
  const { recipe, matchPercentage, matchedIngredients, missingIngredients, possibleSubstitutions } = match;

  const getMatchColor = (percentage: number) => {
    if (percentage === 100) return 'text-success';
    if (percentage >= 70) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'bg-success';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <Card className="p-6 space-y-4 hover:shadow-lg transition-all border-border bg-card">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-card-foreground mb-1">{recipe.name}</h3>
          <p className="text-sm text-muted-foreground">{recipe.description}</p>
        </div>
        <div className={`text-3xl font-bold ${getMatchColor(matchPercentage)}`}>
          {matchPercentage}%
        </div>
      </div>

      {/* Match Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Match Confidence</span>
          <span className="font-medium text-foreground">
            {matchedIngredients.length}/{recipe.ingredients.length} ingredients
          </span>
        </div>
        <Progress value={matchPercentage} className={getProgressColor(matchPercentage)} />
      </div>

      {/* Recipe Info */}
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{recipe.cookTime}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <ChefHat className="w-4 h-4" />
          <span>{recipe.difficulty}</span>
        </div>
      </div>

      {/* Matched Ingredients */}
      {matchedIngredients.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-success">
            <CheckCircle2 className="w-4 h-4" />
            <span>Available Ingredients</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {matchedIngredients.map((ing) => (
              <Badge key={ing} variant="outline" className="bg-success/10 text-success border-success/20">
                {ing}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Missing Ingredients */}
      {missingIngredients.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-warning">
            <AlertCircle className="w-4 h-4" />
            <span>Missing Ingredients</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {missingIngredients.map((ing) => (
              <Badge key={ing} variant="outline" className="bg-warning/10 text-warning border-warning/20">
                {ing}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Substitutions */}
      {possibleSubstitutions.length > 0 && (
        <div className="space-y-2 p-3 rounded-lg bg-accent/5 border border-accent/20">
          <div className="text-sm font-medium text-accent">
            Smart Substitutions Available
          </div>
          <div className="space-y-1">
            {possibleSubstitutions.map((sub, idx) => (
              <div key={idx} className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{sub.missing}</span> → {sub.substitution.substitute}
                {sub.substitution.note && (
                  <span className="italic"> ({sub.substitution.note})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group"
        disabled={matchPercentage < 50}
      >
        View Recipe
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Card>
  );
};

export default RecipeCard;
