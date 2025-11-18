// Cart storage utilities using localStorage

export interface CartItem {
  id: string;
  image: string; // data URL (front image for backward compatibility)
  snapshotFront?: string; // front full canvas snapshot
  snapshotBack?: string; // back full canvas snapshot
  color: string;
  material: string;
  size: string;
  designFront?: string | null; // front design image URL
  designBack?: string | null; // back design image URL
  dateAdded: number;
  quantity: number;
}

const CART_KEY = 'crishirt_cart';

export const getCartItems = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading cart:', error);
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
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  return newItem;
};

export const removeFromCart = (id: string): void => {
  const cartItems = getCartItems();
  const filtered = cartItems.filter(item => item.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(filtered));
};

export const updateCartItemQuantity = (id: string, quantity: number): void => {
  const cartItems = getCartItems();
  const updated = cartItems.map(item => 
    item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
  );
  localStorage.setItem(CART_KEY, JSON.stringify(updated));
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
