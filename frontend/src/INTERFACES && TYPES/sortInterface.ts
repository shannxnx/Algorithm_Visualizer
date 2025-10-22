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
    stringId?: string,
    color?: string,
    node?: Konva.Node | null,
    scaleX?: number,
    scaleY?: number
};


export interface gridRectInfo extends rectInfo {
    isWall: boolean,
    isStart: boolean,
    isEnd: boolean,
    isVisited: boolean
}

export type animation = "idle" | "animating" | "done";


export const desktopSize = {
    d_small: 40,
    d_medium: 45
};

export const mobileSize = {
    m_small: 40,
    m_medium: 40
}
