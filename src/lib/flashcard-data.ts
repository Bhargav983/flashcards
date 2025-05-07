export interface Flashcard {
  id: string;
  fruitName: string;
  altText: string;
  imageUrl: string;
  aiHint: string;
}

export const flashcards: Flashcard[] = [
  {
    id: 'apple',
    fruitName: 'Red Apple',
    altText: 'A realistic red apple centered on a plain white background.',
    imageUrl: 'https://picsum.photos/800/1000?random=1',
    aiHint: 'red apple',
  },
  {
    id: 'banana',
    fruitName: 'Yellow Banana',
    altText: 'A realistic yellow banana centered on a plain white background.',
    imageUrl: 'https://picsum.photos/800/1000?random=2',
    aiHint: 'yellow banana',
  },
  {
    id: 'grapes',
    fruitName: 'Green Grapes',
    altText: 'A realistic bunch of green grapes centered on a plain white background.',
    imageUrl: 'https://picsum.photos/800/1000?random=3',
    aiHint: 'green grapes',
  },
  {
    id: 'mango',
    fruitName: 'Ripe Mango',
    altText: 'A realistic ripe mango centered on a plain white background.',
    imageUrl: 'https://picsum.photos/800/1000?random=4',
    aiHint: 'ripe mango',
  },
  {
    id: 'strawberry',
    fruitName: 'Bright Red Strawberry',
    altText: 'A realistic bright red strawberry centered on a plain white background.',
    imageUrl: 'https://picsum.photos/800/1000?random=5',
    aiHint: 'red strawberry',
  },
];
