'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const categories = [
  'All Recipes',
  'Mango Pickles',
  'Vegetable Pickles',
  'Quick Pickles',
  'Traditional',
  'Seasonal',
];

export function RecipeCategories() {
  const [activeCategory, setActiveCategory] = useState('All Recipes');

  return (
    <section className="py-8 bg-cream dark:bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`${
                activeCategory === category 
                  ? 'bg-saffron hover:bg-saffron/90 text-white' 
                  : 'hover:bg-saffron/10 hover:text-saffron hover:border-saffron'
              } transition-all duration-300`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}