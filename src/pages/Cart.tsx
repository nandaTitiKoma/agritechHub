
import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const CartPage = () => {
  const { toast } = useToast();
  const { items: cartItems, updateQuantity, removeFromCart } = useCart();
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * 15000 * item.quantity);
    }, 0);
  };
  
  const handleQuantityUpdate = (productId: string, amount: number) => {
    const item = cartItems.find(item => item.product.id === productId);
    if (item) {
      const newQuantity = item.quantity + amount;
      if (newQuantity < 1) return; // Don't allow quantities below 1
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "Item dihapus",
      description: "Item telah dihapus dari keranjang Anda.",
    });
  };
  
  const subtotal = calculateSubtotal();
  const shipping = 75000;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Keranjang Belanja</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Keranjang Anda kosong</h2>
            <p className="text-muted-foreground mb-6">Tambahkan beberapa produk ke keranjang Anda untuk melanjutkan</p>
            <Button asChild>
              <Link to="/marketplace">Telusuri Produk</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map(({product, quantity}) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <Link to={`/marketplace/${product.id}`} className="sm:w-40 h-40">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="p-4 flex-1">
                        <Link to={`/marketplace/${product.id}`}>
                          <h3 className="font-medium hover:text-primary transition-colors">
                            {product.title}
                          </h3>
                        </Link>
                        <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
                        <div className="font-semibold">Rp{(product.price * 15000).toLocaleString('id-ID')}</div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-8 w-8"
                              onClick={() => handleQuantityUpdate(product.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{quantity}</span>
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-8 w-8"
                              onClick={() => handleQuantityUpdate(product.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveItem(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} item)</span>
                      <span>Rp{subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pengiriman</span>
                      <span>Rp{shipping.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pajak (10%)</span>
                      <span>Rp{tax.toLocaleString('id-ID')}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>Rp{total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to="/checkout">
                      Lanjutkan ke Checkout
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default CartPage;
