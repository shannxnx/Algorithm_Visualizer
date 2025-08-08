import { useEffect, useRef } from "react";
import { Konva1 } from "./konva1";

const div_x = 400;
const div_y = 50;

interface rectInfo {
    x: number,
    y: number,
    width: number,
    height: number,
    number?: string
};



export default function KonvaContainer() {


    const mainRef = useRef<HTMLElement>(null);


    useEffect(() => {
        if (mainRef.current) {
            const rect = mainRef.current.getBoundingClientRect();
            console.log("Main element pos: ", rect);
        }
    }, []);


    return <main className={`w-screen h-screen border-1 flex justify-center items-center`} ref={mainRef}>

        <Konva1 x={div_x} y={div_y} />
    </main>



}












