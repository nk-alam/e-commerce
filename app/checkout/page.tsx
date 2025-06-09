'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CreditCard, Truck, MapPin, Phone, Mail, Plus, Check, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/components/cart/cart-context';
import { useAuth } from '@/components/auth/auth-context';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const { state: cartState, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses?.[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderNotes, setOrderNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty or user not authenticated
  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  if (cartState.items.length === 0) {
    router.push('/cart');
    return null;
  }

  const selectedAddressData = user?.addresses?.find(addr => addr.id === selectedAddress);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear cart and redirect to success page
      clearCart();
      toast.success('Order placed successfully!');
      router.push('/order-success');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-b from-cream/30 to-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-display text-saffron mb-4">Secure Checkout</h1>
          <div className="flex items-center space-x-6 text-sm">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-saffron' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-saffron text-white' : 'bg-muted'}`}>
                {step > 1 ? <Check className="h-4 w-4" /> : '1'}
              </div>
              <span className="font-medium">Shipping</span>
            </div>
            <div className="w-12 h-px bg-muted" />
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-saffron' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-saffron text-white' : 'bg-muted'}`}>
                {step > 2 ? <Check className="h-4 w-4" /> : '2'}
              </div>
              <span className="font-medium">Payment</span>
            </div>
            <div className="w-12 h-px bg-muted" />
            <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-saffron' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-saffron text-white' : 'bg-muted'}`}>
                3
              </div>
              <span className="font-medium">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <Card className="border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-saffron/5 to-golden/5">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Truck className="h-6 w-6 text-saffron" />
                    <span>Shipping Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  {user?.addresses && user.addresses.length > 0 ? (
                    <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                      {user.addresses.map((address) => (
                        <div key={address.id} className="flex items-start space-x-4">
                          <RadioGroupItem value={address.id} id={address.id} className="mt-2" />
                          <label htmlFor={address.id} className="flex-1 cursor-pointer">
                            <div className="border-2 rounded-2xl p-6 hover:border-saffron transition-all duration-300 hover:shadow-lg">
                              <div className="flex items-center justify-between mb-4">
                                <Badge variant={address.type === 'home' ? 'default' : 'secondary'} className="text-sm">
                                  {address.type}
                                </Badge>
                                {address.isDefault && (
                                  <Badge variant="outline" className="border-saffron text-saffron">Default</Badge>
                                )}
                              </div>
                              <div className="space-y-2">
                                <div className="font-semibold text-lg">{address.name}</div>
                                <div className="text-muted-foreground">
                                  {address.addressLine1}<br />
                                  {address.addressLine2 && <>{address.addressLine2}<br /></>}
                                  {address.city}, {address.state} {address.postalCode}<br />
                                  {address.country}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <span className="flex items-center space-x-1">
                                    <Phone className="h-3 w-3" />
                                    <span>{address.phone}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className="text-center py-12">
                      <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No addresses found</h3>
                      <p className="text-muted-foreground mb-6">Add a shipping address to continue</p>
                    </div>
                  )}
                  
                  <Button variant="outline" className="w-full border-2 border-dashed border-saffron text-saffron hover:bg-saffron hover:text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Address
                  </Button>
                  
                  <Button 
                    className="w-full bg-gradient-saffron hover:bg-saffron-dark text-white py-6 text-lg rounded-2xl shadow-lg hover:shadow-saffron transition-all duration-300" 
                    onClick={() => setStep(2)}
                    disabled={!selectedAddress}
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <Card className="border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-saffron/5 to-golden/5">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <CreditCard className="h-6 w-6 text-saffron" />
                    <span>Payment Method</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <RadioGroupItem value="card" id="card" className="mt-2" />
                        <label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="border-2 rounded-2xl p-6 hover:border-saffron transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-center space-x-3 mb-3">
                              <CreditCard className="h-6 w-6 text-blue-600" />
                              <span className="font-semibold text-lg">Credit/Debit Card</span>
                              <Badge className="bg-blue-100 text-blue-800">Instant</Badge>
                            </div>
                            <p className="text-muted-foreground">
                              Visa, Mastercard, RuPay, American Express
                            </p>
                            <div className="flex space-x-2 mt-3">
                              <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                              <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                              <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center">RP</div>
                            </div>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <RadioGroupItem value="upi" id="upi" className="mt-2" />
                        <label htmlFor="upi" className="flex-1 cursor-pointer">
                          <div className="border-2 rounded-2xl p-6 hover:border-saffron transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">₹</span>
                              </div>
                              <span className="font-semibold text-lg">UPI</span>
                              <Badge className="bg-green-100 text-green-800">Popular</Badge>
                            </div>
                            <p className="text-muted-foreground">
                              GPay, PhonePe, Paytm, BHIM UPI
                            </p>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <RadioGroupItem value="netbanking" id="netbanking" className="mt-2" />
                        <label htmlFor="netbanking" className="flex-1 cursor-pointer">
                          <div className="border-2 rounded-2xl p-6 hover:border-saffron transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs">🏦</span>
                              </div>
                              <span className="font-semibold text-lg">Net Banking</span>
                            </div>
                            <p className="text-muted-foreground">
                              All major Indian banks supported
                            </p>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <RadioGroupItem value="cod" id="cod" className="mt-2" />
                        <label htmlFor="cod" className="flex-1 cursor-pointer">
                          <div className="border-2 rounded-2xl p-6 hover:border-saffron transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs">💰</span>
                              </div>
                              <span className="font-semibold text-lg">Cash on Delivery</span>
                              <Badge className="bg-orange-100 text-orange-800">₹25 fee</Badge>
                            </div>
                            <p className="text-muted-foreground">
                              Pay when you receive your order
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </RadioGroup>
                  
                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1 py-6 text-lg rounded-2xl">
                      Back to Shipping
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-saffron hover:bg-saffron-dark text-white py-6 text-lg rounded-2xl shadow-lg hover:shadow-saffron transition-all duration-300" 
                      onClick={() => setStep(3)}
                    >
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {step === 3 && (
              <div className="space-y-8">
                <Card className="border-0 shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-saffron/5 to-golden/5">
                    <CardTitle className="text-2xl">Order Review</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    {/* Shipping Address */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-saffron" />
                        <span>Shipping Address</span>
                      </h3>
                      {selectedAddressData && (
                        <div className="bg-gradient-to-r from-mint/5 to-deep-green/5 p-6 rounded-2xl border border-mint/20">
                          <div className="font-semibold text-lg">{selectedAddressData.name}</div>
                          <div className="text-muted-foreground mt-2">
                            {selectedAddressData.addressLine1}<br />
                            {selectedAddressData.addressLine2 && <>{selectedAddressData.addressLine2}<br /></>}
                            {selectedAddressData.city}, {selectedAddressData.state} {selectedAddressData.postalCode}<br />
                            {selectedAddressData.country}<br />
                            <span className="flex items-center space-x-1 mt-2">
                              <Phone className="h-3 w-3" />
                              <span>{selectedAddressData.phone}</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-saffron" />
                        <span>Payment Method</span>
                      </h3>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
                        <div className="font-semibold capitalize">
                          {paymentMethod === 'card' && '💳 Credit/Debit Card'}
                          {paymentMethod === 'upi' && '📱 UPI Payment'}
                          {paymentMethod === 'netbanking' && '🏦 Net Banking'}
                          {paymentMethod === 'cod' && '💰 Cash on Delivery'}
                        </div>
                      </div>
                    </div>

                    {/* Order Notes */}
                    <div>
                      <Label htmlFor="notes" className="text-lg font-semibold">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special instructions for your order..."
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        className="mt-3 min-h-[100px] rounded-xl"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1 py-6 text-lg rounded-2xl">
                        Back to Payment
                      </Button>
                      <Button 
                        className="flex-1 bg-gradient-saffron hover:bg-saffron-dark text-white py-6 text-lg rounded-2xl shadow-lg hover:shadow-saffron transition-all duration-300 relative overflow-hidden" 
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Zap className="h-5 w-5" />
                            <span>Place Order - ₹{cartState.total.toFixed(2)}</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Enhanced Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-0 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-saffron/5 to-golden/5">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Order Items */}
                <div className="space-y-4">
                  {cartState.items.map((item) => (
                    <div key={item.id} className="flex space-x-4 p-4 bg-gradient-to-r from-cream/30 to-white rounded-xl">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.name}</h4>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                          {item.jarType && <Badge variant="outline" className="text-xs">{item.jarType}</Badge>}
                          {item.spiceLevel && <Badge variant="outline" className="text-xs">{item.spiceLevel}</Badge>}
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                          <span className="font-semibold text-saffron">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal ({cartState.itemCount} items)</span>
                    <span>₹{cartState.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (GST 18%)</span>
                    <span>₹{cartState.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{cartState.shipping === 0 ? 'Free' : `₹${cartState.shipping}`}</span>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="flex justify-between text-orange-600">
                      <span>COD Charges</span>
                      <span>₹25</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-saffron">₹{(cartState.total + (paymentMethod === 'cod' ? 25 : 0)).toFixed(2)}</span>
                </div>

                {/* Estimated Delivery */}
                <div className="bg-gradient-to-r from-green-50 to-mint/10 dark:from-green-950/20 dark:to-mint/5 p-4 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
                    <Truck className="h-4 w-4" />
                    <span className="font-medium">Estimated Delivery</span>
                  </div>
                  <p className="text-green-600 dark:text-green-300 mt-1">
                    3-5 business days
                  </p>
                </div>

                {/* Security Info */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400 mb-2">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Secure Checkout</span>
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-300 space-y-1">
                    <div>🔒 Secure payment processing</div>
                    <div>📦 Free returns within 7 days</div>
                    <div>💯 100% satisfaction guarantee</div>
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