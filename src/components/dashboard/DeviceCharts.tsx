
import React from 'react';
import { SensorChart, SensorData } from '@/components/dashboard/SensorChart';
import { Device } from '@/components/dashboard/DeviceCard';

interface DeviceChartsProps {
  deviceType: Device['type'];
  getSensorData: (type: string) => SensorData[];
}

const DeviceCharts = ({ deviceType, getSensorData }: DeviceChartsProps) => {
  if (deviceType === 'soil') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-x-hidden">
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
      </div>
    );
  }
  
  if (deviceType === 'weather') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-x-hidden">
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
      </div>
    );
  }
  
  if (deviceType === 'irrigation') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-x-hidden">
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
      </div>
    );
  }
  
  if (deviceType === 'greenhouse') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-x-hidden">
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
      </div>
    );
  }
  
  if (deviceType === 'robot') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-x-hidden">
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
      </div>
    );
  }
  
  return null;
};

export default DeviceCharts;
