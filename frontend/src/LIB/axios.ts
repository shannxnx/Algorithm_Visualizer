import axios from "axios";


export const AxiosInstance = axios.create({
    baseURL: "http://localhost:5000/algorithm/db/",

});


export const AxiosInstanceAdmin = axios.create({
    baseURL: "http://localhost:5000/secret/admin",
    withCredentials: true
})





