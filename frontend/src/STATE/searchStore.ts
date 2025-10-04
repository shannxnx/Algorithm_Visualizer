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
    LinearSearchInfo: AlgoStructure;
    InterpolationSearchInfo: AlgoStructure;
    JumpSearchinfo: AlgoStructure;
    ExponentialSearchInfo: AlgoStructure;
    TernarySearchInfo: AlgoStructure

    editSortCode: (data: any) => void;
    getBinarySearch: () => void;
    getLinearSearch: () => void;
    getInterpolationSearch: () => void;

};

const empty: AlgoStructure = {
    algoName: "",
    algoInfo: "",
    codes: {}
}

export const searchStore = create<StoreState>((set) => ({
    BinarySearchInfo: empty,
    LinearSearchInfo: empty,
    InterpolationSearchInfo: empty,
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
            const res = await AxiosInstance.get("/search/linear-search");
            set({ LinearSearchInfo: res.data });
        } catch (error: any) {
            console.log("Error in getting algo store: ", error.message);
        }
    },

    getInterpolationSearch: async () => {
        try {
            const res = await AxiosInstance.get("/search/interpolation-search");
            set({ InterpolationSearchInfo: res.data });
        } catch (error: any) {
            console.log("Error in getting algo store: ", error.message);
        }
    },


})) 
