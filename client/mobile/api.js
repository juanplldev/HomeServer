// Dependencies
import axios from "axios";
import mime from "mime";
// Files
import {API, API_KEY, API_TOKEN} from "@env";
import formatFileName from "./utils/formatFileName";


export async function getDirContent(path="")
{
    const config =
    {
        headers:
        {
            authorization: `Bearer ${API_TOKEN}`,
        },
    };
    
    try
    {
        const data = (await axios(`${API}/dir/${path}?apiKey=${API_KEY}`, config)).data;
        
        const {directories, files} = data?.content;
        
        return {directories, files};
    }
    catch (error)
    {
        const res = error.response?.data || null;
        
        if(Array.isArray(res))
        {
            console.error("[Server Response] on 'getDirContent':", res[0].error.message, "File:", res[0].file);
        }
        else if(res)
        {
            console.error("[Server Response] on 'getDirContent':", res);
        }
        else
        {
            console.error(error, "on", path);
        };
    };
};


export async function postFile(path, file, showBackupProgressNotification, backupProgress)
{
    const config =
    {
        headers:
        {
            authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: async (progressEvent) => {
            const uploadProgress = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
            await showBackupProgressNotification(backupProgress, path, file.name, uploadProgress);
        },
    };
    
    const formData = new FormData();
    
    formData.append("file", {
        uri: `file://${file.path}`,
        name: formatFileName(file.name),
        type: mime.getType(file.name) || "application/octet-stream",
    });
    
    try
    {
        await axios.post(`${API}/file/${path}?apiKey=${API_KEY}`, formData, config);
    }
    catch (error)
    {
        const res = error.response?.data || null;
        
        if(Array.isArray(res))
        {
            if(res[0].error.code !== "EEXIST") console.error("[Server Response] on 'postFile':", res[0].error.message);
        }
        else if(res)
        {
            console.error("[Server Response] on 'postFile':", res);
        }
        else
        {
            console.error(error, "on", path);
        };
    };
};


export async function createDir(path)
{
    const config =
    {
        headers:
        {
            authorization: `Bearer ${API_TOKEN}`,
        },
    };
    
    try
    {
        await axios.post(`${API}/dir/${path}?apiKey=${API_KEY}`, {}, config);
    }
    catch (error)
    {
        const res = error.response?.data || null;
        
        if(Array.isArray(res))
        {
            console.error("[Server Response] on 'createDir':", res[0].error.message, "File:", res[0].file);
        }
        else if(res)
        {
            console.error("[Server Response] on 'createDir':", res);
        }
        else
        {
            console.error(error, "on", path);
        };
    };
};