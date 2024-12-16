// Dependencies
import React, {createContext, useState, useContext} from "react";
import {useDispatch} from "react-redux";
// Files
import {login} from "../redux/actions/actions";
import {LoadingProvider} from "./LoadingContext";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children})
{
    const dispatch = useDispatch();
    
    const localUserData = window.localStorage.getItem("userData");
    
    const {token, userId, isAdmin} = localUserData ? JSON.parse(localUserData) : {};
    
    const [auth, setAuth] = useState({
        token: token ?? "",
        userId: userId ?? "",
        isAdmin: isAdmin ?? false,
        isAuthenticated: token ? true : false,
    });
    
    async function loginUser(input)
    {
        try
        {
            const data = await dispatch(login(input));
            const {content} = data?.payload;
            
            if(content)
            {
                const userData =
                {
                    token: content.token,
                    userId: content.userId,
                    isAdmin: content.isAdmin,
                };
                
                window.localStorage.setItem("userData", JSON.stringify(userData));
                
                setAuth({
                    ...userData,
                    isAuthenticated: true,
                });
                
                return content;
            };
        }
        catch(error)
        {
            console.error(error.response?.data ?? error);
            return;
        };
    };
    
    function logoutUser()
    {
        try
        {
            window.localStorage.removeItem("userData");
            
            setAuth({
                token: "",
                userId: "",
                isAdmin: false,
                isAuthenticated: false,
            });
        }
        catch(error)
        {
            console.error(error);
        };
    };
    
    return (
        <LoadingProvider>
            <AuthContext.Provider value={{auth, loginUser, logoutUser}}>
                {children}
            </AuthContext.Provider>
        </LoadingProvider>
    );
};
