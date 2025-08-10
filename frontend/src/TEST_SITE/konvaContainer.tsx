//import { useEffect, useRef, useState } from "react";
//import { Konva1 } from "./konva1";
//import { algoStore } from "../STATE/algoStore";


//const div_x = 400;
//const div_y = 50;
//const width = 50;
//const height = 50;
//const gap = 5;


////this is timsort algo
//export default function KonvaContainer() {
//const mainRef = useRef<HTMLElement>(null);
//const rectCounts = algoStore((state: any) => state.rectCounts);
//const setRectCounts = algoStore((state: any) => state.setRectCounts);
//const [rects, setRects] = useState<number>(5);
//const [rectsArray, setRectsArray] = useState<Array<rectInfo>>([]);
//const [task, setTask] = useState<string>('');




//const [insertVal, setInsertVal] = useState<number>(0);
//const [insertIndex, setInsertIndex] = useState<number>(0);
//const [removeIndex, setRemoveIndex] = useState<number>(0);


//let rectCount = 8;
//const totalWidth = (width + gap) * rects;

//interface rectInfo {
//x: number,
//y: number,
//width: number,
//height: number,
//number: number
//id: number
//};


//const generateBoxesInfo = (count: number): Array<rectInfo> => {
//const boxesInfo: Array<rectInfo> = [];
//for (let i = 0; i < count; i++) {
//const rect: rectInfo = {
//width: width,
//height: height,
//x: i * (width + 5) + 5,
//y: 0,
//number: Math.floor(Math.random() * 10),
//id: i
//};
//boxesInfo.push(rect);
//}
//return boxesInfo;
//};


//useEffect(() => {
//const initialBoxes = generateBoxesInfo(rects);
//setRectsArray(initialBoxes);

//if (mainRef.current) {
//const rect = mainRef.current.getBoundingClientRect();
//}
//}, []);


//useEffect(() => {
//if (rectsArray.length > 0) {
//switch (task) {
//case 'add':
//const updatedArray = [...rectsArray];

//const rectArrayLen = updatedArray.length;
//console.log(rectArrayLen);
//const newRect: rectInfo = {
//width: width,
//height: height,
//x: rectArrayLen * (width + 5) + 5,
//y: 0,
//number: Math.floor(Math.random() * 10),
//id: rectArrayLen
//};
//updatedArray.push(newRect);
//setRectsArray(updatedArray);
//break;

//case 'insert':
//const insertArray = [...rectsArray];
//const insertArrayLen = insertArray.length;
//const insertRect: rectInfo = {
//width: width,
//height: height,
//x: insertArrayLen * (width + 5) + 5,
//y: 0,
//number: insertVal,
//id: insertIndex
//};
//insertArray.splice(insertIndex, 0, insertRect);
//const updatedIArr = insertArray.map((r, index) => ({
//...r,
//x: index * (width + 5) + 5,
//id: index,
//}));
//setRectsArray(updatedIArr);
//break;
//case 'removeIndex':
//const removeArray = [...rectsArray];

//if (removeIndex <= removeArray.length) {
//removeArray.splice(removeIndex, 1);
//}
//else {
//window.alert("Greater than index length!");
//}
//const updatedRArr = removeArray.map((r, index) => ({
//...r,
//x: index * (width + 5) + 5,
//id: index
//}));
//setRectsArray(updatedRArr);
//break;
//case 'pop':
//const udpatedArray = [...rectsArray];
//udpatedArray.pop();
//setRectsArray(udpatedArray);
//break;
//}
//}
//}, [rects]);

//console.log("rects array: ", rectsArray);
//console.log("Task Clicked: ", task);
//console.log("removeIndex: ", removeIndex);
//console.log("rects: ", rects);

//const handleAdd = () => {
//setRects(rects + 1);
//setTask('add');
//};

//const handlePop = () => {
//if (rects > 1) {
//setRects(rects - 1);
//setTask('pop')
//}
//};

//const handleInsert = () => {
//if (insertIndex < rects) {
//setRects(rects + 1);
//setTask('insert');
//}
//};

//const handleRemoveIndex = () => {
//if (rects > 1 && removeIndex < rects) {
//setRects(rects - 1);
//setTask("removeIndex");
//}
//}

//const handleSort = () => {

//const sortedArray = [...rectsArray].sort((a, b) => a.number - b.number);


//const updatedArray = sortedArray.map((rect, index) => ({
//...rect,
//x: index * (width + 5) + 5,
//id: index
//}));

//setRectsArray(updatedArray);
//};

//const handleNewBoxes = () => {
//const newBoxes = generateBoxesInfo(rectsArray.length);
//setRectsArray(newBoxes);
//}

