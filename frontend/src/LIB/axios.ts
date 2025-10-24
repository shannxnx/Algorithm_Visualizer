import axios from "axios";


const baseURL = 'https://algorithm-visualizer-emzo.vercel.app';
export const AxiosInstance = axios.create({
    baseURL: baseURL ? baseURL : "http://localhost:5000/algorithm/db/",
    //baseURL: `${baseURL}/algorithm/db/`,
    withCredentials: true

});




export const AxiosInstanceAdmin = axios.create({
    baseURL: baseURL ? baseURL : "http://localhost:5000/secret/admin",
    //baseURL: `${baseURL}/secret/admin`,
    withCredentials: true
})








