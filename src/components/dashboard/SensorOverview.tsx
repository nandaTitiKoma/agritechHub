
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Device } from '@/components/dashboard/DeviceCard';

interface SensorOverviewProps {
  device: Device;
}

const SensorOverview = ({ device }: SensorOverviewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {device.readings.map((reading, idx) => (
        <Card key={idx}>
          <CardContent className="pt-4 md:pt-6">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">
              {reading.type}
            </div>
            <div className="text-lg md:text-2xl font-semibold flex items-end gap-1">
              {reading.value}
              <span className="text-xs text-muted-foreground">
                {reading.unit}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SensorOverview;
