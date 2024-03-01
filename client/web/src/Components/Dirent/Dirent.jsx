// Dependencies
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Card, Container, Row, Col, Button} from "react-bootstrap";
import {FileEarmarkText, Folder, Folder2Open, Download, Pencil, Trash} from "react-bootstrap-icons";
import {saveAs} from "file-saver";
// Files
import {getDir, postDir, putDir, deleteDir, getFile, postFile, putFile, deleteFile} from "../../redux/actions/actions";
import CustomModal from "../CustomModal/CustomModal";
import styles from "./Dirent.module.css";
const host = process.env.REACT_APP_HOST;


function Dirent(props)
{
    return (
        <Col lg={4} xl={3} className="mt-2">
            <DirentLink {...props}>
                <DirentCard {...props}/>
            </DirentLink>
        </Col>
    );
};

function DirentLink(props)
{
    const {name, path, isDir, backDir} = props;
    
    if(!isDir)
    {
        return <>{props.children}</>;
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
            <Link to={link.pathname} className={styles.DirLink}>
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
    const {name, path, isDir, backDir} = props;
    
    function handleChange(e)
    {
        setInput({name: e.target.value});
    };
    
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
    
    function handleKeyDown(e)
    {
        if(e.key === "Enter")
        {
            e.preventDefault();
            handleEditName(e);
        };
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
                const dirPath = path ? `${path}/${name}` : name;
                const data = await dispatch(putDir(dirPath, input.name)).catch(e => console.log(e));
                
                return dispatch(getDir(path));
            }
            else
            {
                const filePath = path ? `${path}/${name}` : name;
                const data = await dispatch(putFile(filePath, input.name)).catch(e => console.log(e));
                
                return dispatch(getDir(path));
            };
        };
    };
    
    async function handleDelete(e)
    {
        e.preventDefault();
        
        if(isDir)
        {
            const dirPath = path ? `${path}/${name}` : name;
            const data = await dispatch(deleteDir(dirPath)).catch(e => console.log(e));
            
            return dispatch(getDir(path));
        }
        else
        {
            const filePath = path ? `${path}/${name}` : name;
            const data = await dispatch(deleteFile(filePath)).catch(e => console.log(e));
            
            return dispatch(getDir(path));
        };
    };
    
    
    return (
        <Card className={styles.Container}>
            <Card.Body className={styles.CardContainer}>
                <Container>
                    <Row>
                        <Col>
                            {
                                backDir ? <Folder2Open/> :
                                isDir ? <Folder/> : <FileEarmarkText/>
                            }
                        </Col>
                        <Col>
                            <Card.Text className={styles.CardName}>
                                {name}
                            </Card.Text>
                        </Col>
                        <Col>
                            {
                                backDir || isDir ? null
                                :
                                <Button onClick={handleDownload}>
                                    <Download/>
                                </Button>
                            }
                        </Col>
                        <Col>
                            {
                                backDir ? null
                                :
                                <Button onClick={e => handleShowModal(e, "Edit")}>
                                    <Pencil/>
                                </Button>
                            }
                        </Col>
                        <Col>
                            {
                                backDir ? null
                                :
                                <Button onClick={e => handleShowModal(e, "Delete")}>
                                    <Trash/>
                                </Button>
                            }
                            <CustomModal
                                type={modalType}
                                input={input}
                                name={name}
                                showModal={showModal}
                                handleCloseModal={handleCloseModal}
                                handleChange={handleChange}
                                submitAction={modalType === "Edit" ? handleEditName : modalType === "Delete" ? handleDelete : null}
                                handleKeyDown={handleKeyDown}
                            />
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
};



export default Dirent;