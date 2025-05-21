
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Plus, Package, ShoppingCart, BarChart, Settings } from 'lucide-react';
import { ProductForm } from '@/components/seller/ProductForm';
import { ProductList } from '@/components/seller/ProductList';
import { SalesSummary } from '@/components/seller/SalesSummary';
import { OrdersList } from '@/components/seller/OrdersList';
import { StoreSettings } from '@/components/seller/StoreSettings';
import { useIsMobile } from '@/hooks/use-mobile';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const isMobile = useIsMobile();

  return (
    <PageLayout>
      <div className="container py-4 md:py-8">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Dasbor Penjual</h1>
            {activeTab === 'products' && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="gap-2 w-full sm:w-auto">
                    <Plus size={18} />
                    <span>Tambah Produk Baru</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Tambah Produk Baru</SheetTitle>
                    <SheetDescription>
                      Isi data produk baru yang ingin ditambahkan ke toko Anda.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <ProductForm />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Toko</CardTitle>
              <CardDescription>
                Informasi penjualan dan aktivitas toko Anda bulan ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SalesSummary />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
                  <TabsTrigger value="products" className="flex items-center gap-2 justify-center">
                    <Package size={16} />
                    <span className={isMobile ? "hidden" : "inline"}>Produk</span>
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="flex items-center gap-2 justify-center">
                    <ShoppingCart size={16} />
                    <span className={isMobile ? "hidden" : "inline"}>Pesanan</span>
                  </TabsTrigger>
                  {isMobile && (
                    <TabsTrigger value="analytics" className="flex items-center gap-2 justify-center col-span-2">
                      <BarChart size={16} />
                      <span>Lebih Banyak</span>
                    </TabsTrigger>
                  )}
                  {!isMobile && (
                    <>
                      <TabsTrigger value="analytics" className="flex items-center gap-2 justify-center">
                        <BarChart size={16} />
                        <span>Analitik</span>
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="flex items-center gap-2 justify-center">
                        <Settings size={16} />
                        <span>Pengaturan</span>
                      </TabsTrigger>
                    </>
                  )}
                </TabsList>
                
                <TabsContent value="products" className="space-y-4 mt-4">
                  <ProductList />
                </TabsContent>
                <TabsContent value="orders" className="space-y-4 mt-4">
                  <OrdersList />
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4 mt-4">
                  {isMobile ? (
                    <div className="grid grid-cols-1 gap-4">
                      <Button variant="outline" className="p-4 h-auto flex flex-col items-center gap-2" onClick={() => setActiveTab('analytics')}>
                        <BarChart size={24} />
                        <span>Analitik</span>
                      </Button>
                      <Button variant="outline" className="p-4 h-auto flex flex-col items-center gap-2" onClick={() => setActiveTab('settings')}>
                        <Settings size={24} />
                        <span>Pengaturan</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <h3 className="text-xl font-medium mb-2">Analitik Toko</h3>
                      <p className="text-muted-foreground">
                        Fitur analitik toko sedang dalam pengembangan. Segera hadir!
                      </p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="settings" className="space-y-4 mt-4">
                  <StoreSettings />
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default SellerDashboard;
