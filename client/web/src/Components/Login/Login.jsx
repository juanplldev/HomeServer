// Dependencies
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, FloatingLabel, Button} from "react-bootstrap";
// Files
import {useAuthStore, useLoadingStore} from "../../store/store.js";
import Loader from "../Loader.jsx";
import styles from "./Login.module.css";


export default function Login()
{
    const login = useAuthStore(state => state.login);
    const {isLoading, setLoading} = useLoadingStore();
    
    const navigate = useNavigate();
    
    const [validation, setValidation] = useState({
        validated: true,
        msg: "",
    });
    const [input, setInput] = useState({
        userName: "",
        password: "",
    });
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        setValidation({...validation, validated: true});
    };
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        setLoading("input", true);
        
        const payload = await login(input);
        
        if(payload?.success)
        {
            setInput({
                userName: "",
                password: "",
            });
            setValidation({validated: true, msg: payload.msg});
            navigate("/");
        }
        else
        {
            setValidation({validated: false, msg: payload.msg});
        };
        
        setLoading("input", false);
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
                                isInvalid={!validation.validated}
                            />
                            
                            <Form.Control.Feedback type="invalid">
                                {validation.msg}
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
                                isInvalid={!validation.validated}
                            />
                            
                            <Form.Control.Feedback type="invalid">
                                {validation.msg}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    
                    <Button type="submit">
                        {
                            isLoading("input") ? <Loader type="input"/>
                            :
                            "Login"
                        }
                    </Button>
                </Form>
            </div>
        </div>
    );
};