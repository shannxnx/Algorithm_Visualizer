import { create } from "zustand";
import { AxiosInstance } from "../LIB/axios";



interface AlgoStructure {
    readonly algoName: string;
    readonly algoInfo: string;
    codes: {
        [key: string]: string;
    };
}

interface StoreState {
    bubbleSortInfo: AlgoStructure;
    mergeSortInfo: AlgoStructure;
    quickSortInfo: AlgoStructure;
    insertionSortInfo: AlgoStructure;
    selectionSortInfo: AlgoStructure

    getBubbleSort: () => void;
    getMergeSort: () => void;

}

export const sortStore = create<StoreState>((set, get) => ({

    bubbleSortInfo: {
        algoName: "",
        algoInfo: "",
        codes: {}
    },
    mergeSortInfo: {
        algoName: "",
        algoInfo: "",
        codes: {}
    },
    quickSortInfo: {
        algoName: "",
        algoInfo: "",
        codes: {}
    },
    insertionSortInfo: {
        algoName: "",
        algoInfo: "",
        codes: {}
    },
    selectionSortInfo: {
        algoName: "",
        algoInfo: "",
        codes: {}
    },

    getBubbleSort: async () => {
        try {
            const res = await AxiosInstance.get("/sort/bubble-sort");
            set({ bubbleSortInfo: res.data })


        } catch (error: any) {
            console.log("Error in Getting bubble sort info store: ", error.message);
        }

    },

    getMergeSort: async () => {
        try {
            const res = await AxiosInstance.get("/sort/merge-sort");
            set({ mergeSortInfo: res.data });
        } catch (error: any) {
            console.log("Error in Getting Merge Sort Info store: ", error.message);

        }
    }

}));
