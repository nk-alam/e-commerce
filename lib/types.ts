export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  badge?: string;
  badgeColor?: string;
  spiceLevel: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  inStock: boolean;
  category: string;
  ingredients: string[];
  nutritionalInfo?: {
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
    sodium: number;
  };
  shelfLife: string;
  weight: string;
  jarType: 'Glass' | 'Plastic';
  isCustomizable?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
  customizations?: Record<string, any>;
  jarType?: 'Glass' | 'Plastic';
  spiceLevel?: string;
}

export interface User {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  avatar?: string;
  addresses?: Address[];
  preferences?: {
    currency: string;
    spiceLevel: string;
    notifications: boolean;
  };
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  category: string;
  ingredients: string[];
  instructions: string[];
  tips?: string[];
  nutritionalInfo?: {
    calories: number;
    servings: number;
  };
  author: string;
  rating: number;
  reviews: number;
}

export interface CustomRecipe {
  baseIngredient: string;
  spiceLevel: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  oilType: 'Mustard' | 'Sesame' | 'Mixed';
  additionalIngredients: string[];
  jarType: 'Glass' | 'Plastic';
  quantity: number;
  specialInstructions?: string;
}