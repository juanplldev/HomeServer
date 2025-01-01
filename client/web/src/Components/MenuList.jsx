// Dependencies
import React from "react";
import {Col, Row} from "react-bootstrap";
// Files
import Logout from "./Logout.jsx";
import Restart from "./Restart.jsx";


export default function MenuList()
{
    
    
    return (
        <Col style={{height: 50, width: 50, position: "absolute", top: 10, right: 20}} className="d-flex align-items-center jusify-content-center">
            <Row>
                <Logout/>
            </Row>
            <Row>
                {/* <Restart/> */}
            </Row>
        </Col>
    );
};