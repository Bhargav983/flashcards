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
    imageUrl: '/fruits/apple.jpg', // Updated path
    aiHint: 'red apple',
  },
  {
    id: 'banana',
    fruitName: 'Yellow Banana',
    altText: 'A realistic yellow banana centered on a plain white background.',
    imageUrl: '/fruits/banana.jpg', // Updated path
    aiHint: 'yellow banana',
  },
  {
    id: 'grapes',
    fruitName: 'Green Grapes',
    altText: 'A realistic bunch of green grapes centered on a plain white background.',
    imageUrl: '/fruits/grapes.jpg', // Updated path
    aiHint: 'green grapes',
  },
  {
    id: 'mango',
    fruitName: 'Ripe Mango',
    altText: 'A realistic ripe mango centered on a plain white background.',
    imageUrl: '/fruits/mango.jpg', // Updated path
    aiHint: 'ripe mango',
  },
  {
    id: 'strawberry',
    fruitName: 'Bright Red Strawberry',
    altText: 'A realistic bright red strawberry centered on a plain white background.',
    imageUrl: '/fruits/strawberry.jpg', // Updated path
    aiHint: 'red strawberry',
  },
];
