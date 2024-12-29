// Dependencies
import React from "react";
import {Container, Spinner} from "react-bootstrap";
// Files
import {useLoadingStore} from "../store/store.js";


export default function Loader({type})
{
    switch (type)
    {
        case "dir_content":
            return (
                <Container className="d-flex align-items-center">
                    <Spinner animation="border" role="status" variant="primary" className="mx-auto">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>
            );
        
        case "input":
            return (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            );
        
        case "mouse":
            document.body.style.cursor="wait";
            break;
        
        default:
            document.body.style.cursor="auto";
            break;
    };
};