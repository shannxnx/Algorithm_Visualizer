import { create } from "zustand";



interface StoreState {
    algoCategory: string;
    currentArray: object[];
    rectCounts: number;


    setRectCounts: (count: number) => void;
    setAlgoCategory: (cat: string) => void;
    setCurrentArray: (curr: object[]) => void;

}

export const algoStore = create<StoreState>((set, get) => ({
    algoCategory: "",
    currentArray: [],
    rectCounts: 0,

    setRectCounts: (count) => {
        set({ rectCounts: count });
    },

    setAlgoCategory: (cat) => {
        set({ algoCategory: cat });
    },

    setCurrentArray: (curr) => {
        set({ currentArray: curr });
    },



}));
