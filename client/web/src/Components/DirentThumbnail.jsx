// Dependencies
import React, {useEffect, useState} from "react";
import {Image} from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
// Files
import {getThumbnail} from "../redux/actions/actions";


export default function DirentThumbnail({props, style})
{
    const {name, path, isDir, backDir, size} = props;
    
    const [thumbnail, setThumbnail] = useState(null);
    
    useEffect(() => {
        if(!isDir && !backDir)
        {
            handleThumbnail();
        };
    }, []);
    
    async function handleThumbnail()
    {
        try
        {
            const thumb = await getThumbnail(`${path}/${name}`);
            
            if(thumb?.type === "application/octet-stream")
            {
                const blob = new Blob([thumb], {type: "image/webp"});
                const url = URL.createObjectURL(blob);
                
                setThumbnail(url);
            };
        }
        catch(error)
        {
            console.error("Error fetching thumbnail:", error);
        };
    };
    
    
    if(backDir)
    {
        return <Icons.Arrow90degUp size={size} style={style} />;
    }
    else if(isDir)
    {
        return <Icons.Folder size={size} style={style} />;
    }
    else
    {
        if(thumbnail)
        {
            return <Image width={size} src={thumbnail} rounded/>;
        };
        
        const nameExt = name.split(".").pop();
        
        const filetype = "Filetype" + nameExt.charAt(0).toUpperCase() + nameExt.slice(1);
        
        const Icon = Icons[filetype];
        
        if(!Icon)
        {
            return <Icons.FileEarmarkText size={size} style={style} />;
        }
        else
        {
            return <Icon size={size} style={style} />;
        };
    };
};