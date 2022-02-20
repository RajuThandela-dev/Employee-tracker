import React, { Component } from 'react'
import {TabContent, TabPane, Nav, NavItem, NavLink,Alert,Button,Card,CardBody,Form,FormGroup,Container,Label,Input,Row,Col} from 'reactstrap'
import Conf from '../../conf.jsx'
import axios from 'axios';
import Notify from '../../components/notify/notify.jsx'
import classnames from 'classnames'
import Swal from 'sweetalert'
export default class LeaveRequest extends Component {
  constructor(props){
    super(props)
    this.state={
      errPurpose:'',
      errDate:'',
      purpose:'',
      E_date:'',
      activeTab:'1',
      confirmedCheck:true,
      confirm:[],
      rejectCheck:true,
      reject:[]
    }
    this.LeavePurpose=this.LeavePurpose.bind(this)
    this.E_date=this.E_date.bind(this)
    this.submit=this.submit.bind(this)
  }
  toggle(tab){
    if(this.state.activeTab!==tab){
      this.setState({
        activeTab:tab
      })
    }
  }
  LeavePurpose(e){
    this.setState(
    {
        purpose:e.target.value.trimStart()
    })
  }
  E_date(e){
    this.setState({
        E_date:e.target.value
    })
  }

  submit(e){
    e.preventDefault()
    if(this.state.purpose===''){
        // this.setState({
        //      errPurpose:'This field cant be empty'
        // })
       Swal('error','PURPOSE is required','error')
    }else{
      this.setState({
        errPurpose:''
      })
    }
   
    let selectedDate=new Date(this.state.E_date)
    let day=selectedDate.getDate()
    let Month=selectedDate.getMonth()+1
    if(Month<10){Month="0"+Month}
    if(day<10){day="0"+day}

    console.log(Month)
    let currentDate=new Date()
    if(this.state.E_date===''){
      // this.setState({
      //   errDate:'Date field cant be empty'
      // })
      Swal('error','DATE is required','error')
    }
    
      else if(selectedDate.getTime()>=currentDate.getTime()){
        this.setState({
          errDate:''
        })
        if(this.state.purpose===''||this.state.E_date===''){
          console.log("empty")
        }else{
            let date = selectedDate.toLocaleDateString("en-gb");
            date = date.split("/");
            date = date[2]+"-"+date[1]+"-"+date[0];
            var data={
              purpose:this.state.purpose,
              date: date,
              current_date:currentDate.toLocaleDateString('en-gb'),
              time:currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
              confirm:0,
              reject:0,
              e_id:localStorage.getItem('id'),
              check:1
      
            }
           axios.post(Conf.serverUrl+'leave/LeaveRequest.php',JSON.stringify(data))
           .then(({data})=>{
              console.log(data)
             if(data===1){
              Swal('Successfully','sent your leave request,Thankyou','success')
                  // this.refs.notification.notify(<div><h6 className='white'>Successfully</h6><p> sent your leave request,Thankyou.</p></div>,"success")
                  this.setState({
                    purpose:'',
                    E_date:''
                  })
              }else if(data==111){
                // this.refs.notification.notify(<div><h6 className='white'>Unsuccessfull,</h6><p>Already sent the message,please try tommorrow.</p></div>,"warning")
                Swal('Unsuccessfull','Already sent the message,please try tommorrow.','error')
              }
              else{
                Swal('Unsuccessfull','not sent your message,thankyou..','error')
                //  this.refs.notification.notify(<div><h6 className='white'>Unsuccessfull,</h6><p>not sent your message,thankyou.</p></div>,"warning")
             }
           })
          .catch(err=>{
            console.log(err)
          })
        }
      }
      else{
          this.setState({
              errDate:'Invalid date'
          })
      }
    
  
  }
  componentDidMount(){
    let json={
      empId:localStorage.getItem('id')
    } 
    axios.post(Conf.serverUrl+'leave/userConfirm.php',json)
    .then(({data})=>{
      console.log(data)
      if(data===0){
        this.setState({
          confirmedCheck:false
        })
      }else{
        data.userConfirm=data.userConfirm.map(x=>{
          x.currentDate=new Date(x.currentDate).toLocaleDateString('en-gb')
          x.currentDate=x.currentDate.split('/')
          x.currentDate=x.currentDate[0]+'-'+x.currentDate[1]+'-'+x.currentDate[2]
          x.L_date=new Date(x.L_date).toLocaleDateString('en-gb')
          x.L_date= x.L_date.split('/')
          x.L_date= x.L_date[0]+'-'+ x.L_date[1]+'-'+ x.L_date[2]
          return x
        })
        this.setState({
          confirm:data.userConfirm
        })
      }
    })
    .catch(err=>{
      console.log(err)
    })
    axios.post(Conf.serverUrl+'leave/userReject.php',json)
    .then(({data})=>{
      console.log(data)
      if(data===0){
        this.setState({
          rejectCheck:false
        })
      }else{
         data.userReject=data.userReject.map(x=>{
          x.currentDate=new Date(x.currentDate).toLocaleDateString('en-gb')
          x.currentDate=x.currentDate.split('/')
          x.currentDate=x.currentDate[0]+'-'+x.currentDate[1]+'-'+x.currentDate[2]
          x.L_date=new Date(x.L_date).toLocaleDateString('en-gb')
          x.L_date= x.L_date.split('/')
          x.L_date= x.L_date[0]+'-'+ x.L_date[1]+'-'+ x.L_date[2]
          return x
        })
        this.setState({
          reject:data.userReject
        })
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  render() {
    let date=new Date().toLocaleDateString('en-gb')
    let [day,month,year]=date.split('/')
    day=parseInt(day)+1;
    if(day<10){
      day="0"+day
    }
    return (
        <Container style={{marginTop:80}}>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col sm='10'>
          <Nav tabs>
            <NavItem>
            <NavLink
        
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
              className='bg-white'
            >
                Request
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
        
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
              className='bg-white'
            >
               Confirmed Request
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
    
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
              className='bg-white'
            >
              Rejected request...
            </NavLink>
          </NavItem>
          <TabContent activeTab={this.state.activeTab}>
         
          <TabPane tabId="1">
          <Card style={{width:900}}>
              <CardBody  >
          <Form onSubmit={this.submit}>
           
                <center><h1 className='text-muted'>LEAVE REQUESTS</h1></center>
                <hr/>
                <Row>
                  <Col></Col>
                  <Col sm='10'>
                  <FormGroup>
                    <Label for="LeavePurpose">Leave purpose</Label>
                    <Input 
                     type="textarea"
                     name="LeavePurpose" 
                     id="LeavePurpose"
                     value={this.state.purpose}
                      onChange={this.LeavePurpose} 
                     placeholder="Leave purpose" />
                    <p className="text-danger">{this.state.errPurpose}</p>
                </FormGroup>
                  </Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
              <Row>
                <Col></Col>
                <Col sm='10'>
                <FormGroup>
                   <Label for="date">Select date</Label>
                    <input 
                    className='form-control'
                    min={year+'-'+month+"-"+day}
                     type="date"
                     name="date" 
                     id="date"
                     value={this.state.E_date}
                     onChange={this.E_date} 
                    //  placeholder="" 
                    />
                    <p className="text-danger">{this.state.errDate}</p>
                </FormGroup>
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
               
                <hr/>
                <Row>
                  <Col></Col>
                  <Col></Col>
                  <Col sm='8'>
                  <Button  className='float-right' color='secondary'>Send</Button>
                  </Col>
                  <Col></Col>
                </Row>
             
                <Notify ref='notification'/>
             
            </Form>
            </CardBody>
           </Card> 
          
          </TabPane>
          <TabPane tabId="2">
          {
            (this.state.confirmedCheck)?
              this.state.confirm.map((data,key)=>
                <Alert color='success'>
                  {key+1+"."+"Dear user!Your request sent on date "+data.currentDate+" has been confirmed by the admin so yau can take leave on requested date "+data.L_date}
                </Alert>
              )
              :
              <Container>
                <br/>    <br/>    <br/>    <br/>    <br/>
             <center><h1 className='text-muted'>OOPS!YOU HAVE NO CONFIRMED  MESSAGES</h1></center> 
              </Container>
             
          }</TabPane>
          <TabPane tabId="3">
          {
            (this.state.rejectCheck)?
            this.state.confirm.map((data,key)=>
            <Alert color='warning'>
              {key+1+"."+"Dear user!Your request sent on date "+data.currentDate+" has been rejected by the admin so yau can't take leave on requested date "+data.L_date}
            </Alert>
          )
            :
            <Container>
            <br/>    <br/>    <br/>    <br/>    <br/>
         <center><h1 className='text-muted'>OOPS!YOU HAVE NO REJECTED  MESSAGE</h1></center> 
          </Container>
          }
          </TabPane>
          </TabContent>
          </Nav>
         
          </Col>
        </Row>
       
          
        </Container>
    )
  }
}