//return (
//<main className={`w-screen h-screen flex`} ref={mainRef}>
//<div className=" w-[60%] h-full flex items-center justify-center rounded-[8px] duration-200">
//{
//rectsArray.length > 0 ? (
//<Konva1
//x={totalWidth}
//y={height}
//boxesInfo={rectsArray}
//rectCount={rectCount}
///>
//) : null
//}
//</div>

//<div className="w-[40%] h-full flex flex-col justify-center items-center gap-5">

//<button
//className="border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105"
//onClick={handleAdd}
//>
//Add
//</button>


//<div className="w-[350px]  p-3 flex gap-2 items-center border-1">
//<button
//className={`border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105 `}
//onClick={handleInsert}
//>
//Insert
//</button>

//<label htmlFor="value">Value</label>
//<input type="number" className="border-b-1 w-[50px] p-2 outline-none"
//value={insertVal} name="value" onChange={(e) => setInsertVal(Number(e.target.value))} />

//<label htmlFor="index">Index</label>
//<input type="number" className="border-b-1 w-[50px] p-2 outline-none"
//value={insertIndex} name="index" onChange={(e) => setInsertIndex(Number(e.target.value))}
//min={0} max={(rects - 1)} />

//</div>

//<div className="w-[250px]  p-3 flex gap-2 border-1 items-center">
//<button
//className={`border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105 `}
//onClick={handleRemoveIndex}
//>
//Remove
//</button>

//<label htmlFor="indexR">Index</label>
//<input type="number" className="border-b-1 w-[50px] p-2 outline-none"
//value={removeIndex} name="indexR" onChange={(e) => setRemoveIndex(Number(e.target.value))}
//min={0} max={(rects - 1)} />

//</div>

//<button
//className="border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105"
//onClick={handlePop}
//>
//Pop
//</button>

//<button
//className="border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105"
//onClick={handleSort}
//>
//Sort
//</button>

//<button
//className="border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105"
//onClick={handleNewBoxes}
//>
//New
//</button>

//</div>
//</main>
//);
//}




















import { useEffect, useRef, useState } from "react";
import { Konva1 } from "./konva1";
import { algoStore } from "../STATE/algoStore";

