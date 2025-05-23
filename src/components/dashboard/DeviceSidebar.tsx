
import React from 'react';
import { DeviceCard } from '@/components/dashboard/DeviceCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Device } from '@/components/dashboard/DeviceCard';

interface DeviceSidebarProps {
  devices: Device[];
  selectedDeviceId: string;
  onSelectDevice: (id: string) => void;
}

const DeviceSidebar = ({ devices, selectedDeviceId, onSelectDevice }: DeviceSidebarProps) => {
  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-2 mb-4">
        <Input placeholder="Cari perangkat..." className="flex-1" />
        <Button variant="outline" size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M15 9a6 6 0 0 0-9-9 9 9 0 1 1 9 9Z"/></svg>
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-300px)] pb-4">
        <div className="space-y-3 pr-4">
          {devices.map(device => (
            <DeviceCard 
              key={device.id} 
              device={device} 
              onSelect={onSelectDevice}
              isSelected={device.id === selectedDeviceId}
            />
          ))}
        </div>
      </ScrollArea>
      
      <Button className="w-full mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
        Tambah Perangkat
      </Button>
    </div>
  );
};

export default DeviceSidebar;
