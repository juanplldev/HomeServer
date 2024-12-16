// Dependencies
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, FloatingLabel, Button} from "react-bootstrap";
// Files
import {useAuth} from "../../contexts/AuthContext";
import {useLoading} from "../../contexts/LoadingContext";
import Loader from "../Loader";
import styles from "./Login.module.css";


export default function Login()
{
    const {loginUser} = useAuth();
    const {isLoading, showLoading, hideLoading} = useLoading();
    
    const navigate = useNavigate();
    
    const [validated, setValidated] = useState(true);
    const [input, setInput] = useState({
        userName: "",
        password: "",
    });
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        setValidated(true);
    };
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        
        showLoading("input");
        
        const payload = await loginUser(input);
        
        hideLoading("input");
        
        if(!payload)
        {
            setValidated(false);
        }
        else
        {
            setInput({
                userName: "",
                password: "",
            });
            setValidated(true);
            navigate("/");
        };
    };
    
    
    return (
        <div className={styles.Container}>
            <div className={styles.FormContainer}>
                <div className={styles.h1Container}>
                    <h1 className={styles.FormTitle}>Login</h1>
                </div>
                
                <Form className={styles.Form} onSubmit={handleSubmit}>
                    <Form.Group>
                        <FloatingLabel label="Username" >
                            <Form.Control
                                type="text"
                                name="userName"
                                placeholder="Username"
                                value={input.userName}
                                onChange={handleChange}
                                required
                                isInvalid={!validated}
                            />
                            
                            <Form.Control.Feedback type="invalid">
                                Invalid username.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        
                    </Form.Group>
                    
                    <Form.Group>
                        <FloatingLabel label="Password">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={input.password}
                                onChange={handleChange}
                                required
                                isInvalid={!validated}
                            />
                            
                            <Form.Control.Feedback type="invalid">
                                Invalid password.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    
                    <Button type="submit">
                        {
                            isLoading.input ? <Loader type="input"/>
                            :
                            "Login"
                        }
                    </Button>
                </Form>
            </div>
        </div>
    );
};