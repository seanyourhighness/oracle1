import { Strain, Archetype } from './types';

export const NARRATIONS = [
  "Endurance is a form of devotion.",
  "The crown favors the steady hand.",
  "Rest is not retreat. It is strategy.",
  "Joy carried with grace sharpens the spirit.",
  "The roots run deep where the silence is kept.",
  "To know the path is to walk it without fear.",
  "The sun grants strength; the moon grants wisdom.",
  "A clear mind is the sharpest blade.",
  "Harmony is the discipline of the soul.",
  "Patience yields the richest harvest.",
  "Step lightly, but with purpose.",
  "The veil yields only to truth.",
  "Balance is the law of kings.",
  "Seek not the end, but the manner of the journey."
];

export const getRandomNarration = () => NARRATIONS[Math.floor(Math.random() * NARRATIONS.length)];

const ARCHETYPES: Record<string, Archetype> = {
  WARRIOR: { 
    name: "The Iron Sentinel", 
    sigil: { 
      viewBox: "0 0 24 24", 
      path: "M11 2h2v13l4-4 1.4 1.4L12 18.8l-6.4-6.4L7 11l4 4V2z M12 22c-5.5 0-10-4.5-10-10h2c0 4.4 3.6 8 8 8s8-3.6 8-8h2c0 5.5-4.5 10-10 10z" // Stylized Sword/Anchor hybrid
    }, 
    description: "Unshakeable focus. Boundless drive. You conquer the day." 
  },
  JESTER: { 
    name: "The Gilded Muse", 
    sigil: { 
      viewBox: "0 0 24 24", 
      path: "M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z M12 5.8l-1.3 3.8h-4l3.2 2.6-1.3 3.8 3.4-2.7 3.4 2.7-1.3-3.8 3.2-2.6h-4z" // Star/Spark
    }, 
    description: "Laughter is your shield. Connection is your power." 
  },
  SAGE: { 
    name: "The Silent Keeper", 
    sigil: { 
      viewBox: "0 0 24 24", 
      path: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" // All-seeing Eye
    }, 
    description: "Calm amidst chaos. You see what others miss." 
  },
  DREAMER: { 
    name: "The Star Navigator", 
    sigil: { 
      viewBox: "0 0 24 24", 
      path: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z M12 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1 1 1 0 0 1-1-1 1 1 0 0 1 1-1z" // Moon & Star
    }, 
    description: "The waking world fades. The inner realm awakens." 
  },
  ALCHEMIST: { 
    name: "The Verdant Alchemist", 
    sigil: { 
      viewBox: "0 0 24 24", 
      path: "M15 5h2V3h-2v2zM11 5H9V3h2v2zM12 2c4.42 0 8 3.58 8 8 0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.42 3.58-8 8-8zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-4 17h8v2H8v-2z" // Flask/Orb
    }, 
    description: "Transforming the mundane into the magical." 
  },
  NOMAD: { 
    name: "The Wandering Soul", 
    sigil: { 
      viewBox: "0 0 24 24", 
      path: "M12 2L14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z M12 6.5l-1.5 4-4 1.5 4 1.5 1.5 4 1.5-4 4-1.5-4-1.5z" // Compass Rose
    }, 
    description: "Home is the road. Peace is the horizon." 
  }
};

