// Dependencies
import React from "react";
import {Col} from "react-bootstrap";
import {BoxArrowRight} from "react-bootstrap-icons";
// Files
import {useAuthStore} from "../store/store";


export default function Logout()
{
    const logout = useAuthStore(state => state.logout);
    
    return (
        <Col style={{height: 50, width: 50, position: "absolute", top: 10, right: 20}} className="d-flex align-items-center jusify-content-center">
            <BoxArrowRight style={{scale: "2", opacity: 0.8}} cursor="pointer" onClick={logout}/>
        </Col>
    );
};