'use client';

import type { FC } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SetTabsProps {
  sets: string[];
  activeSet: string;
  onSetChange: (set: string) => void;
}

export const SetTabs: FC<SetTabsProps> = ({
  sets,
  activeSet,
  onSetChange,
}) => {
  // Only show tabs if there's more than one set, or always if desired (current: show if any sets)
  if (sets.length === 0) return null; 

  return (
    <div className="w-full flex justify-center py-1 md:py-2 border-t border-border/50"> {/* Added top border */}
      <Tabs value={activeSet} onValueChange={onSetChange} className="w-auto">
        <TabsList className="overflow-x-auto max-w-full bg-muted/50"> {/* Slightly different background for distinction */}
          {sets.map((set) => (
            <TabsTrigger
              key={set}
              value={set}
              className="capitalize px-3 py-1.5 text-xs md:text-sm font-medium whitespace-nowrap"
            >
              {`Set ${set.replace('set', '')}`}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};