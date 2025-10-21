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
import LinearSearchKonva from "./LinearSearchKonva";



type LinearSearchPayload = {

    boxesInfo: Array<rectInfo>;
    isAnimating?: animation;
    setIsAnimating?: (animate: animation) => void;
    konvaWidth?: number;
    konvaHeight?: number;
    setBoxesInfo: React.Dispatch<React.SetStateAction<rectInfo[]>>;
    searchValue?: number
}



export default function LinearSearch() {

    const getLinearSearch = searchStore((state: any) => state.getLinearSearch);
    const LinearSearchInfo = searchStore((state: any) => state.LinearSearchInfo);
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

        getLinearSearch();

    }, []);


    useEffect(() => {
        if (bounds.width && bounds.height > 0) {
            setRectsArray(generateBoxesInfo(sizeValue, bounds));
        }

    }, [bounds.width]);


    const LinearPayload: SortKit = {
        algoInfo: LinearSearchInfo.algoInfo,
        algoName: LinearSearchInfo.algoName,
        codes: LinearSearchInfo.codes,
        editAlgoInfo: editSortCode
    };



    const LinearKonvaPayload: LinearSearchPayload = {
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
            setRectsArray(generateBoxesInfo(sizeValue, bounds));
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
                    rectsArray.length > 0 ? <LinearSearchKonva props={LinearKonvaPayload} />
                        : null
                }
            </div>



            <BinaryButton actions={actionsProps} states={stateProps} />

        </div>

        <AlgoInfo algoInfo={LinearPayload} />


    </main>
}
