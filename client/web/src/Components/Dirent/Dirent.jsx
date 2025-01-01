// Dependencies
import React, {useState} from "react";
import {Col} from "react-bootstrap";
// Files
import DirentLink from "./DirentLink.jsx";
import DirentCard from "./DirentCard.jsx";


export default function Dirent(props)
{
    const [actualWidth, setActualWidth] = useState(window.innerWidth);
    let dynamicWidth = actualWidth >= 768 ? 250 : "100%";
    
    function handleResize()
    {
        setActualWidth(window.innerWidth);
        window.removeEventListener("resize", handleResize);
    };
    
    window.addEventListener("resize", handleResize);
    
    return (
        <Col className="p-1" style={{
                minWidth: dynamicWidth,
                height: 70,
            }}>
            <DirentLink {...props}>
                <DirentCard {...props} dynamicWidth={dynamicWidth}/>
            </DirentLink>
        </Col>
    );
};