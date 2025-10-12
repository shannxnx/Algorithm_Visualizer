import { Layer, Stage } from "react-konva";
import { useEffect, useState, useRef } from "react";
import type { gridRectInfo } from "../../../INTERFACES && TYPES/sortInterface";
import { MazeGridRenderer } from "../../../RENDERER/Renderer";
import { delay } from "../../SORT/HELPER_FUNCTION/animation.helper";
import { generateGridRects } from "../pathHelper";
import { type props } from '../pathHelper';



async function visualizeBFS(
    getRects: () => gridRectInfo[],
    setRects: React.Dispatch<React.SetStateAction<gridRectInfo[]>>
) {
    const gridWidth = 18;
    const gridHeight = 17;

    const rects = getRects();
    const start = rects.find(r => r.isStart);
    const end = rects.find(r => r.isEnd);

    if (!start || !end) return;

    const visited = new Set<string>();
    const stack: gridRectInfo[] = [start];
    const parent = new Map<string, string>();



    //get the neighbors of each cell
    const getNeighbors = (cell: gridRectInfo) => {
        const [i, j] = cell.stringId!.split(":")[1].split("-").map(Number);
        const dirs = [
            [0, 1],  //right
            [1, 0],  //down
            [0, -1], //left
            [-1, 0], //up
        ];
        const neighbors: gridRectInfo[] = [];

        for (const [di, dj] of dirs) {
            const ni = i + di;
            const nj = j + dj;
            if (ni >= 0 && nj >= 0 && ni < gridHeight && nj < gridWidth) {
                const neighbor = getRects().find(r => r.stringId === `cell:${ni}-${nj}`);
                if (neighbor && !neighbor.isWall) neighbors.push(neighbor);
            }
        }
        return neighbors;
    };


    //get the path from start to end
    while (stack.length > 0) {
        const current = stack.shift()!;
        if (visited.has(current.stringId!)) continue;
        visited.add(current.stringId!);

        setRects(prev =>
            prev.map(r =>
                r.stringId === current.stringId && !r.isStart && !r.isEnd
                    ? { ...r, color: "lightblue" }
                    : r
            )
        );

        await new Promise(requestAnimationFrame);
        await delay(40);

        if (current.stringId === end.stringId) break;

        const neighbors = getNeighbors(current);
        for (const n of neighbors) {
            if (!visited.has(n.stringId!)) {

                parent.set(n.stringId!, current.stringId!);
                stack.push(n);

            }
        }
    }


    let curr = end.stringId!;

    //the backtrack the path from end to start
    while (parent.has(curr)) {
        const prevId = parent.get(curr)!;
        setRects(prev =>
            prev.map(r =>
                r.stringId === prevId && !r.isStart
                    ? { ...r, color: "yellow" }
                    : r
            )
        );
        await new Promise(requestAnimationFrame);
        await delay(25);
        curr = prevId;
    }
}

export default function BfsKonva() {
    const [rectInfo, setRectInfo] = useState<gridRectInfo[]>([]);
    const [keyPressed, setKeyPressed] = useState<string | null>(null);
    const [start, setStart] = useState<boolean>(false);
    const [end, setEnd] = useState<boolean>(false);


    const rectRef = useRef<gridRectInfo[]>([]);
    useEffect(() => {
        rectRef.current = rectInfo;
    }, [rectInfo]);


    const generateGrProps: props = {
        props: {
            row: 14,
            column: 18,
            rectSize: 30,
            gap: 2
        }
    }


    useEffect(() => {
        setRectInfo(generateGridRects(generateGrProps));

    }, []);


    const handleReset = () => {
        setRectInfo(generateGridRects(generateGrProps));
        setEnd(false);
        setStart(false);
    };


    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            if (e.key === "r" || e.key === "R") {
                handleReset();
                return;
            }

            if (e.key === "v" || e.key === "V") {
                await visualizeBFS(() => rectRef.current, setRectInfo);
                return;
            }

            setKeyPressed(e.key.toLowerCase());
        };

        const handleKeyUp = () => setKeyPressed(null);

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [keyPressed]);


    const handleClick = (id: string) => {
        if (!keyPressed) return;

        setRectInfo(prev =>
            prev.map(cell => {
                if (cell.stringId !== id) return cell;

                if (keyPressed === "s" && !start) {
                    setStart(true);
                    return { ...cell, color: "green", isStart: true };
                }

                if (keyPressed === "e" && !end) {
                    setEnd(true);
                    return { ...cell, color: "red", isEnd: true };
                }

                if (keyPressed === "w") {
                    return { ...cell, color: "black", isWall: true };
                }

                return cell;
            })
        );
    };




    return (
        <Stage width={575} height={440} className="border-1 border-black bg-black">
            <Layer>
                <MazeGridRenderer array={rectInfo} setArray={handleClick} />
            </Layer>
        </Stage>
    );
}
