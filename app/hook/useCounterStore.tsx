import { create } from 'zustand';

export interface ICounter {
   count: number;
   increment: () => void;
   decrement: () => void;
}

const useCounterStore = create<ICounter>((set) => ({
   count: 0,
   increment: () => set((state) => ({ count: state.count + 1 })),
   decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useCounterStore;

//Alasan memilih zustand daripada redux

//Lebih mudah dipelajari karena memiliki API yang lebih sederhana
//Zustand lebih ringan daripada Redux
//Mengelola state jadi lebih fleksibel
//Tidak memerlukan banyak kode untuk mengelola state
