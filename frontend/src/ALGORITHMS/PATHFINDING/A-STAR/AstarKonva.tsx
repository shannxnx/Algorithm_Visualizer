import { Layer, Stage } from "react-konva";
import { useEffect, useState, useRef } from "react";
import type { gridRectInfo } from "../../../INTERFACES && TYPES/sortInterface";
import { MazeGridRenderer } from "../../../RENDERER/Renderer";
import { delay } from "../../SORT/HELPER_FUNCTION/animation.helper";
import { generateGridRects } from "../pathHelper";
import { type props } from '../pathHelper';




async function visualizeAStar(
    getRects: () => gridRectInfo[],
    setRects: React.Dispatch<React.SetStateAction<gridRectInfo[]>>
) {
    const gridWidth = 18;
    const gridHeight = 17;

    const rects = getRects();
    const start = rects.find(r => r.isStart);
    const end = rects.find(r => r.isEnd);
    if (!start || !end) return;

    const gScore = new Map<string, number>(); //distance of the cell to the starting node
    const fScore = new Map<string, number>(); //gScore + hScore the total score of each cell 
    const parent = new Map<string, string>();
    const visited = new Set<string>();

    for (const r of rects) {
        gScore.set(r.stringId!, Infinity);
        fScore.set(r.stringId!, Infinity);
    };

    // Manhattan distance
    //this is the hScore
    function heuristic(a: gridRectInfo, b: gridRectInfo) {
        const [ai, aj] = a.stringId!.split(":")[1].split("-").map(Number);
        const [bi, bj] = b.stringId!.split(":")[1].split("-").map(Number);


        const dx = Math.abs(ai - bi);
        const dy = Math.abs(aj - bj);
        const D = 1;          // cost for straight move
        const D2 = Math.SQRT2; // cost for diagonal move
        return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);

        //return Math.abs(ai - bi) + Math.abs(aj - bj);
    }

    gScore.set(start.stringId!, 0);
    fScore.set(start.stringId!, heuristic(start, end));

    const openSet: gridRectInfo[] = [start];



    // Neighbor finder
    const getNeighbors = (cell: gridRectInfo) => {
        const [i, j] = cell.stringId!.split(":")[1].split("-").map(Number);
        const dirs = [
            [0, 1],   // right
            [1, 0],   // down
            [0, -1],  // left
            [-1, 0],  // up
            [-1, -1, Math.SQRT2], //up left
            [-1, 1, Math.SQRT2],  //up right
            [1, 1, Math.SQRT2],   //down right
            [1, -1, Math.SQRT2]   //down left
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

    while (openSet.length > 0) {
        // sort by f(n)
        openSet.sort((a, b) => fScore.get(a.stringId!)! - fScore.get(b.stringId!)!);

        const current = openSet.shift()!;
        console.log("current: ", current);
        if (visited.has(current.stringId!)) continue;
        visited.add(current.stringId!);

        setRects(prev =>
            prev.map(r =>
                r.stringId === current.stringId && !r.isStart && !r.isEnd
                    ? { ...r, color: "white" }
                    : r
            )
        );

        await new Promise(requestAnimationFrame);
        await delay(40);

        if (current.stringId === end.stringId) break;

        const neighbors = getNeighbors(current);
        for (const n of neighbors) {
            const [ni, nj] = n.stringId!.split(":")[1].split("-").map(Number);
            const [ci, cj] = current.stringId!.split(":")[1].split("-").map(Number);



            const cost = (ci !== ni && cj !== nj) ? Math.SQRT2 : 1;
            const tentativeG = gScore.get(current.stringId!)! + cost;

            if (tentativeG < gScore.get(n.stringId!)!) {
                parent.set(n.stringId!, current.stringId!);
                gScore.set(n.stringId!, tentativeG);
                fScore.set(n.stringId!, tentativeG + heuristic(n, end));

                //if the current is not in the openset push it
                if (!openSet.find(cell => cell.stringId === n.stringId)) {
                    openSet.push(n);
                }
            }
        }
    }

    // Backtrack
    let curr = end.stringId!;
    console.log("parent: ", parent);
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
};

export default function AStarKonva() {
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
                await visualizeAStar(() => rectRef.current, setRectInfo);
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
        <Stage width={575} height={440} className="bg-black border-black border">
            <Layer>
                <MazeGridRenderer array={rectInfo} setArray={handleClick} />
            </Layer>
        </Stage>
    );
}

