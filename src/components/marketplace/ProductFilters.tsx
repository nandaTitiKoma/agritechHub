
import React, { useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
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

const CATEGORIES = [
  "Soil Sensors",
  "Irrigation Systems",
  "Weather Stations",
  "Drones & Robotics",
  "Smart Greenhouses",
  "Livestock Monitoring",
  "Crop Management",
  "Harvesting Tools",
  "Data Analytics",
  "Energy Solutions"
];

const FEATURES = [
  "IoT Enabled",
  "3D Model Available",
  "Open Source",
  "Raspberry Pi Compatible",
  "Arduino Compatible",
  "Solar Powered",
  "Wireless",
  "Waterproof",
  "DIY Friendly",
  "Educational"
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" }
];

export function ProductFilters() {
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

  return (
    <div className="w-full">
      {/* Mobile Filters Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          Filters
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            isFiltersVisible && "transform rotate-180"
          )} />
        </Button>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                Sort
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
        "grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6",
        !isFiltersVisible && "lg:grid"
      )}>
        {/* Filters Sidebar */}
        <div className={cn(
          "space-y-6",
          !isFiltersVisible && "hidden lg:block"
        )}>
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Filters</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={resetFilters}
            >
              Reset all
            </Button>
          </div>
          
          <div className="space-y-4">
            <Accordion type="single" collapsible defaultValue="price">
              {/* Price Range */}
              <AccordionItem value="price">
                <AccordionTrigger>Price Range</AccordionTrigger>
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
                      <span>to</span>
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
                <AccordionTrigger>Categories</AccordionTrigger>
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
                <AccordionTrigger>Features</AccordionTrigger>
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
        <div className={cn(
          "hidden lg:flex items-center justify-end gap-2 h-10 mb-4",
          isFiltersVisible && "lg:flex"
        )}>
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                {SORT_OPTIONS.find(option => option.value === sortBy)?.label || "Newest"}
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
