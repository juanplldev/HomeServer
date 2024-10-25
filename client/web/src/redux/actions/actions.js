// Dependencies
import axios from "axios";
// Files
const {REACT_APP_API, REACT_APP_API_KEY} = process.env;
const API_URL = REACT_APP_API;
const API_KEY = REACT_APP_API_KEY;


export function register(values)
{
    return async function(dispatch)
    {
        const data = (await axios.post(`${API_URL}/register?apiKey=${API_KEY}`, values)).data;
        
        return dispatch({type: "REGISTER", payload: data});
    };
};

export function login(values)
{
    return async function(dispatch)
    {
        const data = (await axios.post(`${API_URL}/login?apiKey=${API_KEY}`, values)).data;
        
        return dispatch({type: "LOGIN", payload: data});
    };
};

export function getUsers()
{
    return async function(dispatch)
    {
        const data = (await axios(`${API_URL}/users?apiKey=${API_KEY}`)).data;
        
        return dispatch({type: "GET_USERS", payload: data});
    };
};

export function getDir(path)
{
    return async function(dispatch)
    {
        const userData = window.localStorage.getItem("userData");
        const token = userData ? JSON.parse(userData).token : null;
        
        const config =
        {
            headers:
            {
                authorization: `Bearer ${token}`,
            },
        };
        
        const data = (await axios(`${API_URL}/dir/${path}?apiKey=${API_KEY}`, config)).data;
        
        return dispatch({type: "GET_DIR", payload: data});
    };
};

export function postDir(path, name)
{
    return async function(dispatch)
    {
        const userData = window.localStorage.getItem("userData");
        const token = userData ? JSON.parse(userData).token : null;
        
        const values = {name}
        const config =
        {
            headers:
            {
                authorization: `Bearer ${token}`,
            },
        };
        
        const data = (await axios.post(`${API_URL}/dir/${path}?apiKey=${API_KEY}`, values, config)).data;
        
        return dispatch({type: "POST_DIR", payload: data});
    };
};

export function putDir(path, name)
{
    return async function(dispatch)
    {
        const userData = window.localStorage.getItem("userData");
        const token = userData ? JSON.parse(userData).token : null;
        
        const values = {name}
        const config =
        {
            headers:
            {
                authorization: `Bearer ${token}`,
            },
        };
        
        const data = (await axios.put(`${API_URL}/dir/${path}?apiKey=${API_KEY}`, values, config)).data;
        
        return dispatch({type: "PUT_DIR", payload: data});
    };
};

export function deleteDir(path)
{
    return async function(dispatch)
    {
        const userData = window.localStorage.getItem("userData");
        const token = userData ? JSON.parse(userData).token : null;
        
        const config =
        {
            headers:
            {
                authorization: `Bearer ${token}`,
            },
        };
        
        const data = (await axios.delete(`${API_URL}/dir/${path}?apiKey=${API_KEY}`, config)).data;
        
        return dispatch({type: "DELETE_DIR", payload: data});
    };
};

export function getFile(path)
{
    return async function(dispatch)
    {
        const userData = window.localStorage.getItem("userData");
        const token = userData ? JSON.parse(userData).token : null;
        
        const config =
        {
            headers:
            {
                authorization: `Bearer ${token}`,
            },
            responseType: "blob",
        };
        
        const data = (await axios(`${API_URL}/file/${path}?apiKey=${API_KEY}`, config)).data;
        
        return dispatch({type: "GET_FILE", payload: data});
    };
};

export function postFile(path, files)
{
    return async function(dispatch)
    {
        const userData = window.localStorage.getItem("userData");
        const token = userData ? JSON.parse(userData).token : null;
        
        const config =
        {
            headers:
            {
                authorization: `Bearer ${token}`,
            },
        };
        
        const formData = new FormData();
        
        files.forEach(file => {
            formData.append(`file`, file);
        });
        
        const data = (await axios.post(`${API_URL}/file/${path}?apiKey=${API_KEY}`, formData, config));
        
        return dispatch({type: "POST_FILE", payload: data});
    };
};

export function putFile(path, name)
{
    return async function(dispatch)
    {
        const userData = window.localStorage.getItem("userData");
        const token = userData ? JSON.parse(userData).token : null;
        
        const values = {name}
        const config =
        {
            headers:
            {
                authorization: `Bearer ${token}`,
            },
        };
        
        const data = (await axios.put(`${API_URL}/file/${path}?apiKey=${API_KEY}`, values, config)).data;
        
        return dispatch({type: "PUT_FILE", payload: data});
    };
};

export function deleteFile(path)
{
    return async function(dispatch)
    {
        const userData = window.localStorage.getItem("userData");
        const token = userData ? JSON.parse(userData).token : null;
        
        const config =
        {
            headers:
            {
                authorization: `Bearer ${token}`,
            },
        };
        
        const data = (await axios.delete(`${API_URL}/file/${path}?apiKey=${API_KEY}`, config)).data;
        
        return dispatch({type: "DELETE_FILE", payload: data});
    };
};