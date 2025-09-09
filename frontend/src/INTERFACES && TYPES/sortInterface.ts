import Konva from "konva";


export interface SortKit {
    readonly algoName: string,
    readonly algoInfo: string,
    codes: {
        [key: string]: string;
    },
    editAlgoInfo: (data: any) => void,

}


export interface rectInfo {
    x: number,
    y: number,
    width: number,
    height: number,
    number: number,
    id?: number,
    color?: string,
    node?: Konva.Node,
    scaleX?: number,
    scaleY?: number
};

export type animation = "idle" | "animating" | "done";