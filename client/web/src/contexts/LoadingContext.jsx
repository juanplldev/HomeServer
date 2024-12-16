// Dependencies
import React, {createContext, useState, useContext} from "react";
// Files

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({children})
{
    const [isLoading, setIsLoading] = useState({
        home: false,
        input: false,
        mouse: false,
    });
    
    const showLoading = (type) => setIsLoading({...isLoading, [type]: true});
    const hideLoading = (type) => setIsLoading({...isLoading, [type]: false});
    
    return (
        <LoadingContext.Provider value={{isLoading, showLoading, hideLoading}}>
            {children}
        </LoadingContext.Provider>
    );
};