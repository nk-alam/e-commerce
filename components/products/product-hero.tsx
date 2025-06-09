'use client';

import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function ProductHero() {
  return (
    <section className="py-16 bg-gradient-to-r from-saffron to-golden text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            Premium Collection
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Authentic <span className="text-white">Organic Pickles</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover our complete collection of handmade organic pickles, 
            crafted with traditional recipes from Malda, West Bengal.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search pickles..."
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}