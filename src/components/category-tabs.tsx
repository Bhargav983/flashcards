
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
    <div className="w-full flex justify-center py-4">
      <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-auto">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="capitalize px-4 py-2 text-sm font-medium"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
