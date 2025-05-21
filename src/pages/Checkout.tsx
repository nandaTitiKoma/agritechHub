
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatRupiah } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

const Checkout = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const { items: cartItems } = useCart();
  
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      notes: '',
    },
  });
  
  // Calculate order totals
  const calculateSubtotal = () => {
    return cartItems?.reduce((total, item) => {
      return total + (item.product.price * 15000 * item.quantity);
    }, 0) || 0;
  };
  
  const subtotal = calculateSubtotal();
  const shipping = 75000;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  
  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      toast({
        title: "Pesanan Berhasil!",
        description: "Terima kasih telah berbelanja di AgriTech Hub.",
      });
    }, 1500);
  };
  
  if (orderComplete) {
    return (
      <PageLayout>
        <div className="container max-w-4xl py-8 px-4 md:px-6 md:py-12">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle2 className="mx-auto h-12 w-12 md:h-16 md:w-16 text-green-500" />
                <h1 className="text-xl md:text-2xl font-bold">Pesanan Berhasil!</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Terima kasih telah berbelanja di AgriTech Hub. Anda akan menerima email konfirmasi dengan rincian pesanan Anda.
                </p>
                <div className="pt-4">
                  <Button asChild>
                    <Link to="/marketplace">Lanjutkan Belanja</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container py-4 md:py-8">
        <div className="flex items-center gap-2 mb-4">
          <Link to="/cart" className="text-muted-foreground hover:text-primary flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Kembali ke Keranjang</span>
          </Link>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 md:gap-8">
          {/* Checkout Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Informasi Pengiriman</CardTitle>
                <CardDescription>
                  Masukkan detail pengiriman untuk pesanan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <FormControl>
                            <Input placeholder="Nama lengkap Anda" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nomor Telepon</FormLabel>
                            <FormControl>
                              <Input placeholder="+62..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alamat</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Alamat lengkap Anda" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kota</FormLabel>
                            <FormControl>
                              <Input placeholder="Kota Anda" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kode Pos</FormLabel>
                            <FormControl>
                              <Input placeholder="12345" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Catatan (opsional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Catatan tambahan untuk pesanan Anda" {...field} />
                          </FormControl>
                          <FormDescription>
                            Instruksi khusus untuk pengiriman atau produk
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Memproses..." : "Selesaikan Pesanan"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="lg:sticky lg:top-20">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0} item)</span>
                    <span>{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pengiriman</span>
                    <span>{formatRupiah(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pajak</span>
                    <span>{formatRupiah(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatRupiah(total)}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Metode Pembayaran</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start text-xs md:text-sm">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" 
                        alt="Visa" className="h-4 md:h-5 mr-2" />
                      Visa
                    </Button>
                    <Button variant="outline" className="justify-start text-xs md:text-sm">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                        alt="Mastercard" className="h-4 md:h-5 mr-2" />
                      Mastercard
                    </Button>
                    <Button variant="outline" className="justify-start text-xs md:text-sm">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" 
                        alt="PayPal" className="h-4 md:h-5 mr-2" />
                      PayPal
                    </Button>
                    <Button variant="outline" className="justify-start text-xs md:text-sm">
                      Transfer Bank
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Checkout;
