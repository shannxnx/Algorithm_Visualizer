import { create } from "zustand";
import axios from "axios";
import BubbleSort from "../ALGORITHMS/SORT/BubbleSort";
import { AxiosInstance } from "../LIB/axios";
import { BubbleSortInfo } from "../LIB/algoCodesDB";

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
    bubbleSortInfo: AlgoStructure;

    setRectCounts: (count: number) => void;
    setAlgoCategory: (cat: string) => void;
    setCurrentArray: (curr: object[]) => void;
    getBubbleSort: () => void;
}

export const algoStore = create<StoreState>((set, get) => ({
    algoCategory: "",
    currentArray: [],
    rectCounts: 0,
    bubbleSortInfo: {
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
            const data = await AxiosInstance.get("/sort/bubble-sort");
            set({ bubbleSortInfo: data.data })


        } catch (error: any) {
            console.log("Error in Getting bubble sort info store: ", error.message);
        }

    },

}));
