import { toast } from "react-toastify";
import { create } from "zustand";
import { AxiosInstance, AxiosInstanceAdmin } from "../LIB/axios";


interface LoginData {
    email: string,
    password: string,
}

interface authState {
    LoginAdmin: (data: LoginData) => void;
    Logout: () => void;
    CheckAuth: () => void;
}

export const authStore = create<authState>((set, get) => ({

    LoginAdmin: (data: LoginData) => {
        try {
            const res = AxiosInstanceAdmin.post("/login", data);
            if (!res) return toast.error("Error in login admin!");

            console.log("Login: ", res);
            toast.success("Login as Admin successfully!");

        } catch (error: any) {
            console.log("Error in login admin store: ", error.message);
            toast.error("Error in login admin!!");
        }
    },

    CheckAuth: () => {
        try {
            const res = AxiosInstanceAdmin.post("/check");
            if (!res) return toast.error("Error in check auth!");

            console.log("user: ", res);

        } catch (error: any) {
            console.log("Error in CheckAuth store: ", error.message);
            toast.error("Error in CheckAuth !!");
        }
    },

    Logout: () => {
        try {
            const res = AxiosInstanceAdmin.post("/logout");
            if (!res) return toast.error("Error in login admin!");

            console.log("Logout: ", res);

        } catch (error: any) {
            console.log("Error in logout store: ", error.message);
            toast.error("Error in logout !!");
        }
    }
}))