// Dependencies
import React from "react";
import {Modal, Button} from "react-bootstrap";
// Files
import {useLoadingStore} from "../../store/store.js";
import Loader from "../Loader.jsx";


export default function Delete(props)
{
    const {modal, name, validated, error, handleCloseModal, handleSubmit} = props;
    
    const {isLoading} = useLoadingStore();
    
    
    return (
        <Modal centered show={modal.show} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                }}>
                    Delete {name}
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <p>Are you sure you want to delete this item?</p>
                
                <span hidden={error ? false : true} style={{color: "red"}}>
                    {
                        error?.msg
                    }
                    {
                        error?.msg && <br/>
                    }
                    {
                        error?.error?.code && `Code: ${error?.error?.code ?? error?.status}`
                    }
                </span>
            </Modal.Body>
            
            <Button disabled={!validated} variant="danger" onClick={handleSubmit}>
                {
                    isLoading("input") ? <Loader type="input"/>
                    :
                    "Delete"
                }
            </Button>
        </Modal>
    );
};