import { HeroSection } from '@/components/home/hero-section';
import { FeaturedProducts } from '@/components/home/featured-products';
import { QualityPromise } from '@/components/home/quality-promise';
import { CustomerTestimonials } from '@/components/home/customer-testimonials';
import { BrandStory } from '@/components/home/brand-story';
import { RecipesPreview } from '@/components/home/recipes-preview';
import { NewsletterSignup } from '@/components/home/newsletter-signup';

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <FeaturedProducts />
      <QualityPromise />
      <BrandStory />
      <CustomerTestimonials />
      <RecipesPreview />
      <NewsletterSignup />
    </div>
  );
}