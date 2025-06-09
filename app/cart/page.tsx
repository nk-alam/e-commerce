'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useCart } from '@/components/cart/cart-context';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any delicious pickles to your cart yet.
            </p>
            <Button asChild size="lg" className="bg-saffron hover:bg-saffron/90">
              <Link href="/products">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{state.itemCount} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            {item.jarType && (
                              <Badge variant="outline\" className="text-xs">
                                {item.jarType}
                              </Badge>
                            )}
                            {item.spiceLevel && (
                              <Badge variant="outline" className="text-xs">
                                {item.spiceLevel}
                              </Badge>
                            )}
                            {item.weight && (
                              <Badge variant="outline" className="text-xs">
                                {item.weight}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-lg font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-saffron">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ₹{item.price} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Cart Actions */}
            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span>₹{state.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (GST 18%)</span>
                    <span>₹{state.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{state.shipping === 0 ? 'Free' : `₹${state.shipping}`}</span>
                  </div>
                  {state.shipping === 0 && state.subtotal > 999 && (
                    <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                      🎉 You got free shipping!
                    </div>
                  )}
                  {state.shipping > 0 && (
                    <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                      Add ₹{(999 - state.subtotal).toFixed(2)} more for free shipping
                    </div>
                  )}
                </div>

                <Separator />

                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Promo Code</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{state.total.toFixed(2)}</span>
                </div>

                <Button asChild size="lg" className="w-full bg-saffron hover:bg-saffron/90">
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <div className="text-center">
                  <Button variant="ghost" size="sm" className="text-saffron">
                    <Heart className="h-4 w-4 mr-1" />
                    Save for Later
                  </Button>
                </div>

                {/* Security badges */}
                <div className="pt-4 border-t">
                  <div className="text-xs text-muted-foreground text-center space-y-1">
                    <div>🔒 Secure checkout with SSL encryption</div>
                    <div>📦 Free returns within 7 days</div>
                    <div>⭐ 4.9/5 customer satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}