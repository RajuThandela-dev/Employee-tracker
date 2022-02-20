import React from "react";
import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch, Redirect } from "react-router-dom";
// import validateLog from "bf.jsx";
// import AdminLayout from "layouts/Admin/Admin.jsx";
// import RTLLayout from "layouts/RTL/RTL.jsx";
import Login from "views/Login/Login.jsx";
import axios from "axios"
import conf from './conf.jsx'
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css"; 
      


ReactDOM.render(
<Login></Login>
  ,
  document.getElementById("root")
);
 