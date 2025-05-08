
'use client';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
// Import Lucide icons if desired for buttons, or use text labels.
// Example: import { Zap, Rocket, Snowflake } from 'lucide-react';

interface AdvancedAnimationControlsProps {
  onAnimate: (animationType: string) => void;
}

const advancedAnimationTypes = [
  { name: 'Shake', type: 'shake-image' /* icon: <Zap className="h-4 w-4" /> */ },
  { name: 'Dance', type: 'dance-image' /* icon: <Music2 className="h-4 w-4" /> */ },
  { name: 'Twinkle', type: 'twinkle-image' /* icon: <Star className="h-4 w-4" /> */ },
  { name: 'Blast Off', type: 'blast-off-image' /* icon: <Rocket className="h-4 w-4" /> */ },
  { name: 'Freeze', type: 'freeze-image' /* icon: <Snowflake className="h-4 w-4" /> */ },
  { name: 'Boom!', type: 'boom-image' /* icon: <Bomb className="h-4 w-4" /> */ },
  { name: 'Peekaboo', type: 'peekaboo-image' /* icon: <Eye className="h-4 w-4" /> */ },
  { name: 'Magic', type: 'magic-image' /* icon: <Sparkles className="h-4 w-4" /> */ },
];

export const AdvancedAnimationControls: FC<AdvancedAnimationControlsProps> = ({ onAnimate }) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
      {advancedAnimationTypes.map((anim) => (
        <Button
          key={anim.type}
          onClick={() => onAnimate(anim.type)}
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
