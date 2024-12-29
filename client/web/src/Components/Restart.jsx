// Dependencies
import React from "react";
import {Col} from "react-bootstrap";
import {ArrowRepeat} from "react-bootstrap-icons";
// Files
import {useAuthStore, useAppStore} from "../store/store";


export default function Restart()
{
    const restart = useAuthStore(state => state.restart);
    const isAdmin = useAppStore(state => state.isAdmin);
    
    async function handleRestart()
    {
        const payload = await restart();
        
        console.log(payload);
    };
    
    return isAdmin && (
        <Col style={{height: 50, width: 50, position: "absolute", top: 50, right: 23}} className="d-flex align-items-center jusify-content-center">
            <ArrowRepeat style={{scale: "2", opacity: 0.9}} cursor="pointer" onClick={handleRestart}/>
        </Col>
    );
};