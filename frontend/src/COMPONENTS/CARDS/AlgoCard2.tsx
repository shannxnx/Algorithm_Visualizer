import { motion } from "framer-motion"

type diffLevel = "Easy" | "Medium" | "Hard" | "Extreme";


type props = {
    readonly algoName?: string;
    readonly algoInfo?: string;
    readonly algoCode?: string
    readonly algoLink: string,
    readonly algoImg?: string,
    readonly difficulty?: diffLevel,
    readonly type?: string,
    readonly description?: string,
    readonly time?: string
    index: number,
    isLoading?: boolean
};



let pinkHex = "#DB8C8C";

const difficultyColor = {
    Easy: "bg-green-400",
    Medium: "bg-blue-400",
    Hard: "bg-yellow-300",
    Extreme: "bg-red-500"

}



export default function AlgoCard2({ algoName, algoLink, algoImg, isLoading, difficulty, type, description, time }: props,) {




    return <motion.a href={`${algoLink}`} className="border border-gray-300 lg:w-[80%] lg:h-[180px] rounded-[8px] cursor-pointer 
    bg-white hover:shadow-lg shadow-sm"

    >
        <div className="w-full h-full flex flex-col items-center gap-3 overflow-y-scroll "
        >




            {
                isLoading ? (<div className="skeleton h-[45px] w-[90%] mt-4 bg-gray-200"></div>)
                    : (
                        <div className="w-[90%] mt-4 rounded-[4px] flex justify-between items-center">

                            <h3 className="lg:text-[20px] text-2xl text-black">

                                {
                                    algoName
                                }

                            </h3>

                            <p className={`lg:text-[14px] rounded-[14px] p-2 text-black
                                ${difficultyColor[difficulty!] ? difficultyColor[difficulty!] : 'bg-green-400'}`}
                            >

                                {difficulty}
                            </p>
                        </div>
                    )
            }



            {

                isLoading ? (<div className="skeleton lg:h-[30%] w-[90%] rounded-4px bg-gray-200"></div>)
                    : (
                        <div className="lg:h-[35%] w-[90%] h-[20%]  overflow-scroll  ">
                            <p className="text-[16px] text-black">
                                {
                                    description
                                }
                            </p>
                        </div>
                    )

            }

            {
                isLoading ? (<div className="skeleton h-[15%] w-[90%] bg-gray-200"></div>)
                    : (
                        <div className="lg:w-[90%] lg:h-[15%] w-[90%]  rounded-[4px] flex justify-between items-center
                        ">
                            <p className=" rounded-[14px] p-1 bg-blue-100 text-black mb-2 lg:mb-0">
                                {type}
                            </p>

                            <p className="rounded-[14px] p-1 bg-blue-100 text-black mb-2 lg:mb-0">
                                {time}
                            </p>

                            {
                                //<h3 className="lg:text-[24px]">{algoName}</h3>
                                //<p className={`lg:text-[14px] rounded-[14px] p-2 
                                //    ${difficultyColor[difficulty!] ? difficultyColor[difficulty!] : 'bg-green-400'}`}
                                //>

                                //    {difficulty}
                                //</p>
                            }

                        </div>
                    )
            }




        </div>
    </motion.a>

}