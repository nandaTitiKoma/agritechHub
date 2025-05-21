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
    toast.success(`Added ${quantity} x ${product?.title} to your cart.`);
  };
  
  if (!product) {
    return (
      <PageLayout>
        <div className="container py-8 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/marketplace">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container py-8">
        <div className="mb-6">
          <Link 
            to="/marketplace" 
            className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image/3D Viewer */}
          <div>
            <ProductViewer 
              imageUrl={product.image} 
              has3DModel={product.is3D || false}
            />
          </div>
          
          {/* Product Details */}
          <div>
            <div className="mb-4">
              <Badge variant="outline" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-4 w-4 text-amber-500" 
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              
              <div className="text-2xl font-bold mb-4">{formatRupiah(product.price * 15000)}</div>
              
              <p className="text-muted-foreground mb-6">
                This advanced agricultural technology helps farmers optimize their operations, reduce waste, and increase yields. 
                Designed with sustainability in mind, it integrates seamlessly with existing farm systems.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-eco-600" />
                  <span>Free shipping on orders over $500</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-eco-600" />
                  <span>2-year warranty included</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-eco-600" />
                  <span>Technical support from product specialists</span>
                </div>
                {product.hasIoT && (
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-eco-600" />
                    <span>IoT dashboard integration ready</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <div className="h-8 px-4 flex items-center justify-center border-y">
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
                
                <div className="flex-1">
                  <Button className="w-full gap-2" onClick={handleAddToCart}>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
                
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
              </div>
              
              <div className="bg-muted rounded-lg p-4 flex items-center gap-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">
                  <span className="font-medium">Estimated delivery:</span> 3-5 business days
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <Tabs defaultValue="details" className="mb-12">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="support">Support & Documentation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <h3 className="text-xl font-semibold">Product Description</h3>
            <p>
              This innovative agricultural technology is designed to help farmers optimize their operations, 
              reduce waste, and increase yields. It incorporates the latest advancements in sensor technology, 
              data analytics, and sustainable farming practices.
            </p>
            <p>
              The system is easy to set up and configure, with minimal technical expertise required. 
              Once deployed, it continuously monitors conditions and provides actionable insights 
              through the integrated dashboard.
            </p>
            
            <h3 className="text-xl font-semibold mt-6">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Real-time monitoring and data collection</li>
              <li>Advanced analytics and reporting capabilities</li>
              <li>Automated alerts and notifications</li>
              <li>Easy integration with existing farm systems</li>
              <li>Weather-resistant and durable construction</li>
              <li>Low power consumption and long battery life</li>
              {product.hasIoT && <li>Cloud-based IoT dashboard included</li>}
              {product.is3D && <li>Precision engineered components for reliability</li>}
            </ul>
            
            <h3 className="text-xl font-semibold mt-6">In the Box</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Main unit</li>
              <li>Power adapter and cable</li>
              <li>Installation hardware</li>
              <li>Quick start guide</li>
              <li>User manual</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="specs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span>12 x 8 x 3 cm</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Weight:</span>
                      <span>350g</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Power Source:</span>
                      <span>Rechargeable Li-ion Battery / Solar</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Battery Life:</span>
                      <span>Up to 6 months</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Water Resistance:</span>
                      <span>IP67 Rated</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Operating Temperature:</span>
                      <span>-20°C to 60°C</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Connectivity</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Wireless:</span>
                      <span>LoRaWAN, Wi-Fi, Bluetooth</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Range:</span>
                      <span>Up to 10km (LoRaWAN)</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Data Storage:</span>
                      <span>8GB internal + Cloud storage</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">API:</span>
                      <span>RESTful API, WebSockets</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Compatible Systems:</span>
                      <span>iOS, Android, Web</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((index) => (
                <div key={index} className="border-b pb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 10}`} />
                        <AvatarFallback>US</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">User {index}</div>
                        <div className="text-sm text-muted-foreground">2 months ago</div>
                      </div>
                    </div>
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4 text-amber-500" 
                          fill={i < 5 - index % 2 ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">
                    This product has significantly improved my farm operations. The installation was straightforward,
                    and the data it provides has helped me make better decisions about irrigation and resource allocation.
                    Battery life is excellent, and the customer support team was very helpful with my questions.
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="support">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Documentation</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      User Manual (PDF)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      Quick Start Guide (PDF)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      Installation Instructions (PDF)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      Technical Specifications (PDF)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                      Troubleshooting Guide
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
                <div className="space-y-4">
                  <p>
                    Our dedicated support team is available to help you with any questions or issues you may encounter.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      <span>Phone: +1 (800) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      <span>Email: support@agritechhub.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      <span>Hours: Monday-Friday, 8am-6pm EST</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>Contact Support</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Related Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
