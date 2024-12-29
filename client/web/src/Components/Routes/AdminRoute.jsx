// Dependencies
import React from "react";
import {Navigate} from "react-router-dom";
// Files
import {useAuthStore} from "../../store/store.js";


export default function AdminRoute({children})
{
    const isAdmin = useAuthStore(state => state.isAdmin);
    
    return isAdmin ? children : <Navigate to="/" />;
};