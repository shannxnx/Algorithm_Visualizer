

export const sortingArray = [
    {
        algoInfo: {
            name: "Bubble",
            algoLink: "sort/bubble",
            img: ""
        }
    },
    {
        algoInfo: {
            name: "Merge",
            algoLink: "sort/merge",
            img: ""
        }
    },
    {
        algoInfo: {
            name: "Quick",
            algoLink: "sort/quick",
            img: ""
        }
    },
    {
        algoInfo: {
            name: "Insertion",
            algoLink: "sort/insertion",
            img: ""
        }
    },
    {
        algoInfo: {
            name: "Selection",
            algoLink: "sort/selection",
            img: ""
        }
    },


];


export const searchingArray = [
    {
        algoInfo: {
            name: "Binary Search",
            link: "search/binary",
            img: ""
        }
    },
    {
        algoInfo: {
            name: "Linear Search",
            link: "search/linear",
            img: ""
        }
    },
    {
        algoInfo: {
            name: "Interpolation Search",
            link: "search/interpolation",
            img: ""
        }
    },
    {
        algoInfo: {
            name: "Jump Search",
            link: "search/jump",
            img: ""
        }
    },
    {
        algoInfo: {
            name: "Exponential Search",
            link: "search/exponential",
            img: ""
        }
    },
    {
        algoInfo: {
            name: "Ternary Search",
            link: "search/ternary",
            img: ""
        }
    },
]

export const graphAlgoArray = [
    {
        algoInfo: {
            name: "DFS"
        }
    },
    {
        algoInfo: {
            name: "BFS"
        }
    },
    {
        algoInfo: {
            name: "Dijkstra's"
        }
    },
    {
        algoInfo: {
            name: "A*"
        }
    }
];


export const backtrackingArray = [
    {
        algoInfo: {
            name: "N Queens"
        }
    },
    {
        algoInfo: {
            name: "Sudoku Solver"
        }
    }

]




export const rectInfo = [
    {
        rectInfo: {
            x_pos: window.innerWidth,
            y_pos: window.innerHeight,
            width: 25,
            height: 25,
            color: "red"
        }
    },
    {
        rectInfo: {
            x_pos: window.innerWidth,
            y_pos: window.innerHeight,
            width: 25,
            height: 25,
            color: "red"
        }
    },
    {
        rectInfo: {
            x_pos: window.innerWidth,
            y_pos: window.innerHeight,
            width: 25,
            height: 25,
            color: "red"
        }
    },
    {
        rectInfo: {
            x_pos: window.innerWidth,
            y_pos: window.innerHeight,
            width: 25,
            height: 25,
            color: "red"
        }
    },
    {
        rectInfo: {
            x_pos: window.innerWidth,
            y_pos: window.innerHeight,
            width: 25,
            height: 25,
            color: "red"
        }
    }
]

/*
prevX + 30
prev_y - 25
height + 25

*/
interface rectangle {
    x_pos: number,
    y_pos: number,
    width: number,
    height: number,
    color: string
}


export const testArray: Array<rectangle> = [];
for (let i = 0; i < 8; i++) {
    const gap = 5;
    const width = 35;
    const height = 25 + (i * width);
    const x_pos = (window.innerWidth / 2) + (i * (width + gap));
    const y_pos = (window.innerHeight / 2) - (i * width);


    const rectInfo = {
        x_pos,
        y_pos,
        width,
        height,
        color: 'red'
    }

    testArray.push(rectInfo);

}



