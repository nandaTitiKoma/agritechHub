
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize, 
  Move, 
  MousePointer 
} from 'lucide-react';

interface ProductViewerProps {
  imageUrl: string;
  has3DModel: boolean;
}

// This is a placeholder for the 3D viewer - in a real implementation, 
// you would integrate Three.js or React Three Fiber here
export function ProductViewer({ imageUrl, has3DModel }: ProductViewerProps) {
  const [viewMode, setViewMode] = useState<'image' | '3d'>(has3DModel ? '3d' : 'image');
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate loading of 3D model
    if (viewMode === '3d') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [viewMode]);
  
  // Placeholder for 3D controls
  const handleRotate = () => {
    console.log('Rotate model');
  };
  
  const handleZoomIn = () => {
    console.log('Zoom in');
  };
  
  const handleZoomOut = () => {
    console.log('Zoom out');
  };
  
  const handleReset = () => {
    console.log('Reset view');
  };
  
  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full rounded-lg border overflow-hidden aspect-[4/3] bg-muted/50"
    >
      {viewMode === 'image' ? (
        <img 
          src={imageUrl} 
          alt="Product" 
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Loading 3D model...</p>
            </div>
          ) : (
            // Placeholder for 3D viewer
            <div className="relative w-full h-full bg-gradient-to-b from-muted/10 to-muted/30">
              <img 
                src={imageUrl} 
                alt="Product" 
                className="w-full h-full object-contain opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <p className="text-center text-muted-foreground">
                    3D Model Viewer Placeholder
                    <br />
                    <span className="text-xs">
                      (In a real implementation, this would be a Three.js/React Three Fiber canvas)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* View toggles */}
      {has3DModel && (
        <div className="absolute top-3 left-3 flex gap-2">
          <Button
            variant={viewMode === 'image' ? 'default' : 'outline'}
            size="sm"
            className="h-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={() => setViewMode('image')}
          >
            2D View
          </Button>
          <Button
            variant={viewMode === '3d' ? 'default' : 'outline'}
            size="sm"
            className="h-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={() => setViewMode('3d')}
          >
            3D View
          </Button>
        </div>
      )}
      
      {/* 3D Controls */}
      {viewMode === '3d' && !isLoading && (
        <div className="absolute bottom-3 left-3 right-3 flex justify-center">
          <div className="bg-background/80 backdrop-blur-sm rounded-full p-1 flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRotate}>
              <Move className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleFullscreen}>
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
