// Dependencies
import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Form, FloatingLabel, Button} from "react-bootstrap";
// Files
import AuthContext from "../../contexts/AuthContext";
import {login} from "../../redux/actions/actions";
import styles from "./Login.module.css";


function Login()
{
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        userName: "",
        password: "",
    });
    const [validated, setValidated] = useState(true);
    const navigate = useNavigate();
    const {/*authenticated*/ setAuthenticated} = useContext(AuthContext);
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        setValidated(true);
    };
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        
        const data = await dispatch(login(input)).catch(e => console.log(e));
        
        if(!data)
        {
            setValidated(false);
        }
        else
        {
            const payload = data.payload;
            const userData =
            {
                token: payload.content,
            };
            
            window.localStorage.setItem("userData", JSON.stringify(userData));
            
            setInput({
                userName: "",
                password: "",
            });
            setValidated(true);
            setAuthenticated(true);
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
                                Incorrect username.
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
                                Incorrect password.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    
                    <Button type="submit">Login</Button>
                </Form>
            </div>
        </div>
    );
};


export default Login;