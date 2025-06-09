'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, Eye, Zap, Truck, Shield, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Product } from '@/lib/types';
import { useCart } from '@/components/cart/cart-context';
import { useAuth } from '@/components/auth/auth-context';
import { EnhancedAuthModal } from '@/components/auth/enhanced-auth-modal';

interface EnhancedProductCardProps {
  product: Product;
}

export function EnhancedProductCard({ product }: EnhancedProductCardProps) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [quickBuyOpen, setQuickBuyOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedJarType, setSelectedJarType] = useState<'Glass' | 'Plastic'>('Glass');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState(product.spiceLevel);
  const [isHovered, setIsHovered] = useState(false);
  
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  const toggleWishlist = (productId: string) => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
    
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const handleQuickBuy = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
    setQuickBuyOpen(true);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }

    addItem({
      id: `${product.id}-${selectedJarType}-${selectedSpiceLevel}`,
      productId: product.id,
      name: product.name,
      price: finalPrice,
      image: product.image,
      jarType: selectedJarType,
      spiceLevel: selectedSpiceLevel,
      weight: product.weight
    });
    setQuickBuyOpen(false);
  };

  const getSpiceLevelColor = (level: string) => {
    switch (level) {
      case 'Mild': return 'text-neon-green border-neon-green bg-neon-green/10';
      case 'Medium': return 'text-golden-yellow border-golden-yellow bg-golden-yellow/10';
      case 'Hot': return 'text-electric-orange border-electric-orange bg-electric-orange/10';
      case 'Extra Hot': return 'text-crimson-red border-crimson-red bg-crimson-red/10';
      default: return 'text-gray-600 border-gray-600 bg-gray-600/10';
    }
  };

  const jarTypePriceAdjustment = selectedJarType === 'Plastic' ? -20 : 0;
  const finalPrice = product.price + jarTypePriceAdjustment;

  return (
    <>
      <Card 
        className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-700 bg-white dark:bg-card hover-lift-glow relative interactive-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          {/* Enhanced Product image */}
          <div className="relative overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Enhanced gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            
            {/* Enhanced overlay badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-3">
              {product.badge && (
                <Badge className={`${product.badgeColor} text-white shadow-lg animate-glow px-3 py-1 font-semibold`}>
                  <Sparkles className="w-3 h-3 mr-1" />
                  {product.badge}
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive" className="shadow-lg animate-pulse">Out of Stock</Badge>
              )}
              {product.originalPrice && (
                <Badge className="bg-gradient-fire text-white shadow-lg font-bold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            {/* Enhanced action buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-3">
              <Button
                size="icon"
                variant="ghost"
                className="bg-white/90 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm hover-glow-electric"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${
                    wishlist.has(product.id) 
                      ? 'fill-crimson-red text-crimson-red' 
                      : 'text-gray-600 hover:text-crimson-red'
                  }`}
                />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="bg-white/90 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm hover-glow-purple"
                asChild
              >
                <Link href={`/products/${product.id}`}>
                  <Eye className="h-5 w-5 text-gray-600 hover:text-vibrant-purple" />
                </Link>
              </Button>
            </div>

            {/* Enhanced Quick Buy overlay */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Button
                size="lg"
                disabled={!product.inStock}
                className="btn-electric shadow-2xl hover:shadow-electric transform hover:scale-110 transition-all duration-300 px-8 py-4"
                onClick={handleQuickBuy}
              >
                <Zap className="h-6 w-6 mr-3" />
                Quick Buy
              </Button>
            </div>

            {/* Enhanced product features */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <div className="flex space-x-2">
                {product.isCustomizable && (
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                    <Award className="w-4 h-4 text-golden-yellow" />
                  </div>
                )}
                <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                  <Shield className="w-4 h-4 text-neon-green" />
                </div>
                <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                  <Truck className="w-4 h-4 text-royal-blue" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Product details */}
          <div className="p-6 bg-gradient-to-br from-white to-pearl-white">
            {/* Enhanced Rating and spice level */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-golden-yellow fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2 font-medium">
                  {product.rating} ({product.reviews})
                </span>
              </div>
              <Badge 
                variant="outline" 
                className={`${getSpiceLevelColor(product.spiceLevel)} font-semibold border-2`}
              >
                {product.spiceLevel}
              </Badge>
            </div>

            {/* Enhanced Product name and description */}
            <Link href={`/products/${product.id}`} className="block group">
              <h3 className="font-bold text-xl mb-3 group-hover:text-electric-orange transition-colors line-clamp-2 font-display">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Enhanced Price and add to cart */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-electric-orange">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Enhanced Action buttons */}
            <div className="flex space-x-3">
              <Button
                size="sm"
                disabled={!product.inStock}
                className="flex-1 bg-gradient-electric hover:bg-gradient-fire text-white shadow-lg hover:shadow-electric transition-all duration-300 py-3 font-semibold"
                onClick={handleQuickBuy}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-2 border-electric-orange text-electric-orange hover:bg-electric-orange hover:text-white transition-all duration-300 px-6 py-3 font-semibold"
                asChild
              >
                <Link href={`/products/${product.id}`}>
                  View
                </Link>
              </Button>
            </div>

            {/* Enhanced Product highlights */}
            <div className="flex items-center justify-between mt-6 text-xs text-muted-foreground">
              <span className="flex items-center space-x-1 font-medium">
                <Shield className="w-4 h-4 text-neon-green" />
                <span>100% Organic</span>
              </span>
              <span className="flex items-center space-x-1 font-medium">
                <Truck className="w-4 h-4 text-royal-blue" />
                <span>Free Shipping</span>
              </span>
              <span className="flex items-center space-x-1 font-medium">
                <Award className="w-4 h-4 text-golden-yellow" />
                <span>Handmade</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Quick Buy Modal */}
      <Dialog open={quickBuyOpen} onOpenChange={setQuickBuyOpen}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-white to-pearl-white border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3 text-2xl font-display">
              <Zap className="w-6 h-6 text-electric-orange" />
              <span className="bg-gradient-electric bg-clip-text text-transparent">Quick Buy - {product.name}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="w-full rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/20 to-transparent rounded-2xl"></div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-golden-yellow fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground font-medium">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold mb-3 block">Jar Type</Label>
                  <Select value={selectedJarType} onValueChange={(value: 'Glass' | 'Plastic') => setSelectedJarType(value)}>
                    <SelectTrigger className="h-12 text-lg border-2 border-electric-orange/30 focus:border-electric-orange">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Glass">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-royal-blue rounded-full"></div>
                          <span>Premium Glass Jar - ₹{product.price}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Plastic">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-neon-green rounded-full"></div>
                          <span>Food-grade Plastic - ₹{product.price - 20}</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {product.isCustomizable && (
                  <div>
                    <Label className="text-lg font-semibold mb-3 block">Spice Level</Label>
                    <Select value={selectedSpiceLevel} onValueChange={setSelectedSpiceLevel}>
                      <SelectTrigger className="h-12 text-lg border-2 border-electric-orange/30 focus:border-electric-orange">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mild">🟢 Mild - Perfect for beginners</SelectItem>
                        <SelectItem value="Medium">🟡 Medium - Balanced heat</SelectItem>
                        <SelectItem value="Hot">🟠 Hot - For spice lovers</SelectItem>
                        <SelectItem value="Extra Hot">🔴 Extra Hot - Maximum heat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              
              <div className="text-4xl font-bold text-electric-orange">
                ₹{finalPrice}
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through ml-3">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              
              <Button 
                className="w-full btn-electric text-xl py-6 shadow-2xl hover:shadow-electric" 
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-6 w-6 mr-3" />
                Add to Cart - ₹{finalPrice}
              </Button>

              {/* Enhanced Quick features */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center p-4 bg-gradient-to-br from-neon-green/10 to-emerald-teal/10 rounded-2xl border border-neon-green/20">
                  <Shield className="w-6 h-6 text-neon-green mx-auto mb-2" />
                  <span className="font-semibold">100% Organic</span>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-royal-blue/10 to-vibrant-purple/10 rounded-2xl border border-royal-blue/20">
                  <Truck className="w-6 h-6 text-royal-blue mx-auto mb-2" />
                  <span className="font-semibold">Free Shipping</span>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-golden-yellow/10 to-electric-orange/10 rounded-2xl border border-golden-yellow/20">
                  <Award className="w-6 h-6 text-golden-yellow mx-auto mb-2" />
                  <span className="font-semibold">Handmade</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EnhancedAuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
}