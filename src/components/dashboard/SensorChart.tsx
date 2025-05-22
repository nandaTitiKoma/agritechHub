
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { cn } from '@/lib/utils';

export interface SensorData {
  time: string;
  value: number;
}

interface SensorChartProps {
  title: string;
  description?: string;
  data: SensorData[];
  unit: string;
  color: string;
  type?: 'line' | 'area';
  height?: number;
  className?: string;
}

export function SensorChart({
  title,
  description,
  data,
  unit,
  color,
  type = 'line',
  height = 300,
  className,
}: SensorChartProps) {
  const formatValue = (value: number) => {
    return `${value} ${unit}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm shadow-lg rounded-lg p-3 border">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm font-medium">
            {formatValue(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            {type === 'line' ? (
              <LineChart
                data={data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  unit={unit}
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            ) : (
              <AreaChart
                data={data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  unit={unit}
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#color-${title})`}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
