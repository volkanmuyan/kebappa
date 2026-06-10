'use client';
import { create } from 'zustand';

export type SelectedOption = { groupId: string; optionId: string };

type CartItem = {
  id: string;
  qty: number;
  selectedOptions?: SelectedOption[];
  extraCents?: number;
};
type OrderMode = 'delivery' | 'pickup';
type Address = { street: string; number: string; zip: string; city: string };
export type Customer = { name: string; email: string; phone: string };

interface CartStore {
  items: CartItem[];
  mode: OrderMode;
  address: Address;
  customer: Customer;
  isOpen: boolean;
  setMode: (m: OrderMode) => void;
  setAddress: (a: Partial<Address>) => void;
  setCustomer: (c: Partial<Customer>) => void;
  add: (id: string, selectedOptions?: SelectedOption[], extraCents?: number) => void;
  remove: (id: string, index?: number) => void;
  increment: (id: string, index?: number) => void;
  decrement: (id: string, index?: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  mode: 'delivery',
  address: { street: '', number: '', zip: '', city: '' },
  customer: { name: '', email: '', phone: '' },
  isOpen: false,
  setMode: (mode) => set({ mode }),
  setAddress: (a) => set((s) => ({ address: { ...s.address, ...a } })),
  setCustomer: (c) => set((s) => ({ customer: { ...s.customer, ...c } })),
  add: (id, selectedOptions, extraCents) =>
    set((s) => {
      // Always add as a new entry when options are present; merge plain adds
      if (!selectedOptions || selectedOptions.length === 0) {
        const existing = s.items.find((i) => i.id === id && (!i.selectedOptions || i.selectedOptions.length === 0));
        if (existing) {
          return {
            items: s.items.map((i) =>
              i === existing ? { ...i, qty: i.qty + 1 } : i
            ),
          };
        }
      }
      return { items: [...s.items, { id, qty: 1, selectedOptions, extraCents }] };
    }),
  remove: (id, index) =>
    set((s) => {
      if (index !== undefined) {
        return { items: s.items.filter((_, i) => i !== index) };
      }
      return { items: s.items.filter((i) => i.id !== id) };
    }),
  increment: (id, index) =>
    set((s) => ({
      items: s.items.map((i, idx) =>
        (index !== undefined ? idx === index : i.id === id) ? { ...i, qty: i.qty + 1 } : i
      ),
    })),
  decrement: (id, index) =>
    set((s) => ({
      items: s.items
        .map((i, idx) =>
          (index !== undefined ? idx === index : i.id === id) ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0),
    })),
  clear: () => set({ items: [] }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
}));
