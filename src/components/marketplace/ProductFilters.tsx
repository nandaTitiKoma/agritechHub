
import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { mockProducts } from '@/services/mockData';
import { Product } from './ProductCard';

const CATEGORIES = [
  "Sensor Tanah",
  "Sistem Irigasi",
  "Stasiun Cuaca",
  "Drone & Robotik",
  "Rumah Kaca Pintar",
  "Pemantauan Ternak",
  "Manajemen Tanaman",
  "Alat Panen",
  "Analisis Data",
  "Solusi Energi"
];

const FEATURES = [
  "IoT Enabled",
  "Model 3D Tersedia",
  "Open Source",
  "Kompatibel Raspberry Pi",
  "Kompatibel Arduino",
  "Tenaga Surya",
  "Nirkabel",
  "Tahan Air",
  "Ramah DIY",
  "Edukatif"
];

const SORT_OPTIONS = [
  { value: "newest", label: "Terbaru" },
  { value: "price-asc", label: "Harga: Rendah ke Tinggi" },
  { value: "price-desc", label: "Harga: Tinggi ke Rendah" },
  { value: "popular", label: "Paling Populer" },
  { value: "rating", label: "Penilaian Tertinggi" }
];

interface ProductFiltersProps {
  onFilterChange: (filteredProducts: Product[]) => void;
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };
  
  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedCategories([]);
    setSelectedFeatures([]);
  };

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let filteredProducts = [...mockProducts];
    
    // Filter by price range
    filteredProducts = filteredProducts.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by categories (if any selected)
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(
        product => selectedCategories.includes(product.category)
      );
    }
    
    // Filter by features (if any selected)
    if (selectedFeatures.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        if (selectedFeatures.includes('IoT Enabled') && !product.hasIoT) return false;
        if (selectedFeatures.includes('Model 3D Tersedia') && !product.is3D) return false;
        return true;
      });
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default: // newest
        // For demo purposes, we'll just leave the default order
        break;
    }
    
    onFilterChange(filteredProducts);
  }, [priceRange, selectedCategories, selectedFeatures, sortBy, onFilterChange]);

  return (
    <div className="w-full">
      {/* Mobile Filters Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          Filter
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            isFiltersVisible && "transform rotate-180"
          )} />
        </Button>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                Urutkan
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
              <div className="p-1">
                {SORT_OPTIONS.map(option => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => setSortBy(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        sortBy === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className={cn(
        "lg:block",
        !isFiltersVisible && "hidden lg:block"
      )}>
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Filter</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={resetFilters}
            >
              Reset semua
            </Button>
          </div>
          
          <div className="space-y-4">
            <Accordion type="single" collapsible defaultValue="price">
              {/* Price Range */}
              <AccordionItem value="price">
                <AccordionTrigger>Rentang Harga</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <Slider
                      defaultValue={priceRange}
                      max={5000}
                      step={50}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="h-9"
                      />
                      <span>sampai</span>
                      <Input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="h-9"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {/* Categories */}
              <AccordionItem value="categories">
                <AccordionTrigger>Kategori</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-1">
                    {CATEGORIES.map(category => (
                      <div key={category} className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            "h-7 px-2 text-xs justify-start font-normal",
                            selectedCategories.includes(category) && 
                            "bg-primary text-primary-foreground hover:bg-primary/90"
                          )}
                          onClick={() => toggleCategory(category)}
                        >
                          {selectedCategories.includes(category) ? (
                            <X className="mr-1 h-3 w-3" />
                          ) : null}
                          {category}
                        </Button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {/* Features */}
              <AccordionItem value="features">
                <AccordionTrigger>Fitur</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-1">
                    {FEATURES.map(feature => (
                      <div key={feature} className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            "h-7 px-2 text-xs justify-start font-normal",
                            selectedFeatures.includes(feature) && 
                            "bg-primary text-primary-foreground hover:bg-primary/90"
                          )}
                          onClick={() => toggleFeature(feature)}
                        >
                          {selectedFeatures.includes(feature) ? (
                            <X className="mr-1 h-3 w-3" />
                          ) : null}
                          {feature}
                        </Button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* Sort Options (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 h-10 mt-6">
          <span className="text-sm text-muted-foreground">Urutkan berdasarkan:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                {SORT_OPTIONS.find(option => option.value === sortBy)?.label || "Terbaru"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0">
              <div className="p-1">
                {SORT_OPTIONS.map(option => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => setSortBy(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        sortBy === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
