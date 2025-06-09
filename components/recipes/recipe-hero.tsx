import { ChefHat, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function RecipeHero() {
  return (
    <section className="py-16 bg-gradient-to-r from-deep-green to-warm-brown text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-golden/20 text-golden border-golden/30">
            <ChefHat className="w-4 h-4 mr-1" />
            Traditional Recipes
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Learn to Make <span className="text-golden">Authentic Pickles</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover the secrets of traditional pickle making with our family recipes, 
            passed down through generations in Malda, West Bengal.
          </p>
          
          <div className="flex justify-center items-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>15-60 min recipes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Family portions</span>
            </div>
            <div className="flex items-center space-x-2">
              <ChefHat className="w-4 h-4" />
              <span>All skill levels</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}