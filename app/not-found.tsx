import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-cream dark:to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-8xl font-bold text-saffron mb-4">404</div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Sorry, we couldn't find the page you're looking for. 
              Perhaps you'd like to explore our delicious pickle collection instead?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-saffron hover:bg-saffron/90">
              <Link href="/" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/products" className="flex items-center space-x-2">
                <span>Browse Products</span>
              </Link>
            </Button>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            <p>If you believe this is an error, please <Link href="/contact" className="text-saffron hover:underline">contact us</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}