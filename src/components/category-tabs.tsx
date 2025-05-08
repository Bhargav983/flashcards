
'use client';

import type { FC } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs: FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="w-full flex justify-center"> {/* Removed py-2 md:py-4 */}
      <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-auto">
        <TabsList className="overflow-x-auto max-w-full"> {/* Added overflow for smaller screens */}
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="capitalize px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium whitespace-nowrap" /* Adjusted padding and text size */
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
