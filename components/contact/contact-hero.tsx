import { Mail, Phone, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ContactHero() {
  return (
    <section className="py-16 bg-gradient-to-r from-warm-brown to-deep-green text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-golden/20 text-golden border-golden/30">
            <Mail className="w-4 h-4 mr-1" />
            Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            We'd Love to <span className="text-golden">Hear From You</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Have questions about our pickles? Need help with custom orders? 
            Our team is here to help you discover the perfect flavors.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>hello@shahipickle.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Malda, West Bengal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}