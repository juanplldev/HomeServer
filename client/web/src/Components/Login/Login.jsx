// Dependencies
import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Form, FloatingLabel, Alert, Button} from "react-bootstrap";
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
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();
    const {/*authenticated*/ setAuthenticated} = useContext(AuthContext);
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
    };
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        
        const data = await dispatch(login(input)).catch(e => console.log(e));
        
        if(!data)
        {
            setAlert("Incorrect username or password.");
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
            setAlert(false);
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
                    
                    <Button type="submit">Login</Button>
                </Form>
            </div>
        </div>
    );
};


export default Login;