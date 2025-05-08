
'use client';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
// Lucide icons can be imported if specific ones are desired, e.g.:
// import { RefreshCw, ArrowUpNarrowWide, Zap, Palette, Feather } from 'lucide-react';

interface AnimationControlsProps {
  onAnimate: (animationType: string) => void;
}

const animationTypes = [
  { name: 'Spin', type: 'spin-image-once' /* icon: <RefreshCw className="h-4 w-4" /> */ },
  { name: 'Jump', type: 'jump-image' /* icon: <ArrowUpNarrowWide className="h-4 w-4" /> */ },
  { name: 'Pop', type: 'pop-image' /* icon: <Zap className="h-4 w-4" /> */ },
  { name: 'Color Shift', type: 'color-shift-image' /* icon: <Palette className="h-4 w-4" /> */ },
  { name: 'Float', type: 'float-image' /* icon: <Feather className="h-4 w-4" /> */ },
];

export const AnimationControls: FC<AnimationControlsProps> = ({ onAnimate }) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
      {animationTypes.map((anim) => (
        <Button
          key={anim.type}
          onClick={() => onAnimate(anim.type)} // Pass anim.type directly
          variant="outline"
          size="sm" 
          className="p-2 shadow-sm bg-background/80 hover:bg-background w-full text-xs"
          aria-label={`Animate: ${anim.name}`}
        >
          {/* {anim.icon} */}
          <span className="ml-1 truncate">{anim.name}</span>
        </Button>
      ))}
    </div>
  );
};
