


export default function AlgoCard({ algoName }: { algoName: String }) {
    return <div className="border border-black w-[85%] h-[400px] rounded-[8px] cursor-pointer 
    flex flex-col items-center gap-8">

        <div className="w-[80%] h-[70%] border-1 mt-8 rounded-[4px]">

        </div>



        <div className="border-1 w-[80%] h-[30px] rounded-[6px] flex justify-center items-center">
            {
                algoName
            }
        </div>

    </div>;
}