import axios from "axios";


const baseURL = process.env.VITE_API_BASE_URL
export const AxiosInstance = axios.create({
    //baseURL: "http://localhost:5000/algorithm/db/",
    baseURL: `${baseURL}/algorithm/db/`,
    withCredentials: true

});




export const AxiosInstanceAdmin = axios.create({
    //baseURL: "http://localhost:5000/secret/admin",
    baseURL: `${baseURL}/secret/admin`,
    withCredentials: true
})








