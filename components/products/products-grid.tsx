'use client';

import { useState } from 'react';
import { EnhancedProductCard } from './enhanced-product-card';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';

export function ProductsGrid() {
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id.localeCompare(a.id);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <Card className="bg-gradient-to-r from-saffron/5 to-golden/5 border-saffron/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold font-display text-saffron">Premium Pickles</h2>
              <p className="text-muted-foreground mt-1">
                Discover {products.length} authentic handmade pickles from Malda
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-white rounded-lg p-1 shadow-sm">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-saffron hover:bg-saffron/90' : ''}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-saffron hover:bg-saffron/90' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-white shadow-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>

              {/* Filters Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-saffron text-saffron hover:bg-saffron hover:text-white"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className={`grid gap-8 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {sortedProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <EnhancedProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Enhanced Pagination */}
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex justify-center items-center space-x-4">
            <Button variant="outline" disabled className="border-saffron/50">
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  className={page === 1 ? "bg-saffron hover:bg-saffron/90" : "border-saffron/50 hover:bg-saffron hover:text-white"}
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button variant="outline" className="border-saffron text-saffron hover:bg-saffron hover:text-white">
              Next
            </Button>
          </div>
          
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Showing 1-{products.length} of {products.length} products
          </div>
        </CardContent>
      </Card>
    </div>
  );
}