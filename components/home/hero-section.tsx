'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, Leaf, Award, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const heroImages = [
  'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

const features = [
  { icon: Leaf, text: '100% Organic', color: 'text-neon-green', bgColor: 'bg-neon-green/10' },
  { icon: Award, text: 'Handmade Quality', color: 'text-golden-yellow', bgColor: 'bg-golden-yellow/10' },
  { icon: Star, text: '4.9/5 Rating', color: 'text-sunset-pink', bgColor: 'bg-sunset-pink/10' },
  { icon: Truck, text: 'Global Shipping', color: 'text-royal-blue', bgColor: 'bg-royal-blue/10' },
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden particle-bg">
      {/* Enhanced background image carousel */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-all duration-2000 ${
              index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={image}
              alt="Shahi Pickle"
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/80 via-deep-navy/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 via-transparent to-deep-navy/30" />
          </div>
        ))}
      </div>

      {/* Animated particles overlay */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20 w-4 h-4 bg-electric-orange rounded-full animate-bounce-gentle opacity-60"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-vibrant-purple rounded-full animate-float-slow opacity-50"></div>
        <div className="absolute bottom-32 left-40 w-5 h-5 bg-neon-green rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-sunset-pink rounded-full animate-bounce opacity-70"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8 animate-slide-up">
            {/* Enhanced Badge */}
            <Badge 
              variant="secondary" 
              className="bg-gradient-electric text-white hover:bg-gradient-fire w-fit backdrop-blur-sm border-0 px-6 py-2 text-sm font-medium animate-glow"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Authentic Pickles from Malda, West Bengal
            </Badge>

            {/* Enhanced Main heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight">
                <span className="neon-text bg-gradient-electric bg-clip-text text-transparent">
                  Shahi
                </span>{' '}
                <span className="neon-text-purple bg-gradient-cosmic bg-clip-text text-transparent">
                  Pickle
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed">
                Experience the <span className="text-electric-orange font-semibold">extraordinary flavors</span> of 
                handcrafted organic pickles made with traditional family recipes. 
                From our kitchen in Malda to your table worldwide.
              </p>
            </div>

            {/* Enhanced Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.text}
                  className={`flex items-center space-x-3 glass-electric rounded-2xl p-4 hover-lift-glow interactive-card ${feature.bgColor} border border-white/20`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  <span className="text-sm font-medium text-white">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Enhanced CTAs */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                asChild
                size="lg"
                className="btn-electric text-xl px-10 py-8 h-auto group relative overflow-hidden"
              >
                <Link href="/products" className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 group-hover:animate-bounce" />
                  <span>Shop Now</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="glass-cosmic border-2 border-vibrant-purple/50 text-white hover:bg-vibrant-purple/20 backdrop-blur-sm text-xl px-10 py-8 h-auto"
              >
                <Link href="/story">Our Story</Link>
              </Button>
            </div>

            {/* Enhanced Trust indicators */}
            <div className="flex items-center space-x-8 pt-6">
              <div className="text-center group">
                <div className="text-3xl font-bold text-electric-orange group-hover:text-sunset-pink transition-colors">5000+</div>
                <div className="text-sm text-gray-300">Happy Customers</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-vibrant-purple group-hover:text-royal-blue transition-colors">50+</div>
                <div className="text-sm text-gray-300">Countries Served</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-neon-green group-hover:text-emerald-teal transition-colors">25+</div>
                <div className="text-sm text-gray-300">Pickle Varieties</div>
              </div>
            </div>
          </div>

          {/* Enhanced Right side content - Product showcase */}
          <div className="relative hidden lg:block animate-scale-in">
            <div className="relative">
              {/* Enhanced Main product image */}
              <div className="relative w-96 h-96 mx-auto">
                <div className="absolute inset-0 bg-gradient-electric rounded-full blur-3xl opacity-30 animate-pulse-glow" />
                <div className="absolute inset-4 bg-gradient-cosmic rounded-full blur-2xl opacity-20 animate-glow" />
                <Image
                  src="https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Premium Pickle Jar"
                  fill
                  className="object-cover rounded-3xl shadow-2xl hover-lift-glow"
                />
              </div>

              {/* Enhanced Floating elements */}
              <div className="absolute -top-6 -left-6 glass-electric rounded-2xl p-4 shadow-2xl animate-bounce-gentle hover-glow-electric">
                <div className="flex items-center space-x-3">
                  <Star className="h-6 w-6 text-sunset-pink fill-current" />
                  <div>
                    <div className="font-bold text-white text-lg">4.9/5</div>
                    <div className="text-xs text-gray-200">Customer Rating</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 glass-cosmic rounded-2xl p-4 shadow-2xl animate-float-slow hover-glow-purple">
                <div className="flex items-center space-x-3">
                  <Leaf className="h-6 w-6 text-neon-green" />
                  <div>
                    <div className="font-bold text-white text-lg">100% Organic</div>
                    <div className="text-xs text-gray-200">Certified Pure</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-12 bg-gradient-fire text-white rounded-2xl p-4 shadow-2xl animate-pulse hover-glow-electric">
                <div className="text-center">
                  <div className="text-2xl font-bold">₹299</div>
                  <div className="text-xs">Fresh Made</div>
                  <Badge className="bg-white/20 text-white text-xs mt-1">Best Seller</Badge>
                </div>
              </div>

              {/* Additional floating badges */}
              <div className="absolute top-1/4 -left-8 bg-gradient-nature text-white rounded-xl p-3 shadow-xl animate-bounce-gentle">
                <Award className="h-5 w-5" />
              </div>

              <div className="absolute bottom-1/4 -right-8 bg-gradient-royal text-white rounded-xl p-3 shadow-xl animate-float-slow">
                <Truck className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-20">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-px h-12 bg-gradient-to-b from-electric-orange to-transparent" />
          <div className="text-sm font-medium bg-gradient-electric bg-clip-text text-transparent">
            Scroll to explore
          </div>
          <div className="w-6 h-6 border-2 border-electric-orange rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-electric-orange rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}