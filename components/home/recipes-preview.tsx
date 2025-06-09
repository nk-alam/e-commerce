import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ChefHat, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const recipes = [
  {
    id: 1,
    title: 'Traditional Mango Pickle',
    description: 'Learn the authentic Malda-style mango pickle recipe passed down through generations.',
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=500',
    cookTime: '45 mins',
    servings: '8-10',
    difficulty: 'Medium',
    category: 'Traditional',
  },
  {
    id: 2,
    title: 'Quick Garlic Pickle',
    description: 'A fast and flavorful garlic pickle perfect for boosting immunity and adding zing to meals.',
    image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500',
    cookTime: '20 mins',
    servings: '6-8',
    difficulty: 'Easy',
    category: 'Quick',
  },
  {
    id: 3,
    title: 'Mixed Vegetable Pickle',
    description: 'A colorful and nutritious pickle combining seasonal vegetables with aromatic spices.',
    image: 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=500',
    cookTime: '60 mins',
    servings: '10-12',
    difficulty: 'Advanced',
    category: 'Seasonal',
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'bg-green-100 text-green-700 dark:bg-green-900/20';
    case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20';
    case 'Advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/20';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20';
  }
};

export function RecipesPreview() {
  return (
    <section className="py-20 bg-gradient-to-b from-cream to-background dark:from-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 animate-slide-up">
          <Badge variant="secondary" className="mb-4 bg-saffron/10 text-saffron border-saffron/20">
            <ChefHat className="w-4 h-4 mr-1" />
            Traditional Recipes
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Learn to Make <span className="text-saffron">Authentic Pickles</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the secrets of traditional pickle making with our family recipes, 
            passed down through generations in Malda, West Bengal.
          </p>
        </div>

        {/* Recipes grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {recipes.map((recipe, index) => (
            <Card
              key={recipe.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Recipe image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-black">
                      {recipe.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className={getDifficultyColor(recipe.difficulty)}>
                      {recipe.difficulty}
                    </Badge>
                  </div>
                </div>

                {/* Recipe details */}
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-3 group-hover:text-saffron transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {recipe.description}
                  </p>

                  {/* Recipe meta */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings}</span>
                    </div>
                  </div>

                  {/* View recipe button */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-saffron group-hover:text-white group-hover:border-saffron transition-all duration-300"
                  >
                    <Link href={`/recipes/${recipe.id}`}>
                      View Recipe
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recipe features */}
        <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-saffron" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
              <p className="text-muted-foreground text-sm">
                Step-by-step instructions from our master pickle makers
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Badge className="w-8 h-8 bg-green-500 text-white rounded-full p-0 flex items-center justify-center">
                  ✓
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2">Tested Recipes</h3>
              <p className="text-muted-foreground text-sm">
                Every recipe is thoroughly tested and perfected over generations
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community Support</h3>
              <p className="text-muted-foreground text-sm">
                Join our community of pickle enthusiasts for tips and variations
              </p>
            </div>
          </div>
        </div>

        {/* View all recipes button */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-saffron hover:bg-saffron/90 text-white"
          >
            <Link href="/recipes" className="flex items-center space-x-2">
              <span>Explore All Recipes</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}