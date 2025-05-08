
export interface Flashcard {
  id: string;
  altText: string;
  imageUrl: string;
  aiHint: string;
  category: string;
  set: string; // e.g., "set1", "set2"
}

// Assumes images are named 0.jpg, 1.jpg, etc. (with original extensions preserved)
// in corresponding lowercase category and set folders under /public/
// For example:
// - /public/fruit/set1/0.jpg
// - /public/fruit/set1/1.jpg
// - /public/vegetable/set1/0.jpg
// Each set ideally contains 5 images. If a category has more, they are split into multiple sets.
// If a category has fewer, they form a single set with the available images.

export const flashcards: Flashcard[] = [
  // Fruit category
  // Set 1
  {
    id: 'fruit-set1-0',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/set1/0.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set1',
  },
  {
    id: 'fruit-set1-1',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/set1/1.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set1',
  },
  {
    id: 'fruit-set1-2',
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/set1/2.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set1',
  },
  {
    id: 'fruit-set1-3', // Was fruit/3.jpeg
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/set1/3.jpeg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set1',
  },
  {
    id: 'fruit-set1-4', // Was fruit/4.png
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/set1/4.png',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set1',
  },
  // Set 2
  {
    id: 'fruit-set2-0', // Was fruit/5.jpg
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/set2/0.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
  },
  {
    id: 'fruit-set2-1', // Was fruit/6.jpg
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/set2/1.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
  },
  {
    id: 'fruit-set2-2', // Was fruit/7.jpg
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/set2/2.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
  },
  {
    id: 'fruit-set2-3', // Was fruit/8.jpg
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/set2/3.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
  },
  {
    id: 'fruit-set2-4', // Was fruit/9.jpg
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/set2/4.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
  },
  // Set 3
  {
    id: 'fruit-set3-0', // Was fruit/10.jpg
    altText: 'A flashcard image from the fruit category.',
    imageUrl: '/fruit/set3/0.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set3',
  },

  // Vegetable category
  // Set 1
  {
    id: 'vegetable-set1-0',
    altText: 'A flashcard image from the vegetable category.',
    imageUrl: '/vegetable/set1/0.jpg',
    aiHint: 'vegetable',
    category: 'vegetable',
    set: 'set1',
  },
  {
    id: 'vegetable-set1-1',
    altText: 'A flashcard image from the vegetable category.',
    imageUrl: '/vegetable/set1/1.jpg',
    aiHint: 'vegetable',
    category: 'vegetable',
    set: 'set1',
  },
  {
    id: 'vegetable-set1-2',
    altText: 'A flashcard image from the vegetable category.',
    imageUrl: '/vegetable/set1/2.jpg',
    aiHint: 'vegetable',
    category: 'vegetable',
    set: 'set1',
  },

  // Astrology category
  // Set 1
  {
    id: 'astrology-set1-0',
    altText: 'A flashcard image from the astrology category.',
    imageUrl: '/astrology/set1/0.jpg',
    aiHint: 'astrology',
    category: 'astrology',
    set: 'set1',
  },
  {
    id: 'astrology-set1-1',
    altText: 'A flashcard image from the astrology category.',
    imageUrl: '/astrology/set1/1.jpg',
    aiHint: 'astrology',
    category: 'astrology',
    set: 'set1',
  },

  // AI/ML category
  // Set 1
  {
    id: 'ai-ml-set1-0',
    altText: 'A flashcard image from the ai-ml category.',
    imageUrl: '/ai-ml/set1/0.jpg',
    aiHint: 'ai-ml',
    category: 'ai-ml',
    set: 'set1',
  },
  {
    id: 'ai-ml-set1-1',
    altText: 'A flashcard image from the ai-ml category.',
    imageUrl: '/ai-ml/set1/1.jpg',
    aiHint: 'ai-ml',
    category: 'ai-ml',
    set: 'set1',
  },

  // Chess category
  // Set 1
  {
    id: 'chess-set1-0',
    altText: 'A flashcard image from the chess category.',
    imageUrl: '/chess/set1/0.jpg',
    aiHint: 'chess',
    category: 'chess',
    set: 'set1',
  },
  {
    id: 'chess-set1-1',
    altText: 'A flashcard image from the chess category.',
    imageUrl: '/chess/set1/1.jpg',
    aiHint: 'chess',
    category: 'chess',
    set: 'set1',
  },

  // Transport category
  // Set 1
  {
    id: 'transport-set1-0',
    altText: 'A flashcard image from the transport category.',
    imageUrl: '/transport/set1/0.jpg',
    aiHint: 'transport',
    category: 'transport',
    set: 'set1',
  },
  {
    id: 'transport-set1-1',
    altText: 'A flashcard image from the transport category.',
    imageUrl: '/transport/set1/1.jpg',
    aiHint: 'transport',
    category: 'transport',
    set: 'set1',
  },

  // Space category
  // Set 1
  {
    id: 'space-set1-0',
    altText: 'A flashcard image from the space category.',
    imageUrl: '/space/set1/0.jpg',
    aiHint: 'space',
    category: 'space',
    set: 'set1',
  },
  {
    id: 'space-set1-1',
    altText: 'A flashcard image from the space category.',
    imageUrl: '/space/set1/1.jpg',
    aiHint: 'space',
    category: 'space',
    set: 'set1',
  },
];
