
export interface Flashcard {
  id: string;
  // fruitName: string; // Removed as per user request
  altText: string;
  imageUrl: string;
  aiHint: string;
  category: string;
}

// Assumes images are named 0.jpg, 1.jpg, etc. in corresponding lowercase category folders under /public/
// e.g., /public/fruit/0.jpg, /public/fruit/1.jpg

export const flashcards: Flashcard[] = [
  // Fruit category
  {
    id: 'fruit-0',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/0.jpg', // Was /fruits/apple.jpg
    aiHint: 'fruit',
    category: 'fruit',
  },
  {
    id: 'fruit-1',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/1.jpg', // Was /fruits/banana.jpg
    aiHint: 'fruit',
    category: 'fruit',
  },
  {
    id: 'fruit-2',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/2.jpg', // Was /fruits/grapes.jpg
    aiHint: 'fruit',
    category: 'fruit',
  },
  {
    id: 'fruit-3',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/3.jpeg', // Was /fruits/mango.jpg
    aiHint: 'fruit',
    category: 'fruit',
  },
  {
    id: 'fruit-4',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/4.png', // Was /fruits/strawberry.jpg
    aiHint: 'fruit',
    category: 'fruit',
  },
  {
    id: 'fruit-5',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/5.jpg', // Was /fruits/strawberry.jpg
    aiHint: 'fruit',
    category: 'fruit',
  },
  {
    id: 'fruit-6',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/6.jpg', // Was /fruits/strawberry.jpg
    aiHint: 'fruit',
    category: 'fruit',
  },
  {
    id: 'fruit-7',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/7.jpg', // Was /fruits/strawberry.jpg
    aiHint: 'fruit',
    category: 'fruit',
  },
  {
    id: 'fruit-8',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/8.jpg', // Was /fruits/strawberry.jpg
    aiHint: 'fruit',
    category: 'fruit',
  },
  {
    id: 'fruit-9',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/9.jpg', // Was /fruits/strawberry.jpg
    aiHint: 'fruit',
    category: 'fruit',
  },
  {
    id: 'fruit-10',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/10.jpg', // Was /fruits/strawberry.jpg
    aiHint: 'fruit',
    category: 'fruit',
  },
  // Vegetable category
  {
    id: 'vegetable-0',
    altText: 'A flashcard image from the vegetable category.',
    imageUrl: '/vegetable/0.jpg', // Was /vegetables/carrot.jpg
    aiHint: 'vegetable',
    category: 'vegetable',
  },
  {
    id: 'vegetable-1',
    altText: 'A flashcard image from the vegetable category.',
    imageUrl: '/vegetable/1.jpg', // Was /vegetables/broccoli.jpg
    aiHint: 'vegetable',
    category: 'vegetable',
  },
  {
    id: 'vegetable-2',
    altText: 'A flashcard image from the vegetable category.',
    imageUrl: '/vegetable/2.jpg', // Was /vegetables/tomato.jpg
    aiHint: 'vegetable',
    category: 'vegetable',
  },
  // Astrology category
  {
    id: 'astrology-0',
    altText: 'A flashcard image from the astrology category.',
    imageUrl: '/astrology/0.jpg', // Was /astrology/aries.jpg
    aiHint: 'astrology',
    category: 'astrology',
  },
  {
    id: 'astrology-1',
    altText: 'A flashcard image from the astrology category.',
    imageUrl: '/astrology/1.jpg', // Was /astrology/galaxy.jpg
    aiHint: 'astrology',
    category: 'astrology',
  },
  // AI/ML category
  {
    id: 'ai-ml-0',
    altText: 'A flashcard image from the ai-ml category.',
    imageUrl: '/ai-ml/0.jpg', // Was /ai-ml/network.jpg
    aiHint: 'ai-ml',
    category: 'ai-ml',
  },
  {
    id: 'ai-ml-1',
    altText: 'A flashcard image from the ai-ml category.',
    imageUrl: '/ai-ml/1.jpg', // Was /ai-ml/robot.jpg
    aiHint: 'ai-ml',
    category: 'ai-ml',
  },
  // Chess category
  {
    id: 'chess-0',
    altText: 'A flashcard image from the chess category.',
    imageUrl: '/chess/0.jpg', // Was /chess/knight.jpg
    aiHint: 'chess',
    category: 'chess',
  },
  {
    id: 'chess-1',
    altText: 'A flashcard image from the chess category.',
    imageUrl: '/chess/1.jpg', // Was /chess/board.jpg
    aiHint: 'chess',
    category: 'chess',
  },
  // Transport category
  {
    id: 'transport-0',
    altText: 'A flashcard image from the transport category.',
    imageUrl: '/transport/0.jpg', // Was /transport/car.jpg
    aiHint: 'transport',
    category: 'transport',
  },
  {
    id: 'transport-1',
    altText: 'A flashcard image from the transport category.',
    imageUrl: '/transport/1.jpg', // Was /transport/plane.jpg
    aiHint: 'transport',
    category: 'transport',
  },
  // Space category
  {
    id: 'space-0',
    altText: 'A flashcard image from the space category.',
    imageUrl: '/space/0.jpg', // Was /space/earth.jpg
    aiHint: 'space',
    category: 'space',
  },
  {
    id: 'space-1',
    altText: 'A flashcard image from the space category.',
    imageUrl: '/space/1.jpg', // Was /space/astronaut.jpg
    aiHint: 'space',
    category: 'space',
  },
];
