
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const StoreSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Profil Toko</h3>
        <Separator />
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="store-logo">Logo Toko</Label>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </div>
              <div>
                <Button variant="outline" size="sm" className="mb-2">
                  Unggah Logo
                </Button>
                <p className="text-xs text-muted-foreground">
                  JPG atau PNG, disarankan 200x200px
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">Nama Toko</Label>
              <Input id="store-name" defaultValue="Tani Makmur" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="store-owner">Nama Pemilik</Label>
              <Input id="store-owner" defaultValue="Budi Santoso" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="store-description">Deskripsi Toko</Label>
            <Textarea 
              id="store-description" 
              rows={3}
              defaultValue="Menjual berbagai kebutuhan pertanian organik dan alat teknologi pertanian modern untuk petani Indonesia."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="store-email">Email</Label>
              <Input id="store-email" type="email" defaultValue="info@tanimakmur.id" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="store-phone">Nomor Telepon</Label>
              <Input id="store-phone" defaultValue="081234567890" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="store-address">Alamat Toko</Label>
            <Textarea 
              id="store-address" 
              rows={2}
              defaultValue="Jl. Pertanian No. 123, Desa Sukamaju, Kecamatan Cimahi, Kabupaten Bandung, Jawa Barat 40123"
            />
          </div>

          <div className="flex justify-end">
            <Button>Simpan Perubahan</Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pengaturan Pengiriman</h3>
        <Separator />
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="shipping-method">Metode Pengiriman</Label>
            <Select defaultValue="multiple">
              <SelectTrigger id="shipping-method">
                <SelectValue placeholder="Pilih metode pengiriman" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Pengiriman Tunggal</SelectItem>
                <SelectItem value="multiple">Multi Ekspedisi</SelectItem>
                <SelectItem value="custom">Kustom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">JNE</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan layanan pengiriman JNE
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">J&T Express</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan layanan pengiriman J&T Express
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">SiCepat</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan layanan pengiriman SiCepat
                </p>
              </div>
              <Switch />
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Simpan Perubahan</Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Preferensi Toko</h3>
        <Separator />
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Mode Liburan</Label>
              <p className="text-sm text-muted-foreground">
                Sementara nonaktifkan toko Anda
              </p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Notifikasi Email</Label>
              <p className="text-sm text-muted-foreground">
                Dapatkan notifikasi email untuk pesanan baru
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Stok Otomatis</Label>
              <p className="text-sm text-muted-foreground">
                Nonaktifkan produk otomatis saat stok habis
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex justify-end">
            <Button>Simpan Perubahan</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
