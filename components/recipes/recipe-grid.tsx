import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ChefHat } from 'lucide-react';
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
  {
    id: 4,
    title: 'Lime & Chili Pickle',
    description: 'Tangy lime pickle with green chilies - a perfect accompaniment to any meal.',
    image: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=500',
    cookTime: '30 mins',
    servings: '6-8',
    difficulty: 'Easy',
    category: 'Traditional',
  },
  {
    id: 5,
    title: 'Cauliflower Pickle',
    description: 'Classic Bengali gobi ka achaar with mustard seeds and aromatic spices.',
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=500',
    cookTime: '40 mins',
    servings: '8-10',
    difficulty: 'Medium',
    category: 'Vegetable',
  },
  {
    id: 6,
    title: 'Carrot Ginger Pickle',
    description: 'Crunchy carrots with fresh ginger in a spicy mustard oil base.',
    image: 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=500',
    cookTime: '35 mins',
    servings: '6-8',
    difficulty: 'Medium',
    category: 'Vegetable',
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

export function RecipeGrid() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
          Traditional <span className="text-saffron">Pickle Recipes</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master the art of pickle making with our authentic family recipes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500"
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
                  <div className="flex items-center space-x-1">
                    <ChefHat className="w-4 h-4" />
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>

                {/* View recipe button */}
                <Button
                  asChild
                  className="w-full bg-saffron hover:bg-saffron/90"
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
    </div>
  );
}