// Dependencies
import React, {useState, useCallback} from "react";
import {useDispatch} from "react-redux";
import {useDropzone} from "react-dropzone";
import {Container, Card} from "react-bootstrap";
import {CloudArrowUp} from "react-bootstrap-icons";
// Files
import {postFile} from "../redux/actions/actions";
import CustomModal from "./CustomModal.jsx";


function UploadFile(props)
{
    const dispatch = useDispatch();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const {path, reload} = props;
    
    const onDrop = useCallback(acceptedFiles => {
        setUploadedFiles(acceptedFiles);
        acceptedFiles.length && handleShowModal("Upload");
    }, []);
    const {getRootProps, getInputProps} = useDropzone({onDrop});
    
    function handleShowModal(type)
    {
        setShowModal(true);
        setModalType(type);
    };
    
    function handleCloseModal()
    {
        setShowModal(false);
        setModalType(null);
    };
    
    
    
    async function handleUpload(e)
    {
        e.preventDefault();
        
        if(uploadedFiles.length)
        {
            let error = null;
            
            await dispatch(postFile(path, uploadedFiles)).catch(e => {
                error = e.response.data;
                console.log(e);
            });
            
            if(error)
            {
                error.forEach(e => {
                    const {file} = e;
                    const msg = e.error.message;
                    
                    uploadedFiles.forEach(f => {
                        if(f.name === file)
                        {
                            f.success = false;
                            f.msg = msg;
                        }
                    });
                });
                
                reload();
                
                return true;
            };
            
            reload();
        };
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
            
            <CustomModal
                type={modalType}
                input={uploadedFiles}
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                submitAction={handleUpload}
                reload={reload}
                setInput={setUploadedFiles}
            />
        </Container>
    );
};


export default UploadFile;