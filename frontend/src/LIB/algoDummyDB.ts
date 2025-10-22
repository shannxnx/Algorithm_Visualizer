import BubbleSortImg from "../../img/sorting/Bubble_Sort.png";
import MergeSortImg from "../../img/sorting/Merge_Sort.png";
import QuickSortImg from "../../img/sorting/Quick_Sort.png";
import InsertionSortImg from "../../img/sorting/Insertion_Sort.png";
import SelectionSortImg from "../../img/sorting/Selection_Sort.jpg";




export const sortingArray = [
    {
        algoInfo: {
            name: "Bubble Sort",
            algoLink: "sort/bubble",
            img: BubbleSortImg,
            difficulty: "Easy",
            type: "Sorting",
            description: `Compares each pair of adjacent elements and swaps them if they’re in the wrong order.
                            It “bubbles” the largest values to the end with each pass.`,
            time: `O(n²)`
        }
    },
    {
        algoInfo: {
            name: "Merge Sort",
            algoLink: "sort/merge",
            img: MergeSortImg,
            difficulty: "Easy",
            type: "Sorting",
            description: `Divides the array into halves, sorts each half, then merges them back together in order.
Efficient and stable, works well for large datasets.`,
            time: `O(n log n)`
        }
    },
    {
        algoInfo: {
            name: "Quick Sort",
            algoLink: "sort/quick",
            img: QuickSortImg,
            difficulty: "Easy",
            type: "Sorting",
            description: `Picks a pivot element, partitions the array so smaller elements go left and larger ones go right, then sorts each part recursively.`,
            time: `O(n log n) / O(n²)`
        }
    },
    {
        algoInfo: {
            name: "Insertion Sort",
            algoLink: "sort/insertion",
            img: InsertionSortImg,
            difficulty: "Easy",
            type: "Sorting",
            description: `Builds the sorted array one element at a time by inserting each new element into its correct position.
Efficient for small or nearly sorted data.`,
            time: `O(n²)`
        }
    },
    {
        algoInfo: {
            name: "Selection Sort",
            algoLink: "sort/selection",
            img: SelectionSortImg,
            difficulty: "Easy",
            type: "Sorting",
            description: `
            Repeatedly finds the smallest element from the unsorted part and swaps it into its correct position.
Simple but inefficient for large arrays.`,
            time: `O(n²)`
        }
    },


];


export const searchingArray = [
    {
        algoInfo: {
            name: "Binary Search",
            algoLink: "search/binary",
            img: "",
            difficulty: "Medium",
            type: "Searching",
            description: `Repeatedly divides a sorted array in half to find the target.
Fast and efficient, but only works on sorted data.`,
            time: `O(log n)`
        }
    },
    {
        algoInfo: {
            name: "Linear Search",
            algoLink: "search/linear",
            img: "",
            difficulty: "Easy",
            type: "Searching",
            description: `Checks each element one by one until it finds the target.
Simple but slow — works on any list.`,
            time: `O(n)`
        }
    },
    {
        algoInfo: {
            name: "Interpolation Search",
            algoLink: "search/interpolation",
            img: "",
            difficulty: "Medium",
            type: "Searching",
            description: `An improvement of binary search that estimates the target’s position based on its value.
Best for uniformly distributed sorted data.`,
            time: `O(log log n) / O(n)`

        }
    },
    {
        algoInfo: {
            name: "Jump Search",
            algoLink: "search/jump",
            img: "",
            difficulty: "Medium",
            type: "Searching",
            description: `Jumps ahead by fixed steps, then performs a linear search backward when it overshoots.
Balance of speed and simplicity for sorted arrays.`,
            time: `O(√n)`
        }
    },
    {
        algoInfo: {
            name: "Exponential Search",
            algoLink: "search/exponential",
            img: "",
            difficulty: "Medium",
            type: "Searching",
            description: `Quickly expands the search range exponentially, then applies binary search within that range.
Great for unbounded or infinite-sized sorted data.`,
            time: `O(log n)`
        }
    },
    {
        algoInfo: {
            name: "Ternary Search",
            algoLink: "search/ternary",
            img: "",
            difficulty: "Medium",
            type: "Searching",
            description: `ike binary search but splits the array into three parts instead of two.
Used for finding extrema (min/max) in unimodal functions.`,
            time: `O(log₃ n)`
        }
    },
]

export const graphAlgoArray = [
    {
        algoInfo: {
            name: "DFS",
            algoLink: "pathfinding/dfs",
            img: "",
            difficulty: "Hard",
            type: "Graph/Cells",
            description: `Explores as deep as possible before backtracking.
Useful for traversal, cycle detection, and maze solving.`,
            time: `O(V + E)`
        }
    },
    {
        algoInfo: {
            name: "BFS",
            algoLink: "pathfinding/bfs",
            img: "",
            difficulty: "Hard",
            type: "Graph/Cells",
            description: `Explores level by level, visiting all nearest nodes first.
Finds the shortest path in an unweighted graph.`,
            time: `O(V + E)`
        }
    },
    {
        algoInfo: {
            name: "Dijkstra's",
            algoLink: "pathfinding/dijkstras",
            img: "",
            difficulty: "Hard",
            type: "Graph/Cells",
            description: `Finds the shortest path from a start node to all others in a weighted graph.
Uses a priority queue to always explore the least costly path first.`,
            time: `O(V²)`
        }
    },
    {
        algoInfo: {
            name: "A*",
            algoLink: "pathfinding/a-star",
            img: "",
            difficulty: "Extreme",
            type: "Graph/Cells",
            description: `An optimized version of Dijkstra’s using a heuristic to guide the search.
Balances speed and accuracy — the go-to for games and maps.`,
            time: `O(E)`
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






