// Dependencies
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Card, Container, Row, Col, Button} from "react-bootstrap";
import {FileEarmarkText, Folder, Folder2Open, Download, Pencil, Trash} from "react-bootstrap-icons";
import {saveAs} from "file-saver";
// Files
import {putDir, deleteDir, getFile, putFile, deleteFile} from "../redux/actions/actions";
import CustomModal from "./CustomModal";
const host = process.env.REACT_APP_HOST;


function Dirent(props)
{
    const [actualWidth, setActualWidth] = useState(window.innerWidth);
    let dynamicWidth = actualWidth >= 768 ? 250 : "100%";
    
    function handleResize()
    {
        setActualWidth(window.innerWidth);
        window.removeEventListener('resize', handleResize);
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
    const dispatch = useDispatch();
    const [input, setInput] = useState({name: ""});
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    
    const {name, path, isDir, backDir, reload} = props;
    const iconStyle = {size: 25};
    const icon = backDir ? <Folder2Open {...iconStyle}/> : isDir ? <Folder {...iconStyle}/> : <FileEarmarkText {...iconStyle}/>
    
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
        
        const filePath = path ? `${path}/${name}` : name;
        const data = await dispatch(getFile(filePath)).catch(e => console.log(e));
        const file = data.payload;
        
        if(file)
        {
            saveAs(file, name);
        };
    };
    
    async function handleEditName(e)
    {
        e.preventDefault();
        
        if(input.name)
        {
            if(isDir)
            {
                let error = null;
                
                const dirPath = path ? `${path}/${name}` : name;
                await dispatch(putDir(dirPath, input.name)).catch(e => {
                    error = true;
                    console.log(e);
                });
                
                if(error) return error;
                
                reload();
            }
            else
            {
                let error = null;
                
                const filePath = path ? `${path}/${name}` : name;
                await dispatch(putFile(filePath, input.name)).catch(e => {
                    error = true;
                    console.log(e);
                });
                
                if(error) return error;
                
                reload();
            };
        };
    };
    
    async function handleDelete(e)
    {
        e.preventDefault();
        
        if(isDir)
        {
            let error = null;
            
            const dirPath = path ? `${path}/${name}` : name;
            await dispatch(deleteDir(dirPath)).catch(e => {
                error = true;
                console.log(e);
            });
            
            if(error) return error;
            
            reload();
        }
        else
        {
            let error = null;
            
            const filePath = path ? `${path}/${name}` : name;
            await dispatch(deleteFile(filePath)).catch(e => {
                error = true;
                console.log(e);
            });
            
            if(error) return error;
            
            reload();
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
                                {icon} {name}
                            </Card.Text>
                        </Col>
                        
                        <Col className="p-0 d-flex align-items-center justify-content-end">
                            {
                                backDir || isDir ? null
                                :
                                <Button className="p-0 mx-1" variant="outline" onClick={handleDownload}>
                                    <Download size={20}/>
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



export default Dirent;