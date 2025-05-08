
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

// This array will be used to derive both image and text flashcards.
const baseFlashcards: Omit<Flashcard, 'type' | 'id'> & { baseId: string; displayText: string; imageUrl: string; altText: string; aiHint: string }[] = [
  // Fruit category - Set 1
  {
    baseId: 'fruit-set1-apple',
    altText: 'A flashcard image of a red apple.',
    imageUrl: '/fruit/set1/0.png', // Corrected path
    aiHint: 'apple',
    category: 'fruit',
    set: 'set1',
    displayText: 'Apple',
  },
  {
    baseId: 'fruit-set1-banana',
    altText: 'A flashcard image of a banana.',
    imageUrl: '/fruit/set1/1.jpg',
    aiHint: 'banana',
    category: 'fruit',
    set: 'set1',
    displayText: 'Banana',
  },
  {
    baseId: 'fruit-set1-orange',
    altText: 'A flashcard image of an orange.',
    imageUrl: '/fruit/set1/2.jpg',
    aiHint: 'orange',
    category: 'fruit',
    set: 'set1',
    displayText: 'Orange',
  },
  {
    baseId: 'fruit-set1-grapes',
    altText: 'A flashcard image of grapes.',
    imageUrl: '/fruit/set1/3.jpeg',
    aiHint: 'grapes',
    category: 'fruit',
    set: 'set1',
    displayText: 'Grapes',
  },
  {
    baseId: 'fruit-set1-strawberry',
    altText: 'A flashcard image of a strawberry.',
    imageUrl: '/fruit/set1/4.png',
    aiHint: 'strawberry',
    category: 'fruit',
    set: 'set1',
    displayText: 'Strawberry',
  },
  // Fruit category - Set 2
  {
    baseId: 'fruit-set2-pear',
    altText: 'A flashcard image of a pear.',
    imageUrl: '/fruit/set2/6.jpg', 
    aiHint: 'pear',
    category: 'fruit',
    set: 'set2',
    displayText: 'Pear',
  },
  {
    baseId: 'fruit-set2-mango',
    altText: 'A flashcard image of a mango.',
    imageUrl: '/fruit/set2/7.jpg', 
    aiHint: 'mango',
    category: 'fruit',
    set: 'set2',
    displayText: 'Mango',
  },
  {
    baseId: 'fruit-set2-pineapple',
    altText: 'A flashcard image of a pineapple.',
    imageUrl: '/fruit/set2/8.jpg', 
    aiHint: 'pineapple',
    category: 'fruit',
    set: 'set2',
    displayText: 'Pineapple',
  },
  {
    baseId: 'fruit-set2-kiwi',
    altText: 'A flashcard image of a kiwi.',
    imageUrl: '/fruit/set2/9.jpg', 
    aiHint: 'kiwi',
    category: 'fruit',
    set: 'set2',
    displayText: 'Kiwi',
  },
  {
    baseId: 'fruit-set2-watermelon',
    altText: 'A flashcard image of a watermelon.',
    imageUrl: '/fruit/set2/10.jpg', 
    aiHint: 'watermelon',
    category: 'fruit',
    set: 'set2',
    displayText: 'Watermelon',
  },
  // Fruit category - Set 3
  {
    baseId: 'fruit-set3-cherries',
    altText: 'A flashcard image of cherries.',
    imageUrl: '/fruit/set3/0.jpg', 
    aiHint: 'cherries',
    category: 'fruit',
    set: 'set3',
    displayText: 'Cherries',
  },

  // Vegetable category - Set 1
  {
    baseId: 'vegetable-set1-carrots',
    altText: 'A flashcard image of carrots.',
    imageUrl: '/vegetable/set1/carrots.jpg',
    aiHint: 'carrots',
    category: 'vegetable',
    set: 'set1',
    displayText: 'Carrots',
  },
  {
    baseId: 'vegetable-set1-beetroot',
    altText: 'A flashcard image of beetroot.',
    imageUrl: '/vegetable/set1/beetroot.jpg',
    aiHint: 'beetroot',
    category: 'vegetable',
    set: 'set1',
    displayText: 'Beetroot',
  },
  {
    baseId: 'vegetable-set1-capsicum',
    altText: 'A flashcard image of capsicum.',
    imageUrl: '/vegetable/set1/capsicum.jpg',
    aiHint: 'capsicum',
    category: 'vegetable',
    set: 'set1',
    displayText: 'Capsicum',
  },
  {
    baseId: 'vegetable-set1-eggplant',
    altText: 'A flashcard image of eggplant.',
    imageUrl: '/vegetable/set1/eggplant.jpg',
    aiHint: 'eggplant',
    category: 'vegetable',
    set: 'set1',
    displayText: 'Eggplant',
  },
  {
    baseId: 'vegetable-set1-cucumbers',
    altText: 'A flashcard image of cucumbers.',
    imageUrl: '/vegetable/set1/cucumbers.jpg',
    aiHint: 'cucumbers',
    category: 'vegetable',
    set: 'set1',
    displayText: 'Cucumbers',
  },

  // Astrology category - Set 1
  {
    baseId: 'astrology-set1-aries',
    altText: 'A flashcard image of the Aries zodiac symbol.',
    imageUrl: '/astrology/set1/0.jpg', 
    aiHint: 'Aries symbol',
    category: 'astrology',
    set: 'set1',
    displayText: 'Aries',
  },
  {
    baseId: 'astrology-set1-taurus',
    altText: 'A flashcard image of the Taurus zodiac symbol.',
    imageUrl: '/astrology/set1/1.jpg', 
    aiHint: 'Taurus symbol',
    category: 'astrology',
    set: 'set1',
    displayText: 'Taurus',
  },
  {
    baseId: 'astrology-set1-gemini',
    altText: 'A flashcard image of the Gemini zodiac symbol.',
    imageUrl: '/astrology/set1/2.jpg', 
    aiHint: 'Gemini symbol',
    category: 'astrology',
    set: 'set1',
    displayText: 'Gemini',
  },
  {
    baseId: 'astrology-set1-cancer',
    altText: 'A flashcard image of the Cancer zodiac symbol.',
    imageUrl: '/astrology/set1/3.jpg', 
    aiHint: 'Cancer symbol',
    category: 'astrology',
    set: 'set1',
    displayText: 'Cancer',
  },
  {
    baseId: 'astrology-set1-leo',
    altText: 'A flashcard image of the Leo zodiac symbol.',
    imageUrl: '/astrology/set1/4.jpg', 
    aiHint: 'Leo symbol',
    category: 'astrology',
    set: 'set1',
    displayText: 'Leo',
  },


  // AI/ML category - Set 1
  {
    baseId: 'ai-ml-set1-robot',
    altText: 'A flashcard image of a friendly robot.',
    imageUrl: '/ai-ml/set1/0.jpg', 
    aiHint: 'robot',
    category: 'ai-ml',
    set: 'set1',
    displayText: 'Robot',
  },
  {
    baseId: 'ai-ml-set1-algorithm',
    altText: 'A flashcard image representing a simple algorithm flowchart.',
    imageUrl: '/ai-ml/set1/1.jpg', 
    aiHint: 'algorithm flowchart',
    category: 'ai-ml',
    set: 'set1',
    displayText: 'Algorithm',
  },
  {
    baseId: 'ai-ml-set1-neuralnetwork',
    altText: 'A flashcard image of a neural network diagram.',
    imageUrl: '/ai-ml/set1/2.jpg', 
    aiHint: 'neural network',
    category: 'ai-ml',
    set: 'set1',
    displayText: 'Neural Network',
  },
  {
    baseId: 'ai-ml-set1-datacenter',
    altText: 'A flashcard image of a server rack in a data center.',
    imageUrl: '/ai-ml/set1/3.jpg', 
    aiHint: 'data center server',
    category: 'ai-ml',
    set: 'set1',
    displayText: 'Data',
  },
  {
    baseId: 'ai-ml-set1-chip',
    altText: 'A flashcard image of a computer chip.',
    imageUrl: '/ai-ml/set1/4.jpg', 
    aiHint: 'computer chip',
    category: 'ai-ml',
    set: 'set1',
    displayText: 'Processor',
  },

  // Chess category - Set 1
  {
    baseId: 'chess-set1-king',
    altText: 'A flashcard image of a chess king piece.',
    imageUrl: '/chess/set1/0.jpg', 
    aiHint: 'chess king',
    category: 'chess',
    set: 'set1',
    displayText: 'King',
  },
  {
    baseId: 'chess-set1-queen',
    altText: 'A flashcard image of a chess queen piece.',
    imageUrl: '/chess/set1/1.jpg', 
    aiHint: 'chess queen',
    category: 'chess',
    set: 'set1',
    displayText: 'Queen',
  },
  {
    baseId: 'chess-set1-rook',
    altText: 'A flashcard image of a chess rook piece.',
    imageUrl: '/chess/set1/2.jpg', 
    aiHint: 'chess rook',
    category: 'chess',
    set: 'set1',
    displayText: 'Rook',
  },
  {
    baseId: 'chess-set1-bishop',
    altText: 'A flashcard image of a chess bishop piece.',
    imageUrl: '/chess/set1/3.jpg', 
    aiHint: 'chess bishop',
    category: 'chess',
    set: 'set1',
    displayText: 'Bishop',
  },
  {
    baseId: 'chess-set1-knight',
    altText: 'A flashcard image of a chess knight piece.',
    imageUrl: '/chess/set1/4.jpg', 
    aiHint: 'chess knight',
    category: 'chess',
    set: 'set1',
    displayText: 'Knight',
  },

  // Transport category - Set 1
  {
    baseId: 'transport-set1-car',
    altText: 'A flashcard image of a red car.',
    imageUrl: '/transport/set1/0.jpg', 
    aiHint: 'red car',
    category: 'transport',
    set: 'set1',
    displayText: 'Car',
  },
  {
    baseId: 'transport-set1-bus',
    altText: 'A flashcard image of a yellow school bus.',
    imageUrl: '/transport/set1/1.jpg', 
    aiHint: 'school bus',
    category: 'transport',
    set: 'set1',
    displayText: 'Bus',
  },
  {
    baseId: 'transport-set1-train',
    altText: 'A flashcard image of a passenger train.',
    imageUrl: '/transport/set1/2.jpg', 
    aiHint: 'train',
    category: 'transport',
    set: 'set1',
    displayText: 'Train',
  },
  {
    baseId: 'transport-set1-airplane',
    altText: 'A flashcard image of an airplane.',
    imageUrl: '/transport/set1/3.jpg', 
    aiHint: 'airplane',
    category: 'transport',
    set: 'set1',
    displayText: 'Airplane',
  },
  {
    baseId: 'transport-set1-bicycle',
    altText: 'A flashcard image of a bicycle.',
    imageUrl: '/transport/set1/4.jpg', 
    aiHint: 'bicycle',
    category: 'transport',
    set: 'set1',
    displayText: 'Bicycle',
  },


  // Space category - Set 1
  {
    baseId: 'space-set1-earth',
    altText: 'A flashcard image of planet Earth.',
    imageUrl: '/space/set1/0.jpg', 
    aiHint: 'planet earth',
    category: 'space',
    set: 'set1',
    displayText: 'Earth',
  },
  {
    baseId: 'space-set1-moon',
    altText: "A flashcard image of Earth's moon.",
    imageUrl: '/space/set1/1.jpg', 
    aiHint: 'moon',
    category: 'space',
    set: 'set1',
    displayText: 'Moon',
  },
  {
    baseId: 'space-set1-sun',
    altText: 'A flashcard image of the Sun.',
    imageUrl: '/space/set1/2.jpg', 
    aiHint: 'sun star',
    category: 'space',
    set: 'set1',
    displayText: 'Sun',
  },
  {
    baseId: 'space-set1-mars',
    altText: 'A flashcard image of planet Mars.',
    imageUrl: '/space/set1/3.jpg', 
    aiHint: 'planet mars',
    category: 'space',
    set: 'set1',
    displayText: 'Mars',
  },
  {
    baseId: 'space-set1-stars',
    altText: 'A flashcard image of a starry night sky.',
    imageUrl: '/space/set1/4.jpg', 
    aiHint: 'stars night sky',
    category: 'space',
    set: 'set1',
    displayText: 'Stars',
  },

];

export const flashcards: Flashcard[] = baseFlashcards.reduce((acc: Flashcard[], card) => {
  // Add image card
  acc.push({
    id: `${card.baseId}-image`, // Ensure unique ID for image card
    altText: card.altText,
    imageUrl: card.imageUrl,
    aiHint: card.aiHint,
    category: card.category,
    set: card.set,
    type: 'image',
    displayText: undefined, 
  });

  // Add text card
  if (card.displayText) {
    acc.push({
      id: `${card.baseId}-text`, // Ensure unique ID for text card
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
