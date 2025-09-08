import { type RectReadOnly } from "react-use-measure";
import { type rectInfo } from "../../../INTERFACES && TYPES/sortInterface";


export const generateBoxesInfo = (count: number, bounds: RectReadOnly): Array<rectInfo> => {
    const boxesInfo: Array<rectInfo> = [];
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
    const konvaWidth: number = bounds.width;

    const rectWidth = konvaWidth >= 700 ? count > 6 ? 40 : 45 : count > 6 ? 25 : 30;
    const spacing = 5;
    const totalWidth = count * rectWidth + (count - 1) * spacing
    const startX = (konvaWidth / 2) - (totalWidth / 2);


    for (let i = 0; i < count; i++) {

        const rect: rectInfo = {
            x: startX + i * (rectWidth + spacing),
            y: -45,
            width: rectWidth,
            height: rectWidth,
            id: i,
            number: Math.floor(Math.random() * 100),
            color: "blue"                             //colors[i % colors.length]
        }
        boxesInfo.push(rect);

    }

    return boxesInfo;
};