import axios from "axios";


const baseURL = 'https://algorithm-visualizer-f8ku.onrender.com';
export const AxiosInstance = axios.create({
    //baseURL: baseURL ? baseURL : "http://localhost:5000/algorithm/db/",
    baseURL: `${baseURL}/algorithm/db/`,
    //baseURL: "http://localhost:5000/algorithm/db/",
    withCredentials: true

});




export const AxiosInstanceAdmin = axios.create({
    //baseURL: baseURL ? baseURL : "http://localhost:5000/secret/admin",
    baseURL: `${baseURL}/secret/admin`,
    //baseURL: "http://localhost:5000/secret/admin",
    withCredentials: true
})








