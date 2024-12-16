// Dependencies
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Card, Container, Row, Col, Button} from "react-bootstrap";
import {Download, Pencil, Trash} from "react-bootstrap-icons";
import {saveAs} from "file-saver";
// Files
import {putDir, deleteDir, getFile, putFile, deleteFile} from "../redux/actions/actions";
import {useLoading} from "../contexts/LoadingContext";
import CustomModal from "./CustomModal";
import DirentThumbnail from "./DirentThumbnail";
import Loader from "./Loader";
const host = process.env.REACT_APP_HOST;


export default function Dirent(props)
{
    const [actualWidth, setActualWidth] = useState(window.innerWidth);
    let dynamicWidth = actualWidth >= 768 ? 250 : "100%";
    
    function handleResize()
    {
        setActualWidth(window.innerWidth);
        window.removeEventListener("resize", handleResize);
    };
    
    window.addEventListener("resize", handleResize);
    
    return (
        <Col className="p-1" style={{
                minWidth: dynamicWidth,
                height: 70,
            }}>
            <DirentLink {...props}>
                <DirentCard {...props} dynamicWidth={dynamicWidth}/>
            </DirentLink>
        </Col>
    );
};


function DirentLink(props)
{
    const {name, path, isDir, backDir} = props;
    
    if(!isDir)
    {
        return props.children;
    }
    else
    {
        let link = new URL(path ? `${path}/${name}` : name, host);
        
        if(backDir)
        {
            if(path.split("/").length >= 2)
            {
                link = new URL(path.split("/").slice(0, -1).join("/") || "/", host);
            }
            else
            {
                link = new URL(path.split("/").slice(0, -2).join("/") || "/", host);
            }
        };
        
        return (
            <Link to={link.pathname} style={{color: "black", textDecoration: "none"}}>
                {props.children}
            </Link>
        );
    };
};


function DirentCard(props)
{
    const {name, path, isDir, backDir, reload} = props;
    
    const {isLoading, showLoading, hideLoading} = useLoading();
    
    const dispatch = useDispatch();
    
    const [input, setInput] = useState({name});
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    
    const thumbnailSize = 25;
    
    function handleShowModal(e, type)
    {
        e.preventDefault();
        setShowModal(true);
        setModalType(type);
    };
    
    function handleCloseModal()
    {
        setShowModal(false);
        setModalType(null);
    };
    
    async function handleDownload(e)
    {
        e.preventDefault();
        showLoading("mouse");
        
        const filePath = path ? `${path}/${name}` : name;
        const data = await dispatch(getFile(filePath)).catch(e => console.log(e));
        const file = data.payload;
        
        if(file)
        {
            saveAs(file, name);
        };
        
        hideLoading("mouse");
    };
    
    async function handleEditName(e)
    {
        e.preventDefault();
        
        let foundError = null;
        
        if(input.name)
        {
            if(isDir)
            {
                const dirPath = path ? `${path}/${name}` : name;
                
                try
                {
                    await dispatch(putDir(dirPath, input.name));
                }
                catch(error)
                {
                    foundError = error.response?.data;
                    console.log(foundError || error);
                };
            }
            else
            {
                const filePath = path ? `${path}/${name}` : name;
                
                try
                {
                    await dispatch(putFile(filePath, input.name));
                }
                catch(error)
                {
                    foundError = error.response?.data;
                    console.log(foundError || error);
                };
            };
        };
        
        return foundError;
    };
    
    async function handleDelete(e)
    {
        e.preventDefault();
        
        let foundError = null;
        
        if(isDir)
        {
            
            const dirPath = path ? `${path}/${name}` : name;
            
            try
            {
                await dispatch(deleteDir(dirPath));
            }
            catch(error)
            {
                foundError = error.response?.data;
                console.log(foundError || error);
            };
        }
        else
        {
            const filePath = path ? `${path}/${name}` : name;
            
            try
            {
                await dispatch(deleteFile(filePath));
            }
            catch(error)
            {
                foundError = error.response?.data;
                console.log(foundError || error);
            };
        };
        
        return foundError;
    };
    
    
    return (
        <Card style={{
                    minWidth: "100%",
                    height: "100%",
                }}>
            <Card.Body className="p-1 d-flex align-items-center justify-content-center">
                <Container>
                    <Row className="d-flex align-items-center justify-content-between">
                        <Col className="p-0 d-flex align-items-center justify-content-start" style={{maxWidth: "60%"}}>
                            <Card.Text style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}>
                                <DirentThumbnail props={{name, path, isDir, backDir, size: thumbnailSize}} style={{margin: 2}}/> {name}
                            </Card.Text>
                        </Col>
                        
                        <Col className="p-0 d-flex align-items-center justify-content-end">
                            {
                                backDir || isDir ? null
                                :
                                <Button className="p-0 mx-1" variant="outline" onClick={handleDownload}>
                                    {
                                        isLoading.mouse ? <Loader type="mouse"/>
                                        :
                                        <>
                                            <Download size={20}/>
                                            <Loader type=""/>
                                        </>
                                    }
                                </Button>
                            }
                            
                            {
                                backDir ? null
                                :
                                <Button className="p-0 mx-1" variant="outline" onClick={e => handleShowModal(e, "Edit")}>
                                    <Pencil size={20}/>
                                </Button>
                            }
                            
                            {
                                backDir ? null
                                :
                                <Button className="p-0 mx-1" variant="outline" onClick={e => handleShowModal(e, "Delete")}>
                                    <Trash size={20}/>
                                </Button>
                            }
                        </Col>
                    </Row>
                    
                    {
                        <CustomModal
                            type={modalType}
                            input={input}
                            name={name}
                            showModal={showModal}
                            handleCloseModal={handleCloseModal}
                            submitAction={modalType === "Edit" ? handleEditName : modalType === "Delete" ? handleDelete : modalType}
                            reload={reload}
                            setInput={setInput}
                        />
                    }
                </Container>
            </Card.Body>
        </Card>
    );
};