export const STRAINS: Strain[] = [
  {
    id: 'tropical-pressure',
    name: 'Tropical Pressure',
    url: 'https://yourhighnessla.com/products/tropical-pressure3-5',
    flavor: 'Exotic Fruit • Gas • Spice',
    terpenes: ['Myrcene', 'Limonene', 'Caryophyllene'],
    effects: ['Focused', 'Creative', 'Uplifted'],
    scores: { energy: 8, social: 6, calm: 3, rest: 1, fruity: 9, earthy: 3 },
    archetype: ARCHETYPES.WARRIOR
  },
  {
    id: 'syrup',
    name: 'Syrup',
    url: 'https://yourhighnessla.com/products/syrup-3-5-california',
    flavor: 'Sweet Berry • Maple • Earth',
    terpenes: ['Linalool', 'Myrcene', 'Humulene'],
    effects: ['Relaxed', 'Heavy', 'Euphoric'],
    scores: { energy: 2, social: 4, calm: 8, rest: 9, fruity: 8, earthy: 6 },
    archetype: ARCHETYPES.DREAMER
  },
  {
    id: 'sticky-mango',
    name: 'Sticky Mango',
    url: 'https://yourhighnessla.com/products/sticky-mango-3-5-california',
    flavor: 'Ripe Mango • Tropical • Pine',
    terpenes: ['Myrcene', 'Pinene', 'Limonene'],
    effects: ['Social', 'Giggly', 'Bright'],
    scores: { energy: 7, social: 9, calm: 4, rest: 2, fruity: 10, earthy: 1 },
    archetype: ARCHETYPES.JESTER
  },
  {
    id: 'skunkset',
    name: 'Skunkset',
    url: 'https://yourhighnessla.com/products/skunkset-3-5-copy',
    flavor: 'Skunk • Citrus • Fuel',
    terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    effects: ['Calm', 'Balanced', 'Content'],
    scores: { energy: 4, social: 5, calm: 7, rest: 5, fruity: 4, earthy: 9 },
    archetype: ARCHETYPES.NOMAD
  },
  {
    id: 'shirley-temple',
    name: 'Shirley Temple',
    url: 'https://yourhighnessla.com/products/shirley-temple',
    flavor: 'Cherry • Lemon-Lime • Sweet',
    terpenes: ['Limonene', 'Caryophyllene', 'Linalool'],
    effects: ['Uplifted', 'Tingly', 'Joyful'],
    scores: { energy: 6, social: 8, calm: 5, rest: 2, fruity: 9, earthy: 2 },
    archetype: ARCHETYPES.JESTER
  },
  {
    id: 'shady-apples',
    name: 'Shady Apples',
    url: 'https://yourhighnessla.com/products/shady-apples',
    flavor: 'Sour Apple • Diesel • Crisp',
    terpenes: ['Terpinolene', 'Caryophyllene', 'Ocimene'],
    effects: ['Alert', 'Focused', 'Euphoric'],
    scores: { energy: 9, social: 5, calm: 3, rest: 1, fruity: 7, earthy: 5 },
    archetype: ARCHETYPES.WARRIOR
  },
  {
    id: 'rainbow-berry',
    name: 'Rainbow Berry',
    url: 'https://yourhighnessla.com/products/rainbow-berry-3-5',
    flavor: 'Mixed Berries • Cream • Floral',
    terpenes: ['Linalool', 'Limonene', 'Myrcene'],
    effects: ['Balanced', 'Creative', 'Relaxed'],
    scores: { energy: 5, social: 7, calm: 6, rest: 3, fruity: 10, earthy: 1 },
    archetype: ARCHETYPES.ALCHEMIST
  },
  {
    id: 'lemon-jam',
    name: 'Lemon Jam',
    url: 'https://yourhighnessla.com/products/lemon-jam-3-5-grams',
    flavor: 'Zesty Lemon • Sweet • Candy',
    terpenes: ['Limonene', 'Valencene', 'Caryophyllene'],
    effects: ['Energetic', 'Happy', 'Talkative'],
    scores: { energy: 10, social: 8, calm: 2, rest: 0, fruity: 10, earthy: 0 },
    archetype: ARCHETYPES.WARRIOR
  },
  {
    id: 'coffin-syrup',
    name: 'Coffin Syrup',
    url: 'https://yourhighnessla.com/products/coffin-syrup',
    flavor: 'Dark Berry • Cough Syrup • Earth',
    terpenes: ['Myrcene', 'Caryophyllene', 'Pinene'],
    effects: ['Sedated', 'Pain Relief', 'Sleepy'],
    scores: { energy: 1, social: 2, calm: 7, rest: 10, fruity: 5, earthy: 8 },
    archetype: ARCHETYPES.DREAMER
  },
  {
    id: 'chroma',
    name: 'Chroma',
    url: 'https://yourhighnessla.com/products/chroma-3-5-grams',
    flavor: 'Floral • Mint • Spice',
    terpenes: ['Linalool', 'Limonene', 'Menthol'],
    effects: ['Clear', 'Visual', 'Calm'],
    scores: { energy: 6, social: 4, calm: 8, rest: 4, fruity: 4, earthy: 5 },
    archetype: ARCHETYPES.SAGE
  },
  {
    id: 'bubble-blast',
    name: 'Bubble Blast',
    url: 'https://yourhighnessla.com/products/bubble-blast-3-5',
    flavor: 'Bubblegum • Sweet • Pink',
    terpenes: ['Caryophyllene', 'Limonene', 'Humulene'],
    effects: ['Playful', 'Relaxed', 'Happy'],
    scores: { energy: 5, social: 9, calm: 5, rest: 3, fruity: 9, earthy: 1 },
    archetype: ARCHETYPES.JESTER
  },
  {
    id: 'boba-milk-tea',
    name: 'Boba Milk Tea',
    url: 'https://yourhighnessla.com/products/boba-milk-tea-3-5',
    flavor: 'Creamy • Tea • Sweet Spices',
    terpenes: ['Caryophyllene', 'Linalool', 'Limonene'],
    effects: ['Comforting', 'Relaxed', 'Mellow'],
    scores: { energy: 3, social: 5, calm: 9, rest: 6, fruity: 3, earthy: 6 },
    archetype: ARCHETYPES.SAGE
  },
  {
    id: 'bluephoria',
    name: 'Bluephoria',
    url: 'https://yourhighnessla.com/products/bluephoria-3-5',
    flavor: 'Blueberry • Muffin • Vanilla',
    terpenes: ['Myrcene', 'Caryophyllene', 'Pinene'],
    effects: ['Euphoric', 'Dreamy', 'Relaxed'],
    scores: { energy: 4, social: 5, calm: 8, rest: 7, fruity: 8, earthy: 3 },
    archetype: ARCHETYPES.ALCHEMIST
  },
  {
    id: 'berry-blizzard',
    name: 'Berry Blizzard',
    url: 'https://yourhighnessla.com/products/berry-blizzard-3-5-california',
    flavor: 'Icy Berry • Menthol • Sweet',
    terpenes: ['Limonene', 'Menthol', 'Myrcene'],
    effects: ['Cooling', 'Refreshing', 'Calm'],
    scores: { energy: 6, social: 6, calm: 7, rest: 4, fruity: 8, earthy: 2 },
    archetype: ARCHETYPES.NOMAD
  }
];

