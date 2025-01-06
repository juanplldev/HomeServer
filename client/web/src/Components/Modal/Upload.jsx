// Dependencies
import {Modal, Row, Col, Button, ProgressBar} from "react-bootstrap";
import {X} from "react-bootstrap-icons";
// Files
import {useLoadingStore, useUploadStore} from "../../store/store.js";
import Loader from "../Loader.jsx";


export default function Upload(props)
{
    const {modal, handleShowModal, handleSubmit} = props;
    
    const {isLoading} = useLoadingStore();
    const {getFiles, removeFile, getUploadProgress} = useUploadStore();
    
    
    return (
        <Modal centered show={modal} onHide={handleShowModal} scrollable={true}>
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
            
            <Button disabled={!getFiles("selectedFiles").length || isLoading("input") || getFiles("uploadedFiles").length} onClick={handleSubmit}>
                {
                    isLoading("input") ? <Loader type="input"/>
                    :
                    "Upload"
                }
            </Button>
        </Modal>
    );
};