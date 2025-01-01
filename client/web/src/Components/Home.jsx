// Dependencies
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
// Files
import {useAppStore, useLoadingStore} from "../store/store.js";
import PathBar from "./PathBar.jsx";
import UploadFile from "./UploadFile.jsx";
import CreateDir from "./CreateDir.jsx";
import DirContent from "./DirContent.jsx";
import MenuList from "./MenuList.jsx";
import Loader from "./Loader.jsx";


export default function Home()
{
    const {getDir, cleanContentState} = useAppStore();
    const {isLoading, setLoading} = useLoadingStore();
    
    const dirContent = useAppStore.getState().content;
    
    const params = useParams();
    const path = params.path && params["*"].length ? `${params.path}/${params["*"]}` : params.path || "";
    
    const directories = dirContent && dirContent.directories?.sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    const files = dirContent && dirContent.files?.sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    
    const rowProps = {className: "mx-auto my-3"};
    
    useEffect(() => {
        cleanContentState();
        getDir(path);
    }, [path]);
    
    useEffect(() => {
        if(!dirContent?.directories && !dirContent?.files) setLoading("home", true);
        else setLoading("home", false);
    }, [dirContent]);
    
    
    return (
        <Container fluid className="d-flex flex-column align-items-center justify-content-start" style={{minHeight: "100vh", width: "100vw", overflowX: "hidden", scrollbarGutter: "stable"}}>
            <Row {...rowProps} style={{minHeight: 80, width: "100%"}}>
                <Col>
                    <PathBar/>
                </Col>
                <MenuList/>
            </Row>
            
            <Row {...rowProps} style={{height: 200, width: "100%"}}>
                <Col>
                    <UploadFile/>
                </Col>
            </Row>
            
            <Row {...rowProps} style={{height: 50, width: "100%"}}>
                <Col>
                    <CreateDir/>
                </Col>
            </Row>
            
            <Row {...rowProps} style={{height: 250, width: "100%"}}>
                <Col className={isLoading("home") && "d-flex"}>
                    {
                        isLoading("home") ? <Loader type="dir_content"/>
                        :
                        <DirContent
                            directories={directories}
                            files={files}
                        />
                    }
                </Col>
            </Row>
        </Container>
    );
};