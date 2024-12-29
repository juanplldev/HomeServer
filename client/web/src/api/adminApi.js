// Files
import axios from "../services/axios.js";


export async function restart()
{
    try
    {
        const response = await axios.post(`/restart`, {});
        
        return response.data;
    }
    catch(error)
    {
        if(error.response?.data) return error.response?.data;
        console.error(error);
    };
};