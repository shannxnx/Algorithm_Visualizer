import { create } from "zustand";



export const algoStore = create((set, get) => ({
    algoCategory: String,
    currentArray: Array<Object>,
    setAlgoCategory: (cat: string) => {
        set({ algoCategory: cat });
    },

    setCurrentArray: (curr: Array<Object>) => {
        set({ currentArray: curr });
    }
}))

