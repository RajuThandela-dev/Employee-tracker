import React, { Component } from 'react'
import conf from './../../conf.jsx'
import axios from 'axios'
import {Row,Col,Form,Label,FormGroup,Button,Input,Container,Card,CardBody} from 'reactstrap'
import Notify from '../../components/notify/notify.jsx'
import Swal from 'sweetalert'
export default class componentName extends Component {
  constructor(props){
    super(props)
    this.state={
      latitude:'',
      longitude:'',
      locationErr:''
     

    }
    this.getLocation=this.getLocation.bind(this)
    this.submit=this.submit.bind(this)

 
  }
  getLocation(){
    const location = window.navigator && window.navigator.geolocation
    if (location) {
        location.getCurrentPosition((position) => {
            this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            })
        }, (error) => {
            this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
        })
    }
   
   
}
submit(e){
  e.preventDefault();
 
  if(this.state.latitude==''&&this.state.longitude==''){
  
    Swal('error','Must get the location by clicking getLocation button','error')
  }else if(this.state.latitude=='err-latitude'&&this.state.longitude=='err-longitude'){
   
    Swal('error','check your network connection','error')
  }else{
    this.setState((prev)=>{
      prev.locationErr=''
      return prev
    })
    var lat=this.state.latitude+','
    lat=lat.slice(lat,5)
    let long=this.state.longitude+','
    long=long.slice(long,5)
    var obj={
      lat:lat,
      long:long,
      check:1,
      emp_id:localStorage.getItem('id'),
      state:{...this.state}


    }
    axios.post(conf.serverUrl+'route/markAttendence.php',obj)
    .then(({data})=>{
      console.log(data)
      if(data=='444'){
        Swal('Oops!','You not assigned a route by the admin','error')
        // this.refs.notification.notify(<div><h6 className='white'>Oops!</h6><p>You not assigned a route by the admin</p></div>,"warning");

      }else if(data=='111'){
        Swal('success','your attendence has been marked successfull.','success')
        // this.refs.notification.notify(<div><h6 className='white'>successfull</h6><p>your attendence has been marked successfull.</p></div>,"success");

      }else if(data=='555'){
        Swal('error','Your time has expired so you cant mark the attendence','error')

      }else if(data=='000'){
        Swal('unsuccessfull','You are not in a assigned location so you cant get the attendence.','error')
        // this.refs.notification.notify(<div><h6 className='white'>unsuccessfull</h6><p>You are not in a assigned location so you cant get the attendence.</p></div>,"warning");

      }else if(data=='999'){
        Swal('warning','You already marked your attendence.','warning')

      }
      else{

      }
    })
    .catch(err=>console.log(err))
  }
  
}

  render() {
    
    return (
    <Container style={{marginTop:80}}>
    <Row>
      <Col></Col>
      <Col></Col>
      <Col></Col>
      <Col lg='10'>
      <Form onSubmit={this.submit} autoComplete="off">
      
      <Card >
        <CardBody>
          <center><h1 className='text-muted'>MARK ATTENDENCE</h1></center>
          <hr/>
        <FormGroup>
        <Label for="id">Get ur current location</Label>
          <br/>
          <Input
          type='text' 
          name='id'
          placeholder='get current location'
          disabled
          className='float-left'
          value={this.state.latitude+","+this.state.longitude}
          >
          </Input> <br/><br/>
          <p className="text-danger">{this.state.locationErr}</p>
          <Button 
          onClick={this.getLocation} 
        
           className='float-right  btn-block '
           >Get location
           </Button><br/>
          
         
        </FormGroup><br/>
        <hr/>
        <center><Button className='btn-block'>mark attendence</Button></center>
        </CardBody>
      </Card>
      
      </Form>
      <Notify ref="notification"/>
      </Col>
    </Row>
     
    </Container>
    )
  }
}

  