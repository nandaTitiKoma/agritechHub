
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
          <h1 className="text-3xl font-bold mb-4">Agricultural Innovation Marketplace</h1>
          <p className="text-muted-foreground max-w-3xl">
            Discover the latest agricultural technologies from innovative startups and research institutions. 
            Browse by category, or use the filters to find exactly what you need.
          </p>
        </div>
        
        <ProductFilters />
        
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Marketplace;
