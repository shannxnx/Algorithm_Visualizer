import { create } from "zustand";
import Konva from "konva";
import { rectInfo } from "../../../../LIB/algoDummyDB";

interface rectInfo {
    x: number;
    y: number;
    width: number;
    height: number;
    number?: number;
    id: number;
    color?: string;
    node?: Konva.Node;
}



interface rectInfo {
    x: number;
    y: number;
    width: number;
    height: number;
    number?: number;
    id: number;
    color?: string;
    node?: Konva.Node;
}

interface storeState {
    // Main arrays
    mainArray: rectInfo[];
    left: rectInfo[];
    right: rectInfo[];

    // H1 arrays
    leftH1: rectInfo[];
    leftH2: rectInfo[];
    rightH1: rectInfo[];
    rightH2: rectInfo[];

    // Sorted arrays
    sortedLeftH1: rectInfo[];
    sortedLeftH2: rectInfo[];
    sortedRightH1: rectInfo[];
    sortedRightH2: rectInfo[];

    // To be sorted arrays
    toBeSortedLeftH1: rectInfo[];
    toBeSortedLeftH2: rectInfo[];
    toBeSortedRightH1: rectInfo[];
    toBeSortedRightH2: rectInfo[];

    finalSortedArray: rectInfo[];


    // Setters for main arrays
    setMainArray: (array: rectInfo[]) => void;
    setLeft: (array: rectInfo[]) => void;
    setRight: (array: rectInfo[]) => void;

    // Setters for H1/H2 arrays
    setLeftH1: (array: rectInfo[]) => void;
    setLeftH2: (array: rectInfo[]) => void;
    setRightH1: (array: rectInfo[]) => void;
    setRightH2: (array: rectInfo[]) => void;

    // Setters for sorted arrays
    setSortedLeftH1: (array: rectInfo[]) => void;
    setSortedLeftH2: (array: rectInfo[]) => void;
    setSortedRightH1: (array: rectInfo[]) => void;
    setSortedRightH2: (array: rectInfo[]) => void;

    // Setters for to be sorted arrays
    setToBeSortedLeftH1: (array: rectInfo[]) => void;
    setToBeSortedLeftH2: (array: rectInfo[]) => void;
    setToBeSortedRightH1: (array: rectInfo[]) => void;
    setToBeSortedRightH2: (array: rectInfo[]) => void;


    setFinalSortedArray: (array: rectInfo[]) => void;
}

export const mergeStore = create<storeState>((set) => ({
    finalSortedArray: [] as rectInfo[],
    mainArray: [] as rectInfo[],
    left: [] as rectInfo[],
    right: [] as rectInfo[],


    leftH1: [] as rectInfo[],
    leftH2: [] as rectInfo[],
    rightH1: [] as rectInfo[],
    rightH2: [] as rectInfo[],

    sortedLeftH1: [] as rectInfo[],
    sortedLeftH2: [] as rectInfo[],
    sortedRightH1: [] as rectInfo[],
    sortedRightH2: [] as rectInfo[],

    toBeSortedLeftH1: [] as rectInfo[],
    toBeSortedLeftH2: [] as rectInfo[],
    toBeSortedRightH1: [] as rectInfo[],
    toBeSortedRightH2: [] as rectInfo[],


    setMainArray: (array: rectInfo[]) => {

        set({ mainArray: array });


    },
    setLeft: (array: rectInfo[]) => {

        set({ left: array });



    },
    setRight: (array: rectInfo[]) => {

        set({ right: array });



    },

    setLeftH1: (array: rectInfo[]) => {

        set({ leftH1: array });


    },
    setLeftH2: (array: rectInfo[]) => {

        set({ leftH2: array });


    },
    setRightH1: (array: rectInfo[]) => {
        set({ rightH1: array });
    },
    setRightH2: (array: rectInfo[]) => {
        set({ rightH2: array });
    },


    setSortedLeftH1: (array: rectInfo[]) => {
        set({ sortedLeftH1: array });

    },
    setSortedLeftH2: (array: rectInfo[]) => {
        set({ sortedLeftH2: array });

    },
    setSortedRightH1: (array: rectInfo[]) => {
        set({ sortedRightH1: array });
    },
    setSortedRightH2: (array: rectInfo[]) => {
        set({ sortedRightH2: array });
    },


    setToBeSortedLeftH1: (array: rectInfo[]) => {
        set({ toBeSortedLeftH1: array });
    },
    setToBeSortedLeftH2: (array: rectInfo[]) => {
        set({ toBeSortedLeftH2: array });
    },
    setToBeSortedRightH1: (array: rectInfo[]) => {
        set({ toBeSortedRightH1: array });
    },
    setToBeSortedRightH2: (array: rectInfo[]) => {
        set({ toBeSortedRightH2: array });
    },


    setFinalSortedArray: (array: rectInfo[]) => {
        set({ finalSortedArray: array });
        //if (array) console.log("Final Array: ", array);
    }

}));