import { Layer, Stage } from "react-konva";
import { useEffect, useState, useRef } from "react";
import type { gridRectInfo } from "../../../INTERFACES && TYPES/sortInterface";
import { MazeGridRenderer } from "../../../RENDERER/Renderer";
import { delay } from "../../SORT/HELPER_FUNCTION/animation.helper";
import { generateGridRects } from "../pathHelper";




async function visualizeDijkstras(
    getRects: () => gridRectInfo[],
    setRects: React.Dispatch<React.SetStateAction<gridRectInfo[]>>
) {
    const gridWidth = 18;
    const gridHeight = 17;

    const rects = getRects();
    const start = rects.find(r => r.isStart);
    const end = rects.find(r => r.isEnd);

    if (!start || !end) return;

    // distance and parent tracking
    const dist = new Map<string, number>();
    const parent = new Map<string, string>();
    const visited = new Set<string>();

    for (const r of rects) {
        dist.set(r.stringId!, Infinity);
    }
    dist.set(start.stringId!, 0);

    // priority queue (using array for simplicity)
    const queue: gridRectInfo[] = [start];

    const getNeighbors = (cell: gridRectInfo) => {
        const [i, j] = cell.stringId!.split(":")[1].split("-").map(Number);
        const dirs = [
            [0, 1], [1, 0], [0, -1], [-1, 0]
        ];
        const neighbors: gridRectInfo[] = [];
        for (const [di, dj] of dirs) {
            const ni = i + di, nj = j + dj;
            if (ni >= 0 && nj >= 0 && ni < gridHeight && nj < gridWidth) {
                const neighbor = getRects().find(r => r.stringId === `cell:${ni}-${nj}`);
                if (neighbor && !neighbor.isWall) neighbors.push(neighbor);
            }
        }
        return neighbors;
    };

    while (queue.length > 0) {
        // get cell with smallest distance
        queue.sort((a, b) => dist.get(a.stringId!)! - dist.get(b.stringId!)!);
        const current = queue.shift()!;
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
            const cost = 1;
            const newDist = dist.get(current.stringId!)! + cost;
            if (newDist < dist.get(n.stringId!)!) {
                dist.set(n.stringId!, newDist);
                parent.set(n.stringId!, current.stringId!);
                queue.push(n);
            }
        }
    }

    // backtrack
    let curr = end.stringId!;
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

export default function DijkstrasKonva() {
    const [rectInfo, setRectInfo] = useState<gridRectInfo[]>([]);
    const [keyPressed, setKeyPressed] = useState<string | null>(null);
    const [start, setStart] = useState<boolean>(false);
    const [end, setEnd] = useState<boolean>(false);


    const rectRef = useRef<gridRectInfo[]>([]);
    useEffect(() => {
        rectRef.current = rectInfo;
    }, [rectInfo]);


    useEffect(() => {
        setRectInfo(generateGridRects());

    }, []);


    const handleReset = () => {
        setRectInfo(generateGridRects());
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
                await visualizeDijkstras(() => rectRef.current, setRectInfo);
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
        <Stage width={575} height={540} className="border-1 border-black">
            <Layer>
                <MazeGridRenderer array={rectInfo} setArray={handleClick} />
            </Layer>
        </Stage>
    );
}

