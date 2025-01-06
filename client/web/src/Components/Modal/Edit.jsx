// Dependencies
import {Modal, Button, Form} from "react-bootstrap";
// Files
import {useLoadingStore} from "../../store/store.js";
import Loader from "../Loader.jsx";


export default function Edit(props)
{
    const {modal, input, validated, error, setInput, setValidated, handleCloseModal, handleSubmit} = props;
    
    const {isLoading} = useLoadingStore();
    
    function handleChange(e)
    {
        const name = e.target.value;
        
        setInput({name});
        
        if(name.trim().length) setValidated(true);
        else setValidated(false);
    };
    
    function handleKeyDown(e)
    {
        if(e.key === "Enter")
        {
            e.preventDefault();
            validated && handleSubmit(e);
        };
    };
    
    return (
        <Modal centered show={modal.show} onHide={handleCloseModal}>
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
                            {
                                error?.msg
                            }
                            {
                                error?.msg && <br/>
                            }
                            
                            {
                                error?.error?.code && `Code: ${error?.error?.code ?? error?.status}`
                            }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            
            <Button disabled={!validated || isLoading("input")} onClick={handleSubmit}>
                {
                    isLoading("input") ? <Loader type="input"/>
                    :
                    "Save"
                }
            </Button>
        </Modal>
    );
};