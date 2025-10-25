import { type RectReadOnly } from "react-use-measure";
import { type rectInfo } from "../../../INTERFACES && TYPES/sortInterface";



export interface desktopSize {
    d_small?: number,
    d_medium?: number
};

export interface mobileSize {
    m_small?: number,
    m_medium?: number
};


export interface sizeOptions {
    desktop?: desktopSize
    mobile?: mobileSize,
};



const sortedRandomNum = (count: number): number[] => {

    const randomNum = [];
    for (let i = 0; i < count; i++) {
        randomNum.push(Math.floor(Math.random() * 100));
    };


    return randomNum.sort((a, b) => a - b);
};

export const generateBoxesInfoMS = (count: number, bounds: RectReadOnly,
    {
        desktop: { d_small = 40, d_medium = 45 } = {},
        mobile: { m_small = 40, m_medium = 45 } = {},
    }: sizeOptions = {}

)
    : Array<rectInfo> => {
    const boxesInfo: Array<rectInfo> = [];
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
    const konvaWidth: number = bounds.width;

    const rectWidth = konvaWidth >= 700 ? count > 6 ? d_small : d_medium : count > 6 ? m_small : m_medium;
    const spacing = 5;
    const totalWidth = count * rectWidth + (count - 1) * spacing
    const startX = (konvaWidth / 2) - (totalWidth / 2);

    console.log("Rect Width: ", rectWidth);
    console.log("Konva Width: ", konvaWidth);




    for (let i = 0; i < count; i++) {

        const rect: rectInfo = {
            x: startX + i * (rectWidth + spacing),
            y: -45,
            width: rectWidth,
            height: rectWidth,
            id: i,
            number: Math.floor(Math.random() * 100),
            color: "blue",                             //colors[i % colors.length],

        }
        boxesInfo.push(rect);

    }

    return boxesInfo;
};

export const generateBoxesInfo = (count: number, bounds: RectReadOnly,
    {
        desktop: { d_small = 40, d_medium = 45 } = {},
        mobile: { m_small = 40, m_medium = 45 } = {},
    }: sizeOptions = {}

)
    : Array<rectInfo> => {
    const boxesInfo: Array<rectInfo> = [];
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
    const konvaWidth: number = bounds.width;

    const rectWidth = konvaWidth >= 700 ? count > 6 ? d_small : d_medium : count > 6 ? m_small : m_medium;
    const spacing = 5;
    const totalWidth = count * rectWidth + (count - 1) * spacing
    const startX = (konvaWidth / 2) - (totalWidth / 2);

    console.log("Rect Width: ", rectWidth);
    console.log("Konva Width: ", konvaWidth);




    for (let i = 0; i < count; i++) {

        const rect: rectInfo = {
            x: startX + i * (rectWidth + spacing),
            y: 0,
            width: rectWidth,
            height: rectWidth,
            id: i,
            number: Math.floor(Math.random() * 100),
            color: "blue",                             //colors[i % colors.length],

        }
        boxesInfo.push(rect);

    }

    return boxesInfo;
};

export const generateSortedBoxesInfo = (count: number, bounds: RectReadOnly,
    {
        desktop: { d_small = 40, d_medium = 45 } = {},
        mobile: { m_small = 25, m_medium = 30 } = {},
    }: sizeOptions = {}

)
    : Array<rectInfo> => {
    const boxesInfo: Array<rectInfo> = [];
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
    const konvaWidth: number = bounds.width;

    const rectWidth = konvaWidth >= 700 ? count > 6 ? d_small : d_medium : count > 6 ? m_small : m_medium;
    const spacing = 5;
    const totalWidth = count * rectWidth + (count - 1) * spacing
    const startX = (konvaWidth / 2) - (totalWidth / 2);


    const sortedArr = sortedRandomNum(count);

    for (let i = 0; i < count; i++) {

        const rect: rectInfo = {
            x: startX + i * (rectWidth + spacing),
            y: 0,
            width: rectWidth,
            height: rectWidth,
            id: i,
            number: sortedArr[i],                      //Math.floor(Math.random() * 100),
            color: "blue",                             //colors[i % colors.length],

        }
        boxesInfo.push(rect);

    }

    return boxesInfo;
};








let globalId = 0;
export const generateBoxesInfoSelection = (count: number, bounds: RectReadOnly,
    {
        desktop: { d_small = 40, d_medium = 45 } = {},
        mobile: { m_small = 25, m_medium = 30 } = {},
    }: sizeOptions = {}

)
    : Array<rectInfo> => {
    const boxesInfo: Array<rectInfo> = [];
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
    const konvaWidth: number = bounds.width;

    const rectWidth = konvaWidth >= 700 ? count > 6 ? d_small : d_medium : count > 6 ? m_small : m_medium;
    const spacing = 5;
    const totalWidth = count * rectWidth + (count - 1) * spacing
    const startX = (konvaWidth / 2) - (totalWidth / 2);


    for (let i = 0; i < count; i++) {

        const rect: rectInfo = {
            x: startX + i * (rectWidth + spacing),
            y: -45,
            width: rectWidth,
            height: rectWidth,
            id: ++globalId,
            number: Math.floor(Math.random() * 100),
            color: "blue",                             //colors[i % colors.length],

        }
        boxesInfo.push(rect);

    }

    return boxesInfo;
};



export function getArrayCenterX(array: rectInfo[]): number {
    if (array.length === 0) return 0;
    const first = array[0];
    const last = array[array.length - 1];
    const leftEdge = first.x;
    const rightEdge = last.x + last.width;
    return (leftEdge + rightEdge) / 2;

}


