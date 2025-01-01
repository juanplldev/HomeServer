// Dependencies
import React, {useState} from "react";
import {Button, Container} from "react-bootstrap";
import {FolderPlus} from "react-bootstrap-icons";
// Files
import {useAppStore, useLoadingStore} from "../store/store.js";
import Create from "./Modal/Create.jsx";


export default function CreateDir()
{
    const {getPath, postDir, reloadContentState} = useAppStore();
    const {setLoading} = useLoadingStore();
    const path = getPath();
    
    const [input, setInput] = useState({name: ""});
    const [validated, setValidated] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    function handleShowModal()
    {
        setShowModal(showModal => !showModal);
    };
    
    async function handleCreate(e)
    {
        e.preventDefault();
        setLoading("input", true);
        
        if(input.name)
        {
            const dirPath = path ? `${path}/${input.name}` : input.name;
            
            const payload = await postDir(dirPath, input.name);
            
            if(payload?.success)
            {
                setInput({name: ""});
                setValidated(true);
                handleShowModal();
                await reloadContentState(path);
            };
            setValidated(false);
            setError(payload ?? null);
        };
        
        setLoading("input", false);
    };
    
    
    return (
        <Container className="px-3" style={{width: "100%", height: "100%"}}>
            <Button variant="primary" onClick={handleShowModal} style={{width: "100%", height: "100%"}}>
                Create directory <FolderPlus size={20}/>
            </Button>
            
            <Create
                modal={showModal}
                input={input}
                validated={validated}
                error={error}
                setInput={setInput}
                setValidated={setValidated}
                handleShowModal={handleShowModal}
                handleSubmit={handleCreate}
            />
        </Container>
    );
};