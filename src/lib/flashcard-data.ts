
export interface Flashcard {
  id: string;
  fruitName: string; // Keep name generic, as it can be vegetable too
  altText: string;
  imageUrl: string;
  aiHint: string;
  category: 'fruit' | 'vegetable'; // Add category
}

export const flashcards: Flashcard[] = [
  // Fruits
  {
    id: 'apple',
    fruitName: 'Red Apple',
    altText: 'A realistic red apple centered on a plain white background.',
    imageUrl: '/fruits/apple.jpg',
    aiHint: 'red apple',
    category: 'fruit',
  },
  {
    id: 'banana',
    fruitName: 'Yellow Banana',
    altText: 'A realistic yellow banana centered on a plain white background.',
    imageUrl: '/fruits/banana.jpg',
    aiHint: 'yellow banana',
    category: 'fruit',
  },
  {
    id: 'grapes',
    fruitName: 'Green Grapes',
    altText: 'A realistic bunch of green grapes centered on a plain white background.',
    imageUrl: '/fruits/grapes.jpg',
    aiHint: 'green grapes',
    category: 'fruit',
  },
  {
    id: 'mango',
    fruitName: 'Ripe Mango',
    altText: 'A realistic ripe mango centered on a plain white background.',
    imageUrl: '/fruits/mango.jpg',
    aiHint: 'ripe mango',
    category: 'fruit',
  },
  {
    id: 'strawberry',
    fruitName: 'Bright Red Strawberry',
    altText: 'A realistic bright red strawberry centered on a plain white background.',
    imageUrl: '/fruits/strawberry.jpg',
    aiHint: 'red strawberry',
    category: 'fruit',
  },
  // Vegetables
  {
    id: 'carrot',
    fruitName: 'Orange Carrot',
    altText: 'A realistic orange carrot centered on a plain white background.',
    imageUrl: '/vegetables/carrot.jpg', // Standardized path
    aiHint: 'orange carrot',
    category: 'vegetable',
  },
  {
    id: 'broccoli',
    fruitName: 'Green Broccoli',
    altText: 'A realistic head of green broccoli centered on a plain white background.',
    imageUrl: '/vegetables/broccoli.jpg', // Standardized path
    aiHint: 'green broccoli',
    category: 'vegetable',
  },
  {
    id: 'tomato', // Botanically a fruit, commonly used as a vegetable
    fruitName: 'Red Tomato',
    altText: 'A realistic red tomato centered on a plain white background.',
    imageUrl: '/vegetables/tomato.jpg', // Standardized path
    aiHint: 'red tomato',
    category: 'vegetable',
  },
];
