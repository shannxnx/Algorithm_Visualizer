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

    getBubbleSort: () => void;
    getMergeSort: () => void;
    editMergeSort: (data: any) => void;


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
    },

    editMergeSort: async (data: any) => {
        try {
            const res = await AxiosInstance.post("/sort/merge-sort/edit", data);
            console.log("Result: ", res.data);


        } catch (error: any) {
            console.log("Error in editing merge sort store: ", error.message);
            toast.error(error?.response?.data?.message);
        }
    }

}));
