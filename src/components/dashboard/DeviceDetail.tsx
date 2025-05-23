
import React from 'react';
import { Device } from '@/components/dashboard/DeviceCard';
import { SensorData } from '@/components/dashboard/SensorChart';
import DeviceHeader from './DeviceHeader';
import SensorOverview from './SensorOverview';
import DeviceCharts from './DeviceCharts';
import DeviceControls from './DeviceControls';

interface DeviceDetailProps {
  device: Device;
  timeRange: 'day' | 'week' | 'month';
  onTimeRangeChange: (value: 'day' | 'week' | 'month') => void;
  getSensorData: (type: string) => SensorData[];
}

const DeviceDetail = ({ 
  device, 
  timeRange, 
  onTimeRangeChange,
  getSensorData 
}: DeviceDetailProps) => {
  return (
    <div className="space-y-6 overflow-x-hidden">
      <DeviceHeader 
        device={device} 
        timeRange={timeRange} 
        onTimeRangeChange={onTimeRangeChange} 
      />
      
      <SensorOverview device={device} />
      
      <DeviceCharts 
        deviceType={device.type} 
        getSensorData={getSensorData} 
      />
      
      <DeviceControls />
    </div>
  );
};

export default DeviceDetail;
