// Dependencies
import React from "react";
import {Route, Routes} from "react-router-dom";
// Files
import PrivateRoute from "./contexts/PrivateRoute";
import Home from "./Components/Home.jsx";
// import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import "./App.css";


function App()
{
    return (
        <React.StrictMode>
            <Routes>
                <Route exact path="/:path?/*" element={<PrivateRoute children={<Home/>}/>}/>
                {/* <Route exact path="/register" element={<Register/>}/> */}
                <Route exact path="/login" element={<Login/>}/>
            </Routes>
        </React.StrictMode>
    );
};


export default App;