import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const storyHighlights = [
  {
    icon: Calendar,
    title: 'Est. 1985',
    description: 'Four generations of pickle-making expertise',
  },
  {
    icon: MapPin,
    title: 'Malda Origin',
    description: 'Sourced from the fertile lands of West Bengal',
  },
  {
    icon: Users,
    title: '50+ Families',
    description: 'Supporting local farmers and artisans',
  },
];

export function BrandStory() {
  return (
    <section className="py-20 bg-gradient-to-r from-warm-brown to-deep-green text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                Our Story Began in <span className="text-golden">Malda</span>
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed mb-6">
                Four generations ago, in the heart of Malda, West Bengal, our great-grandmother 
                began crafting pickles using secret family recipes passed down through time. 
                What started as a kitchen tradition has now become a global celebration of 
                authentic Indian flavors.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Today, we honor that legacy by using the same traditional methods, 
                premium organic ingredients, and the love that goes into every jar. 
                Each pickle tells a story of heritage, quality, and the rich culinary 
                traditions of Bengal.
              </p>
            </div>

            {/* Story highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {storyHighlights.map((highlight, index) => (
                <Card
                  key={highlight.title}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
                >
                  <CardContent className="p-6 text-center">
                    <highlight.icon className="h-8 w-8 text-golden mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-2">{highlight.title}</h3>
                    <p className="text-sm text-gray-300">{highlight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-golden hover:bg-golden/90 text-black"
              >
                <Link href="/story" className="flex items-center space-x-2">
                  <span>Read Our Full Story</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/sustainability">Our Values</Link>
              </Button>
            </div>
          </div>

          {/* Images */}
          <div className="relative animate-scale-in">
            <div className="grid grid-cols-2 gap-4">
              {/* Main image */}
              <div className="col-span-2">
                <Image
                  src="https://images.pexels.com/photos/5490965/pexels-photo-5490965.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Traditional pickle making process"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl object-cover w-full h-64"
                />
              </div>
              
              {/* Secondary images */}
              <Image
                src="https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Fresh ingredients"
                width={300}
                height={200}
                className="rounded-lg shadow-xl object-cover w-full h-32"
              />
              <Image
                src="https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Finished pickle products"
                width={300}
                height={200}
                className="rounded-lg shadow-xl object-cover w-full h-32"
              />
            </div>

            {/* Floating testimonial */}
            <div className="absolute -bottom-8 -left-8 bg-white text-black p-6 rounded-lg shadow-2xl max-w-xs">
              <p className="text-sm italic mb-3">
                "The taste reminds me of my grandmother's pickles. Pure authenticity!"
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center text-white text-xs">
                  R
                </div>
                <div>
                  <div className="font-semibold text-sm">Rajesh Kumar</div>
                  <div className="text-xs text-gray-600">Verified Customer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}