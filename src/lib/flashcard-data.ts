
export interface Flashcard {
  id: string;
  category: string;
  set: string; 
  type: 'image' | 'text';
  displayText?: string; // Mandatory for text type, undefined for image type
  imageUrl?: string; // Mandatory for image type, undefined for text type
  altText?: string; // Mandatory for image type, undefined for text type
  aiHint?: string; // Optional, more relevant for image type
}

const originalFlashcards: Omit<Flashcard, 'type'> & { displayText: string; imageUrl: string; altText: string; aiHint: string }[] = [
  // Fruit category - Set 1
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
    id: 'fruit-set1-3',
    altText: 'A flashcard image of grapes.',
    imageUrl: '/fruit/set1/3.jpeg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set1',
    displayText: 'Grapes',
  },
  {
    id: 'fruit-set1-4',
    altText: 'A flashcard image of a strawberry.',
    imageUrl: '/fruit/set1/4.png',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set1',
    displayText: 'Strawberry',
  },
  // Fruit category - Set 2
  {
    id: 'fruit-set2-0',
    altText: 'A flashcard image of a pear.',
    imageUrl: '/fruit/set2/6.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
    displayText: 'Pear',
  },
  {
    id: 'fruit-set2-1',
    altText: 'A flashcard image of a mango.',
    imageUrl: '/fruit/set2/7.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
    displayText: 'Mango',
  },
  {
    id: 'fruit-set2-2',
    altText: 'A flashcard image of a pineapple.',
    imageUrl: '/fruit/set2/8.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
    displayText: 'Pineapple',
  },
  {
    id: 'fruit-set2-3',
    altText: 'A flashcard image of a kiwi.',
    imageUrl: '/fruit/set2/9.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
    displayText: 'Kiwi',
  },
  {
    id: 'fruit-set2-4',
    altText: 'A flashcard image of a watermelon.',
    imageUrl: '/fruit/set2/10.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set2',
    displayText: 'Watermelon',
  },
  // Fruit category - Set 3
  {
    id: 'fruit-set3-0',
    altText: 'A flashcard image of cherries.',
    imageUrl: '/fruit/set3/0.jpg',
    aiHint: 'fruit',
    category: 'fruit',
    set: 'set3',
    displayText: 'Cherries',
  },

  // Vegetable category - Set 1
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
    id: 'vegetable-set1-3',
    altText: 'A flashcard image of eggplant.',
    imageUrl: '/vegetable/set1/eggplant.jpg',
    aiHint: 'vegetable',
    category: 'vegetable',
    set: 'set1',
    displayText: 'Eggplant',
  },
  {
    id: 'vegetable-set1-4',
    altText: 'A flashcard image of cucumbers.',
    imageUrl: '/vegetable/set1/cucumbers.jpg',
    aiHint: 'vegetable',
    category: 'vegetable',
    set: 'set1',
    displayText: 'Cucumbers',
  },

  // Astrology category - Set 1
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

  // AI/ML category - Set 1
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

  // Chess category - Set 1
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

  // Transport category - Set 1
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

  // Space category - Set 1
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

export const flashcards: Flashcard[] = originalFlashcards.reduce((acc: Flashcard[], card) => {
  // Add image card
  acc.push({
    id: card.id,
    altText: card.altText,
    imageUrl: card.imageUrl,
    aiHint: card.aiHint,
    category: card.category,
    set: card.set,
    type: 'image',
    displayText: undefined, // Image cards do not display text directly
  });

  // Add text card
  if (card.displayText) {
    acc.push({
      id: `${card.id}-text`,
      displayText: card.displayText,
      category: card.category,
      set: card.set,
      type: 'text',
      imageUrl: undefined,
      altText: undefined,
      aiHint: undefined,
    });
  }
  return acc;
}, []);
