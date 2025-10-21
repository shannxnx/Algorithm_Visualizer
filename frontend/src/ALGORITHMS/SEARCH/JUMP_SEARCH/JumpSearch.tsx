import { useEffect, useState } from "react";
import { searchStore } from "../../../STATE/searchStore"
import type { animation, rectInfo, SortKit } from "../../../INTERFACES && TYPES/sortInterface";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";
import BinaryButton from "../../../COMPONENTS/BUTTONS/SearchButton";
import useMeasure from "react-use-measure";
import { generateBoxesInfo, generateSortedBoxesInfo } from "../../SORT/HELPER_FUNCTION/helper";
import { create } from "zustand";
import { div } from "framer-motion/client";
import { changeColor } from "../searchAnimation.helper";
import JumpSearchKonva from "./JumpSearchKonva";





type JumpSearchPayload = {

    boxesInfo: Array<rectInfo>;
    isAnimating?: animation;
    setIsAnimating?: (animate: animation) => void;
    konvaWidth?: number;
    konvaHeight?: number;
    setBoxesInfo: React.Dispatch<React.SetStateAction<rectInfo[]>>;
    searchValue?: number
}



export default function JumpSearch() {

    const getJumpSearch = searchStore((state: any) => state.getJumpSearch);
    const JumpSearchInfo = searchStore((state: any) => state.JumpSearchInfo);
    const editSortCode = searchStore((state: any) => state.editSortCode);

    const [array, setArray] = useState();
    const [arraySize, setArraySize] = useState<number>(1);
    const [rectToSearch, setRectToSearch] = useState<rectInfo | null>(null);

    const [ref, bounds] = useMeasure();
    const [rectsArray, setRectsArray] = useState<rectInfo[]>([]);

    const [isAnimating, setIsAnimating] = useState<animation>("idle");
    const [searchValue, setSearchValue] = useState<number>(0);
    const [sizeValue, setSizeValue] = useState<number>(1);

    useEffect(() => {

        getJumpSearch();

    }, []);


    useEffect(() => {
        if (bounds.width && bounds.height > 0) {
            setRectsArray(generateBoxesInfo(sizeValue, bounds));
        }

    }, [bounds.width]);


    const JumpSearchPayload: SortKit = {
        algoInfo: JumpSearchInfo.algoInfo,
        algoName: JumpSearchInfo.algoName,
        codes: JumpSearchInfo.codes,
        editAlgoInfo: editSortCode
    };



    const JumpKonvaPayload: JumpSearchPayload = {
        boxesInfo: rectsArray,
        isAnimating: isAnimating,
        setIsAnimating: setIsAnimating,
        konvaWidth: Math.floor(bounds.width),
        konvaHeight: 420,
        setBoxesInfo: setRectsArray,
        searchValue: searchValue,
    }


    const handleNewBoxes = () => {
        if (sizeValue <= 15) {
            setRectsArray(generateSortedBoxesInfo(sizeValue, bounds));
            setIsAnimating("idle");
        }
        else {
            console.log("Maximum rects reached!");
        }
    }

    const actionsProps = {
        size: (val: number) => setSizeValue(val),
        search: (data: rectInfo) => setRectToSearch(data),
        testSearch: (val: number) => setSearchValue(val),
        create: handleNewBoxes,
        start: () => setIsAnimating("animating")

    };



    const stateProps = {
        isAnimating: isAnimating,
        searchValue: searchValue,
        sizeValue: sizeValue

    }




    return <main className="w-screen h-screen flex  gap-5 overflow-x-hidden p-2 bg-black ">


        <div className="w-[60%] h-full border-1 relative flex flex-col rounded bg-white
        items-center" ref={ref}>



            <div className="w-[95%] h-[75%] border-1
             flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 
             overflow-x-scroll border-black" style={{ scrollbarGutter: "stable" }}>

                {
                    rectsArray.length > 0 ? <JumpSearchKonva props={JumpKonvaPayload} />
                        : null
                }
            </div>



            <BinaryButton actions={actionsProps} states={stateProps} />

        </div>

        <AlgoInfo algoInfo={JumpSearchPayload} />


    </main>
}
