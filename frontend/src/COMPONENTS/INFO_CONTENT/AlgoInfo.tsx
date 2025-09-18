import { ArrowRight, Check, Edit } from "lucide-react"
import { Editor } from "@monaco-editor/react"
import React, { useCallback, useEffect, useState } from "react";
import { authStore } from "../../STATE/authStore";
import { algoStore } from "../../STATE/algoStore";
import { sortStore } from "../../STATE/sortingStore";



type props = {
    readonly algoName: string;
    readonly algoInfo: string;
    codes: {
        [key: string]: string;
    };
    editAlgoInfo: (data: any) => void
}



interface buttonProps {
    setCurrent: (lang: string) => void,
    language: string,
    currLanguage: string,
    languageId: string,

};


const LanguageButton = React.memo(({ setCurrent, language, currLanguage, languageId }: buttonProps) => {

    return <button className={`border  px-1 p-2 ${language === "JavaScript" ? 'w-[80px]' : 'w-[70px]'} cursor-pointer text-black 
            ${currLanguage === `${languageId}` ? "bg-green-400" : "bg-white"}`}
        onClick={() => setCurrent(`${languageId}`)}>

        {language}

    </button>
})

export default function AlgoInfo({ algoInfo }: { algoInfo: props, }) {


    const [currLanguage, setCurrLanguage] = useState<string>('cpp');

    const [code, setCode] = useState<string>(algoInfo.codes['cpp']);
    const [editMode, setEditMode] = useState<boolean>(false);
    const Admin = authStore((state) => state.Admin);




    useEffect(() => {
        setCode(algoInfo.codes[currLanguage])
    }, [currLanguage, algoInfo.codes]);



    //  console.log("Curr lang: ", currLanguage);




    const handleChangeLang = useCallback((lang: string) => {
        setCurrLanguage(lang);
    }, [currLanguage]);

    const handleCodeChange = (newCode: string | undefined) => {
        if (newCode !== undefined) {
            setCode(newCode);
        }
    }

    const handleEdit = () => {
        setEditMode(true);

    };

    const handleCheck = async () => {

        const data = {
            language: currLanguage,
            code: code,
            algoName: algoInfo.algoName
        };
        algoInfo.editAlgoInfo(data);
        setEditMode(false);
        window.location.reload();
    }






    return <div className="lg:w-[40%] lg:h-full border-1 rounded flex-col lg:flex  items-center bg-white relative
    dark:bg-white hidden ">
        <h1 className="text-3xl mt-4 dark:text-black">{algoInfo.algoName}</h1>
        <button className="absolute right-0 mt-4 mr-4 cursor-pointer">
            <a href="/"> <ArrowRight size={32} className="dark:text-black" /></a>
        </button>




        {
            <div className="mt-4 border-1 border-black w-[90%] h-[50%] overflow-scroll p-2 dark:bg-white
            flex flex-col" style={{ scrollbarWidth: "none" }}>
                {
                    Admin && <div className="w-[95%] h-[50px] flex items-center
                    justify-end">
                        {
                            !editMode ? <Edit className="mr-2 hover:scale-105 cursor-pointer text-black dark:text-black"
                                onClick={handleEdit} />
                                : <Check className="mr-2 hover:scale-105 cursor-pointer text-black dark:text-black" onClick={handleCheck} />
                        }

                    </div>
                }

                <Editor className="h-full" defaultLanguage="cpp"

                    value={code}
                    onChange={handleCodeChange}

                    options=
                    {{
                        readOnly: Admin && editMode ? false : true,
                        minimap: { enabled: false },
                        scrollbar: { vertical: "hidden", horizontal: "hidden", },

                    }} />


            </div>
        }


        <div className="w-[90%] h-[45px] flex items-center gap-[2px] border-black">

            <LanguageButton language="C++" setCurrent={handleChangeLang} currLanguage={currLanguage} languageId="cpp" />

            <LanguageButton language="C" setCurrent={handleChangeLang} currLanguage={currLanguage} languageId="c" />

            <LanguageButton language="Java" setCurrent={handleChangeLang} currLanguage={currLanguage} languageId="java" />

            <LanguageButton language="JavaScript" setCurrent={handleChangeLang} currLanguage={currLanguage} languageId="javascript" />

            <LanguageButton language="Python" setCurrent={handleChangeLang} currLanguage={currLanguage} languageId="python" />

            <LanguageButton language="Php" setCurrent={handleChangeLang} currLanguage={currLanguage} languageId="php" />

            <LanguageButton language="C#" setCurrent={handleChangeLang} currLanguage={currLanguage} languageId="csharp" />


        </div>


        <div className="w-[90%] h-[25%] mt-2 border-1 flex p-2 overflow-y-scroll border-black
        text-justify" style={{ scrollbarWidth: "none" }}>
            <h1 className="lg:text-[20px] text-black">
                {algoInfo.algoInfo}
            </h1>


        </div>

    </div>
}