
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import DeviceSidebar from '@/components/dashboard/DeviceSidebar';
import DeviceDetail from '@/components/dashboard/DeviceDetail';
import NoDeviceSelected from '@/components/dashboard/NoDeviceSelected';
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
      <div className="container py-8 px-4 md:px-6 overflow-x-hidden">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Dashboard IoT</h1>
          <p className="text-muted-foreground max-w-3xl">
            Pantau perangkat pertanian terhubung Anda secara real-time. Lihat data sensor, 
            periksa status perangkat, dan terima peringatan saat perhatian diperlukan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Devices Sidebar */}
          <DeviceSidebar 
            devices={mockDevices}
            selectedDeviceId={selectedDeviceId}
            onSelectDevice={setSelectedDeviceId}
          />
          
          {/* Main Dashboard Area */}
          {selectedDevice ? (
            <DeviceDetail 
              device={selectedDevice}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
              getSensorData={getSensorData}
            />
          ) : (
            <NoDeviceSelected />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
