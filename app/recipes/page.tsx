import { Metadata } from 'next';
import { RecipeGrid } from '@/components/recipes/recipe-grid';
import { RecipeHero } from '@/components/recipes/recipe-hero';
import { RecipeCategories } from '@/components/recipes/recipe-categories';

export const metadata: Metadata = {
  title: 'Traditional Pickle Recipes | Shahi Pickle',
  description: 'Learn to make authentic Indian pickles with our traditional family recipes from Malda, West Bengal.',
};

export default function RecipesPage() {
  return (
    <div className="min-h-screen">
      <RecipeHero />
      <RecipeCategories />
      <div className="container mx-auto px-4 py-12">
        <RecipeGrid />
      </div>
    </div>
  );
}