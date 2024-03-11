// Dependencies
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Container, Form} from "react-bootstrap";
// Files
import {getDir} from "../redux/actions/actions";
import PathBreadcrumb from "./PathBreadcrumb.jsx";


function PathBar(props)
{
    const dispatch = useDispatch();
    const [input, setInput] = useState({path: ""});
    const [validated, setValidated] = useState({
        path: true,
        msg: null,
    });
    const navigate = useNavigate();
    const {path} = props;
    
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
        
        if(input.path)
        {
            let error = null;
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
                await dispatch(getDir(input.path)).catch(e => {
                    error = true;
                    console.log(e);
                });
                
                if(error)
                {
                    setValidated({
                        path: false,
                        msg: "The path provided does not exists.",
                    });
                }
                else
                {
                    setValidated({path: true});
                    setInput({path: ""});
                    navigate(absolutePath);
                };
            };
        };
    };
    
    
    return (
        <Container className="px-3 d-flex flex-column" style={{width: "100%", height: "100%"}}>
            <PathBreadcrumb path={path}/>
            
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
                
                {/* <Button type="submit">Go</Button> */}
            </Form>
        </Container>
    );
};


export default PathBar;