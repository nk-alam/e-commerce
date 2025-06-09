import { Metadata } from 'next';
import { ProductsGrid } from '@/components/products/products-grid';
import { ProductFilters } from '@/components/products/product-filters';
import { ProductHero } from '@/components/products/product-hero';

export const metadata: Metadata = {
  title: 'Premium Organic Pickles | Shahi Pickle',
  description: 'Discover our complete collection of handmade organic pickles from Malda, West Bengal. Traditional recipes, premium quality ingredients.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <ProductHero />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters />
          </aside>
          <main className="lg:col-span-3">
            <ProductsGrid />
          </main>
        </div>
      </div>
    </div>
  );
}