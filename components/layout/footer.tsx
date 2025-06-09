import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  'Quick Links': [
    { name: 'All Products', href: '/products' },
    { name: 'Custom Orders', href: '/products/custom' },
    { name: 'Track Order', href: '/track' },
    { name: 'Bulk Orders', href: '/bulk' },
  ],
  'Customer Care': [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Return Policy', href: '/returns' },
  ],
  'About': [
    { name: 'Our Story', href: '/story' },
    { name: 'Quality Promise', href: '/quality' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Careers', href: '/careers' },
  ],
  'Legal': [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refunds' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-warm-brown text-white">
      {/* Newsletter section */}
      <div className="bg-gradient-saffron py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold font-display mb-4">
              Get Fresh Recipes & Exclusive Offers
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for traditional pickle recipes, cooking tips, 
              and special discounts on our handmade organic pickles.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm"
              />
              <Button variant="secondary" className="bg-white text-orange-600 hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-saffron rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl font-display">S</span>
              </div>
              <div>
                <div className="font-display font-bold text-xl">Shahi Pickle</div>
                <div className="text-golden text-sm">Authentic • Organic • Handmade</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Crafting premium organic pickles with traditional recipes from Malda, West Bengal. 
              Each jar is made fresh to order with love and authentic spices.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-golden flex-shrink-0" />
                <span>Malda, West Bengal, India</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-golden flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-golden flex-shrink-0" />
                <span>hello@shahipickle.com</span>
              </div>
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-golden mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-300 text-sm">
            © 2024 Shahi Pickle. All rights reserved. Made with ❤️ in West Bengal.
          </div>
          
          {/* Social links */}
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-gray-300 hover:text-golden transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-golden transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-golden transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-golden transition-colors">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
          
          {/* Payment methods */}
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <span>We Accept:</span>
            <div className="flex space-x-1">
              <div className="bg-white/10 px-2 py-1 rounded text-xs">Visa</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">UPI</div>
              <div className="bg-white/10 px-2 py-1 rounded text-xs">GPay</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality badges */}
      <div className="bg-warm-brown/50 py-6 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-xs text-gray-300">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>100% Organic Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🚚</span>
              </div>
              <span>Free Worldwide Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⭐</span>
              </div>
              <span>4.9/5 Customer Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🔒</span>
              </div>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}