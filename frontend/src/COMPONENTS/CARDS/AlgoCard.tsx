import { motion } from "framer-motion"

type props = {
    readonly algoName?: string;
    readonly algoInfo?: string;
    readonly algoCode?: string
    readonly algoLink: string,
    readonly algoImg?: string
    index: number,
    isLoading?: boolean
};



let pinkHex = "#DB8C8C";

export default function AlgoCard({ algoName, algoLink, algoImg, isLoading }: props,) {


    return <motion.a href={`${algoLink}`} className="border border-black lg:w-[80%] lg:h-[350px] rounded-[8px] cursor-pointer 
    bg-white"

    >
        <div className="w-full h-full flex flex-col items-center gap-3 justify-center"
        >




            {
                isLoading ? (<div className="skeleton h-[70%] w-[85%] rounded-4px"></div>)
                    : (
                        <div className="w-[85%] h-[70%] border-1 mt-4 rounded-[4px] bg-black">
                            {algoImg && <img src={algoImg} alt={`${algoName}`} className="w-full h-full border-5" />}
                        </div>
                    )
            }



            {

                isLoading ? (<div className="skeleton h-[40px] w-[85%] rounded-4px"></div>)
                    : (
                        <div className="border-1 w-[85%] h-[40px] rounded-[6px] flex justify-center items-center
                        hover:scale-105 duration-150 bg-black">
                            <h1 className="text-white">
                                {
                                    algoName
                                }
                            </h1>
                        </div>
                    )

            }



        </div>
    </motion.a>

}