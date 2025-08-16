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
    },



}));
