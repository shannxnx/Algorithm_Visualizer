import { motion } from "framer-motion";
import algoBG from "../../../img/heroBG.jpg";
import algoBG2 from "../../../img/heroBG2.jpg";
import algoBG3 from "../../../img/heroBG3.jpg";

export default function HomeCard() {
    return <div className="w-full lg:h-[500px] h-[600px] flex lg:items-center gap-5  lg:p-10 bg-cover bg-center bg-no-repeat 
    overflow-hidden  items-center justify-center" style={{
            //backgroundImage: `url(${algoBG2})`

        }}>





        <section className="lg:w-[65%] lg:h-[45%] w-[95%]  flex flex-col justify-between  ">
            <motion.h1 className="lg:text-5xl text-black text-4xl"
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

                Understand <span className="text-green-400">Algorithms</span> Visually

            </motion.h1>

            <div className="lg:h-[60%] border-b w-full flex  dark:border-black ">
                <motion.h1 className="lg:text-[20px] text-black" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                    Dive into interactive visualizations of pathfinding, search, and sorting algorithms.
                    Learn how they work — not by reading code, but by watching logic unfold.
                </motion.h1>
            </div>

        </section>




    </div>

}