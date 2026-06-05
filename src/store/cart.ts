'use client';
import { create } from 'zustand';

type CartItem = { id: string; qty: number };
type OrderMode = 'delivery' | 'pickup';
type Address = { street: string; number: string; zip: string; city: string };

interface CartStore {
  items: CartItem[];
  mode: OrderMode;
  address: Address;
  isOpen: boolean;
  setMode: (m: OrderMode) => void;
  setAddress: (a: Partial<Address>) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  mode: 'delivery',
  address: { street: '', number: '', zip: '', city: '' },
  isOpen: false,
  setMode: (mode) => set({ mode }),
  setAddress: (a) => set((s) => ({ address: { ...s.address, ...a } })),
  add: (id) =>
    set((s) => {
      const existing = s.items.find((i) => i.id === id);
      if (existing) return { items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) };
      return { items: [...s.items, { id, qty: 1 }] };
    }),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  increment: (id) =>
    set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) })),
  decrement: (id) =>
    set((s) => ({
      items: s.items
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    })),
  clear: () => set({ items: [] }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
}));
