
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, BellOff, Settings, Thermometer, Droplet, Wind, CloudRain, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Device {
  id: string;
  name: string;
  type: 'soil' | 'weather' | 'irrigation' | 'robot' | 'greenhouse';
  status: 'online' | 'offline' | 'warning' | 'error';
  lastUpdated: string;
  readings: {
    type: string;
    value: number;
    unit: string;
    icon?: React.ReactNode;
  }[];
  location: string;
  battery?: number;
  notifications: boolean;
}

interface DeviceCardProps {
  device: Device;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export function DeviceCard({ device, onSelect, isSelected }: DeviceCardProps) {
  const renderStatusBadge = (status: Device['status']) => {
    switch (status) {
      case 'online':
        return <Badge variant="outline" className="bg-eco-100 text-eco-800 border-eco-200">Online</Badge>;
      case 'offline':
        return <Badge variant="outline" className="bg-muted text-muted-foreground">Offline</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Warning</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Error</Badge>;
      default:
        return null;
    }
  };
  
  const getDeviceIcon = () => {
    switch (device.type) {
      case 'soil':
        return <Droplet className="h-5 w-5 text-soil-500" />;
      case 'weather':
        return <CloudRain className="h-5 w-5 text-tech-500" />;
      case 'irrigation':
        return <Droplet className="h-5 w-5 text-blue-500" />;
      case 'robot':
        return <Zap className="h-5 w-5 text-amber-500" />;
      case 'greenhouse':
        return <Thermometer className="h-5 w-5 text-eco-500" />;
      default:
        return null;
    }
  };
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200",
        isSelected ? "border-primary ring-1 ring-primary" : "hover:border-primary/50"
      )}
      onClick={() => onSelect(device.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getDeviceIcon()}
            <div>
              <CardTitle className="text-base">{device.name}</CardTitle>
              <CardDescription>{device.location}</CardDescription>
            </div>
          </div>
          {renderStatusBadge(device.status)}
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="grid grid-cols-2 gap-3">
          {device.readings.slice(0, 4).map((reading, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                {reading.icon}
                {reading.type}
              </div>
              <div className="text-lg font-semibold flex items-end gap-1">
                {reading.value}
                <span className="text-xs text-muted-foreground">{reading.unit}</span>
              </div>
            </div>
          ))}
        </div>
        
        {device.battery !== undefined && (
          <div className="mt-3 flex items-center gap-2">
            <div className="text-xs text-muted-foreground">Battery</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={cn(
                  "h-2 rounded-full",
                  device.battery > 60 ? "bg-eco-500" : 
                  device.battery > 20 ? "bg-amber-500" : "bg-red-500"
                )} 
                style={{ width: `${device.battery}%` }}
              ></div>
            </div>
            <div className="text-xs">{device.battery}%</div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-3 flex justify-between">
        <div className="text-xs text-muted-foreground">
          Last updated: {device.lastUpdated}
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {device.notifications ? 
              <Bell className="h-4 w-4" /> : 
              <BellOff className="h-4 w-4" />
            }
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
