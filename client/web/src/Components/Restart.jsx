// Dependencies
import React from "react";
import {Col} from "react-bootstrap";
import {ArrowRepeat} from "react-bootstrap-icons";
// Files
import {restart} from "../redux/actions/actions";
import {useAuth} from "../contexts/AuthContext.jsx";


export default function Restart()
{
    const {auth} = useAuth();
    
    async function handleRestart()
    {
        return await restart();
    };
    
    return auth.isAdmin && (
        <Col style={{height: 50, width: 50, position: "absolute", top: 50, right: 23}} className="d-flex align-items-center jusify-content-center">
            <ArrowRepeat style={{scale: "2", opacity: 0.9}} cursor="pointer" onClick={handleRestart}/>
        </Col>
    );
};