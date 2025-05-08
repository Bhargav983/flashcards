
export interface Flashcard {
  id: string;
  altText: string;
  imageUrl: string;
  aiHint: string;
  category: string;
  set: string; // e.g., "set1", "set2"
  displayText?: string; // Text to be displayed with the flashcard
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
    altText: 'A flashcard image of an apple.',
    imageUrl: '/fruit/set1/0.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set1',
    displayText: 'Apple',
  },
  {
    id: 'fruit-set1-1',
    altText: 'A flashcard image of a banana.',
    imageUrl: '/fruit/set1/1.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set1',
    displayText: 'Banana',
  },
  {
    id: 'fruit-set1-2',
    altText: 'A flashcard image of an orange.',
    imageUrl: '/fruit/set1/2.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set1',
    displayText: 'Orange',
  },
  {
    id: 'fruit-set1-3', // Was fruit/3.jpeg
    altText: 'A flashcard image of grapes.',
    imageUrl: '/fruit/set1/3.jpeg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set1',
    displayText: 'Grapes',
  },
  {
    id: 'fruit-set1-4', // Was fruit/4.png
    altText: 'A flashcard image of a strawberry.',
    imageUrl: '/fruit/set1/4.png',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set1',
    displayText: 'Strawberry',
  },
  // Set 2
  {
    id: 'fruit-set2-0', // Was fruit/5.jpg
    altText: 'A flashcard image of a pear.',
    imageUrl: '/fruit/set2/6.jpg', // Note: Source data had 6.jpg for this item, previously said fruit/5.jpg
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
    displayText: 'Pear',
  },
  {
    id: 'fruit-set2-1', // Was fruit/6.jpg
    altText: 'A flashcard image of a mango.',
    imageUrl: '/fruit/set2/7.jpg', // Note: Source data had 7.jpg
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
    displayText: 'Mango',
  },
  {
    id: 'fruit-set2-2', // Was fruit/7.jpg
    altText: 'A flashcard image of a pineapple.',
    imageUrl: '/fruit/set2/8.jpg', // Note: Source data had 8.jpg
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
    displayText: 'Pineapple',
  },
  {
    id: 'fruit-set2-3', // Was fruit/8.jpg
    altText: 'A flashcard image of a kiwi.',
    imageUrl: '/fruit/set2/9.jpg', // Note: Source data had 9.jpg
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
    displayText: 'Kiwi',
  },
  {
    id: 'fruit-set2-4', // Was fruit/9.jpg
    altText: 'A flashcard image of a watermelon.',
    imageUrl: '/fruit/set2/10.jpg', // Note: Source data had 10.jpg
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
    displayText: 'Watermelon',
  },
  // Set 3
  {
    id: 'fruit-set3-0', // Was fruit/10.jpg
    altText: 'A flashcard image of cherries.',
    imageUrl: '/fruit/set3/0.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set3',
    displayText: 'Cherries',
  },

  // Vegetable category
  // Set 1
  {
    id: 'vegetable-set1-0',
    altText: 'A flashcard image of carrots.',
    imageUrl: '/vegetable/set1/carrots.jpg',
    aiHint: 'vegetable',
    category: 'vegetable',
    set: 'set1',
    displayText: 'Carrots',
  },
  {
    id: 'vegetable-set1-1',
    altText: 'A flashcard image of beetroot.',
    imageUrl: '/vegetable/set1/beetroot.jpg',
    aiHint: 'vegetable',
    category: 'vegetable',
    set: 'set1',
    displayText: 'Beetroot',
  },
  {
    id: 'vegetable-set1-2',
    altText: 'A flashcard image of capsicum.',
    imageUrl: '/vegetable/set1/capsicum.jpg',
    aiHint: 'vegetable',
    category: 'vegetable',
    set: 'set1',
    displayText: 'Capsicum',
  },
  {
    id: 'vegetable-set1-3', // Corrected ID from vegetable-set1-2
    altText: 'A flashcard image of eggplant.',
    imageUrl: '/vegetable/set1/eggplant.jpg',
    aiHint: 'vegetable',
    category: 'vegetable',
    set: 'set1',
    displayText: 'Eggplant',
  },
  {
    id: 'vegetable-set1-4', // Corrected ID from vegetable-set1-2
    altText: 'A flashcard image of cucumbers.',
    imageUrl: '/vegetable/set1/cucumbers.jpg',
    aiHint: 'vegetable',
    category: 'vegetable',
    set: 'set1',
    displayText: 'Cucumbers',
  },

  // Astrology category
  // Set 1
  {
    id: 'astrology-set1-0',
    altText: 'A flashcard image from the astrology category.',
    imageUrl: '/astrology/set1/0.jpg',
    aiHint: 'astrology symbol',
    category: 'astrology',
    set: 'set1',
    displayText: 'Aries',
  },
  {
    id: 'astrology-set1-1',
    altText: 'A flashcard image from the astrology category.',
    imageUrl: '/astrology/set1/1.jpg',
    aiHint: 'astrology symbol',
    category: 'astrology',
    set: 'set1',
    displayText: 'Taurus',
  },

  // AI/ML category
  // Set 1
  {
    id: 'ai-ml-set1-0',
    altText: 'A flashcard image from the ai-ml category.',
    imageUrl: '/ai-ml/set1/0.jpg',
    aiHint: 'robot',
    category: 'ai-ml',
    set: 'set1',
    displayText: 'Robot',
  },
  {
    id: 'ai-ml-set1-1',
    altText: 'A flashcard image from the ai-ml category.',
    imageUrl: '/ai-ml/set1/1.jpg',
    aiHint: 'neural network',
    category: 'ai-ml',
    set: 'set1',
    displayText: 'Algorithm',
  },

  // Chess category
  // Set 1
  {
    id: 'chess-set1-0',
    altText: 'A flashcard image from the chess category.',
    imageUrl: '/chess/set1/0.jpg',
    aiHint: 'chess piece',
    category: 'chess',
    set: 'set1',
    displayText: 'King',
  },
  {
    id: 'chess-set1-1',
    altText: 'A flashcard image from the chess category.',
    imageUrl: '/chess/set1/1.jpg',
    aiHint: 'chess piece',
    category: 'chess',
    set: 'set1',
    displayText: 'Queen',
  },

  // Transport category
  // Set 1
  {
    id: 'transport-set1-0',
    altText: 'A flashcard image from the transport category.',
    imageUrl: '/transport/set1/0.jpg',
    aiHint: 'vehicle',
    category: 'transport',
    set: 'set1',
    displayText: 'Car',
  },
  {
    id: 'transport-set1-1',
    altText: 'A flashcard image from the transport category.',
    imageUrl: '/transport/set1/1.jpg',
    aiHint: 'vehicle',
    category: 'transport',
    set: 'set1',
    displayText: 'Bus',
  },

  // Space category
  // Set 1
  {
    id: 'space-set1-0',
    altText: 'A flashcard image from the space category.',
    imageUrl: '/space/set1/0.jpg',
    aiHint: 'planet',
    category: 'space',
    set: 'set1',
    displayText: 'Earth',
  },
  {
    id: 'space-set1-1',
    altText: 'A flashcard image from the space category.',
    imageUrl: '/space/set1/1.jpg',
    aiHint: 'celestial body',
    category: 'space',
    set: 'set1',
    displayText: 'Moon',
  },
];
