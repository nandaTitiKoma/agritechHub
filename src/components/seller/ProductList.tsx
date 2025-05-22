import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, X } from 'lucide-react';
import { ProductForm } from './ProductForm';
import { Input } from '@/components/ui/input';
import { formatRupiah } from '@/lib/utils';

const mockProducts = [
  {
    id: '1',
    name: 'Bibit Padi Unggul',
    price: 75000,
    stock: 250,
    category: 'Benih & Bibit',
    active: true,
  },
  {
    id: '2',
    name: 'Sensor Kelembaban Tanah',
    price: 450000,
    stock: 15,
    category: 'Teknologi Pertanian',
    active: true,
  },
  {
    id: '3',
    name: 'Pupuk Organik Premium',
    price: 125000,
    stock: 75,
    category: 'Pupuk & Nutrisi',
    active: true,
  },
  {
    id: '4',
    name: 'Cangkul Ergonomis',
    price: 185000,
    stock: 8,
    category: 'Alat Pertanian',
    active: false,
  },
  {
    id: '5',
    name: 'Beras Merah Organik (1kg)',
    price: 35000,
    stock: 120,
    category: 'Hasil Panen',
    active: true,
  },
];

export const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(mockProducts);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete product
  const handleDelete = (id: string) => {
    if (window.confirm('Anda yakin ingin menghapus produk ini?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Handle toggle product active status
  const handleToggleActive = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input 
          className="max-w-xs" 
          placeholder="Cari produk..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="text-sm text-muted-foreground">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{formatRupiah(product.price)}</TableCell>
                  <TableCell>{product.stock} unit</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.active ? "outline" : "secondary"}
                      className={`${product.active ? "text-green-600 bg-green-50" : "text-muted-foreground bg-muted"}`}
                    >
                      {product.active ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setEditingProduct(product.id)}
                          >
                            <Edit size={16} />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle>Edit Produk</SheetTitle>
                            <SheetDescription>
                              Edit informasi produk Anda di sini
                            </SheetDescription>
                          </SheetHeader>
                          <div className="py-4">
                            <ProductForm />
                          </div>
                        </SheetContent>
                      </Sheet>

                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleToggleActive(product.id)}
                      >
                        <X size={16} />
                        <span className="sr-only">
                          {product.active ? "Nonaktifkan" : "Aktifkan"}
                        </span>
                      </Button>

                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={16} />
                        <span className="sr-only">Hapus</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="text-muted-foreground">
                    Tidak ada produk yang ditemukan
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
