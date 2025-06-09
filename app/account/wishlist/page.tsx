'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/cart/cart-context';
import { products } from '@/lib/data';

// Mock wishlist data
const mockWishlist = [
  products[0],
  products[2],
  products[4]
];

export default function AccountWishlist() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlist);
  const { addItem } = useCart();

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const addToCart = (product: any) => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      jarType: 'Glass',
      spiceLevel: product.spiceLevel,
      weight: product.weight
    });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your saved favorite products ({wishlistItems.length} items)
        </p>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <Card key={product.id} className="group overflow-hidden">
              <CardContent className="p-0">
                {/* Product image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Remove from wishlist button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white transition-all duration-300"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>

                  {/* Product badges */}
                  <div className="absolute top-3 left-3">
                    {product.badge && (
                      <Badge className={`${product.badgeColor} text-white`}>
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Product details */}
                <div className="p-4">
                  {/* Rating and spice level */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {product.spiceLevel}
                    </Badge>
                  </div>

                  {/* Product name */}
                  <Link href={`/products/${product.id}`} className="block group">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-saffron transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Price and actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-saffron">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2 mt-4">
                    <Button
                      size="sm"
                      className="flex-1 bg-saffron hover:bg-saffron/90"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <Link href={`/products/${product.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Save your favorite pickles to your wishlist and never lose track of them!
            </p>
            <Button asChild className="bg-saffron hover:bg-saffron/90">
              <Link href="/products">
                Browse Products
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Wishlist Actions */}
      {wishlistItems.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  wishlistItems.forEach(product => addToCart(product));
                  setWishlistItems([]);
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add All to Cart
              </Button>
              <Button
                variant="outline"
                onClick={() => setWishlistItems([])}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Wishlist
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}