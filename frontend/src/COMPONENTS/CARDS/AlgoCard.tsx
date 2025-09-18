import { motion } from "framer-motion"

type props = {
    readonly algoName?: string;
    readonly algoInfo?: string;
    readonly algoCode?: string
    readonly algoLink: string
    index: number
}


export default function AlgoCard({ algoName, algoLink, index }: props,) {

    return <a href={`${algoLink}`} className="border border-black w-[85%] h-[400px] rounded-[8px] cursor-pointer 
    bg-white">
        <motion.div className="w-full h-full flex flex-col items-center gap-3 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
        >

            <div className="w-[85%] h-[70%] border-1 mt-4 rounded-[4px] bg-[#DB8C8C]">

            </div>



            <div className="border-1 w-[85%] h-[40px] rounded-[6px] flex justify-center items-center
        hover:scale-105 duration-150 bg-black">
                <h1 className="text-white">
                    {
                        algoName
                    }
                </h1>

            </div>

        </motion.div>
    </a>

}