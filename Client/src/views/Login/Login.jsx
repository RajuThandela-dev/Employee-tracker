import React from 'react'
import {
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
    Card,
    CardBody,
    Form,
     Container,Row,Col
  } from "reactstrap";
import conf from './../../conf.jsx';
import axios from 'axios';
import Notify from "./../../components/notify/notify.jsx";
import Home from './Home.jsx'
import Swal from 'sweetalert'
import '../../assets/css/fontawesome/fontawesome.min.css'; 
 class Login extends React.Component{
    constructor(){
      super();
      this.state={
          name:'',
          password:'',
        
          textName:'',
          textPass:'',
          pageAccess:(localStorage.getItem('loggedIn'))?true:'',
          hidden:false
                  

      }
     this.submit=this.submit.bind(this);
     this.userID=this.userID.bind(this);
     this.password=this.password.bind(this)

    }
    userID(e){
      this.setState({
        name:e.target.value
      })
    }
    password(e){
      this.setState({
        password:e.target.value
      })
    }

    submit(e){
        e.preventDefault();
        if(this.state.name===''){
          Swal('error','USER_ID is required','error')
        }
        else{
          this.setState({
            textName:""
          })
        }

        if(this.state.password===''){
          Swal('error','PASSWORD is required','error')
        }
        else
        {
          this.setState({
            textPass:""
          })
          var userlog={
            username:this.state.name,
            userpass:this.state.password
          }
          axios.post(conf.serverUrl+'Signup/login.php',userlog)
          .then(({data})=>{
           console.log(data)
           if(data===0){
            Swal('LOGIN','unsuccessfull','error')
            this.setState({
              pageAccess:false
            })
                
           }else{
         
            localStorage.setItem('id',data.empId);
            localStorage.setItem('name',data.empName);
            localStorage.setItem('sex',data.empSex);
            localStorage.setItem('email',data.empEmail);
            localStorage.setItem('DOB',data.empDob);
            localStorage.setItem('phon',data.empPhone);
            localStorage.setItem('DOR',data.Doj);
            localStorage.setItem('adress',data.empAdress);
            localStorage.setItem('password',data.pass);
            localStorage.setItem('loggedIn',data.loggedIn);
                  this.refs.notification.notify(<div><h6 className='white'>Success</h6><p>You  are loging in.</p></div>,"success");
                  setTimeout(()=>{
                    conf.reload();
                  },3000)
           }
          })
          .catch(err=>{
            alert(err.toString())
          })
        }
  

    }
    render(){
      document.body.classList.add("white-content");
      document.body.style.overflowX = "none"
      document.body.style.overflowY = "none"

        return(

          (this.state.pageAccess)?
         <Home/>
          :
          <Row>
            <Col lg='3'></Col>
            <Col lg='6'>
            < Container
            className="main-panel"
            ref="mainPanel"
            data={"white"}
            style={{minHeight: "90vh",minWidth: "90%"}}
          >
          <Container>
          <Card className="mt-5">
            <CardBody>
              <center><h2 className='text-muted'>LOGIN</h2></center>
              <hr/>
              <Form onSubmit={this.submit} autoComplete="off">
              <Col md="12">
                  <Col>
                  <FormGroup>
                  <Label for="username">USER ID </Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="USER_ID "
                    value={this.state.name}
                    onChange={this.userID}
                  />
                  <p className='text-danger'>{this.state.textName}</p>
                  <FormText color="muted">
                    We'll never share your user id with anyone else.
                  </FormText>
                </FormGroup>
                  </Col>
              </Col>
           <Col>
           <Col md="12">
           <FormGroup >
                <Label for="password">PASSWORD</Label>

                <div className="style">
               <i className="float-right" style={{fontSize:'20px',position: "absolute",right: "10px",top: "2rem"}} className={this.state.hidden?"far fa-eye ":"far fa-eye-slash "} onClick={()=>{this.setState(prev=>{prev.hidden=!prev.hidden;return prev})}} ></i>
                <Input
                    size='10'
                    type={this.state.hidden?"text":"password"}
                    name="password"
                    className={'float-left'}
                    id="password"
                    placeholder="PASSWORD"
                    value={this.state.password}
                    onChange={this.password}
                    style={{border:'none'}}
                  />
              </div>
                  <p  className='text-danger'>{this.state.textPass}</p>
                </FormGroup>
                 </Col>
               </Col>
               
                <hr/>
                 <center><Button className='info btn-round' type="submit">
                  Submit
                 </Button></center>

               </Form>
              <Notify ref="notification" />
            </CardBody>
            </Card>
            
            </Container>
            </Container>
            </Col>
            <Col></Col>
            <Col>
            
            </Col>
          </Row>
         
        )
    }
}

export default Login;


