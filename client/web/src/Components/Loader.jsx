// Dependencies
import React from "react";
import {Container, Spinner} from "react-bootstrap";
// Files


export default function Loader({type})
{
    if(type === "dir_content")
    {
        return (
            <Container className="d-flex align-items-center">
                <Spinner animation="border" role="status" variant="primary" className="mx-auto">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }
    else if(type === "input")
    {
        return (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }
    else if(type === "mouse")
    {
        document.body.style.cursor="wait";
    }
    else
    {
        document.body.style.cursor="auto";
    };
};