// Dependencies
import React, {useState, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {Container, Card, Modal, Row, Col, Button, ProgressBar} from "react-bootstrap";
import {CloudArrowUp, X} from "react-bootstrap-icons";
// Files
import {useAppStore, useUploadStore, useLoadingStore} from "../store/store.js";
import Loader from "./Loader.jsx";


export default function UploadFile()
{
    const {getPath, postFile, reloadContentState} = useAppStore();
    const path = getPath();
    const {setFiles, getFiles, removeFile, getUploadProgress} = useUploadStore();
    const {isLoading, setLoading} = useLoadingStore();
    
    const [showModal, setShowModal] = useState(false);
    
    const onDrop = useCallback(files => {
        setFiles("selectedFiles", files);
        files.length && handleShowModal("Upload");
    }, []);
    const {getRootProps, getInputProps} = useDropzone({onDrop});
    
    function handleShowModal()
    {
        setShowModal(true);
    };
    
    function handleCloseModal()
    {
        setShowModal(false);
    };
    
    async function handleUpload(e)
    {
        e.preventDefault();
        setLoading("input", true);
        
        const selectedFiles = getFiles("selectedFiles");
        
        if(selectedFiles.length)
        {
            for (const file of selectedFiles)
            {
                const payload = await postFile(path, file);
                
                if(payload?.success)
                {
                    setFiles("acceptedFiles", file.name);
                }
                else
                {
                    setFiles("rejectedFiles", {name: file.name, msg: payload.msg});
                };
            };
            
            setFiles("uploadedFiles", selectedFiles);
        };
        
        setLoading("input", false);
        await reloadContentState(path);
    };
    
    return (
        <Container className="px-3 d-flex flex-column" style={{width: "100%", height: 200}}>
            <Card className="m-0 p-0" style={{border: "2px dashed #727272", width: "100%" }}>
                <Card.Body {...getRootProps()} className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Text>
                        <CloudArrowUp size={50}/>
                        <input {...getInputProps()}/>
                    </Card.Text>
                    <Card.Text>Drag and drop to upload files</Card.Text>
                    <Card.Text>OR</Card.Text>
                    <Card.Text>Click to browse</Card.Text>
                </Card.Body>
            </Card>
            
            <Modal centered show={showModal} onHide={handleCloseModal} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload files</Modal.Title>
                </Modal.Header>
                
                <Modal.Body className="d-flex flex-column align-items-start" style={{maxHeight: 300}}>
                    {
                        getFiles("selectedFiles").map((file, index) => {
                            const uploadProgress = getUploadProgress(file);
                            const acceptedFiles = getFiles("acceptedFiles");
                            const rejectedFiles = getFiles("rejectedFiles")?.filter(e => e.name === file.name)[0];
                            const textColor = acceptedFiles?.includes(file.name) ? {color: "green"} : rejectedFiles?.name === file.name ? {color: "red"} : {};
                            const progressColor = textColor?.color === "green" ? "success" : textColor?.color === "red" ? "danger" : "";
                            
                            return(
                                <Row key={index} style={{width: "100%"}} className="d-flex align-items-center justify-content-between">
                                    <Col xs={1} style={{width: "50%"}}>
                                        <p className="p-0 m-0 text-truncate" style={textColor}>
                                            {file.name}
                                        </p>
                                    </Col>
                                    
                                    <Col xs={4}>
                                        <ProgressBar now={uploadProgress} variant={progressColor} style={{width: 150, height: 7}}/>
                                    </Col>
                                    
                                    <Col xs={1}>
                                        <Button className="p-0 mx-2" variant="outline" onClick={() => removeFile(file)}>
                                            <X size={25}/>
                                        </Button>
                                    </Col>
                                    {
                                        !acceptedFiles?.includes(file.name)
                                        &&
                                        <p className="px-2 mx-1" style={{color: "red"}}>
                                            {rejectedFiles?.msg}
                                        </p>
                                    }
                                </Row>
                            );
                        })
                    }
                </Modal.Body>
                
                <Button disabled={!getFiles("selectedFiles").length || isLoading("input") || getFiles("uploadedFiles").length} onClick={handleUpload}>
                    {
                        isLoading("input") ? <Loader type="input"/>
                        :
                        "Upload"
                    }
                </Button>
            </Modal>
        </Container>
    );
};