import { create } from "zustand";
import axios from "axios";
import BubbleSort from "../ALGORITHMS/SORT/BubbleSort";
import { AxiosInstance } from "../LIB/axios";

interface AlgoStructure {
    readonly algoName: string;
    readonly algoInfo: string;
    codes: {
        [key: string]: string;
    };
}

interface StoreState {
    algoCategory: string;
    currentArray: object[];
    rectCounts: number;
    BubbleSortInfo: AlgoStructure;

    setRectCounts: (count: number) => void;
    setAlgoCategory: (cat: string) => void;
    setCurrentArray: (curr: object[]) => void;
    getBubbleSort: () => void;
}

export const algoStore = create<StoreState>((set, get) => ({
    algoCategory: "",
    currentArray: [],
    rectCounts: 0,
    BubbleSortInfo: {
        algoName: "",
        algoInfo: "",
        codes: {}
    },

    setRectCounts: (count) => {
        set({ rectCounts: count });
    },

    setAlgoCategory: (cat) => {
        set({ algoCategory: cat });
    },

    setCurrentArray: (curr) => {
        set({ currentArray: curr });
    },

    getBubbleSort: async () => {
        try {
            const data = await AxiosInstance.get("sort/bubble-sort");
            console.log("Bubble Sort Info: ", data.data);

        } catch (error: any) {
            console.log("Error in Getting bubble sort info store: ", error.message);
        }

    },

}));
