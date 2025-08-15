import { toast } from "react-toastify";
import { create } from "zustand";
import { AxiosInstance, AxiosInstanceAdmin } from "../LIB/axios";


interface LoginData {
    email: string,
    password: string,
}

interface authState {
    Admin: Object | null;
    clickCount: number;
    clickIncrement: () => void;
    resetClickCount: () => void;
    LoginAdmin: (data: LoginData) => void;
    Logout: () => void;
    CheckAuth: () => void;


}

export const authStore = create<authState>((set, get) => ({

    Admin: null,
    clickCount: 0,


    clickIncrement: () => {
        set((state) => ({ clickCount: state.clickCount + 1 }))
    },

    resetClickCount: () => {
        set({ clickCount: 0 });
    },

    LoginAdmin: async (data: LoginData) => {
        try {
            const res = await AxiosInstanceAdmin.post("/login", data);
            if (!res) return toast.error("Error in login admin!");

            console.log("Login: ", res.data);
            toast.success("Login as Admin successfully!");
            set({ Admin: res.data });

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
            set({ Admin: res.data });

        } catch (error: any) {
            console.log("Error in CheckAuth store: ", error.message);
            //toast.error(error?.response?.data?.message);
        }
    },

    Logout: async () => {
        try {
            const res = await AxiosInstanceAdmin.post("/logout");
            if (!res) return toast.error("Error in login admin!");


            set({ Admin: null });
            console.log("Logout: ", res.data);
            toast.success("Logout successfully!");
            window.location.href = "/";

        } catch (error: any) {
            console.log("Error in logout store: ", error.message);
            toast.error(error?.response?.data?.message);
        }
    }
}))