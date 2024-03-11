// Dependencies
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Col, Container, Row} from "react-bootstrap";
// Files
import {getDir} from "../redux/actions/actions";
import PathBar from "./PathBar.jsx";
import UploadFile from "./UploadFile.jsx";
import CreateDir from "./CreateDir.jsx";
import DirContent from "./DirContent.jsx";


function Home()
{
    const dispatch = useDispatch();
    const dirContent = useSelector(state => state.content);
    const params = useParams();
    const path = params.path && params["*"].length ? `${params.path}/${params["*"]}` : params.path || "";
    const directories = dirContent && dirContent.directories;
    const files = dirContent && dirContent.files;
    const rowProps = {className: "mx-auto my-3"};
    
    useEffect(() => {
        dispatch(getDir(path));
    }, [dispatch, path]);
    
    function reload()
    {
        dispatch(getDir(path));
    };
    
    
    return (
        <Container fluid className="d-flex flex-column align-items-center justify-content-start" style={{minHeight: "100vh", width: "100vw", overflowX: "hidden"}}>
            <Row {...rowProps} style={{minHeight: 80, width: "100%"}}>
                <Col>
                    <PathBar
                        path={path}
                        reload={reload}
                    />
                </Col>
            </Row>
            
            <Row {...rowProps} style={{height: 200, width: "100%"}}>
                <Col>
                    <UploadFile
                        path={path}
                        reload={reload}
                    />
                </Col>
            </Row>
            
            <Row {...rowProps} style={{height: 50, width: "100%"}}>
                <Col>
                    <CreateDir
                        path={path}
                        reload={reload}
                    />
                </Col>
            </Row>
            
            <Row {...rowProps} style={{height: 150, width: "100%"}}>
                <Col>
                    <DirContent
                        directories={directories}
                        files={files}
                        path={path}
                        reload={reload}
                    />
                </Col>
            </Row>
        </Container>
    );
};


export default Home;