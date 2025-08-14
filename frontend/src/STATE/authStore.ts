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

    LoginAdmin: async (data: LoginData) => {
        try {
            const res = await AxiosInstanceAdmin.post("/login", data);
            if (!res) return toast.error("Error in login admin!");

            console.log("Login: ", res.data);
            toast.success("Login as Admin successfully!");

        } catch (error: any) {
            console.log("Error in login admin store: ", error.message);
            toast.error(error?.response?.data?.message);
        }
    },

    CheckAuth: async () => {
        try {
            const res = await AxiosInstanceAdmin.get("/check");
            if (!res) return toast.error("Error in check auth!");

            console.log("user: ", res.data);

        } catch (error: any) {
            console.log("Error in CheckAuth store: ", error.message);
            //toast.error(error?.response?.data?.message);
        }
    },

    Logout: async () => {
        try {
            const res = await AxiosInstanceAdmin.post("/logout");
            if (!res) return toast.error("Error in login admin!");

            console.log("Logout: ", res.data);
            toast.success("Logout successfully!");

        } catch (error: any) {
            console.log("Error in logout store: ", error.message);
            toast.error(error?.response?.data?.message);
        }
    }
}))