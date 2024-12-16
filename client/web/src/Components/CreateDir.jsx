// Dependencies
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Button, Container} from "react-bootstrap";
import {FolderPlus} from "react-bootstrap-icons";
// Files
import {postDir} from "../redux/actions/actions";
import CustomModal from "./CustomModal";


export default function CreateDir(props)
{
    const dispatch = useDispatch();
    const [input, setInput] = useState({name: ""});
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const {path, reload} = props;
    
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
            let error = null;
            
            const dirPath = path ? `${path}/${input.name}` : input.name;
            await dispatch(postDir(dirPath, input.name)).catch(e => {
                error = true;
                console.log(e);
            });
            
            if(error) return error;
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
                reload={reload}
                setInput={setInput}
            />
        </Container>
    );
};