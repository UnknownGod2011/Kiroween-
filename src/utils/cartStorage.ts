// Cart storage utilities using localStorage

export interface CartItem {
  id: string;
  image: string; // data URL (front image for backward compatibility)
  snapshotFront?: string; // front full canvas snapshot
  snapshotBack?: string; // back full canvas snapshot
  color: string;
  material: string;
  size: string;
  designName?: string; // user-provided name for the design
  designFront?: string | null; // front design image URL
  designBack?: string | null; // back design image URL
  dateAdded: number;
  quantity: number;
  price?: number; // calculated price per item
  isPreMadeMockup?: boolean; // true if from collection (skip compositing)
}

const CART_KEY = 'crishirt_cart';

// Clear cart on page load/refresh to match design behavior
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    localStorage.removeItem(CART_KEY);
  });
}

export const getCartItems = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

export const addToCart = (item: Omit<CartItem, 'id' | 'dateAdded' | 'quantity'>): CartItem => {
  const cartItems = getCartItems();
  const newItem: CartItem = {
    ...item,
    id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    dateAdded: Date.now(),
    quantity: 1,
  };
  
  cartItems.push(newItem);
  
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch (error: any) {
    if (error.name === 'QuotaExceededError') {
      // Storage is full - show user-friendly error
      alert('👻 Cart storage is full! Please clear some items or use "Clear Cart" to free up space.');
      // Remove the item we just added since we couldn't save it
      cartItems.pop();
      throw new Error('Cart storage quota exceeded');
    }
    throw error;
  }
  
  return newItem;
};

export const removeFromCart = (id: string): void => {
  const cartItems = getCartItems();
  const filtered = cartItems.filter(item => item.id !== id);
  
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(filtered));
  } catch (error: any) {
    console.error('Failed to update cart:', error);
    alert('⚠️ Failed to remove item from cart. Please try again.');
    throw error;
  }
};

export const updateCartItemQuantity = (id: string, quantity: number): void => {
  const cartItems = getCartItems();
  const updated = cartItems.map(item => 
    item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
  );
  
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
  } catch (error: any) {
    console.error('Failed to update cart quantity:', error);
    alert('⚠️ Failed to update quantity. Please try again.');
    throw error;
  }
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
  // Clear AR snapshots
  if (typeof window !== 'undefined') {
    (window as any).arSnapshots = null;
  }
};

export const getCartCount = (): number => {
  const items = getCartItems();
  return items.reduce((total, item) => total + item.quantity, 0);
};
