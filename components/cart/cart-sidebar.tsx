'use client';

import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from './cart-context';

export function CartSidebar() {
  const { state, removeItem, updateQuantity, closeCart } = useCart();

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5" />
            <span>Shopping Cart ({state.itemCount})</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Add some delicious pickles to get started!
              </p>
              <Button asChild onClick={closeCart}>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{item.name}</h4>
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
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-semibold text-saffron">
                            ₹{item.price}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm w-8 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 text-red-500 hover:text-red-700"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{state.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (GST 18%)</span>
                    <span>₹{state.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{state.shipping === 0 ? 'Free' : `₹${state.shipping}`}</span>
                  </div>
                  {state.shipping === 0 && state.subtotal > 999 && (
                    <p className="text-xs text-green-600">
                      🎉 You got free shipping!
                    </p>
                  )}
                  {state.shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add ₹{(999 - state.subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{state.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button asChild className="w-full bg-saffron hover:bg-saffron/90">
                    <Link href="/checkout" onClick={closeCart}>
                      Proceed to Checkout
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/cart" onClick={closeCart}>
                      View Full Cart
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}