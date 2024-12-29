// Dependencies
import axios from "axios";
// Files
import {useAuthStore} from "../store/store.js";
const {REACT_APP_API, REACT_APP_API_KEY} = process.env;


const authApi = axios.create({
    baseURL: REACT_APP_API,
});

authApi.interceptors.request.use(config => {
    const {token} = useAuthStore.getState();
    
    config.headers = {
        Authorization: `Bearer ${token}`,
        "x-api-key": REACT_APP_API_KEY,
    };
    
    return config;
});


export default authApi;