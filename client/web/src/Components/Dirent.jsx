// Dependencies
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Card, Container, Row, Col, Button} from "react-bootstrap";
import {Download, Pencil, Trash} from "react-bootstrap-icons";
import {saveAs} from "file-saver";
// Files
import {useAppStore, useLoadingStore} from "../store/store.js";
import CustomModal from "./CustomModal.jsx";
import DirentThumbnail from "./DirentThumbnail.jsx";
import Loader from "./Loader.jsx";
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
    const {name, isDir, backDir} = props;
    
    const {path} = useAppStore();
    
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
    const {name, isDir, backDir} = props;
    
    const {getPath, putDir, deleteDir, getFile, putFile, deleteFile} = useAppStore();
    const {isLoading, setLoading} = useLoadingStore();
    const path = getPath();
    
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
        setLoading("mouse", true);
        
        const filePath = path ? `${path}/${name}` : name;
        const payload = await getFile(filePath);
        
        if(payload)
        {
            saveAs(payload, name);
        };
        
        setLoading("mouse", false);
    };
    
    async function handleEditName(e)
    {
        e.preventDefault();
        
        if(input.name)
        {
            if(isDir)
            {
                const dirPath = path ? `${path}/${name}` : name;
                
                return await putDir(dirPath, input.name);
            }
            else
            {
                const filePath = path ? `${path}/${name}` : name;
                
                return await putFile(filePath, input.name);
            };
        };
    };
    
    async function handleDelete(e)
    {
        e.preventDefault();
        
        if(isDir)
        {
            const dirPath = path ? `${path}/${name}` : name;
            
            return await deleteDir(dirPath);
        }
        else
        {
            const filePath = path ? `${path}/${name}` : name;
            
            return await deleteFile(filePath);
        };
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
                                        isLoading("mouse") ? <Loader type="mouse"/>
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
                            setInput={setInput}
                        />
                    }
                </Container>
            </Card.Body>
        </Card>
    );
};