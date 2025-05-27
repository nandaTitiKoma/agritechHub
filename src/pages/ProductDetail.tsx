
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductViewer } from '@/components/product/ProductViewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, ShoppingCart, Star, Check, Truck, ArrowLeft } from 'lucide-react';
import { Product, ProductCard } from '@/components/marketplace/ProductCard';
import { getProductById, mockProducts } from '@/services/mockData';
import { toast } from 'sonner';
import { formatRupiah } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Find related products in the same category
        const related = mockProducts
          .filter(p => p.category === foundProduct.category && p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);
  
  const handleAddToCart = () => {
    toast.success(`Berhasil menambahkan ${quantity} x ${product?.title} ke keranjang Anda.`);
  };
  
  if (!product) {
    return (
      <PageLayout>
        <div className="container py-8 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Produk Tidak Ditemukan</h2>
            <p className="text-muted-foreground mb-6">
              Produk yang Anda cari tidak ada atau telah dihapus.
            </p>
            <Link to="/marketplace">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Pasar
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container py-4 md:py-8 px-4 sm:px-6 md:px-8">
        <div className="mb-4 md:mb-6">
          <Link 
            to="/marketplace" 
            className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="text-sm md:text-base">Kembali ke Pasar</span>
          </Link>
        </div>
        
        {/* Product main section - Responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          {/* Product Image/3D Viewer */}
          <div className="w-full">
            <ProductViewer 
              imageUrl={product.image} 
              has3DModel={product.is3D || false}
            />
          </div>
          
          {/* Product Details */}
          <div className="mt-4 md:mt-0">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-3 w-3 md:h-4 md:w-4 text-amber-500" 
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} ulasan)
                </span>
              </div>
              
              <div className="text-xl md:text-2xl font-bold">{formatRupiah(product.price * 15000)}</div>
              
              <p className="text-sm md:text-base text-muted-foreground">
                Teknologi pertanian canggih ini membantu petani mengoptimalkan operasi mereka, mengurangi pemborosan, dan meningkatkan hasil panen. 
                Dirancang dengan mengutamakan keberlanjutan, teknologi ini terintegrasi dengan mudah ke sistem pertanian yang sudah ada.
              </p>
              
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <Check className="h-3 w-3 md:h-4 md:w-4 text-eco-600 flex-shrink-0" />
                  <span>Gratis ongkir untuk pembelian di atas Rp 7.500.000</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <Check className="h-3 w-3 md:h-4 md:w-4 text-eco-600 flex-shrink-0" />
                  <span>Garansi 2 tahun termasuk</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <Check className="h-3 w-3 md:h-4 md:w-4 text-eco-600 flex-shrink-0" />
                  <span>Dukungan teknis dari spesialis produk</span>
                </div>
                {product.hasIoT && (
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <Check className="h-3 w-3 md:h-4 md:w-4 text-eco-600 flex-shrink-0" />
                    <span>Siap integrasi dashboard IoT</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-3 md:pt-4">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <div className="h-8 px-3 md:px-4 flex items-center justify-center border-y">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-l-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                
                <div className="flex-1 min-w-[140px]">
                  <Button className="w-full gap-2" onClick={handleAddToCart}>
                    <ShoppingCart className="h-4 w-4" />
                    Tambah ke Keranjang
                  </Button>
                </div>
                
                <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10">
                  <Heart className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="sr-only">Tambah ke wishlist</span>
                </Button>
              </div>
              
              <div className="bg-muted rounded-lg p-3 md:p-4 flex items-center gap-2 md:gap-3">
                <Truck className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground flex-shrink-0" />
                <div className="text-xs md:text-sm">
                  <span className="font-medium">Estimasi pengiriman:</span> 3-5 hari kerja
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs - Responsive design */}
        <Tabs defaultValue="details" className="mb-8 md:mb-12">
          <div className="overflow-x-auto pb-2">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Detail Produk</TabsTrigger>
              <TabsTrigger value="specs">Spesifikasi</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="support">Dukungan</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="details" className="space-y-4">
            <h3 className="text-lg md:text-xl font-semibold">Deskripsi Produk</h3>
            <p className="text-sm md:text-base">
              Teknologi pertanian inovatif ini dirancang untuk membantu petani mengoptimalkan operasi mereka, 
              mengurangi pemborosan, dan meningkatkan hasil panen. Teknologi ini menggabungkan kemajuan terbaru 
              dalam teknologi sensor, analisis data, dan praktik pertanian berkelanjutan.
            </p>
            <p className="text-sm md:text-base">
              Sistem ini mudah dipasang dan dikonfigurasi, dengan keahlian teknis minimal yang diperlukan. 
              Setelah dipasang, sistem ini terus memantau kondisi dan memberikan wawasan yang dapat ditindaklanjuti 
              melalui dashboard terintegrasi.
            </p>
            
            <h3 className="text-lg md:text-xl font-semibold mt-6">Fitur Utama</h3>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2 text-sm md:text-base">
              <li>Pemantauan real-time dan pengumpulan data</li>
              <li>Kemampuan analitik dan pelaporan tingkat lanjut</li>
              <li>Peringatan dan notifikasi otomatis</li>
              <li>Integrasi mudah dengan sistem pertanian yang ada</li>
              <li>Konstruksi tahan cuaca dan tahan lama</li>
              <li>Konsumsi daya rendah dan daya tahan baterai yang lama</li>
              {product.hasIoT && <li>Dashboard IoT berbasis cloud termasuk</li>}
              {product.is3D && <li>Komponen yang diprekayasa dengan presisi untuk keandalan</li>}
            </ul>
            
            <h3 className="text-lg md:text-xl font-semibold mt-6">Dalam Kemasan</h3>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2 text-sm md:text-base">
              <li>Unit utama</li>
              <li>Adaptor daya dan kabel</li>
              <li>Perangkat keras instalasi</li>
              <li>Panduan mulai cepat</li>
              <li>Manual pengguna</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="specs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <Card>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-4">Spesifikasi Teknis</h3>
                  <div className="space-y-2 md:space-y-3 text-sm md:text-base">
                    <div className="grid grid-cols-2 gap-1 md:gap-2">
                      <span className="text-muted-foreground">Dimensi:</span>
                      <span>12 x 8 x 3 cm</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1 md:gap-2">
                      <span className="text-muted-foreground">Berat:</span>
                      <span>350g</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1 md:gap-2">
                      <span className="text-muted-foreground">Sumber Daya:</span>
                      <span>Baterai Li-ion / Solar</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1 md:gap-2">
                      <span className="text-muted-foreground">Daya Tahan Baterai:</span>
                      <span>Hingga 6 bulan</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1 md:gap-2">
                      <span className="text-muted-foreground">Tahan Air:</span>
                      <span>Berperingkat IP67</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1 md:gap-2">
                      <span className="text-muted-foreground">Suhu Operasi:</span>
                      <span>-20°C hingga 60°C</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-4">Konektivitas</h3>
                  <div className="space-y-2 md:space-y-3 text-sm md:text-base">
                    <div className="grid grid-cols-2 gap-1 md:gap-2">
                      <span className="text-muted-foreground">Nirkabel:</span>
                      <span>LoRaWAN, Wi-Fi, Bluetooth</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1 md:gap-2">
                      <span className="text-muted-foreground">Jangkauan:</span>
                      <span>Hingga 10km (LoRaWAN)</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1 md:gap-2">
                      <span className="text-muted-foreground">Penyimpanan Data:</span>
                      <span>8GB + Penyimpanan cloud</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1 md:gap-2">
                      <span className="text-muted-foreground">API:</span>
                      <span>RESTful API, WebSockets</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1 md:gap-2">
                      <span className="text-muted-foreground">Sistem Kompatibel:</span>
                      <span>iOS, Android, Web</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Ulasan Pelanggan</h3>
            <div className="space-y-4 md:space-y-6">
              {[1, 2, 3].map((index) => (
                <div key={index} className="border-b pb-4 md:pb-6">
                  <div className="flex flex-wrap md:flex-nowrap justify-between items-start mb-2 gap-2">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Avatar className="h-8 w-8 md:h-10 md:w-10">
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 10}`} />
                        <AvatarFallback>PG</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm md:text-base">Pengguna {index}</div>
                        <div className="text-xs md:text-sm text-muted-foreground">2 bulan yang lalu</div>
                      </div>
                    </div>
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-3 w-3 md:h-4 md:w-4 text-amber-500" 
                          fill={i < 5 - index % 2 ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm">
                    Produk ini sangat meningkatkan operasi pertanian saya. Instalasinya mudah,
                    dan data yang diberikan membantu saya membuat keputusan yang lebih baik tentang irigasi dan alokasi sumber daya.
                    Daya tahan baterainya sangat baik, dan tim dukungan pelanggan sangat membantu dengan pertanyaan saya.
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="support">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Dokumentasi</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline text-sm md:text-base">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      Manual Pengguna (PDF)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline text-sm md:text-base">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      Panduan Mulai Cepat (PDF)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline text-sm md:text-base">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      Petunjuk Instalasi (PDF)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline text-sm md:text-base">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                      Panduan Pemecahan Masalah
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Dukungan Pelanggan</h3>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-sm md:text-base">
                    Tim dukungan khusus kami siap membantu Anda dengan pertanyaan atau masalah yang mungkin Anda hadapi.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm md:text-base">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      <span>Telepon: +62 (21) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm md:text-base">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      <span>Email: dukungan@agritechhub.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm md:text-base">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      <span>Jam Kerja: Senin-Jumat, 08:00-18:00 WIB</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 md:pt-4">
                    <Button>Hubungi Dukungan</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Related Products - Responsive grid */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Produk Terkait</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetail;
