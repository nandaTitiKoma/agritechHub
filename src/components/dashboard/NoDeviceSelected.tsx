
import React from 'react';
import { Button } from '@/components/ui/button';

const NoDeviceSelected = () => {
  return (
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
  );
};

export default NoDeviceSelected;
