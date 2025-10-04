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
