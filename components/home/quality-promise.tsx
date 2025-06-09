import { Leaf, Award, Truck, Shield, Clock, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const promises = [
  {
    icon: Leaf,
    title: '100% Organic',
    description: 'Certified organic ingredients sourced directly from local farmers',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
  },
  {
    icon: Award,
    title: 'Handmade Quality',
    description: 'Traditional recipes crafted by experienced artisans',
    color: 'text-golden',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
  },
  {
    icon: Clock,
    title: 'Fresh Made',
    description: 'Every jar is prepared fresh to order for maximum flavor',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Rigorous quality checks and food safety standards',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
  },
  {
    icon: Truck,
    title: 'Global Shipping',
    description: 'Safe delivery to 50+ countries with proper packaging',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every jar carries the passion of traditional pickle making',
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
  },
];

export function QualityPromise() {
  return (
    <section className="py-20 bg-gradient-to-b from-cream to-background dark:from-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Our <span className="text-saffron">Quality Promise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are committed to delivering the finest organic pickles that honor 
            traditional recipes while meeting modern quality standards.
          </p>
        </div>

        {/* Promises grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promises.map((promise, index) => (
            <Card
              key={promise.title}
              className="group border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-scale-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${promise.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <promise.icon className={`h-8 w-8 ${promise.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-saffron transition-colors">
                  {promise.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {promise.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quality certifications */}
        <div className="mt-16 bg-white dark:bg-card rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Certifications & Standards</h3>
            <p className="text-muted-foreground">
              Our products meet the highest international quality and safety standards
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            {[
              { name: 'Organic Certified', logo: '🌱' },
              { name: 'FSSAI Approved', logo: '✅' },
              { name: 'ISO 22000', logo: '🏆' },
              { name: 'Export Quality', logo: '🌍' },
            ].map((cert) => (
              <div key={cert.name} className="text-center">
                <div className="text-4xl mb-2">{cert.logo}</div>
                <div className="text-sm font-medium">{cert.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}