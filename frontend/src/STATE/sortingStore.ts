import { create } from "zustand";
import { AxiosInstance } from "../LIB/axios";
import { toast } from "react-toastify";


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

    editSortCode: (data: any) => void;
    getBubbleSort: () => void;
    getMergeSort: () => void;
    getQuickSort: () => void;
    getInsertionSort: () => void;
    getSelectionSort: () => void;

}

const empty: AlgoStructure = {
    algoName: "",
    algoInfo: "",
    codes: {}
}

export const sortStore = create<StoreState>((set, get) => ({

    bubbleSortInfo: empty,
    mergeSortInfo: empty,
    quickSortInfo: empty,
    insertionSortInfo: empty,
    selectionSortInfo: empty,

    editSortCode: async (data: any) => {
        try {
            const res = await AxiosInstance.post("/sort/edit", data);
            console.log("Result: ", res.data);


        } catch (error: any) {
            console.log("Error in Editing Sort: ", error.message);
            toast.error(error?.response?.data?.message);
        }
    },

    getBubbleSort: async () => {
        try {
            const res = await AxiosInstance.get("/sort/bubble-sort");
            set({ bubbleSortInfo: res.data })


        } catch (error: any) {
            console.log("Error in getting algo store: ", error.message);
            console.log(error?.response?.data?.message);
        }

    },

    getMergeSort: async () => {
        try {
            const res = await AxiosInstance.get("/sort/merge-sort");
            set({ mergeSortInfo: res.data });
        } catch (error: any) {
            console.log("Error in getting algo store: ", error.message);

        }
    },

    getInsertionSort: async () => {
        try {
            const res = await AxiosInstance.get("/sort/insertion-sort");
            set({ insertionSortInfo: res.data });
            console.log("Response data : ", res.data);
        } catch (error: any) {
            console.log("Error in getting algo store: ", error.message);
        }
    },

    getQuickSort: async () => {
        try {
            const res = await AxiosInstance.get("/sort/quick-sort");
            set({ quickSortInfo: res.data });
        } catch (error: any) {
            console.log("Error in getting algo store: ", error.message);
        }
    },

    getSelectionSort: async () => {
        try {
            const res = await AxiosInstance.get("/sort/selection-sort");
            set({ selectionSortInfo: res.data });
        } catch (error: any) {
            console.log("Error in getting algo store: ", error.message);
        }
    },


}));
