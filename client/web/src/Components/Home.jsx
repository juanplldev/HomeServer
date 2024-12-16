// Dependencies
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Col, Container, Row} from "react-bootstrap";
// Files
import {useLoading} from "../contexts/LoadingContext.jsx";
import {getDir, cleanContentState} from "../redux/actions/actions";
import PathBar from "./PathBar.jsx";
import UploadFile from "./UploadFile.jsx";
import CreateDir from "./CreateDir.jsx";
import DirContent from "./DirContent.jsx";
import Logout from "./Logout.jsx";
import Loader from "./Loader.jsx";
import Restart from "./Restart.jsx";


export default function Home()
{
    const {isLoading, showLoading, hideLoading} = useLoading();
    
    const dispatch = useDispatch();
    const dirContent = useSelector(state => state.content);
    
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
        dispatch(cleanContentState());
        dispatch(getDir(path));
    }, [dispatch, path]);
    
    useEffect(() => {
        if(!dirContent?.directories && !dirContent?.files) showLoading("home");
        else hideLoading("home");
    }, [dirContent]);
    
    async function reload()
    {
        await dispatch(getDir(path));
    };
    
    
    return (
        <Container fluid className="d-flex flex-column align-items-center justify-content-start" style={{minHeight: "100vh", width: "100vw", overflowX: "hidden", scrollbarGutter: "stable"}}>
            <Row {...rowProps} style={{minHeight: 80, width: "100%"}}>
                <Col>
                    <PathBar
                        path={path}
                        reload={reload}
                    />
                </Col>
                
                <Logout/>
                <Restart/>
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
            
            <Row {...rowProps} style={{height: 250, width: "100%"}}>
                <Col className={isLoading.home && "d-flex"}>
                    {
                        isLoading.home ? <Loader type="dir_content"/>
                        :
                        <DirContent
                            directories={directories}
                            files={files}
                            path={path}
                            reload={reload}
                        />
                    }
                </Col>
            </Row>
        </Container>
    );
};