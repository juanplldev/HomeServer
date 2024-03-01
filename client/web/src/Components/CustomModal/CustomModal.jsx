// Dependencies
import React from "react";
import {Modal, Button, Form} from "react-bootstrap";
// Files
import styles from "./CustomModal.module.css";


function CustomModal(props)
{
    const {type, input, name, showModal, handleCloseModal, handleChange, submitAction, handleKeyDown} = props;
    
    if(type === "Edit")
    {
        return (
            <div onClick={e => e.preventDefault()}>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit name</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body className={styles.ModalBody}>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    className="mb-2"
                                    value={input.name}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    
                    <Button onClick={submitAction}>Save</Button>
                </Modal>
            </div>
        );
    }
    else if(type === "Delete")
    {
        return (
            <div onClick={e => e.preventDefault()}>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete "{name}"</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body className={styles.ModalBody}>
                        <p>Are you sure you want to delete this item?</p>
                    </Modal.Body>
                    
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="danger" onClick={submitAction}>Delete</Button>
                </Modal>
            </div>
        );
    };
};


export default CustomModal;