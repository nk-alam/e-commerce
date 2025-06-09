import Link from 'next/link';
import { CheckCircle, Package, Truck, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function OrderSuccessPage() {
  const orderId = 'SP' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold font-display mb-4">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for choosing Shahi Pickle. Your order has been confirmed and will be prepared fresh for you.
          </p>

          {/* Order Details Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Order Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order ID:</span>
                <Badge variant="outline" className="font-mono">
                  {orderId}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Delivery:</span>
                <span className="text-green-600 font-medium">{estimatedDelivery}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                <Badge className="bg-green-600">Confirmed</Badge>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-saffron/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-saffron" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Order Confirmation</h3>
                    <p className="text-sm text-muted-foreground">
                      You'll receive an email confirmation with your order details shortly.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-saffron/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="h-4 w-4 text-saffron" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Fresh Preparation</h3>
                    <p className="text-sm text-muted-foreground">
                      Your pickles will be prepared fresh using traditional methods and premium ingredients.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-saffron/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="h-4 w-4 text-saffron" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Shipping & Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      Your order will be carefully packed and shipped with tracking information.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-saffron hover:bg-saffron/90">
                <Link href="/account/orders">
                  Track Your Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
            
            <Button asChild variant="ghost">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-cream dark:bg-card rounded-lg">
            <h3 className="font-semibold mb-3">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions about your order, our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button asChild variant="outline" size="sm">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/faq">View FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}