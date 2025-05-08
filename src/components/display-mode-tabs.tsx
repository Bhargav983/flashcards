'use client';

import type { FC } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DisplayModeTabsProps {
  activeDisplayMode: 'image' | 'text';
  onDisplayModeChange: (mode: 'image' | 'text') => void;
}

export const DisplayModeTabs: FC<DisplayModeTabsProps> = ({
  activeDisplayMode,
  onDisplayModeChange,
}) => {
  return (
    <div className="w-full flex justify-center py-1 md:py-2 border-t border-border/50"> {/* Consistent styling with SetTabs */}
      <Tabs
        value={activeDisplayMode}
        onValueChange={(value) => onDisplayModeChange(value as 'image' | 'text')}
        className="w-auto"
      >
        <TabsList className="bg-muted/40"> {/* Slightly adjusted background for visual hierarchy */}
          <TabsTrigger
            value="image"
            className="px-4 py-1.5 text-xs md:text-sm font-medium"
            aria-label="Show image flashcards"
          >
            Images
          </TabsTrigger>
          <TabsTrigger
            value="text"
            className="px-4 py-1.5 text-xs md:text-sm font-medium"
            aria-label="Show text flashcards"
          >
            Text
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
