// Dependencies
import React from "react";
import {Spinner} from "react-bootstrap";
// Files
// import styles from "./Loader.module.css";


function Loader()
{
    return (
        <Spinner animation="border" role="status" variant="secondary" className="mx-auto">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
};


export default Loader;