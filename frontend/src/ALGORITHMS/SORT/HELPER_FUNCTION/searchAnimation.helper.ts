import type React from "react";
import type { rectInfo } from "../../../INTERFACES && TYPES/sortInterface";


export const changeColor = async (
    arr: rectInfo[],
    target: number,
    setBoxesInfo: React.Dispatch<React.SetStateAction<rectInfo[]>>
) => {
    let left = 0,
        right = arr.length - 1;

    while (left <= right) {
        console.log("Left: ", left);
        console.log("Right: ", right);

        let mid = Math.floor((left + right) / 2);
        console.log("Mid: ", mid);

        let newArr = [...arr];
        newArr[mid] = { ...newArr[mid], color: "red" };

        setBoxesInfo([...newArr]);

        if (newArr[mid].number === target) {
            newArr[mid] = { ...newArr[mid], color: "green" };
            setBoxesInfo([...newArr]);
            return mid;
        }

        if (newArr[mid].number < target) {
            for (let i = left; i <= mid; i++) {
                newArr[i] = { ...newArr[i], color: "red" };
            }
            setBoxesInfo([...newArr]);
            left = mid + 1;
        } else {
            for (let i = mid; i <= right; i++) {
                newArr[i] = { ...newArr[i], color: "gray" };
            }
            setBoxesInfo([...newArr]);
            right = mid - 1;
        }

        console.log('---------------------------------');
        await new Promise((res) => setTimeout(res, 1000));
    }

    return -1;
};


export const LinearSearchAnimation = async (
    arr: rectInfo[],
    target: number,
    setBoxesInfo: React.Dispatch<React.SetStateAction<rectInfo[]>>) => {

    const copyArr = [...arr];

    for (let i = 0; i < copyArr.length; i++) {
        copyArr[i] = { ...copyArr[i], color: "red" };
        setBoxesInfo([...copyArr]);

        if (copyArr[i].number === target) {
            copyArr[i] = { ...copyArr[i], color: "green" };
            setBoxesInfo([...copyArr]);
            break;
        };

        await new Promise((res) => setTimeout(res, 800));
        copyArr[i] = { ...copyArr[i], color: "blue" };
        setBoxesInfo([...copyArr]);
    };


};

export const InterpolationAnimation = async (
    arr: rectInfo[],
    target: number,
    setBoxesInfo: React.Dispatch<React.SetStateAction<rectInfo[]>>
) => {
    let low = 0, high = arr.length - 1;

    while (low <= high && target >= arr[low].number && target <= arr[high].number) {

        if (arr[high].number === arr[low].number) break;

        const pos = low + Math.floor(
            ((target - arr[low].number) * (high - low)) /
            (arr[high].number - arr[low].number)
        );

        const copyArr = [...arr];
        copyArr[pos] = { ...copyArr[pos], color: "orange" };
        setBoxesInfo([...copyArr]);
        await new Promise((res) => setTimeout(res, 500));

        if (arr[pos].number === target) {
            copyArr[pos] = { ...copyArr[pos], color: "green" };
            setBoxesInfo([...copyArr]);
            await new Promise((res) => setTimeout(res, 800));
            break;
        }

        if (arr[pos].number < target) {

            for (let i = low; i <= pos; i++) {
                copyArr[i] = { ...copyArr[i], color: "gray" };
            }
            low = pos + 1;
        } else {

            for (let i = pos; i <= high; i++) {
                copyArr[i] = { ...copyArr[i], color: "gray" };
            }
            high = pos - 1;
        }

        setBoxesInfo([...copyArr]);
        await new Promise((res) => setTimeout(res, 500));
    }
};
