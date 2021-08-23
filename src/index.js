import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "alertifyjs/build/css/alertify.min.css";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";


axios.defaults.baseURL = "http://localhost:62015/api/";
//axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
