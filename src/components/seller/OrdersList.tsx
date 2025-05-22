
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';


const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'Budi Santoso',
    date: '2025-05-18',
    total: 525000,
    items: 3,
    status: 'pending',
  },
  {
    id: 'ORD-002',
    customer: 'Siti Nurhaliza',
    date: '2025-05-17',
    total: 780000,
    items: 2,
    status: 'processing',
  },
  {
    id: 'ORD-003',
    customer: 'Ahmad Dhani',
    date: '2025-05-16',
    total: 1250000,
    items: 4,
    status: 'shipped',
  },
  {
    id: 'ORD-004',
    customer: 'Dewi Lestari',
    date: '2025-05-15',
    total: 350000,
    items: 1,
    status: 'delivered',
  },
  {
    id: 'ORD-005',
    customer: 'Joko Widodo',
    date: '2025-05-14',
    total: 925000,
    items: 3,
    status: 'delivered',
  },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-600',
  processing: 'bg-blue-50 text-blue-600',
  shipped: 'bg-purple-50 text-purple-600',
  delivered: 'bg-green-50 text-green-600',
  cancelled: 'bg-red-50 text-red-600',
};


const statusLabels: Record<string, string> = {
  pending: 'Menunggu',
  processing: 'Diproses',
  shipped: 'Dikirim',
  delivered: 'Diterima',
  cancelled: 'Dibatalkan',
};

export const OrdersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const isMobile = useIsMobile();
  
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const MobileOrderCard = ({ order }: { order: typeof mockOrders[0] }) => (
    <Card className="mb-4 overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <div className="font-medium">{order.id}</div>
          <div className="text-sm text-muted-foreground">{formatDate(order.date)}</div>
        </div>
        <Badge
          variant="outline"
          className={statusColors[order.status]}
        >
          {statusLabels[order.status]}
        </Badge>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Pelanggan:</span>
          <span className="font-medium">{order.customer}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total:</span>
          <span className="font-medium">{formatPrice(order.total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Jumlah Item:</span>
          <span>{order.items} item</span>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-2">
          Detail
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Input 
          className="w-full sm:max-w-xs" 
          placeholder="Cari pesanan atau pelanggan..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="flex gap-2 items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="pending">Menunggu</SelectItem>
              <SelectItem value="processing">Diproses</SelectItem>
              <SelectItem value="shipped">Dikirim</SelectItem>
              <SelectItem value="delivered">Diterima</SelectItem>
              <SelectItem value="cancelled">Dibatalkan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isMobile ? (
        <div>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <MobileOrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-8">
              <div className="text-muted-foreground">
                Tidak ada pesanan yang ditemukan
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pesanan</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Jumlah Item</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>{formatPrice(order.total)}</TableCell>
                    <TableCell>{order.items} item</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusColors[order.status]}
                      >
                        {statusLabels[order.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="text-muted-foreground">
                      Tidak ada pesanan yang ditemukan
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
