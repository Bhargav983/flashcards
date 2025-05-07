
export interface Flashcard {
  id: string;
  fruitName: string; // Retaining name for consistency with potential AI generation, though items aren't just fruits.
  altText: string;
  imageUrl: string;
  aiHint: string;
  category: string; // Changed from 'fruit' | 'vegetable' to support diverse categories
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
    imageUrl: '/vegetables/carrot.jpg',
    aiHint: 'orange carrot',
    category: 'vegetable',
  },
  {
    id: 'broccoli',
    fruitName: 'Green Broccoli',
    altText: 'A realistic head of green broccoli centered on a plain white background.',
    imageUrl: '/vegetables/broccoli.jpg',
    aiHint: 'green broccoli',
    category: 'vegetable',
  },
  {
    id: 'tomato', // Botanically a fruit, commonly used as a vegetable
    fruitName: 'Red Tomato',
    altText: 'A realistic red tomato centered on a plain white background.',
    imageUrl: '/vegetables/tomato.jpg',
    aiHint: 'red tomato',
    category: 'vegetable',
  },
  // Astrology
  {
    id: 'astrology-aries',
    fruitName: 'Aries Sign',
    altText: 'The Aries zodiac sign symbol on a cosmic background.',
    imageUrl: 'https://picsum.photos/600/800?random=11',
    aiHint: 'aries zodiac',
    category: 'Astrology',
  },
  {
    id: 'astrology-galaxy',
    fruitName: 'Galaxy View',
    altText: 'A stunning view of a distant galaxy.',
    imageUrl: 'https://picsum.photos/600/800?random=12',
    aiHint: 'galaxy stars',
    category: 'Astrology',
  },
  // AI/ML
  {
    id: 'aiml-network',
    fruitName: 'Neural Network',
    altText: 'A visualization of a neural network.',
    imageUrl: 'https://picsum.photos/600/800?random=13',
    aiHint: 'neural network',
    category: 'AI/ML',
  },
  {
    id: 'aiml-robot',
    fruitName: 'AI Robot',
    altText: 'A friendly AI robot assistant.',
    imageUrl: 'https://picsum.photos/600/800?random=14',
    aiHint: 'ai robot',
    category: 'AI/ML',
  },
  // Chess
  {
    id: 'chess-knight',
    fruitName: 'Chess Knight',
    altText: 'A black chess knight piece.',
    imageUrl: 'https://picsum.photos/600/800?random=15',
    aiHint: 'chess knight',
    category: 'Chess',
  },
  {
    id: 'chess-board',
    fruitName: 'Chess Board',
    altText: 'A chess board ready for a game.',
    imageUrl: 'https://picsum.photos/600/800?random=16',
    aiHint: 'chess board',
    category: 'Chess',
  },
  // Transport
  {
    id: 'transport-car',
    fruitName: 'Red Sports Car',
    altText: 'A sleek red sports car.',
    imageUrl: 'https://picsum.photos/600/800?random=17',
    aiHint: 'sports car',
    category: 'Transport',
  },
  {
    id: 'transport-plane',
    fruitName: 'Airplane Flying',
    altText: 'An airplane flying in the sky.',
    imageUrl: 'https://picsum.photos/600/800?random=18',
    aiHint: 'airplane sky',
    category: 'Transport',
  },
  // Space
  {
    id: 'space-earth',
    fruitName: 'Planet Earth',
    altText: 'View of Planet Earth from space.',
    imageUrl: 'https://picsum.photos/600/800?random=19',
    aiHint: 'planet earth',
    category: 'Space',
  },
  {
    id: 'space-astronaut',
    fruitName: 'Astronaut',
    altText: 'An astronaut floating in space.',
    imageUrl: 'https://picsum.photos/600/800?random=20',
    aiHint: 'astronaut space',
    category: 'Space',
  },
];
