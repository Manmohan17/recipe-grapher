import { Button } from "@/components/ui/button";
import { ArrowRight, Network } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ background: 'var(--gradient-primary)' }}
      />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <Network className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Powered by Graph Theory</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent" style={{ backgroundImage: 'var(--gradient-primary)' }}>
          FlavorGraph
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">
          Intelligent Recipe Navigator with Algorithmic Insights
        </p>
        
        <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
          Discover recipes you can make right now. Using greedy algorithms and backtracking, 
          we find the perfect match based on your available ingredients, complete with 
          substitution recommendations and gap analysis.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all group"
          >
            Start Cooking
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-border hover:bg-muted"
          >
            View Algorithm
          </Button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-3 justify-center mt-12">
          {['Greedy Matching', 'Gap Analysis', 'Smart Substitutions', 'Backtracking Search'].map((feature) => (
            <div 
              key={feature}
              className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-card-foreground"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
