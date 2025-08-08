import { create } from "zustand";



export const algoStore = create((set, get) => ({
    algoCategory: String,
    currentArray: Array<Object>,
    rectCounts: Number,



    setRectCounts: (count: number) => {
        set({ rectCounts: count });
    },


    setAlgoCategory: (cat: string) => {
        set({ algoCategory: cat });
    },

    setCurrentArray: (curr: Array<Object>) => {
        set({ currentArray: curr });
    }
}))

