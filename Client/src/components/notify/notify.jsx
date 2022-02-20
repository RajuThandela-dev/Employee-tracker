import React from 'react'
import NotificationAlert from "react-notification-alert";
class Notify extends React.Component{
  constructor(props){
    super(props);
    this.notify=this.notify.bind(this);
  }

    notify = (content,color="success",icon="tim-icons icon-bell-55") => {
      
        var options = {};
        options = {
          place: "bc",
          message: content,
          type: color,
          icon: icon,
          autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
      };
   render(){
       return(
        <NotificationAlert ref="notificationAlert" />
       )
   } 
}
export default Notify;