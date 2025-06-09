'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    rating: 5,
    review: 'Absolutely authentic taste! These pickles remind me of my grandmother\'s homemade ones. The mango pickle is especially divine - perfect balance of sweet, sour, and spicy.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    verified: true,
    productPurchased: 'Premium Mango Pickle',
  },
  {
    id: 2,
    name: 'David Johnson',
    location: 'London, UK',
    rating: 5,
    review: 'I ordered the mixed vegetable pickle and was blown away by the quality. Fast international shipping and the jar arrived perfectly packaged. Will definitely order again!',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    verified: true,
    productPurchased: 'Mixed Vegetable Pickle',
  },
  {
    id: 3,
    name: 'Fatima Al-Rashid',
    location: 'Dubai, UAE',
    rating: 5,
    review: 'The garlic ginger pickle has become a staple in our household. My whole family loves it, and the health benefits are a bonus. Excellent quality and taste!',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    verified: true,
    productPurchased: 'Garlic Ginger Pickle',
  },
  {
    id: 4,
    name: 'Rajesh Patel',
    location: 'New Jersey, USA',
    rating: 5,
    review: 'Being away from India, finding authentic pickles was challenging until I discovered Shahi Pickle. The taste is exactly like what my mother used to make. Highly recommended!',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
    verified: true,
    productPurchased: 'Traditional Lime Pickle',
  },
  {
    id: 5,
    name: 'Lisa Chen',
    location: 'Singapore',
    rating: 5,
    review: 'I\'m not typically a fan of spicy food, but the mild mango pickle converted me. The flavors are complex and well-balanced. Great for introducing friends to Indian cuisine!',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100',
    verified: true,
    productPurchased: 'Mild Mango Pickle',
  },
  {
    id: 6,
    name: 'Ahmed Hassan',
    location: 'Cairo, Egypt',
    rating: 5,
    review: 'The custom pickle option is fantastic! I was able to specify my spice preferences and the result exceeded my expectations. True artisanal quality.',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
    verified: true,
    productPurchased: 'Custom Spice Blend Pickle',
  },
];

export function CustomerTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-cream dark:to-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 animate-slide-up">
          <Badge variant="secondary" className="mb-4 bg-saffron/10 text-saffron border-saffron/20">
            <Star className="w-4 h-4 mr-1 fill-current" />
            Customer Reviews
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            What Our <span className="text-saffron">Customers Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made Shahi Pickle 
            a part of their culinary journey.
          </p>
        </div>

        {/* Main testimonial carousel */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <Card className="border-0 shadow-2xl overflow-hidden bg-white dark:bg-card">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Customer avatar and info */}
                <div className="text-center md:text-left">
                  <div className="relative inline-block mb-4">
                    <Image
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      width={120}
                      height={120}
                      className="rounded-full object-cover w-24 h-24 md:w-32 md:h-32 mx-auto"
                    />
                    {testimonials[currentIndex].verified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1">
                        <svg className="w-4 h-4\" fill="currentColor\" viewBox="0 0 20 20">
                          <path fillRule="evenodd\" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z\" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg">{testimonials[currentIndex].name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{testimonials[currentIndex].location}</p>
                  <Badge variant="outline" className="text-xs">
                    {testimonials[currentIndex].productPurchased}
                  </Badge>
                </div>

                {/* Testimonial content */}
                <div className="md:col-span-2">
                  <Quote className="text-saffron w-8 h-8 mb-4" />
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonials[currentIndex].rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed text-foreground mb-4">
                    {testimonials[currentIndex].review}
                  </p>
                  {testimonials[currentIndex].verified && (
                    <Badge variant="secondary" className="bg-green-50 text-green-700 dark:bg-green-900/20">
                      ✓ Verified Purchase
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={nextTestimonial}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-saffron scale-110' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => goToTestimonial(index)}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-saffron mb-2">5000+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-saffron mb-2">4.9/5</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-saffron mb-2">50+</div>
            <div className="text-muted-foreground">Countries Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-saffron mb-2">98%</div>
            <div className="text-muted-foreground">Repeat Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
}