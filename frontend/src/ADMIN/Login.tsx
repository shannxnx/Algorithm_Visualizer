import { useEffect, useState } from "react"
import { authStore } from "../STATE/authStore";
import { useNavigate } from "react-router-dom";


interface LoginData {
    email: string,
    password: string,
}


export default function AdminLogin() {

    const [email, setEmail] = useState<string>("");
    const [password, setPasword] = useState<string>("");

    const LoginAdmin = authStore((state) => state.LoginAdmin);
    const ChechAuth = authStore((state) => state.CheckAuth);
    const Logout = authStore((state) => state.Logout);
    const Admin = authStore((state) => state.Admin);
    const clickCount = authStore((state) => state.clickCount);

    const navigate = useNavigate();


    const handleLogin = () => {
        const data: LoginData = {
            email: email,
            password: password
        };

        LoginAdmin(data);
        setEmail("");
        setPasword("");


    };

    const handleLogout = () => {
        Logout();
    };


    useEffect(() => {
        ChechAuth();
    }, [])


    useEffect(() => {
        ChechAuth();
        if (clickCount !== 13) {
            navigate("/", { replace: true });
        }
    }, [clickCount, ChechAuth, navigate]);


    console.log("Admin : ", Admin);




    return <main className="w-screen h-screen border-50 flex justify-center items-center">

        <div className="border-1 w-[40%] h-[400px] rounded-[12px] bg-black flex flex-col
        items-center">
            <h1 className="text-center text-white mt-8 text-4xl">Admin</h1>
            <div className="w-[90%] flex flex-col items-center mt-16 border ">
                <input type="text" className="hidden" />
                <input type="password" className="hidden" />

                <input type="text" placeholder="Email" className="input input-neutral mt-6" autoComplete="off"
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" placeholder="Password" className="input input-neutral mt-6 bg-white" autoComplete="off"
                    value={password} onChange={(e) => setPasword(e.target.value)} />

                <button className="border-1 w-[120px] h-[40px] border-white mt-4 bg-white rounded-[8px]
                cursor-pointer hover:scale-105 duration-150"
                    onClick={handleLogin}>
                    Login
                </button>
                <button className="border-1 w-[120px] h-[40px] border-white mt-4 bg-white rounded-[8px]
                cursor-pointer hover:scale-105 duration-150"
                    onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </div>





    </main>
}