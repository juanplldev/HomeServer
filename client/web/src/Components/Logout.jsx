// Dependencies
import React from "react";
import {Col} from "react-bootstrap";
import {BoxArrowRight} from "react-bootstrap-icons";
// Files
import {useAuth} from "../contexts/AuthContext.jsx";


export default function Logout()
{
    const {logoutUser} = useAuth();
    
    return (
        <Col style={{height: 50, width: 50, position: "absolute", top: 10, right: 20}} className="d-flex align-items-center jusify-content-center">
            <BoxArrowRight style={{scale: "2", opacity: 0.8}} cursor="pointer" onClick={logoutUser}/>
        </Col>
    );
};