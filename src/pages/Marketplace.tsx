
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { ProductFilters } from '@/components/marketplace/ProductFilters';
import { mockProducts } from '@/services/mockData';

const Marketplace = () => {
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  
  return (
    <PageLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Pasar Inovasi Pertanian</h1>
          <p className="text-muted-foreground max-w-3xl">
            Temukan teknologi pertanian terbaru dari startup inovatif dan lembaga penelitian. 
            Telusuri berdasarkan kategori, atau gunakan filter untuk menemukan apa yang Anda butuhkan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <div className="lg:sticky lg:top-20 lg:self-start">
            <ProductFilters onFilterChange={products => setFilteredProducts(products)} />
          </div>
          
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Marketplace;
