// Dependencies
import React, {useState, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {Container, Card} from "react-bootstrap";
import {CloudArrowUp} from "react-bootstrap-icons";
// Files
import {useAppStore, useUploadStore, useLoadingStore} from "../store/store.js";
import Upload from "./Modal/Upload.jsx";


export default function UploadFile()
{
    const {getPath, postFile, reloadContentState} = useAppStore();
    const path = getPath();
    const {setFiles, getFiles} = useUploadStore();
    const {setLoading} = useLoadingStore();
    
    const [showModal, setShowModal] = useState(false);
    
    const onDrop = useCallback(files => {
        setFiles("selectedFiles", files);
        files.length && handleShowModal();
    }, []);
    const {getRootProps, getInputProps} = useDropzone({onDrop});
    
    function handleShowModal()
    {
        setShowModal(showModal => !showModal);
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
                    setFiles("rejectedFiles", {name: file.name, msg: payload?.msg});
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
            
            <Upload
                modal={showModal}
                handleShowModal={handleShowModal}
                handleSubmit={handleUpload}
            />
        </Container>
    );
};