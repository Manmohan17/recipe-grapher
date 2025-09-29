import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Sparkles } from 'lucide-react';

interface GapAnalysisProps {
  gaps: { ingredient: string; unlocksRecipes: number }[];
}

const GapAnalysis = ({ gaps }: GapAnalysisProps) => {
  if (gaps.length === 0) return null;

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-bold text-foreground">Ingredient Gap Analysis</h3>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Add these ingredients to unlock more recipe options using our greedy optimization algorithm
      </p>

      <div className="space-y-3">
        {gaps.map((gap, idx) => (
          <div
            key={gap.ingredient}
            className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-accent/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm">
                #{idx + 1}
              </div>
              <span className="font-medium text-foreground">{gap.ingredient}</span>
            </div>
            
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{gap.unlocksRecipes} recipe{gap.unlocksRecipes !== 1 ? 's' : ''}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default GapAnalysis;
