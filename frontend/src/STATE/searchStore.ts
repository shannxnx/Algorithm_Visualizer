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
    BinarySearchInfo: AlgoStructure;
    LinearSearcInfo: AlgoStructure;
    InterpolationSearchinfo: AlgoStructure;
    JumpSearchinfo: AlgoStructure;
    ExponentialSearchInfo: AlgoStructure;
    TernarySearchInfo: AlgoStructure

    editSortCode: (data: any) => void;
    getBinarySearch: () => void;
    getLinearSearch: () => void;
    //getMergeSort: () => void;
    //getQuickSort: () => void;
    //getInsertionSort: () => void;
    //getSelectionSort: () => void;

};

const empty: AlgoStructure = {
    algoName: "",
    algoInfo: "",
    codes: {}
}

export const searchStore = create<StoreState>((set) => ({
    BinarySearchInfo: empty,
    LinearSearcInfo: empty,
    InterpolationSearchinfo: empty,
    JumpSearchinfo: empty,
    ExponentialSearchInfo: empty,
    TernarySearchInfo: empty,

    editSortCode: async (data: any) => {
        try {
            const res = await AxiosInstance.post("/sort/edit", data);
            console.log("Result: ", res.data);


        } catch (error: any) {
            console.log("Error in Editing Sort: ", error.message);
            toast.error(error?.response?.data?.message);
        }
    },

    getBinarySearch: async () => {
        try {

            const res = await AxiosInstance.get("/search/binary-search");
            set({ BinarySearchInfo: res.data });


        } catch (error: any) {
            console.log("Error in getting algo store: ", error.message);
        }
    },


    getLinearSearch: async () => {
        try {

        } catch (error) {

        }
    }
})) 
