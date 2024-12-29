// Dependencies
import React, {useEffect, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
// Files
import {useAppStore, useLoadingStore} from "../store/store.js";
import Loader from "./Loader.jsx";


function CustomModal(props)
{
    const {type="", input=[], name, showModal, handleCloseModal, submitAction, setInput} = props;
    
    const {getPath, reloadContentState} = useAppStore();
    const {isLoading, setLoading} = useLoadingStore();
    const path = getPath();
    
    const [validated, setValidated] = useState(true);
    const [error, setError] = useState(null);
    const [isEmpty, setIsEmpty] = useState(true);
    
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
        setLoading("input", true);
        
        const payload = await submitAction(e);
        
        if(payload?.success)
        {
            setValidated(true);
            handleCloseModal();
            setInput({name: ""});
            await reloadContentState(path);
        }
        else
        {
            setValidated(false);
            setError(payload);
        };
        
        setLoading("input", false);
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
                                    {error?.msg}
                                    <br/>
                                    Code: {error?.error?.code ?? error?.status}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    
                    <Button disabled={isEmpty || isLoading("input")} onClick={handleSubmit}>
                        {
                            isLoading("input") ? <Loader type="input"/>
                            :
                            "Save"
                        }
                    </Button>
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
                        
                        <span hidden={error ? false : true} >
                            {error?.msg}
                            <br/>
                            Code: {error?.error?.code ?? error?.status}
                        </span>
                    </Modal.Body>
                    
                    <Button variant="danger" onClick={handleSubmit}>
                        {
                            isLoading("input") ? <Loader type="input"/>
                            :
                            "Delete"
                        }
                    </Button>
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
                                    {error?.msg}
                                    <br/>
                                    Code: {error?.error?.code ?? error?.status}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    
                    <Button disabled={isEmpty || isLoading("input")} onClick={handleSubmit}>
                        {
                            isLoading("input") ? <Loader type="input"/>
                            :
                            "Create"
                        }
                    </Button>
                </Modal>
            </div>
        );
    }
    else if(type === "Upload")
    {
        
    };
};


export default CustomModal;