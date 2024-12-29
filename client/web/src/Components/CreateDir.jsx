// Dependencies
import React, {useState} from "react";
import {Button, Container} from "react-bootstrap";
import {FolderPlus} from "react-bootstrap-icons";
// Files
import {useAppStore} from "../store/store.js";
import CustomModal from "./CustomModal.jsx";


export default function CreateDir()
{
    const {getPath, postDir} = useAppStore();
    const path = getPath();
    
    const [input, setInput] = useState({name: ""});
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    
    function handleShowModal(e, type)
    {
        e.preventDefault();
        setShowModal(true);
        setModalType(type);
    };
    
    function handleCloseModal()
    {
        setShowModal(false);
        setModalType(null);
    };
    
    async function handleCreate(e)
    {
        e.preventDefault();
        
        if(input.name)
        {
            const dirPath = path ? `${path}/${input.name}` : input.name;
            
            return await postDir(dirPath, input.name);
        };
    };
    
    
    return (
        <Container className="px-3" style={{width: "100%", height: "100%"}}>
            <Button variant="primary" onClick={e => handleShowModal(e, "Create")} style={{width: "100%", height: "100%"}}>
                Create directory <FolderPlus size={20}/>
            </Button>
            
            <CustomModal
                type={modalType}
                input={input}
                name={input.name}
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                submitAction={handleCreate}
                setInput={setInput}
            />
        </Container>
    );
};