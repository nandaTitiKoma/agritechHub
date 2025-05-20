
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { DeviceCard } from '@/components/dashboard/DeviceCard';
import { SensorChart } from '@/components/dashboard/SensorChart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockDevices, generateSensorData } from '@/services/mockData';

const Dashboard = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState(mockDevices[0].id);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  
  const selectedDevice = mockDevices.find(device => device.id === selectedDeviceId);
  
  // Generate different types of sensor data based on device type
  const getSensorData = (type: string) => {
    const days = timeRange === 'day' ? 1 : timeRange === 'week' ? 7 : 30;
    return generateSensorData(type, days);
  };
  
  return (
    <PageLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Dashboard IoT</h1>
          <p className="text-muted-foreground max-w-3xl">
            Pantau perangkat pertanian terhubung Anda secara real-time. Lihat data sensor, 
            periksa status perangkat, dan terima peringatan saat perhatian diperlukan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Devices Sidebar */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Input placeholder="Cari perangkat..." className="flex-1" />
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M15 9a6 6 0 0 0-9-9 9 9 0 1 1 9 9Z"/></svg>
              </Button>
            </div>
            
            <div className="space-y-3">
              {mockDevices.map(device => (
                <DeviceCard 
                  key={device.id} 
                  device={device} 
                  onSelect={setSelectedDeviceId}
                  isSelected={device.id === selectedDeviceId}
                />
              ))}
            </div>
            
            <Button className="w-full mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
              Tambah Perangkat
            </Button>
          </div>
          
          {/* Main Dashboard Area */}
          <div className="space-y-6">
            {selectedDevice ? (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedDevice.name}</h2>
                    <p className="text-muted-foreground">
                      {selectedDevice.location} • Terakhir diperbarui: {selectedDevice.lastUpdated}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Tabs defaultValue="week" onValueChange={(value) => setTimeRange(value as any)}>
                      <TabsList>
                        <TabsTrigger value="day">24 Jam</TabsTrigger>
                        <TabsTrigger value="week">Minggu</TabsTrigger>
                        <TabsTrigger value="month">Bulan</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    
                    <Button variant="outline" size="sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                      Pengaturan
                    </Button>
                  </div>
                </div>
                
                {/* Sensor Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedDevice.readings.map((reading, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground mb-1">
                          {reading.type}
                        </div>
                        <div className="text-2xl font-semibold flex items-end gap-1">
                          {reading.value}
                          <span className="text-xs text-muted-foreground">
                            {reading.unit}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Sensor Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedDevice.type === 'soil' && (
                    <>
                      <SensorChart
                        title="Kelembaban Tanah"
                        description="Persentase kandungan air dalam tanah"
                        data={getSensorData('moisture')}
                        unit="%"
                        color="#3498db"
                        type="area"
                      />
                      <SensorChart
                        title="Suhu Tanah"
                        description="Suhu tanah pada kedalaman sensor"
                        data={getSensorData('temperature')}
                        unit="°C"
                        color="#e74c3c"
                      />
                      <SensorChart
                        title="pH Tanah"
                        description="Tingkat keasaman tanah"
                        data={getSensorData('ph')}
                        unit=""
                        color="#9b59b6"
                      />
                      <SensorChart
                        title="Kadar Nitrogen"
                        description="Konsentrasi nitrogen dalam tanah"
                        data={getSensorData('nitrogen')}
                        unit="ppm"
                        color="#2ecc71"
                      />
                    </>
                  )}
                  
                  {selectedDevice.type === 'weather' && (
                    <>
                      <SensorChart
                        title="Suhu"
                        description="Suhu udara sekitar"
                        data={getSensorData('temperature')}
                        unit="°C"
                        color="#e74c3c"
                      />
                      <SensorChart
                        title="Kelembaban"
                        description="Kelembaban relatif di udara"
                        data={getSensorData('moisture')}
                        unit="%"
                        color="#3498db"
                        type="area"
                      />
                      <SensorChart
                        title="Curah Hujan"
                        description="Jumlah presipitasi"
                        data={getSensorData('rainfall')}
                        unit="mm"
                        color="#2980b9"
                        type="area"
                      />
                      <SensorChart
                        title="Kecepatan Angin"
                        description="Kecepatan angin saat ini"
                        data={getSensorData('temperature')}
                        unit="km/jam"
                        color="#7f8c8d"
                      />
                    </>
                  )}
                  
                  {selectedDevice.type === 'irrigation' && (
                    <>
                      <SensorChart
                        title="Laju Aliran Air"
                        description="Volume air per menit"
                        data={getSensorData('temperature')}
                        unit="L/min"
                        color="#3498db"
                      />
                      <SensorChart
                        title="Tekanan Air"
                        description="Tekanan dalam saluran irigasi"
                        data={getSensorData('moisture')}
                        unit="bar"
                        color="#2980b9"
                      />
                      <SensorChart
                        title="Penggunaan Air Harian"
                        description="Total konsumsi air"
                        data={getSensorData('nitrogen')}
                        unit="L"
                        color="#1abc9c"
                        type="area"
                      />
                      <SensorChart
                        title="Status Katup"
                        description="Siklus buka/tutup per hari"
                        data={getSensorData('ph')}
                        unit="siklus"
                        color="#e67e22"
                      />
                    </>
                  )}
                  
                  {selectedDevice.type === 'greenhouse' && (
                    <>
                      <SensorChart
                        title="Suhu Dalam Ruangan"
                        description="Suhu internal rumah kaca"
                        data={getSensorData('temperature')}
                        unit="°C"
                        color="#e74c3c"
                      />
                      <SensorChart
                        title="Kelembaban"
                        description="Kelembaban relatif dalam rumah kaca"
                        data={getSensorData('moisture')}
                        unit="%"
                        color="#3498db"
                        type="area"
                      />
                      <SensorChart
                        title="Tingkat CO2"
                        description="Konsentrasi karbon dioksida"
                        data={getSensorData('nitrogen')}
                        unit="ppm"
                        color="#7f8c8d"
                      />
                      <SensorChart
                        title="Intensitas Cahaya"
                        description="Tingkat cahaya sekitar"
                        data={getSensorData('ph')}
                        unit="lux"
                        color="#f1c40f"
                        type="area"
                      />
                    </>
                  )}
                  
                  {selectedDevice.type === 'robot' && (
                    <>
                      <SensorChart
                        title="Level Baterai"
                        description="Kapasitas baterai tersisa"
                        data={getSensorData('moisture')}
                        unit="%"
                        color="#27ae60"
                        type="area"
                      />
                      <SensorChart
                        title="Area Tercakup"
                        description="Kemajuan cakupan lapangan"
                        data={getSensorData('nitrogen')}
                        unit="hektar"
                        color="#3498db"
                      />
                      <SensorChart
                        title="Kecepatan Jalan"
                        description="Kecepatan pergerakan saat ini"
                        data={getSensorData('temperature')}
                        unit="km/jam"
                        color="#e67e22"
                      />
                      <SensorChart
                        title="Hasil Panen"
                        description="Berat produk yang dikumpulkan"
                        data={getSensorData('ph')}
                        unit="kg"
                        color="#f1c40f"
                        type="area"
                      />
                    </>
                  )}
                </div>
                
                {/* Additional Control Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Kontrol Perangkat</CardTitle>
                    <CardDescription>
                      Kelola pengaturan dan operasi perangkat
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        Jadwalkan Operasi
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"/><rect x="3" y="4" width="18" height="12" rx="2"/><line x1="8" y1="2" x2="8" y2="4"/><line x1="16" y1="2" x2="16" y2="4"/></svg>
                        Kalibrasi Sensor
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                        Jalankan Diagnostik
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"/><line x1="3" y1="22" x2="21" y2="22"/></svg>
                        Edit Ambang Batas
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        Ekspor Data
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                        Perbarui Firmware
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Tidak ada perangkat yang dipilih. Silakan pilih perangkat dari sidebar.
                  </p>
                  <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                    Tambah Perangkat
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
