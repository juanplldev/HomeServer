// Dependencies
import {useState} from "react";
import {Card, Container, Row, Col, Button} from "react-bootstrap";
import {Download, Pencil, Trash} from "react-bootstrap-icons";
import {saveAs} from "file-saver";
// Files
import {useAppStore, useLoadingStore} from "../../store/store.js";
import Thumbnail from "./Thumbnail.jsx";
import Edit from "../Modal/Edit.jsx";
import Delete from "../Modal/Delete.jsx";
import Loader from "../Loader.jsx";


export default function DirentCard(props)
{
    const {name, isDir, backDir} = props;
    
    const {getPath, putDir, deleteDir, getFile, putFile, deleteFile, reloadContentState} = useAppStore();
    const {isLoading, setLoading} = useLoadingStore();
    const path = getPath();
    
    const [input, setInput] = useState({name});
    const [validated, setValidated] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({
        show: false,
        type: "",
    });
    
    const thumbnailSize = 25;
    
    function handleShowModal(e, type)
    {
        e.preventDefault();
        setModal({
            show: true,
            type,
        });
    };
    
    function handleCloseModal()
    {
        setModal({
            show: false,
            type: "",
        });
        setValidated(true);
        setError(null);
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
        setLoading("input", true);
        
        if(input.name)
        {
            if(isDir)
            {
                const dirPath = path ? `${path}/${name}` : name;
                
                const payload = await putDir(dirPath, input.name);
                
                if(payload?.success)
                {
                    setValidated(true);
                    setInput({name: ""});
                    handleCloseModal();
                    await reloadContentState(path);
                };
                setValidated(false);
                setError(payload ?? null);
            }
            else
            {
                const filePath = path ? `${path}/${name}` : name;
                
                const payload = await putFile(filePath, input.name);
                
                if(payload?.success)
                {
                    setValidated(true);
                    setInput({name: ""});
                    handleCloseModal();
                    await reloadContentState(path);
                };
                setValidated(false);
                setError(payload ?? null);
            };
        };
        
        setLoading("input", false);
    };
    
    async function handleDelete(e)
    {
        e.preventDefault();
        setLoading("input", true);
        
        if(input.name)
        {
            if(isDir)
            {
                const dirPath = path ? `${path}/${name}` : name;
                
                const payload = await deleteDir(dirPath, input.name);
                
                if(payload?.success)
                {
                    setValidated(true);
                    setInput({name: ""});
                    handleCloseModal();
                    await reloadContentState(path);
                };
                setValidated(false);
                setError(payload ?? null);
            }
            else
            {
                const filePath = path ? `${path}/${name}` : name;
                
                const payload = await deleteFile(filePath, input.name);
                
                if(payload?.success)
                {
                    setValidated(true);
                    setInput({name: ""});
                    handleCloseModal();
                    await reloadContentState(path);
                };
                setValidated(false);
                setError(payload ?? null);
            };
        };
        
        setLoading("input", false);
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
                                <Thumbnail props={{name, path, isDir, backDir, size: thumbnailSize}} style={{margin: 2}}/> {name}
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
                        modal.type === "Edit"
                        &&
                        <Edit
                            modal={modal}
                            input={input}
                            validated={validated}
                            error={error}
                            setInput={setInput}
                            setValidated={setValidated}
                            handleCloseModal={handleCloseModal}
                            handleSubmit={handleEditName}
                        />
                    }
                    {
                        modal.type === "Delete"
                        &&
                        <Delete
                            modal={modal}
                            name={name}
                            validated={validated}
                            error={error}
                            handleCloseModal={handleCloseModal}
                            handleSubmit={handleDelete}
                        />
                    }
                </Container>
            </Card.Body>
        </Card>
    );
};