
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { formatRupiah } from '@/lib/utils';

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  is3D?: boolean;
  hasIoT?: boolean;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { addToCart, isInCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Berhasil ditambahkan ke keranjang",
      description: `${product.title} telah ditambahkan ke keranjang belanja Anda.`,
    });
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <div className="relative">
        <Link to={`/marketplace/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full aspect-[4/3] object-cover"
          />
        </Link>
        <div className="absolute top-2 right-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm text-foreground hover:bg-white/90 hover:text-primary"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Tambahkan ke wishlist</span>
          </Button>
        </div>
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-eco-500">Baru</Badge>
          )}
          {product.is3D && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">Model 3D</Badge>
          )}
          {product.hasIoT && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">IoT Enabled</Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4 flex-1">
        <div className="flex items-center gap-1 text-amber-500 mb-1">
          {Array(5).fill(0).map((_, i) => (
            <Star 
              key={i} 
              className="h-3.5 w-3.5" 
              fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
        </div>
        <div className="mb-1 text-xs text-muted-foreground">{product.category}</div>
        <Link to={`/marketplace/${product.id}`}>
          <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="mt-2 font-semibold">{formatRupiah(product.price * 15000)}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full gap-2" 
          onClick={handleAddToCart}
          disabled={isInCart(product.id)}
          variant={isInCart(product.id) ? "outline" : "default"}
        >
          {isInCart(product.id) ? (
            <>
              <Check className="h-4 w-4" />
              Ditambahkan
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Tambahkan ke Keranjang
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
