export interface SortKit {
    readonly algoName: string,
    readonly algoInfo: string,
    codes: {
        [key: string]: string;
    },
    editAlgoInfo: (data: any) => void,

}