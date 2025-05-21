
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { ProductFilters } from '@/components/marketplace/ProductFilters';
import { mockProducts } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Marketplace = () => {
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <PageLayout>
      <div className="container py-4 md:py-8">
        <div className="mb-4 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Pasar Inovasi Pertanian</h1>
          <p className="text-muted-foreground max-w-3xl">
            Temukan teknologi pertanian terbaru dari startup inovatif dan lembaga penelitian. 
            Telusuri berdasarkan kategori, atau gunakan filter untuk menemukan apa yang Anda butuhkan.
          </p>
        </div>
        
        {isMobile && (
          <div className="mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter Produk</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filter Produk</SheetTitle>
                </SheetHeader>
                <div className="mt-6 h-[calc(100vh-10rem)] overflow-y-auto pr-1">
                  <ProductFilters onFilterChange={products => setFilteredProducts(products)} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
                  <SheetClose asChild>
                    <Button variant="default" className="w-full">
                      Lihat {filteredProducts.length} Hasil
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {!isMobile && (
            <div className="lg:sticky lg:top-20 lg:self-start hidden lg:block">
              <ProductFilters onFilterChange={products => setFilteredProducts(products)} />
            </div>
          )}
          
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-lg border border-border">
                <h2 className="text-lg font-medium mb-2">Tidak ada produk ditemukan</h2>
                <p className="text-muted-foreground mb-4">Coba ubah filter atau pencarian Anda</p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilteredProducts(mockProducts)}
                >
                  Reset Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Marketplace;
