// Dependencies
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Form, FloatingLabel, Button} from "react-bootstrap";
// Files
import {getUsers, register} from "../../redux/actions/actions";
import {useLoading} from "../../contexts/LoadingContext";
import Loader from "../Loader";
import styles from "./Register.module.css";


export default function Register()
{
    const {isLoading, showLoading, hideLoading} = useLoading();
    
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    
    const [input, setInput] = useState({
        userName: "",
        password: "",
        repeatPassword: "",
        filesPath: "",
    });
    const [validated, setValidated] = useState({
        userName: true,
        repeatPassword: true,
    });
    
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchData()
        {
            await dispatch(getUsers());
        };
        fetchData();
    }, [dispatch]);
    
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        setValidated({...validated, [e.target.name] : true});
    };
    
    async function handleSubmit(e)
    {
        showLoading("input");
        
        const foundUsername = users.filter(e => e.username.toLowerCase() === input.userName.toLowerCase());
        const passwordCheck = input.password === input.repeatPassword;
        
        if(foundUsername.length)
        {
            e.preventDefault();
            setValidated({...validated, userName: false});
        }
        else if(!passwordCheck)
        {
            e.preventDefault();
            setValidated({...validated, repeatPassword: false});
        }
        else
        {
            e.preventDefault();
            
            try
            {
                await dispatch(register(input));
                
                setInput({
                    userName: "",
                    password: "",
                    repeatPassword: "",
                });
                setValidated(true);
                navigate("/login");
            }
            catch(e)
            {
                const error = e.response?.data;
                console.log(error);
            };
            
        };
        
        hideLoading("input");
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
                                isInvalid={!validated.userName}
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
                            />
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
                                isInvalid={!validated.repeatPassword}
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
                            isLoading.input ? <Loader type="input"/>
                            :
                            "Register"
                        }
                    </Button>
                </Form>
            </div>
        </div>
    );
};