import { create } from 'zustand';

export type ToastVariant = 'success' | 'error' | 'info';

export type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastState = {
  items: ToastItem[];
  toast: (message: string, variant?: ToastVariant) => void;
  dismiss: (id: string) => void;
};

const DEFAULT_MS = 4500;

export const useToastStore = create<ToastState>((set) => ({
  items: [],

  toast(message, variant = 'info') {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    set((state) => ({
      items: [...state.items, { id, message, variant }],
    }));
    window.setTimeout(() => {
      set((state) => ({
        items: state.items.filter((t) => t.id !== id),
      }));
    }, DEFAULT_MS);
  },

  dismiss(id) {
    set((state) => ({
      items: state.items.filter((t) => t.id !== id),
    }));
  },
}));
