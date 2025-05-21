
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  threadCount: number;
  color?: string;
}

interface CategoryListProps {
  categories: Category[];
  className?: string;
}

export function CategoryList({ categories, className }: CategoryListProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {categories.map((category) => (
        <Link key={category.id} to={`/forum/category/${category.id}`}>
          <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all duration-200 animate-fade-in">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-2 rounded-md",
                  category.color || "bg-primary/10" 
                )}>
                  {category.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {category.threadCount} {category.threadCount === 1 ? 'thread' : 'threads'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
