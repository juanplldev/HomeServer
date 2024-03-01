// Dependencies
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Form, FloatingLabel, Alert, Button} from "react-bootstrap";
// Files
import {getUsers, register} from "../../redux/actions/actions";
import styles from "./Register.module.css";


function Register()
{
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.content);
    const [input, setInput] = useState({
        userName: "",
        password: "",
        repeatPassword: "",
    });
    const [alert, setAlert] = useState(false);
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
    };
    
    async function handleSubmit(e)
    {
        const foundUsername = users.filter(e => e.userName === input.userName);
        const passwordCheck = input.password === input.repeatPassword;
        
        if(foundUsername.length)
        {
            e.preventDefault();
            setAlert("Username already in use.");
        }
        else if(!passwordCheck)
        {
            e.preventDefault();
            setAlert("Password does not match.");
        }
        else
        {
            e.preventDefault();
            await dispatch(register(input));
            setInput({
                userName: "",
                password: "",
                repeatPassword: "",
            });
            setAlert(false);
            navigate("/login");
        };
    };
    
    
    return (
        <div className={styles.Container}>
            <div className={styles.FormContainer}>
                <div className={styles.h1Container}>
                    <h1 className={styles.FormTitle}>Register</h1>
                </div>
                
                <Form className={styles.Form} onSubmit={handleSubmit}>
                    {
                        alert && (
                            <Alert key="danger" variant="danger">
                                {alert}
                            </Alert>
                        )
                    }
                    <Form.Group>
                        <FloatingLabel controlId="floatingInput" label="Username" >
                            <Form.Control onChange={handleChange} type="text" placeholder="Username" name="userName" value={input.userName} required/>
                        </FloatingLabel>
                    </Form.Group>
                    
                    <Form.Group>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password" value={input.password} required/>
                        </FloatingLabel>
                    </Form.Group>
                    
                    <Form.Group>
                        <FloatingLabel controlId="floatingPassword" label="Repeat password">
                            <Form.Control onChange={handleChange} type="password" placeholder="Repeat password" name="repeatPassword" value={input.repeatPassword} required/>
                        </FloatingLabel>
                    </Form.Group>
                    
                    <Button type="submit">Register</Button>
                </Form>
            </div>
        </div>
    );
};


export default Register;