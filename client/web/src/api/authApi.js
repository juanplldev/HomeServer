// Files
import axios from "../services/axios.js";


export async function getUsers(id="")
{
    try
    {
        const response = await axios(`/user/${id}`);
        
        return response.data;
    }
    catch(error)
    {
        if(error.response?.data) return error.response?.data;
        console.error(error);
    };
};

export async function register(values)
{
    try
    {
        const response = await axios.post(`/register`, values);
        
        return response.data;
    }
    catch(error)
    {
        if(error.response?.data) return error.response?.data;
        console.error(error);
    };
};

export async function login(values)
{
    try
    {
        const response = await axios.post(`/login`, values);
        
        return response.data;
    }
    catch(error)
    {
        if(error.response?.data) return error.response?.data;
        console.error(error);
    };
};