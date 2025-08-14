import { useEffect, useState } from "react"
import { authStore } from "../STATE/authStore";


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

                <button className="border-1 w-[120px] h-[40px] border-white mt-4 bg-white rounded-[8px]"
                    onClick={handleLogin}>
                    Login
                </button>
                <button className="border-1 w-[120px] h-[40px] border-white mt-4 bg-white rounded-[8px]"
                    onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </div>





    </main>
}