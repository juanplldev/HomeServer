// Dependencies
import {createContext, useState} from "react";


const Context = createContext({});


export function AuthContext({children})
{
    const userData = window.localStorage.getItem("userData");
    const loggedUser = userData ? JSON.parse(userData).token : null;
    const isAuthenticated = loggedUser ? true : false;
    
    const [authenticated, setAuthenticated] = useState(isAuthenticated);
    
    return (
        <Context.Provider value={{authenticated, setAuthenticated}}>
            {children}
        </Context.Provider>
    );
};


export default Context;