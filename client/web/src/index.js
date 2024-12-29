// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
// Files
import App from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);