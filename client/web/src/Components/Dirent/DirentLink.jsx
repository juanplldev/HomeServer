// Dependencies
import React from "react";
import {Link} from "react-router-dom";
// Files
import {useAppStore} from "../../store/store.js";
const host = process.env.REACT_APP_HOST;


export default function DirentLink(props)
{
    const {name, isDir, backDir} = props;
    
    const {path} = useAppStore();
    
    if(!isDir)
    {
        return props.children;
    }
    else
    {
        let link = new URL(path ? `${path}/${name}` : name, host);
        
        if(backDir)
        {
            if(path.split("/").length >= 2)
            {
                link = new URL(path.split("/").slice(0, -1).join("/") || "/", host);
            }
            else
            {
                link = new URL(path.split("/").slice(0, -2).join("/") || "/", host);
            }
        };
        
        return (
            <Link to={link.pathname} style={{color: "black", textDecoration: "none"}}>
                {props.children}
            </Link>
        );
    };
};