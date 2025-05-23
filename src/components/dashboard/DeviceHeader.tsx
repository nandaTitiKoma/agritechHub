
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Device } from '@/components/dashboard/DeviceCard';

interface DeviceHeaderProps {
  device: Device;
  timeRange: 'day' | 'week' | 'month';
  onTimeRangeChange: (value: 'day' | 'week' | 'month') => void;
}

const DeviceHeader = ({ device, timeRange, onTimeRangeChange }: DeviceHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      <div>
        <h2 className="text-xl md:text-2xl font-bold">{device.name}</h2>
        <p className="text-muted-foreground text-sm">
          {device.location} • Terakhir diperbarui: {device.lastUpdated}
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
        <Tabs defaultValue={timeRange} onValueChange={(value) => onTimeRangeChange(value as any)} className="w-full sm:w-auto">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="day" className="flex-1 sm:flex-initial">24 Jam</TabsTrigger>
            <TabsTrigger value="week" className="flex-1 sm:flex-initial">Minggu</TabsTrigger>
            <TabsTrigger value="month" className="flex-1 sm:flex-initial">Bulan</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button variant="outline" size="sm" className="w-full sm:w-auto mt-2 sm:mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Pengaturan
        </Button>
      </div>
    </div>
  );
};

export default DeviceHeader;
