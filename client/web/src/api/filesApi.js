// Files
import axios from "../services/axios.js";
import {useAuthStore, useUploadStore} from "../store/store.js";


export async function getDir(path)
{
    try
    {
        const {userId} = useAuthStore.getState();
        
        const response = await axios(`/${userId}/dir/${path}`);
        
        return response.data;
    }
    catch(error)
    {
        if(error.response?.data) return error.response?.data;
        console.error(error);
    };
};

export async function postDir(path, name)
{
    try
    {
        const {userId} = useAuthStore.getState();
        
        const values = {name}
        
        const response = await axios.post(`/${userId}/dir/${path}`, values);
        
        return response.data;
    }
    catch(error)
    {
        if(error.response?.data) return error.response?.data;
        console.error(error);
    };
};

export async function putDir(path, name)
{
    try
    {
        const {userId} = useAuthStore.getState();
        
        const values = {name}
        
        const response = await axios.put(`/${userId}/dir/${path}`, values);
        
        return response.data;
    }
    catch(error)
    {
        if(error.response?.data) return error.response?.data;
        console.error(error);
    };
};

export async function deleteDir(path)
{
    try
    {
        const {userId} = useAuthStore.getState();
        
        const response = await axios.delete(`/${userId}/dir/${path}`);
        
        return response.data;
    }
    catch(error)
    {
        if(error.response?.data) return error.response?.data;
        console.error(error);
    };
};

export async function getFile(path)
{
    try
    {
        const {userId} = useAuthStore.getState();
        
        const response = await axios(`/${userId}/file/${path}`, {
            responseType: "blob",
        });
        
        return response.data;
    }
    catch(error)
    {
        if(error.response?.data) return error.response?.data;
        console.error(error);
    };
};

export async function postFile(path, file)
{
    const controller = new AbortController();
    
    try
    {
        const {userId} = useAuthStore.getState();
        const {setUploadProgress} = useUploadStore.getState();
        
        const formData = new FormData();
        
        formData.append(`file`, file);
        
        const response = await axios.post(`/${userId}/file/${path}`, formData, {
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                
                setUploadProgress(file, percentCompleted);
            },
            signal: controller.signal,
        });
        
        return response.data;
    }
    catch(error)
    {
        if(error.response?.data) return error.response?.data;
        console.error(error);
    };
}

export async function putFile(path, name)
{
    try
    {
        const {userId} = useAuthStore.getState();
        
        const values = {name}
        
        const response = await axios.put(`/${userId}/file/${path}`, values);
        
        return response.data;
    }
    catch(error)
    {
        if(error.response?.data) return error.response?.data;
        console.error(error);
    };
};

export async function deleteFile(path)
{
    try
    {
        const {userId} = useAuthStore.getState();
        
        const response = await axios.delete(`/${userId}/file/${path}`);
        
        return response.data;
    }
    catch(error)
    {
        if(error.response?.data) return error.response?.data;
        console.error(error);
    };
};

export async function getThumbnail(path)
{
    try
    {
        const {userId} = useAuthStore.getState();
        
        const response = await axios(`/${userId}/thumbnail/${path}`, {
            responseType: "blob",
        });
        
        return response.data;
    }
    catch(error)
    {
        if(error.response?.data) return error.response?.data;
        console.error(error);
    };
};