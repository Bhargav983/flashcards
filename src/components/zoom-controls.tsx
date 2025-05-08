
'use client';

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
}

export const ZoomControls: FC<ZoomControlsProps> = ({ onZoomIn, onZoomOut, onRotate }) => {
  return (
    <div className="flex flex-col space-y-2">
      <Button
        onClick={onRotate}
        variant="outline"
        size="icon"
        aria-label="Rotate image"
        className="rounded-full p-2 shadow-lg bg-background/80 hover:bg-background"
      >
        <RotateCw className="h-5 w-5" />
      </Button>
      <Button
        onClick={onZoomIn}
        variant="outline"
        size="icon"
        aria-label="Zoom in"
        className="rounded-full p-2 shadow-lg bg-background/80 hover:bg-background"
      >
        <ZoomIn className="h-5 w-5" />
      </Button>
      <Button
        onClick={onZoomOut}
        variant="outline"
        size="icon"
        aria-label="Zoom out"
        className="rounded-full p-2 shadow-lg bg-background/80 hover:bg-background"
      >
        <ZoomOut className="h-5 w-5" />
      </Button>
    </div>
  );
};
