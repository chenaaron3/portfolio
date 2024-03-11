import { create } from "zustand";

interface ScrollState {
  scroll: number;
  setScroll: (scroll: number) => void;
}

export const useScrollStore = create<ScrollState>()((set) => ({
  scroll: 0,
  setScroll: (value: number) => {
    set({
      scroll: value,
    });
  },
}));
