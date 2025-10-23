import type { gridRectInfo } from "../../INTERFACES && TYPES/sortInterface";


interface gridRectsProps {
    rectSize: number,
    gap: number,
    row: number,
    column: number
};

export type props = {
    props: gridRectsProps
}

export const generateGridRects = ({ props }: props) => {
    const returnThis: gridRectInfo[] = [];
    const cellSize = props.rectSize;
    const gap = props.gap

    console.log("Props GGR: ", props);
    for (let i = 0; i < props.row; i++) {
        for (let j = 0; j < props.column; j++) {
            const xPos = j * (cellSize + gap);
            const yPos = i * (cellSize + gap);
            const id = `cell:${i}-${j}`;

            returnThis.push({
                stringId: id,
                x: xPos,
                y: yPos,
                width: props.rectSize,
                height: props.rectSize,
                number: Math.floor(Math.random() * 100),
                color: "blue",
                isEnd: false,
                isStart: false,
                isVisited: false,
                isWall: false,
            });
        }
    }
    return returnThis;
};


export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
