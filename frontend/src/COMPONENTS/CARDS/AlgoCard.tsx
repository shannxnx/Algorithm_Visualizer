import { motion } from "framer-motion"

type props = {
    readonly algoName?: string;
    readonly algoInfo?: string;
    readonly algoCode?: string
    readonly algoLink: string,
    readonly algoImg?: string
    index: number
};






let pinkHex = "#DB8C8C";

export default function AlgoCard({ algoName, algoLink, index, algoImg }: props,) {


    console.log("Algo Link: ", algoLink)

    return <motion.a href={`${algoLink}`} className="border border-black w-[85%] h-[400px] rounded-[8px] cursor-pointer 
    bg-white"
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
            delay: index * 0.25,
            duration: 0.6,
            ease: "easeOut",
        }}
        viewport={{
            once: true,
            amount: 0.6,
        }}
    >
        <div className="w-full h-full flex flex-col items-center gap-3 justify-center"
        >


            {
                algoImg === ""
                    ? <div className="w-[85%] h-[70%] border-1 mt-4 rounded-[4px] bg-black">

                    </div>
                    : <div className="w-[85%] h-[70%] border-1 mt-4 rounded-[4px] bg-black">
                        <img src={algoImg} alt={`${algoName}`} className="w-full h-full border-5" />
                    </div>
            }




            <div className="border-1 w-[85%] h-[40px] rounded-[6px] flex justify-center items-center
        hover:scale-105 duration-150 bg-black">
                <h1 className="text-white">
                    {
                        algoName
                    }
                </h1>

            </div>

        </div>
    </motion.a>

}