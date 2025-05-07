import Image from 'next/image';
import type { Flashcard } from '@/lib/flashcard-data';

interface FlashcardImageProps {
  flashcard: Flashcard;
}

export function FlashcardImage({ flashcard }: FlashcardImageProps) {
  return (
    <div className="relative w-full h-[calc(100svh-10rem)] flex items-center justify-center p-4">
      <Image
        key={flashcard.id} // For re-triggering animation on change
        src={flashcard.imageUrl}
        alt={flashcard.altText}
        fill
        style={{ objectFit: 'contain' }}
        className="animate-fadeIn"
        priority // Prioritize loading the current image
        data-ai-hint={flashcard.aiHint}
        sizes="(max-width: 768px) 90vw, 70vw"
      />
    </div>
  );
}
