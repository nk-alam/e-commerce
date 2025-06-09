'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, Heart, ShoppingCart, Truck, Shield, Leaf, Award, Plus, Minus, Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getProductById, getReviewsByProductId } from '@/lib/data';
import { useCart } from '@/components/cart/cart-context';
import { useAuth } from '@/components/auth/auth-context';
import { EnhancedAuthModal } from '@/components/auth/enhanced-auth-modal';
import { PincodeChecker } from '@/components/products/pincode-checker';

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  const reviews = getReviewsByProductId(params.id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedJarType, setSelectedJarType] = useState<'Glass' | 'Plastic'>('Glass');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState(product?.spiceLevel || 'Medium');
  const [quantity, setQuantity] = useState(1);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${product.id}-${selectedJarType}-${selectedSpiceLevel}-${Date.now()}-${i}`,
        productId: product.id,
        name: product.name,
        price: finalPrice,
        image: product.image,
        jarType: selectedJarType,
        spiceLevel: selectedSpiceLevel,
        weight: product.weight
      });
    }
  };

  const getSpiceLevelColor = (level: string) => {
    switch (level) {
      case 'Mild': return 'text-mint border-mint bg-mint/10';
      case 'Medium': return 'text-turmeric border-turmeric bg-turmeric/10';
      case 'Hot': return 'text-coral border-coral bg-coral/10';
      case 'Extra Hot': return 'text-red-600 border-red-600 bg-red-600/10';
      default: return 'text-gray-600 border-gray-600 bg-gray-600/10';
    }
  };

  const jarTypePriceAdjustment = selectedJarType === 'Plastic' ? -20 : 0;
  const finalPrice = product.price + jarTypePriceAdjustment;

  return (
    <>
      <div className="min-h-screen py-8 bg-gradient-to-b from-cream/30 to-background">
        <div className="container mx-auto px-4">
          {/* Enhanced Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8 bg-white/50 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <span className="hover:text-saffron cursor-pointer transition-colors">Home</span>
              <span>/</span>
              <span className="hover:text-saffron cursor-pointer transition-colors">Products</span>
              <span>/</span>
              <span className="hover:text-saffron cursor-pointer transition-colors">{product.category}</span>
              <span>/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                {product.badge && (
                  <Badge className={`absolute top-4 left-4 ${product.badgeColor} text-white shadow-lg animate-pulse-slow`}>
                    {product.badge}
                  </Badge>
                )}
                
                {/* Share button */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index 
                          ? 'border-saffron shadow-saffron' 
                          : 'border-transparent hover:border-saffron/50'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Product Details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold font-display mb-4 text-gradient bg-gradient-to-r from-saffron to-golden bg-clip-text text-transparent">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-golden fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-lg font-medium ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getSpiceLevelColor(product.spiceLevel)} border-2 px-3 py-1 font-medium`}
                  >
                    {product.spiceLevel} Heat
                  </Badge>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Enhanced Price */}
              <Card className="bg-gradient-to-r from-saffron/5 to-golden/5 border-saffron/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl font-bold text-saffron">
                        ₹{finalPrice}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-2xl text-muted-foreground line-through">
                            ₹{product.originalPrice}
                          </span>
                          <Badge className="bg-coral text-white text-lg px-3 py-1">
                            {Math.round(((product.originalPrice - finalPrice) / product.originalPrice) * 100)}% OFF
                          </Badge>
                        </>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Inclusive of all taxes</div>
                      <div className="text-sm text-green-600 font-medium">Free shipping above ₹999</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Product Options */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <Label className="text-lg font-semibold mb-3 block">Jar Type</Label>
                      <Select value={selectedJarType} onValueChange={(value: 'Glass' | 'Plastic') => setSelectedJarType(value)}>
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Glass">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                              <span>Premium Glass Jar - ₹{product.price}</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Plastic">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
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
                          <SelectTrigger className="h-12 text-lg">
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

                    <div>
                      <Label className="text-lg font-semibold mb-3 block">Quantity</Label>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-12 w-12 border-2"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          <Minus className="h-5 w-5" />
                        </Button>
                        <span className="text-2xl font-semibold w-16 text-center">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-12 w-12 border-2"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                        <div className="text-sm text-muted-foreground ml-4">
                          <div>Total: ₹{(finalPrice * quantity).toFixed(2)}</div>
                          <div>Per jar: {product.weight}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pincode Checker */}
                <PincodeChecker productId={product.id} />
              </div>

              {/* Enhanced Add to Cart */}
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-saffron hover:bg-saffron-dark text-white text-xl py-8 rounded-2xl shadow-2xl hover:shadow-saffron transition-all duration-300 transform hover:scale-105"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-6 w-6 mr-3" />
                  {product.inStock ? `Add ${quantity} to Cart - ₹${(finalPrice * quantity).toFixed(2)}` : 'Out of Stock'}
                </Button>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-saffron text-saffron hover:bg-saffron hover:text-white transition-all duration-300 py-6"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Add to Wishlist
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-mint text-mint hover:bg-mint hover:text-white transition-all duration-300 py-6"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Ask Question
                  </Button>
                </div>
              </div>

              {/* Enhanced Product Features */}
              <Card className="bg-gradient-to-r from-mint/5 to-deep-green/5 border-mint/20">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Leaf className="h-6 w-6 text-mint" />
                      </div>
                      <div className="font-semibold text-mint">100% Organic</div>
                      <div className="text-xs text-muted-foreground">Certified organic ingredients</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Truck className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="font-semibold text-blue-600">Free Shipping</div>
                      <div className="text-xs text-muted-foreground">Above ₹999</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Shield className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="font-semibold text-green-600">Quality Assured</div>
                      <div className="text-xs text-muted-foreground">100% satisfaction guarantee</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-golden/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="h-6 w-6 text-golden" />
                      </div>
                      <div className="font-semibold text-golden">Handmade Fresh</div>
                      <div className="text-xs text-muted-foreground">Made to order</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Product Details Tabs */}
          <div className="mt-20">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-14 bg-white/50 backdrop-blur-sm rounded-2xl">
                <TabsTrigger value="description" className="text-lg font-medium rounded-xl">Description</TabsTrigger>
                <TabsTrigger value="ingredients" className="text-lg font-medium rounded-xl">Ingredients</TabsTrigger>
                <TabsTrigger value="nutrition" className="text-lg font-medium rounded-xl">Nutrition</TabsTrigger>
                <TabsTrigger value="reviews" className="text-lg font-medium rounded-xl">Reviews ({reviews.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-8">
                <Card className="border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Product Description</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-lg leading-relaxed">{product.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gradient-to-br from-saffron/5 to-golden/5 p-6 rounded-2xl">
                        <h4 className="font-semibold text-xl mb-4 text-saffron">Product Details</h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between"><strong>Weight:</strong> <span>{product.weight}</span></li>
                          <li className="flex justify-between"><strong>Shelf Life:</strong> <span>{product.shelfLife}</span></li>
                          <li className="flex justify-between"><strong>Jar Type:</strong> <span>{product.jarType}</span></li>
                          <li className="flex justify-between"><strong>Spice Level:</strong> <span>{product.spiceLevel}</span></li>
                        </ul>
                      </div>
                      <div className="bg-gradient-to-br from-mint/5 to-deep-green/5 p-6 rounded-2xl">
                        <h4 className="font-semibold text-xl mb-4 text-mint">Storage Instructions</h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-mint">•</span>
                            <span>Store in a cool, dry place away from direct sunlight</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-mint">•</span>
                            <span>Always use clean, dry spoon to avoid contamination</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-mint">•</span>
                            <span>Refrigerate after opening for extended freshness</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-mint">•</span>
                            <span>Consume within shelf life for best taste</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="ingredients" className="mt-8">
                <Card className="border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Ingredients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-xl mb-6 text-saffron">Main Ingredients</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {product.ingredients.map((ingredient, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-saffron/5 to-golden/5 rounded-xl">
                              <div className="w-3 h-3 bg-saffron rounded-full flex-shrink-0" />
                              <span className="font-medium">{ingredient}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-mint/5 to-deep-green/5 p-6 rounded-2xl">
                        <h4 className="font-semibold text-xl mb-4 text-mint">Allergen Information</h4>
                        <div className="space-y-4">
                          <p className="text-sm">
                            <strong>Contains:</strong> Mustard seeds
                          </p>
                          <p className="text-sm">
                            <strong>May contain traces of:</strong> Nuts, sesame seeds
                          </p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            <Badge className="bg-green-100 text-green-800">Gluten-Free</Badge>
                            <Badge className="bg-green-100 text-green-800">Vegan-Friendly</Badge>
                            <Badge className="bg-green-100 text-green-800">No Preservatives</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="nutrition" className="mt-8">
                <Card className="border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Nutritional Information</CardTitle>
                    <p className="text-muted-foreground">Per 100g serving</p>
                  </CardHeader>
                  <CardContent>
                    {product.nutritionalInfo && (
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                          <div key={key} className="text-center p-6 bg-gradient-to-br from-saffron/5 to-golden/5 rounded-2xl">
                            <div className="text-4xl font-bold text-saffron mb-2">
                              {value}{key === 'calories' ? '' : key === 'sodium' ? 'mg' : 'g'}
                            </div>
                            <div className="text-sm text-muted-foreground capitalize">
                              {key === 'carbs' ? 'Carbohydrates' : key}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-8">
                <div className="space-y-8">
                  {reviews.map((review) => (
                    <Card key={review.id} className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-6">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={review.userAvatar} />
                            <AvatarFallback className="text-lg">{review.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-lg">{review.userName}</h4>
                                <div className="flex items-center space-x-4 mt-1">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-5 w-5 ${
                                          i < review.rating
                                            ? 'text-golden fill-current'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  {review.verified && (
                                    <Badge className="bg-green-100 text-green-800 text-xs">
                                      ✓ Verified Purchase
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <span className="text-sm text-muted-foreground">{review.createdAt}</span>
                            </div>
                            <h5 className="font-medium text-lg mb-3">{review.title}</h5>
                            <p className="text-muted-foreground mb-4 leading-relaxed">{review.comment}</p>
                            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                              <button className="hover:text-foreground transition-colors flex items-center space-x-1">
                                <span>👍</span>
                                <span>Helpful ({review.helpful})</span>
                              </button>
                              <button className="hover:text-foreground transition-colors">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <EnhancedAuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
}