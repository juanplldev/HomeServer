// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
// Files
import {AuthProvider} from "./contexts/AuthContext";
import store from "./redux/store/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </Provider>,
  document.getElementById("root")
);