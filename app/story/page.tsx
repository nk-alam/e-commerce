import { Metadata } from 'next';
import Image from 'next/image';
import { MapPin, Calendar, Users, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Our Story | Shahi Pickle',
  description: 'Learn about the heritage and tradition behind Shahi Pickle. Four generations of authentic pickle making from Malda, West Bengal.',
};

const milestones = [
  {
    year: '1985',
    title: 'The Beginning',
    description: 'Great-grandmother started making pickles in her kitchen in Malda',
    icon: Calendar,
  },
  {
    year: '1995',
    title: 'Local Recognition',
    description: 'Became the most sought-after pickles in the neighborhood',
    icon: Award,
  },
  {
    year: '2010',
    title: 'Organic Certification',
    description: 'Obtained organic certification and expanded to nearby districts',
    icon: Badge,
  },
  {
    year: '2024',
    title: 'Global Reach',
    description: 'Now serving pickle lovers in 50+ countries worldwide',
    icon: MapPin,
  },
];

export default function StoryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-warm-brown to-deep-green text-white">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-golden/20 text-golden border-golden/30">
              <Calendar className="w-4 h-4 mr-1" />
              Est. 1985
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              Four Generations of <span className="text-golden">Authentic Flavors</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              From a small kitchen in Malda to tables around the world, our story is one of 
              tradition, quality, and the unwavering commitment to authentic Indian flavors.
            </p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                It All Started in <span className="text-saffron">Malda</span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  In 1985, in the heart of Malda, West Bengal, our great-grandmother began what 
                  would become a family legacy. Using recipes passed down through generations, 
                  she crafted pickles that captured the essence of Bengali culinary tradition.
                </p>
                <p>
                  What started as a way to preserve seasonal vegetables for her family soon 
                  became the talk of the neighborhood. Word spread about the exceptional taste 
                  and quality of her pickles, made with love and the finest local ingredients.
                </p>
                <p>
                  Today, we continue this tradition with the same dedication to quality, 
                  authenticity, and the time-honored methods that made our pickles special 
                  from the very beginning.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/5490965/pexels-photo-5490965.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Traditional pickle making"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
              Our <span className="text-saffron">Journey</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((milestone, index) => (
                <Card key={milestone.year} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <milestone.icon className="w-8 h-8 text-saffron" />
                    </div>
                    <div className="text-2xl font-bold text-saffron mb-2">{milestone.year}</div>
                    <h3 className="font-semibold text-lg mb-3">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="bg-cream dark:bg-card rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
              Our <span className="text-saffron">Values</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="font-semibold text-lg mb-3">100% Organic</h3>
                <p className="text-muted-foreground">
                  We use only certified organic ingredients, supporting sustainable farming practices.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="font-semibold text-lg mb-3">Community First</h3>
                <p className="text-muted-foreground">
                  We support local farmers and artisans, creating sustainable livelihoods.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="font-semibold text-lg mb-3">Made with Love</h3>
                <p className="text-muted-foreground">
                  Every jar is crafted with care, carrying forward our family's passion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}