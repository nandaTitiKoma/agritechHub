
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ProductForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="product-image">Foto Produk</Label>
        <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="flex flex-col items-center gap-1">
            <div className="h-20 w-20 rounded-md bg-muted flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            </div>
            <span className="text-sm font-medium">Unggah Foto</span>
            <span className="text-xs text-muted-foreground">
              JPG atau PNG, maks. 2MB
            </span>
          </div>
          <input id="product-image" type="file" className="sr-only" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-name">Nama Produk</Label>
        <Input id="product-name" placeholder="Masukkan nama produk" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-description">Deskripsi</Label>
        <Textarea id="product-description" placeholder="Deskripsi produk" rows={3} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="product-price">Harga (Rp)</Label>
          <Input id="product-price" type="number" placeholder="0" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="product-stock">Stok</Label>
          <Input id="product-stock" type="number" placeholder="0" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-category">Kategori</Label>
        <Select>
          <SelectTrigger id="product-category">
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seeds">Benih & Bibit</SelectItem>
            <SelectItem value="tools">Alat Pertanian</SelectItem>
            <SelectItem value="fertilizers">Pupuk & Nutrisi</SelectItem>
            <SelectItem value="tech">Teknologi Pertanian</SelectItem>
            <SelectItem value="harvest">Hasil Panen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4 space-x-2 flex justify-end">
        <Button variant="outline" type="button">Batal</Button>
        <Button type="submit">Simpan Produk</Button>
      </div>
    </form>
  );
};
