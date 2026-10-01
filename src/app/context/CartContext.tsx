import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { SpinReward } from '../components/CosmicWheel';
import { products } from '../data/products';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  priceFormatted: string;
  image: string;
  badge?: string;
  category?: string;
  details?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  spinReward: SpinReward | null;
  applySpin: (reward: SpinReward) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// The cart survives reloads and the round trip to the payment page.
const CART_KEY = 'astroversity_cart';

function loadCart(): { items: CartItem[]; spinReward: SpinReward | null } {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) ?? 'null');
    if (!raw || !Array.isArray(raw.items)) return { items: [], spinReward: null };
    // Re-read product data from the current catalogue (prices/names may have changed).
    const items = raw.items.flatMap((it: { id: number; quantity: number }) => {
      const p = products.find(pr => pr.id === Number(it.id));
      const qty = Math.max(1, Math.floor(Number(it.quantity) || 1));
      return p ? [{ ...p, quantity: qty } as CartItem] : [];
    });
    return { items, spinReward: items.length ? raw.spinReward ?? null : null };
  } catch {
    return { items: [], spinReward: null };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(loadCart);
  const [items, setItems] = useState<CartItem[]>(initial.items);
  const [spinReward, setSpinReward] = useState<SpinReward | null>(initial.spinReward);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify({ items: items.map(i => ({ id: i.id, quantity: i.quantity })), spinReward }));
    } catch { /* private mode / storage full */ }
  }, [items, spinReward]);
  const applySpin = (reward: SpinReward) => setSpinReward(reward);

  const addToCart = (product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setSpinReward(null);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        spinReward,
        applySpin,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
