import type { gridRectInfo } from "../../INTERFACES && TYPES/sortInterface";

export const generateGridRects = (rectSize: number = 30, rectGap: number = 2) => {
    const returnThis: gridRectInfo[] = [];
    const cellSize = rectSize;
    const gap = rectGap

    for (let i = 0; i < 17; i++) {
        for (let j = 0; j < 18; j++) {
            const xPos = j * (cellSize + gap);
            const yPos = i * (cellSize + gap);
            const id = `cell:${i}-${j}`;

            returnThis.push({
                stringId: id,
                x: xPos,
                y: yPos,
                width: 30,
                height: 30,
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
