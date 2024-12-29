// Dependencies
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Container, Form} from "react-bootstrap";
// Files
import {useAppStore, useLoadingStore} from "../store/store.js";
import PathBreadcrumb from "./PathBreadcrumb.jsx";


export default function PathBar()
{
    const {getPath, getDir} = useAppStore();
    const path = getPath();
    const {setLoading} = useLoadingStore();
    
    const [input, setInput] = useState({path: ""});
    const [validated, setValidated] = useState({
        path: true,
        msg: null,
    });
    const navigate = useNavigate();
    
    function handleChange(e)
    {
        setInput({path: e.target.value});
        setValidated({path: true});
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
        setLoading("home", true);
        
        if(input.path)
        {
            const absolutePath = `/${input.path}`;
            
            if(input.path.toLocaleLowerCase() === path.toLocaleLowerCase())
            {
                setValidated({
                    path: false,
                    msg: "Current path.",
                });
            }
            else
            {
                const payload = await getDir(input.path);
                
                if(payload?.success)
                {
                    setValidated({path: true});
                    setInput({path: ""});
                    navigate(absolutePath);
                }
                else
                {
                    setValidated({
                        path: false,
                        msg: payload.msg,
                    });
                };
            };
        };
        
        setLoading("home", false);
    };
    
    
    return (
        <Container className="px-3 d-flex flex-column" style={{width: "100%", height: "100%"}}>
            <PathBreadcrumb/>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        className="mb-2"
                        placeholder="Search path..."
                        value={input.path}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        isInvalid={!validated.path}
                        style={{height: 45}}
                    />
                    
                    <Form.Control.Feedback type="invalid">
                        {validated.msg}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>
        </Container>
    );
};