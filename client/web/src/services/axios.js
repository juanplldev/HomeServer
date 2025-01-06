// Dependencies
import axios from "axios";
// Files
import {useAuthStore} from "../store/store.js";
const {VITE_API, VITE_API_KEY} = import.meta.env;


const authApi = axios.create({
    baseURL: VITE_API,
});

authApi.interceptors.request.use(config => {
    const {token} = useAuthStore.getState();
    
    config.headers = {
        Authorization: `Bearer ${token}`,
        "x-api-key": VITE_API_KEY,
    };
    
    return config;
});


export default authApi;