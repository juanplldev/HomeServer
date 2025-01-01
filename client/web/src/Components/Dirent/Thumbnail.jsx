// Dependencies
import React, {useEffect, useState} from "react";
import {Image} from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
// Files
import {useAppStore} from "../../store/store.js";


export default function Thumbnail({props, style})
{
    const {name, isDir, backDir, size} = props;
    
    const {getPath, getThumbnail} = useAppStore();
    const path = getPath();
    
    const [thumbnail, setThumbnail] = useState(null);
    
    useEffect(() => {
        if(!isDir && !backDir)
        {
            handleThumbnail();
        };
    }, []);
    
    async function handleThumbnail()
    {
        const thumb = await getThumbnail(`${path}/${name}`);
        
        setThumbnail(thumb);
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