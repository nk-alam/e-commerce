'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'sonner';

interface CartItem {
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
  weight?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  itemCount: number;
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.productId === action.payload.productId && 
        item.jarType === action.payload.jarType &&
        item.spiceLevel === action.payload.spiceLevel
      );
      
      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      return calculateTotals({ ...state, items: updatedItems });
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return calculateTotals({ ...state, items: updatedItems });
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      return calculateTotals({ ...state, items: updatedItems });
    }
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0, subtotal: 0, tax: 0, shipping: 0, itemCount: 0 };
    case 'LOAD_CART':
      return calculateTotals({ ...state, items: action.payload });
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

function calculateTotals(state: CartState): CartState {
  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 999 ? 0 : 99; // Free shipping above ₹999
  const total = subtotal + tax + shipping;
  
  return { ...state, subtotal, total, tax, shipping, itemCount };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    itemCount: 0,
    isOpen: false,
  });

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('shahi-pickle-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('shahi-pickle-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    const cartItem: CartItem = {
      ...item,
      id: `${item.productId}-${item.jarType || 'glass'}-${item.spiceLevel || 'medium'}-${Date.now()}`,
      quantity: 1
    };
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    toast.success(`${item.name} added to cart!`);
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast.success('Item removed from cart');
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  return (
    <CartContext.Provider value={{ 
      state, 
      dispatch, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      toggleCart,
      openCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}