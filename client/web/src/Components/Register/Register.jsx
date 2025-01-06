// Dependencies
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Form, FloatingLabel, Button} from "react-bootstrap";
// Files
import {useAuthStore, useLoadingStore} from "../../store/store.js";
import Loader from "../Loader.jsx";
import styles from "./Register.module.css";


export default function Register()
{
    const {users, getUsers, register} = useAuthStore();
    const {isLoading, setLoading} = useLoadingStore();
    
    const [input, setInput] = useState({
        userName: "",
        password: "",
        repeatPassword: "",
        filesPath: "",
    });
    const [validation, setValidation] = useState({
        userName: true,
        password: true,
        repeatPassword: true,
        msg: "",
    });
    
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchData()
        {
            await getUsers();
        };
        fetchData();
    }, []);
    
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        setValidation({...validation, [e.target.name] : true});
    };
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        setLoading("input", true);
        
        const foundUsername = users.filter(e => e.username.toLowerCase() === input.userName.toLowerCase());
        
        const passwordCheck = input.password === input.repeatPassword;
        
        if(foundUsername.length)
        {
            setValidation({...validation, userName: false});
        }
        else if(!passwordCheck)
        {
            setValidation({...validation, password: false, repeatPassword: false});
        }
        else
        {
            const payload = await register(input);
            
            if(payload?.success)
            {
                setInput({
                    userName: "",
                    password: "",
                    repeatPassword: "",
                });
                setValidation({userName: true, password: false, repeatPassword: true, msg: payload.msg});
                navigate("/login");
            }
            else
            {
                setValidation({userName: false, password: false, repeatPassword: false, msg: payload.msg});
            };
        };
        
        setLoading("input", false);
    };
    
    
    return (
        <div className={styles.Container}>
            <div className={styles.FormContainer}>
                <div className={styles.h1Container}>
                    <h1 className={styles.FormTitle}>Register</h1>
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
                                isInvalid={!validation.userName}
                            />
                            
                            <Form.Control.Feedback type="invalid">
                                Username already in use.
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
                                isInvalid={!validation.password}
                            />
                            
                            <Form.Control.Feedback type="invalid">
                                Password does not match.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    
                    <Form.Group>
                        <FloatingLabel label="Repeat password">
                            <Form.Control
                                type="password"
                                name="repeatPassword"
                                placeholder="Repeat password"
                                value={input.repeatPassword}
                                onChange={handleChange}
                                required
                                isInvalid={!validation.repeatPassword}
                            />
                            
                            <Form.Control.Feedback type="invalid">
                                Password does not match.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    
                    <Form.Group>
                        <FloatingLabel label="Files path">
                            <Form.Control
                                type="text"
                                name="filesPath"
                                placeholder="Files path"
                                value={input.filesPath}
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>
                    </Form.Group>
                    
                    <Button type="submit">
                        {
                            isLoading("input") ? <Loader type="input"/>
                            :
                            "Register"
                        }
                    </Button>
                </Form>
            </div>
        </div>
    );
};