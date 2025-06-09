'use client';

import { useState } from 'react';
import { Mail, Gift, Star, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const benefits = [
  {
    icon: Gift,
    title: 'Exclusive Offers',
    description: '10% off your first order + special discounts',
  },
  {
    icon: Star,
    title: 'New Recipe Tips',
    description: 'Weekly pickle recipes and cooking tips',
  },
  {
    icon: Truck,
    title: 'Early Access',
    description: 'Be first to try new products and seasonal specials',
  },
];

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-saffron">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold font-display mb-4">
              Welcome to the Shahi Pickle Family! 🎉
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Thank you for subscribing! Check your inbox for a special welcome offer.
            </p>
            <Badge className="bg-white/20 text-white">
              Your 10% discount code is on its way!
            </Badge>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-saffron relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white mb-12">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            <Mail className="w-4 h-4 mr-1" />
            Join Our Community
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Get Fresh Recipes & <br />Exclusive Offers
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join over 10,000 pickle lovers who receive our weekly newsletter with 
            traditional recipes, cooking tips, and special discounts.
          </p>
        </div>

        {/* Newsletter form */}
        <div className="max-w-md mx-auto mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full bg-white text-orange-600 hover:bg-white/90 font-semibold"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    'Get My 10% Discount'
                  )}
                </Button>
              </form>
              <p className="text-xs text-white/70 text-center mt-3">
                By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={benefit.title}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <benefit.icon className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-white/80">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="flex justify-center items-center space-x-8 mt-12 text-white/80 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-400 rounded-full" />
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-400 rounded-full" />
            <span>Unsubscribe anytime</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-400 rounded-full" />
            <span>10,000+ subscribers</span>
          </div>
        </div>
      </div>
    </section>
  );
}