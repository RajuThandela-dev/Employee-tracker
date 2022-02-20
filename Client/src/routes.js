import Dashboard from "views/Dashboard.jsx";
// import Icons from "views/Icons.jsx";
// import Map from "views/Map.jsx";
// import Notifications from "views/Notifications.jsx";
// import Rtl from "views/Rtl.jsx";
// import TableList from "views/TableList.jsx";
// import Typography from "views/Typography.jsx";
// import UserProfile from "views/UserProfile.jsx";
// import Login from './views/Login/Login.jsx';
// import Info from './views/admin/view_employee_info';
import EmpInfo from './views/admin/view_employee_info'
import AddRoute from './views/admin/add_route'
import AssignRoute from './views/admin/assign_route'
import AttendenceTracker from './views/admin/attendence_tracker'
import CheckActivity from './views/admin/check_activity'
import CheckStock from './views/admin/check_stock'
import ConfirmRejectLeave from './views/admin/confirm_reject_l'
import Feedback from './views/admin/feedback'
import AddNewItem from './views/admin/add_item'
// import SendAlert from './views/admin/send_alert'
import EmployeeLeave from './views/admin/view_employee_leave'
import ViewOrder from './views/admin/view_order'
import CheckAvailabaleStock from './views/employee/check_available_stock'
import CollectOrderFeedback from './views/employee/collect_order_&_feedback'
import LeaveRequest from './views/employee/leave_request'
import MarkAttendence from './views/employee/mark_attendence'
import ResToAlert from './views/employee/res_to_alert_msg'
import SetShopLocRegisterNewShop from './views/employee/set_shop_loc_or_register_new_shop'
import ShopInfo from './views/employee/shop_info'
import StockRequest from './views/employee/stock_request'
import ViewActivity from './views/employee/view_activities'
import ViewAssignRoute from './views/employee/view_assign_route'
import ViewRoteAndShopInfo from './views/employee/view_route_and_shop_info'
import Signup from './views/Login/Signup.jsx'
///android_asset/www
const prefix = "";
var admin = [
  {
    path: "/dashboard",
    name: "registration",
    rtlName: "لوحة القيادة",
    icon: "fas fa-user-tie",
    component:Signup,
    layout: "/admin"
  }, 
  {
    path: "/add_route",
    name: "add route",
    rtlName: "لوحة القيادة",
    icon: "fas fa-map-pin",
    component:AddRoute,
    layout: "/admin"
  },
  {
    path:"/assign_route",
    name: "assign route",
    rtlName: "لوحة القيادة",
    icon: "fas fa-map-marked-alt",
    component:AssignRoute ,
    layout: "/admin"
  },{
    path:"/issues",
    name: "issues",
    rtlName: "لوحة القيادة",
    icon: "fas fa-comment-alt",
    component: Feedback,
    layout: "/admin"
  }, {
    path:"/view_emp_info",
    name: "view employee info",
    rtlName: "لوحة القيادة",
    icon: "fas fa-address-card",
    component:  EmpInfo,
    layout: "/admin"

  }, {
    path:"/confirm_reject",
    name: "confirm/reject leave",
    rtlName: "لوحة القيادة",
    icon: "fas fa-adjust ",
    component:ConfirmRejectLeave,
    layout: "/admin"
  }, {
    path:"/view_emp_leave",
    name: "View employee leave",
    rtlName: "لوحة القيادة",
    icon: "fas fa-arrow-alt-circle-down",
    component:EmployeeLeave ,
    layout: "/admin"
  }, {
    path:"/attendance_tracker",
    name: "Attendance tracker",
    rtlName: "لوحة القيادة",
    icon: "fas fa-user-tag",
    component: AttendenceTracker,
    layout: "/admin"
  }, {
    path:"/check_activity",
    name: "check activity",
    rtlName: "لوحة القيادة",
    icon: "fas fa-address-card",
    component:  CheckActivity,
    layout: "/admin"
  }, {
    path:"/view_order",
    name: "view order",
    rtlName: "لوحة القيادة",
    icon: "fas fa-clipboard-list",
    component: ViewOrder,
    layout: "/admin"
  }, {
    path:"/check_stock",
    name: "check stock",
    rtlName: "لوحة القيادة",
    icon: "fas fa-align-left",
    component:CheckStock ,
    layout: "/admin"
  }, {
    path:"/add_item",
    name: "add item",
    rtlName: "لوحة القيادة",
    icon: "fas fa-cart-plus",
    component:AddNewItem ,
    layout: "/admin"
  }
  
]
var user = [
  {
    path:"/dashboard",
    name:"view assigned route",
    rtlName: "لوحة القيادة",
    icon: "fas fa-compass",
    component:ViewAssignRoute,
    layout: "/admin"
  },
  {
    path:"/add_route",
    name: "register new shop",
    rtlName: "لوحة القيادة",
    icon: "fas fa-store-alt",
    component: SetShopLocRegisterNewShop ,
    layout: "/admin"
  },
  {
    path:"/assign_route",
    name: "collect orders/issues",
    rtlName: "لوحة القيادة",
    icon: "fas fa-clipboard-list",
    component: CollectOrderFeedback,
    layout: "/admin"
  },
  {
    path:"/issues",
    name: "mark attendence",
    rtlName: "لوحة القيادة",
    icon: "fas fa-user-check",
    component: MarkAttendence,
    layout: "/admin"
  },
  
  {
    path:"/view_emp_info",
    name:"view route and shop info",
    rtlName: "لوحة القيادة",
    icon: "fas fa-route",
    component:ViewRoteAndShopInfo,
    layout: "/admin"
  },
  
 
  {
    path:"/confirm_reject",
    name: "check available stock",
    rtlName: "لوحة القيادة",
    icon: "fas fa-align-left",
    component: CheckAvailabaleStock,
    layout: "/admin"
  },
  {
    path:"/view_emp_leave",
    name: "leave request",
    rtlName: "لوحة القيادة",
    icon: "fas fa-arrow-alt-circle-up",
    component:LeaveRequest ,
    layout: "/admin"
  },
  {
    path:"/attendance_tracker",
    name: "view activities",
    rtlName: "لوحة القيادة",
    icon: "fas fa-address-card",
    component: ViewActivity ,
    layout: "/admin"
  }
]

var routes = localStorage.getItem('id') == '100001' ? admin : user;

export default routes;
