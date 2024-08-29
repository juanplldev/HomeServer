// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
// Files
import {AuthContext} from "./contexts/AuthContext";
import store from "./redux/store/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.render(
  <AuthContext>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </AuthContext>,
  document.getElementById("root")
);