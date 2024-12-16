// Dependencies
import React, {useState} from "react";
import {Container} from "react-bootstrap";
// Files
import CustomModal from "./CustomModal.jsx";


export default function AxiosErrorHandler(props)
{
    const [showModal, setShowModal] = useState(true);
    const [modalType, setModalType] = useState("AxiosError");
    const {error} = props;
    
    function handleCloseModal()
    {
        setShowModal(false);
        setModalType(null);
    };
    
    return (
        <Container>
            <CustomModal
                type={modalType}
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                name={error}
            />
        </Container>
    );
};