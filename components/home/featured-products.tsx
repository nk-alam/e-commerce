'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EnhancedProductCard } from '@/components/products/enhanced-product-card';
import { products } from '@/lib/data';

const categories = ['All', 'Bestsellers', 'Mango', 'Vegetable', 'Health', 'Seasonal'];

export function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products.slice(0, 4) 
    : products.filter(product => 
        product.category.toLowerCase().includes(activeCategory.toLowerCase())
      ).slice(0, 4);

  return (
    <section className="py-24 bg-gradient-to-br from-pearl-white via-warm-cream to-pearl-white particle-bg relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-electric rounded-full blur-3xl opacity-10 animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-cosmic rounded-full blur-3xl opacity-10 animate-pulse-glow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section header */}
        <div className="text-center mb-20 animate-slide-up">
          <Badge variant="secondary" className="mb-6 bg-gradient-electric text-white border-0 px-6 py-3 text-lg font-medium animate-glow">
            <Sparkles className="w-5 h-5 mr-2" />
            Featured Collection
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold font-display mb-6">
            <span className="bg-gradient-electric bg-clip-text text-transparent">Handpicked</span>{' '}
            <span className="bg-gradient-cosmic bg-clip-text text-transparent">Favorites</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our most loved pickles, crafted with traditional recipes 
            and premium organic ingredients from <span className="text-electric-orange font-semibold">Malda</span>
          </p>
        </div>

        {/* Enhanced Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`${
                activeCategory === category 
                  ? 'bg-gradient-electric hover:bg-gradient-fire text-white shadow-lg animate-glow' 
                  : 'glass-electric border-2 border-electric-orange/30 text-electric-orange hover:bg-gradient-electric hover:text-white hover:border-transparent'
              } transition-all duration-500 px-8 py-4 text-lg font-semibold rounded-2xl hover-lift-glow`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {category === 'All' && <Star className="w-5 h-5 mr-2" />}
              {category === 'Bestsellers' && <Zap className="w-5 h-5 mr-2" />}
              {category}
            </Button>
          ))}
        </div>

        {/* Enhanced Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-scale-in hover-lift-glow"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <EnhancedProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Enhanced View all products section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-electric-orange/5 via-vibrant-purple/5 to-royal-blue/5 rounded-3xl p-12 glass-electric border border-electric-orange/20">
            <h3 className="text-3xl font-bold font-display mb-4 bg-gradient-electric bg-clip-text text-transparent">
              Ready to explore more flavors?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover our complete collection of authentic pickles, each with its own unique story and taste
            </p>
            <Button
              asChild
              size="lg"
              className="btn-electric text-xl px-12 py-6 h-auto group relative overflow-hidden"
            >
              <Link href="/products" className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                <span>View All Products</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Enhanced stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { number: '25+', label: 'Unique Flavors', color: 'text-electric-orange' },
            { number: '5000+', label: 'Happy Customers', color: 'text-vibrant-purple' },
            { number: '50+', label: 'Countries Served', color: 'text-neon-green' },
            { number: '4.9★', label: 'Average Rating', color: 'text-sunset-pink' }
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center group hover-lift-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} group-hover:scale-110 transition-transform mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}