// Dependencies
import React from "react";
import {ArrowRepeat} from "react-bootstrap-icons";
// Files
import {useAuthStore, useAppStore} from "../store/store";


export default function Restart()
{
    const isAdmin = useAuthStore(state => state.isAdmin);
    const {getPath, reloadContentState, restart} = useAppStore();
    const path = getPath();
    
    async function handleRestart()
    {
        const payload = await restart();
        console.log(payload);
        
        await reloadContentState(path);
    };
    
    return isAdmin && <ArrowRepeat style={{scale: "2", opacity: 0.9}} cursor="pointer" onClick={handleRestart}/>
};