// Dependencies
import axios from "axios";
import mime from "mime/lite";
// Files
import {API, API_KEY, API_TOKEN} from "@env";


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
        console.error(error);
    };
};

export async function postFiles(path, files)
{
    const config =
    {
        headers:
        {
            authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "multipart/form-data",
        },
    };
    
    const formData = new FormData();
    
    files.forEach(file => {
        const mimeType = mime.getType(file.name);
        
        formData.append(`file`, {
            uri: `file://${file.path}`,
            name: file.name,
            type: mimeType,
            ...file,
        });
    });
    
    try
    {
        return await axios.post(`${API}/file/${path}?apiKey=${API_KEY}`, formData, config);
    }
    catch (error)
    {
        console.error(error);
    };
};