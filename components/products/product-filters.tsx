'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const categories = [
  'Mango Pickles',
  'Vegetable Pickles',
  'Mixed Pickles',
  'Seasonal Specials',
  'Custom Orders',
];

const spiceLevels = [
  'Mild',
  'Medium',
  'Hot',
  'Extra Hot',
];

export function ProductFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSpiceLevels, setSelectedSpiceLevels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSpiceLevels([]);
    setPriceRange([0, 1000]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== category));
                  }
                }}
              />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Spice Level */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Spice Level</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {spiceLevels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={level}
                checked={selectedSpiceLevels.includes(level)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedSpiceLevels([...selectedSpiceLevels, level]);
                  } else {
                    setSelectedSpiceLevels(selectedSpiceLevels.filter(l => l !== level));
                  }
                }}
              />
              <label htmlFor={level} className="text-sm cursor-pointer">
                {level}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || selectedSpiceLevels.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                  />
                </Badge>
              ))}
              {selectedSpiceLevels.map((level) => (
                <Badge key={level} variant="secondary">
                  {level}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => setSelectedSpiceLevels(selectedSpiceLevels.filter(l => l !== level))}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}