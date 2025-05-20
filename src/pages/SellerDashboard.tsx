
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, X, Package, ShoppingCart, BarChart, Settings } from 'lucide-react';
import { ProductForm } from '@/components/seller/ProductForm';
import { ProductList } from '@/components/seller/ProductList';
import { SalesSummary } from '@/components/seller/SalesSummary';
import { OrdersList } from '@/components/seller/OrdersList';
import { StoreSettings } from '@/components/seller/StoreSettings';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Dasbor Penjual</h1>
            {activeTab === 'products' && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="gap-2">
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
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="products" className="flex items-center gap-2 justify-center">
                    <Package size={16} />
                    <span>Produk</span>
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="flex items-center gap-2 justify-center">
                    <ShoppingCart size={16} />
                    <span>Pesanan</span>
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2 justify-center">
                    <BarChart size={16} />
                    <span>Analitik</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2 justify-center">
                    <Settings size={16} />
                    <span>Pengaturan</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="products" className="space-y-4">
                <ProductList />
              </TabsContent>
              <TabsContent value="orders" className="space-y-4">
                <OrdersList />
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <div className="text-center p-8">
                  <h3 className="text-xl font-medium mb-2">Analitik Toko</h3>
                  <p className="text-muted-foreground">
                    Fitur analitik toko sedang dalam pengembangan. Segera hadir!
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <StoreSettings />
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default SellerDashboard;