export function calculateOutcome(selections: any): Strain {
  let bestStrain = STRAINS[0];
  let maxScore = -1;

  STRAINS.forEach(strain => {
    let score = 0;
    const { primary, path, omen, seal } = selections;

    // 1. Primary Choice
    if (primary === 'FORTITUDE') score += strain.scores.energy * 2;
    if (primary === 'MERRIMENT') score += strain.scores.social * 2;
    if (primary === 'TRANQUILITY') score += strain.scores.calm * 2;
    if (primary === 'REST') score += strain.scores.rest * 2;

    // 2. Path (Context)
    if (path === 'COURT') score += strain.scores.social;
    if (path === 'ROAD') score += strain.scores.energy;
    if (path === 'CLOISTER') score += (strain.scores.calm + strain.scores.rest) / 2;

    // 3. Omen (Profile)
    if (omen === 'ORCHARD') score += strain.scores.fruity * 1.5;
    if (omen === 'RELIQUARY') score += strain.scores.earthy * 1.5;

    // 4. Seal (Timing)
    // Swift Hour favors energy/social, Late Hour favors calm/rest
    if (seal === 'SWIFT') score += (strain.scores.energy + strain.scores.social);
    if (seal === 'LATE') score += (strain.scores.calm + strain.scores.rest);

    // Add slight randomization to break ties
    score += Math.random() * 0.5;

    if (score > maxScore) {
      maxScore = score;
      bestStrain = strain;
    }
  });

  return bestStrain;
}
