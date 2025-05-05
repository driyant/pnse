import { create } from 'zustand';

interface IndexState {
  selectedCategory: string;
}

const useIndexStore = create<IndexState>((set) => ({}));

export default useIndexStore;
