import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function NavigationControls({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: NavigationControlsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-6 bg-background/80 backdrop-blur-sm h-full">
      <Button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        variant="outline"
        size="lg"
        aria-label="Previous flashcard"
        className="rounded-full p-4 shadow-lg"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        onClick={onNext}
        disabled={!canGoNext}
        variant="outline"
        size="lg"
        aria-label="Next flashcard"
        className="rounded-full p-4 shadow-lg"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  );
}
