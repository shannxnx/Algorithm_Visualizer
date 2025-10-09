import { create } from "zustand";
import { AxiosInstance } from "../LIB/axios";



interface AlgoStructure {
    readonly algoName: string;
    readonly algoInfo: string;
    codes: {
        [key: string]: string;
    };
}


const empty: AlgoStructure = {
    algoName: "",
    algoInfo: "",
    codes: {}
};



interface pathfindingState {
    DepthFirstSearch: AlgoStructure;
    BreadFirstSearch: AlgoStructure;
    Dijkstras: AlgoStructure;
    AStar: AlgoStructure;

    editPathfindingCode: (data: any) => void;
    getDFSInfo: () => void;
};


export const pathFindingStore = create<pathfindingState>((set) => ({
    DepthFirstSearch: empty,
    BreadFirstSearch: empty,
    Dijkstras: empty,
    AStar: empty,


    editPathfindingCode: async (data: any) => {
        try {
            const res = await AxiosInstance.post("/sort/edit", data);
            console.log("Result: ", res.data);


        } catch (error: any) {
            console.log("Error in Editing Sort: ", error.message);

        }
    },

    getDFSInfo: async () => {
        try {
            const res = await AxiosInstance.get("/pathfinding/dfs");
            set({ DepthFirstSearch: res.data });
        } catch (error: any) {
            console.log("Error in getting DFS: ", error.message);

        }
    }



}))








