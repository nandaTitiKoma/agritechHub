
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const salesData = [
  { name: 'Min', penjualan: 1200000 },
  { name: 'Sen', penjualan: 1950000 },
  { name: 'Sel', penjualan: 1800000 },
  { name: 'Rab', penjualan: 2800000 },
  { name: 'Kam', penjualan: 2100000 },
  { name: 'Jum', penjualan: 2900000 },
  { name: 'Sab', penjualan: 3100000 },
];

export const SalesSummary = () => {
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const totalSales = salesData.reduce((sum, day) => sum + day.penjualan, 0);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="md:col-span-3">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4">Penjualan Minggu Ini</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => 
                    new Intl.NumberFormat('id-ID', {
                      notation: 'compact',
                      compactDisplay: 'short',
                    }).format(value)
                  }
                />
                <Tooltip 
                  formatter={(value: number) => [formatRupiah(value), 'Penjualan']}
                  labelFormatter={(label) => `Hari ${label}`}
                />
                <Bar dataKey="penjualan" fill="#68ab38" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Total Penjualan
            </div>
            <div className="text-2xl font-bold mt-1">
              {formatRupiah(totalSales)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Pesanan Baru
            </div>
            <div className="text-2xl font-bold mt-1">27</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Produk Terjual
            </div>
            <div className="text-2xl font-bold mt-1">125</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
