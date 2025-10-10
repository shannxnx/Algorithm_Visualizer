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
    BreadthFirstSearch: AlgoStructure;
    Dijkstras: AlgoStructure;
    AStar: AlgoStructure;

    editPathfindingCode: (data: any) => void;
    getDFSInfo: () => void;
    getBFSInfo: () => void;
    getDijkstras: () => void;
    getAStar: () => void;

};


export const pathFindingStore = create<pathfindingState>((set) => ({
    DepthFirstSearch: empty,
    BreadthFirstSearch: empty,
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
    },

    getBFSInfo: async () => {
        try {
            const res = await AxiosInstance.get("/pathfinding/bfs");
            set({ BreadthFirstSearch: res.data });
        } catch (error: any) {
            console.log("Error in getting BFS: ", error.message);

        }
    },

    getDijkstras: async () => {
        try {
            const res = await AxiosInstance.get("/pathfinding/dijkstras");
            set({ Dijkstras: res.data });
        } catch (error: any) {
            console.log("Error in getting Dijkstras: ", error.message);

        }
    },

    getAStar: async () => {
        try {
            const res = await AxiosInstance.get("/pathfinding/a-star");
            set({ AStar: res.data });
        } catch (error: any) {
            console.log("Error in getting A-Star: ", error.message);

        }
    },



}))











