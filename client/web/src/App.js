// Dependencies
import React from "react";
import {Route, Routes} from "react-router-dom";
// Files
import PrivateRoute from "./Components/Routes/PrivateRoute.jsx";
import AdminRoute from "./Components/Routes/AdminRoute.jsx";
import Home from "./Components/Home.jsx";
import Register from "./Components/Register/Register.jsx";
import Login from "./Components/Login/Login.jsx";
import "./App.css";


export default function App()
{
    return (
        <React.StrictMode>
            <Routes>
                <Route exact path="/:path?/*" element={<PrivateRoute children={<Home/>}/>}/>
                <Route exact path="/register" element={<AdminRoute children={<Register/>}/>}/>
                <Route exact path="/login" element={<Login/>}/>
            </Routes>
        </React.StrictMode>
    );
};