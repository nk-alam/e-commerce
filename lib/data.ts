import { Product, Recipe, Review } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Mango Pickle',
    description: 'Traditional Aam ka Achaar made with authentic Malda mangoes, mustard oil, and aromatic spices. A perfect blend of sweet, sour, and spicy flavors.',
    price: 299,
    originalPrice: 350,
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5490965/pexels-photo-5490965.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.9,
    reviews: 156,
    badge: 'Bestseller',
    badgeColor: 'bg-saffron',
    spiceLevel: 'Medium',
    inStock: true,
    category: 'Mango Pickles',
    ingredients: ['Raw Mangoes', 'Mustard Oil', 'Mustard Seeds', 'Fenugreek', 'Red Chili Powder', 'Turmeric', 'Salt'],
    nutritionalInfo: {
      calories: 45,
      fat: 3.2,
      carbs: 4.1,
      protein: 0.8,
      sodium: 890
    },
    shelfLife: '12 months',
    weight: '500g',
    jarType: 'Glass',
    isCustomizable: true
  },
  {
    id: '2',
    name: 'Mixed Vegetable Pickle',
    description: 'A delightful combination of seasonal vegetables including cauliflower, carrots, turnips, and green chilies, pickled with traditional Bengali spices.',
    price: 249,
    originalPrice: 299,
    image: 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.8,
    reviews: 203,
    badge: 'Organic',
    badgeColor: 'bg-green-600',
    spiceLevel: 'Hot',
    inStock: true,
    category: 'Vegetable Pickles',
    ingredients: ['Cauliflower', 'Carrots', 'Turnips', 'Green Chilies', 'Mustard Oil', 'Spices'],
    nutritionalInfo: {
      calories: 38,
      fat: 2.8,
      carbs: 3.5,
      protein: 1.2,
      sodium: 750
    },
    shelfLife: '10 months',
    weight: '500g',
    jarType: 'Glass'
  },
  {
    id: '3',
    name: 'Garlic Ginger Pickle',
    description: 'Immunity-boosting pickle made with fresh garlic and ginger, perfect for health-conscious pickle lovers. Known for its medicinal properties.',
    price: 199,
    originalPrice: 249,
    image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.7,
    reviews: 89,
    badge: 'Health+',
    badgeColor: 'bg-green-600',
    spiceLevel: 'Extra Hot',
    inStock: true,
    category: 'Health Pickles',
    ingredients: ['Fresh Garlic', 'Ginger', 'Mustard Oil', 'Red Chili', 'Turmeric', 'Salt'],
    nutritionalInfo: {
      calories: 52,
      fat: 4.1,
      carbs: 2.8,
      protein: 1.5,
      sodium: 680
    },
    shelfLife: '8 months',
    weight: '300g',
    jarType: 'Glass'
  },
  {
    id: '4',
    name: 'Lime & Chili Pickle',
    description: 'Tangy lime pickle with green chilies and mustard oil. A zesty accompaniment that adds a burst of flavor to any meal.',
    price: 179,
    originalPrice: 220,
    image: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 134,
    badge: 'Tangy',
    badgeColor: 'bg-yellow-600',
    spiceLevel: 'Mild',
    inStock: true,
    category: 'Citrus Pickles',
    ingredients: ['Fresh Limes', 'Green Chilies', 'Mustard Oil', 'Mustard Seeds', 'Turmeric'],
    shelfLife: '6 months',
    weight: '400g',
    jarType: 'Glass'
  },
  {
    id: '5',
    name: 'Traditional Cauliflower Pickle',
    description: 'Classic Bengali gobi ka achaar made with fresh cauliflower florets and traditional mustard seed paste.',
    price: 229,
    originalPrice: 279,
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    reviews: 67,
    badge: 'Traditional',
    badgeColor: 'bg-amber-600',
    spiceLevel: 'Medium',
    inStock: true,
    category: 'Vegetable Pickles',
    ingredients: ['Cauliflower', 'Mustard Seeds', 'Mustard Oil', 'Turmeric', 'Red Chili'],
    shelfLife: '10 months',
    weight: '500g',
    jarType: 'Glass'
  },
  {
    id: '6',
    name: 'Spicy Carrot Pickle',
    description: 'Crunchy carrots in a fiery spice blend, perfect for those who love intense heat and bold flavors.',
    price: 189,
    originalPrice: 229,
    image: 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.4,
    reviews: 92,
    badge: 'Spicy',
    badgeColor: 'bg-red-600',
    spiceLevel: 'Extra Hot',
    inStock: true,
    category: 'Vegetable Pickles',
    ingredients: ['Fresh Carrots', 'Red Chili Powder', 'Mustard Oil', 'Fenugreek', 'Asafoetida'],
    shelfLife: '12 months',
    weight: '450g',
    jarType: 'Glass'
  }
];

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Traditional Mango Pickle',
    description: 'Learn the authentic Malda-style mango pickle recipe passed down through generations.',
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookTime: '45 mins',
    servings: '8-10',
    difficulty: 'Medium',
    category: 'Traditional',
    ingredients: [
      '2 kg raw mangoes, cut into pieces',
      '200ml mustard oil',
      '100g mustard seeds, ground',
      '50g fenugreek seeds, ground',
      '100g red chili powder',
      '50g turmeric powder',
      'Salt to taste'
    ],
    instructions: [
      'Wash and dry the mangoes completely',
      'Cut mangoes into small pieces and mix with salt',
      'Let it rest for 2 hours to remove excess water',
      'Heat mustard oil until smoking, then cool',
      'Mix all ground spices with the oil',
      'Add the mango pieces and mix well',
      'Store in sterilized glass jars',
      'Keep in sunlight for 3-4 days, stirring daily'
    ],
    tips: [
      'Use only fresh, firm mangoes',
      'Ensure all utensils are completely dry',
      'Store in a cool, dry place after initial sun-drying'
    ],
    author: 'Grandma Kamala',
    rating: 4.9,
    reviews: 45
  },
  {
    id: '2',
    title: 'Quick Garlic Pickle',
    description: 'A fast and flavorful garlic pickle perfect for boosting immunity.',
    image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookTime: '20 mins',
    servings: '6-8',
    difficulty: 'Easy',
    category: 'Quick',
    ingredients: [
      '500g garlic cloves, peeled',
      '100ml mustard oil',
      '2 tbsp mustard seeds',
      '1 tbsp red chili powder',
      '1 tsp turmeric',
      'Salt to taste'
    ],
    instructions: [
      'Clean and dry garlic cloves thoroughly',
      'Heat oil and add mustard seeds',
      'Add garlic and sauté lightly',
      'Mix in all spices',
      'Cool completely before storing',
      'Store in airtight jars'
    ],
    author: 'Chef Ravi',
    rating: 4.7,
    reviews: 32
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    productId: '1',
    userName: 'Priya Sharma',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    title: 'Absolutely Authentic!',
    comment: 'This mango pickle tastes exactly like my grandmother used to make. The perfect balance of sweet, sour, and spicy. Will definitely order again!',
    verified: true,
    helpful: 23,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    userId: 'user2',
    productId: '1',
    userName: 'David Johnson',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    title: 'Amazing Quality',
    comment: 'Ordered from London and the packaging was excellent. The pickle arrived fresh and the taste is incredible. Worth every penny!',
    verified: true,
    helpful: 18,
    createdAt: '2024-01-10'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'All') return products;
  return products.filter(product => product.category === category);
};

export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

export const getReviewsByProductId = (productId: string): Review[] => {
  return reviews.filter(review => review.productId === productId);
};