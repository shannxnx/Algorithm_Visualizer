import { ArrowRight } from "lucide-react"
import { Editor } from "@monaco-editor/react"


type props = {
    readonly algoName?: string;
    readonly algoInfo?: string;
    readonly algoCode?: string
}


export default function AlgoInfo({ algoName, algoInfo, algoCode }: props) {
    return <div className="w-[40%] h-full border-1 rounded flex-col flex  items-center bg-white relative">
        <h1 className="text-3xl mt-4">{algoName}</h1>
        <button className="absolute right-0 mt-4 mr-4 cursor-pointer">
            <a href="/"> <ArrowRight size={32} /></a>
        </button>




        {
            <div className="mt-4 border-1 w-[90%] h-[50%] overflow-scroll p-2">
                {
                    //        //algoCode*
                }


            </div>
        }
        {
            //<div className="mt-4 border w-full h-[50%] overflow-auto">
            //    <SyntaxHighlighter
            //        language="javascript"
            //        style={dracula}
            //        showLineNumbers
            //        customStyle={{
            //            margin: 0,
            //            height: "100%",
            //            width: "100%",
            //            overflow: "auto", // allow scrolling inside if needed
            //        }}
            //        wrapLongLines={true} // so long lines don’t break layout
            //    >
            //        {algoCode}
            //    </SyntaxHighlighter>
            //</div>
        }



        <div className="w-[90%] h-[30%] mt-8 border-1 flex p-2 overflow-y-scroll
        text-justify" style={{ scrollbarWidth: "none" }}>
            <h1 className="lg:text-[20px]">
                {algoInfo}
            </h1>


        </div>

    </div>
}