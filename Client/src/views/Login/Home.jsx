import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
//import BF from "bf.jsx";
import AdminLayout from "layouts/Admin/Admin.jsx";
// import UserLayout from './../../layouts/user/User.jsx';
import RTLLayout from "layouts/RTL/RTL.jsx";
import Login from "./Login.jsx";
import MoreInfo from './../../views/admin/moreInfo'
// import Login from '../Login/Login'
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
const Home=(props)=>{
 const hist = createBrowserHistory();
        return(
            <Router history={hist}>   
            <Switch>
                {/* <Route path="/admin/login" component={props=><Login {...props} />} /> */}
                <Route path="/admin" render={props => <AdminLayout {...props} />} />
                <Redirect from="/" to="/admin/dashboard" />
            </Switch>
            </Router>
        )
  
}
export default Home