export default function KonvaContainer() {
    const mainRef = useRef<HTMLElement>(null);
    const rectCounts = algoStore((state: any) => state.rectCounts);
    const setRectCounts = algoStore((state: any) => state.setRectCounts);
    const [rects, setRects] = useState<number>(5);
    const [rectsArray, setRectsArray] = useState<Array<rectInfo>>([]);
    const [task, setTask] = useState<string>('');
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const [insertVal, setInsertVal] = useState<number>(0);
    const [insertIndex, setInsertIndex] = useState<number>(0);
    const [removeIndex, setRemoveIndex] = useState<number>(0);

    const div_x = 400;
    const div_y = 50;
    const width = 50;
    const height = 50;
    const gap = 5;
    let rectCount = 8;
    const totalWidth = (width + gap) * rects;

    interface rectInfo {
        x: number,
        y: number,
        width: number,
        height: number,
        number: number
        id: number
        color?: string  // Add optional color property
    };

    const generateBoxesInfo = (count: number): Array<rectInfo> => {
        const boxesInfo: Array<rectInfo> = [];
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

        for (let i = 0; i < count; i++) {
            const rect: rectInfo = {
                width: width,
                height: height,
                x: i * (width + gap) + gap,
                y: 0,
                number: Math.floor(Math.random() * 10),
                id: i,
                color: colors[i % colors.length] // Assign cycling colors
            };
            boxesInfo.push(rect);
        }
        return boxesInfo;
    };


    useEffect(() => {
        // Initialize with some boxes when component mounts
        setRectsArray(generateBoxesInfo(5));
    }, []);

    // Animation function - bubble sort with steps and colors
    // Replace your animateBubbleSort function with this version
    // Replace your animateBubbleSort function with this version
    const animateBubbleSort = async () => {
        setIsAnimating(true);
        const array = [...rectsArray];

        // Add color property to each rectangle
        array.forEach(rect => {
            rect.color = '#3B82F6'; // Default blue
        });

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                // Highlight comparison - make them red
                array[j].color = '#EF4444'; // Red
                array[j + 1].color = '#EF4444'; // Red
                setRectsArray([...array]);
                await new Promise(resolve => setTimeout(resolve, 300));

                // Compare adjacent elements
                if (array[j].number > array[j + 1].number) {
                    // Make them orange during swap
                    array[j].color = '#F97316'; // Orange
                    array[j + 1].color = '#F97316'; // Orange
                    setRectsArray([...array]);
                    await new Promise(resolve => setTimeout(resolve, 200));

                    // ANIMATE THE MOVEMENT
                    // Store original elements (including all their properties)
                    const originalJ = { ...array[j] };
                    const originalJPlus1 = { ...array[j + 1] };

                    // Create animation frames for smooth movement
                    const steps = 15; // Number of animation steps
                    for (let step = 1; step <= steps; step++) {
                        const progress = step / steps;

                        // Create a complete copy of the array for this animation frame
                        const tempArray = array.map(rect => ({ ...rect }));

                        // Interpolate positions for both rectangles
                        tempArray[j] = {
                            ...originalJ,
                            x: originalJ.x + (originalJPlus1.x - originalJ.x) * progress
                        };
                        tempArray[j + 1] = {
                            ...originalJPlus1,
                            x: originalJPlus1.x + (originalJ.x - originalJPlus1.x) * progress
                        };

                        setRectsArray([...tempArray]);
                        await new Promise(resolve => setTimeout(resolve, 40));
                    }

                    // Now swap elements in the array
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];

                    // Update final positions and IDs after swap
                    array[j].x = j * (width + gap) + gap;
                    array[j].id = j;
                    array[j + 1].x = (j + 1) * (width + gap) + gap;
                    array[j + 1].id = j + 1;

                    // Make them green after successful swap
                    array[j].color = '#10B981'; // Green
                    array[j + 1].color = '#10B981'; // Green
                    setRectsArray([...array]);
                    await new Promise(resolve => setTimeout(resolve, 300));
                } else {
                    // No swap needed - make them yellow briefly
                    array[j].color = '#EAB308'; // Yellow
                    array[j + 1].color = '#EAB308'; // Yellow
                    setRectsArray([...array]);
                    await new Promise(resolve => setTimeout(resolve, 200));
                }

                // Reset to default colors
                array[j].color = '#3B82F6'; // Blue
                array[j + 1].color = '#3B82F6'; // Blue
                setRectsArray([...array]);
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            // Mark the sorted element as purple (final position)
            if (array[array.length - i - 1]) {
                array[array.length - i - 1].color = '#8B5CF6'; // Purple
                setRectsArray([...array]);
            }
        }

        // Final celebration - make all rectangles rainbow colors briefly
        const rainbowColors = ['#EF4444', '#F97316', '#EAB308', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
        array.forEach((rect, index) => {
            rect.color = rainbowColors[index % rainbowColors.length];
        });
        setRectsArray([...array]);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Reset to final sorted colors (gradient from green to blue)
        array.forEach((rect, index) => {
            const ratio = index / (array.length - 1);
            const colors = [
                '#10B981', // Green
                '#06B6D4', // Cyan  
                '#3B82F6', // Blue
                '#8B5CF6'  // Purple
            ];
            rect.color = colors[Math.floor(ratio * (colors.length - 1))];
        });
        setRectsArray([...array]);

        setIsAnimating(false);
    };

    // Also update your Konva1 component to fix the key issue
    // Replace the Text rendering in your Konva1 component with better keys

    // Fixed: Added task to dependency array
    useEffect(() => {
        if (rectsArray.length > 0 && task) {
            switch (task) {
                case 'add':
                    const updatedArray = [...rectsArray];
                    const rectArrayLen = updatedArray.length;
                    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
                    const newRect: rectInfo = {
                        width: width,
                        height: height,
                        x: rectArrayLen * (width + gap) + gap,
                        y: 0,
                        number: Math.floor(Math.random() * 10),
                        id: rectArrayLen,
                        color: colors[rectArrayLen % colors.length]
                    };
                    updatedArray.push(newRect);
                    setRectsArray(updatedArray);
                    break;

                case 'insert':
                    const insertArray = [...rectsArray];
                    const insertColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
                    const insertRect: rectInfo = {
                        width: width,
                        height: height,
                        x: 0, // Will be updated below
                        y: 0,
                        number: insertVal,
                        id: insertIndex,
                        color: insertColors[insertIndex % insertColors.length]
                    };
                    insertArray.splice(insertIndex, 0, insertRect);
                    const updatedIArr = insertArray.map((r, index) => ({
                        ...r,
                        x: index * (width + gap) + gap,
                        id: index,
                        color: insertColors[index % insertColors.length]
                    }));
                    setRectsArray(updatedIArr);
                    break;

                case 'removeIndex':
                    const removeArray = [...rectsArray];
                    if (removeIndex < removeArray.length) {
                        removeArray.splice(removeIndex, 1);
                        const removeColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
                        const updatedRArr = removeArray.map((r, index) => ({
                            ...r,
                            x: index * (width + gap) + gap,
                            id: index,
                            color: removeColors[index % removeColors.length]
                        }));
                        setRectsArray(updatedRArr);
                    } else {
                        alert("Index out of bounds!");
                    }
                    break;

                case 'pop':
                    const poppedArray = [...rectsArray];
                    poppedArray.pop();
                    setRectsArray(poppedArray);
                    break;
            }
            setTask(''); // Reset task after execution
        }
    }, [task, rectsArray, insertVal, insertIndex, removeIndex]);

    const handleAdd = () => {
        setRects(rects + 1);
        setTask('add');
    };

    const handlePop = () => {
        if (rects > 1) {
            setRects(rects - 1);
            setTask('pop');
        }
    };

    const handleInsert = () => {
        if (insertIndex <= rects) {
            setRects(rects + 1);
            setTask('insert');
        }
    };

    const handleRemoveIndex = () => {
        if (rects > 1 && removeIndex < rects) {
            setRects(rects - 1);
            setTask("removeIndex");
        }
    }

    const handleSort = () => {
        const sortedArray = [...rectsArray].sort((a, b) => a.number - b.number);
        const updatedArray = sortedArray.map((rect, index) => ({
            ...rect,
            x: index * (width + gap) + gap,
            id: index
        }));
        setRectsArray(updatedArray);
    };

    const handleNewBoxes = () => {
        const newBoxes = generateBoxesInfo(rectsArray.length);
        setRectsArray(newBoxes);
    }

    return (
        <main className="w-screen h-screen flex bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100" ref={mainRef}>
            <div className="w-[60%] h-full flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 border border-white/20">
                {
                    rectsArray.length > 0 ? (
                        <Konva1
                            x={totalWidth}
                            y={height}
                            boxesInfo={rectsArray}
                            rectCount={rectCount}
                        />
                    ) : null
                }
            </div>

            <div className="w-[40%] h-full flex flex-col justify-center items-center gap-5 bg-white/60 backdrop-blur-sm m-4 rounded-2xl shadow-2xl border border-white/30 p-8">

                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                    Algorithm Visualizer
                </h1>

                <button
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 p-4 rounded-xl w-[120px] cursor-pointer hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all duration-200 hover:shadow-xl font-semibold"
                    onClick={handleAdd}
                    disabled={isAnimating}
                >
                    Add
                </button>

                <div className="w-[380px] p-4 flex gap-3 items-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-lg">
                    <button
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 p-3 rounded-lg w-[100px] cursor-pointer hover:scale-105 disabled:opacity-50 shadow-md transition-all duration-200 font-medium"
                        onClick={handleInsert}
                        disabled={isAnimating}
                    >
                        Insert
                    </button>

                    <label htmlFor="value" className="text-sm font-semibold text-green-700">Value</label>
                    <input
                        type="number"
                        className="border-2 border-green-300 rounded-lg w-[60px] p-2 outline-none disabled:bg-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                        value={insertVal}
                        name="value"
                        onChange={(e) => setInsertVal(Number(e.target.value))}
                        disabled={isAnimating}
                    />

                    <label htmlFor="index" className="text-sm font-semibold text-green-700">Index</label>
                    <input
                        type="number"
                        className="border-2 border-green-300 rounded-lg w-[60px] p-2 outline-none disabled:bg-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                        value={insertIndex}
                        name="index"
                        onChange={(e) => setInsertIndex(Number(e.target.value))}
                        min={0}
                        max={rects}
                        disabled={isAnimating}
                    />

                </div>

                <div className="w-[250px] p-3 flex gap-2 border rounded items-center">
                    <button
                        className="border p-3 rounded w-[100px] cursor-pointer hover:scale-105 disabled:opacity-50"
                        onClick={handleRemoveIndex}
                        disabled={isAnimating}
                    >
                        Remove
                    </button>

                    <label htmlFor="indexR">Index</label>
                    <input
                        type="number"
                        className="border-b w-[50px] p-2 outline-none disabled:bg-gray-100"
                        value={removeIndex}
                        name="indexR"
                        onChange={(e) => setRemoveIndex(Number(e.target.value))}
                        min={0}
                        max={rects - 1}
                        disabled={isAnimating}
                    />

                </div>

                <button
                    className="border p-3 rounded w-[100px] cursor-pointer hover:scale-105 disabled:opacity-50"
                    onClick={handlePop}
                    disabled={isAnimating}
                >
                    Pop
                </button>

                <button
                    className="border p-3 rounded w-[100px] cursor-pointer hover:scale-105 disabled:opacity-50"
                    onClick={handleSort}
                    disabled={isAnimating}
                >
                    Sort
                </button>

                <button
                    className={`border p-3 rounded w-[100px] cursor-pointer hover:scale-105 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isAnimating ? 'bg-red-200 border-red-400' : 'bg-green-200 border-green-400'
                        }`}
                    onClick={animateBubbleSort}
                    disabled={isAnimating}
                >
                    {isAnimating ? 'Sorting...' : 'Animate'}
                </button>

                <button
                    className="border p-3 rounded w-[100px] cursor-pointer hover:scale-105 disabled:opacity-50"
                    onClick={handleNewBoxes}
                    disabled={isAnimating}
                >
                    New
                </button>

            </div>
        </main>
    );
}