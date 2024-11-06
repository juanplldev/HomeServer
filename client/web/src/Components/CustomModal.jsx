// Dependencies
import React, {useEffect, useState} from "react";
import {Modal, Button, Form, Row, Col} from "react-bootstrap";
import {X} from "react-bootstrap-icons";
// Files


function CustomModal(props)
{
    const [validated, setValidated] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);
    const {type="", input=[], name, showModal, handleCloseModal, submitAction, setInput} = props;
    
    useEffect(() => {
        if(Array.isArray(input))
        {
            input.length ? setIsEmpty(false) : setIsEmpty(true);
        }
        else
        {
            input.name.length ? setIsEmpty(false) : setIsEmpty(true);
        };
    }, [input]);
    
    function handleChange(e)
    {
        setInput({name: e.target.value});
        setValidated(true);
    };
    
    function handleKeyDown(e)
    {
        if(e.key === "Enter")
        {
            e.preventDefault();
            handleSubmit(e);
        };
    };
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        
        const submitError = await submitAction(e);
        
        if(submitError)
        {
            setValidated(false);
        }
        else
        {
            setValidated(true);
            handleCloseModal();
            setInput({name: ""});
        };
    };
    
    
    if(type === "Edit")
    {
        return (
            <div onClick={e => e.preventDefault()}>
                <Modal centered show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit name</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    className="mb-2"
                                    value={input.name}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                    required
                                    isInvalid={!validated}
                                />
                                
                                <Form.Control.Feedback type="invalid">
                                    Dirent name already exists.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    
                    <Button disabled={isEmpty} onClick={handleSubmit}>Save</Button>
                </Modal>
            </div>
        );
    }
    else if(type === "Delete")
    {
        return (
            <div onClick={e => e.preventDefault()}>
                <Modal centered show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete "{name}"</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <p>Are you sure you want to delete this item?</p>
                    </Modal.Body>
                    
                    <Button variant="danger" onClick={submitAction}>Delete</Button>
                </Modal>
            </div>
        );
    }
    else if(type === "Create")
    {
        return (
            <div onClick={e => e.preventDefault()}>
                <Modal centered show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create directory</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    className="mb-2"
                                    value={input.name}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                    required
                                    isInvalid={!validated}
                                />
                                
                                <Form.Control.Feedback type="invalid">
                                    Dirent name already exists.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    
                    <Button disabled={isEmpty} onClick={handleSubmit}>Create</Button>
                </Modal>
            </div>
        );
    }
    else if(type === "Upload")
    {
        const validStyle =
        {
            color: "green",
        };
        const invalidStyle =
        {
            color: "red",
        };
        
        return (
            <div onClick={e => e.preventDefault()}>
                <Modal centered show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload files</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body className="d-flex flex-column align-items-start">
                        {
                            input.map((file, index) => {
                                return(
                                    <Row key={index} style={{width: "100%"}}>
                                        <Col className="d-flex align-items-center">
                                            <p className="p-0 m-0" style={file.success === false ? invalidStyle : file.success ? validStyle : {}}>
                                                {file.name}
                                            </p>
                                            
                                            <Button className="p-0 mx-2" variant="outline" onClick={e => {
                                                e.preventDefault();
                                                setInput(input.filter(e => e.name !== file.name));
                                            }}>
                                                <X size={25}/>
                                            </Button>
                                        </Col>
                                        {
                                            file.success === false ?
                                            <p className="px-2 mx-1" style={file.success === false ? invalidStyle : {}}>
                                                {file.msg}
                                            </p>
                                            :
                                            null
                                        }
                                    </Row>
                                );
                            })
                        }
                    </Modal.Body>
                    
                    <Button disabled={isEmpty} onClick={handleSubmit}>Upload</Button>
                </Modal>
            </div>
        );
    }
    else if(type === "AxiosError")
    {
        return (
            <div onClick={e => e.preventDefault()}>
                <Modal centered show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Axios Error</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body className="d-flex flex-column align-items-start">
                        {name}
                    </Modal.Body>
                </Modal>
            </div>
        );
    };
};


export default CustomModal;