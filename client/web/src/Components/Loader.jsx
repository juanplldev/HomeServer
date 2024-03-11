// Dependencies
import React from "react";
import {Container, Spinner} from "react-bootstrap";
// Files


function Loader()
{
    return (
        <Container className="d-flex align-items-center">
            <Spinner animation="border" role="status" variant="primary" className="mx-auto">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );
};


export default Loader;