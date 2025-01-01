// Dependencies
import React from "react";
import {BoxArrowRight} from "react-bootstrap-icons";
// Files
import {useAuthStore} from "../store/store";


export default function Logout()
{
    const logout = useAuthStore(state => state.logout);
    
    return <BoxArrowRight style={{scale: "2", opacity: 0.8}} cursor="pointer" onClick={logout}/>
};