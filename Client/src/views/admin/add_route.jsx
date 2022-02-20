import React, { Component } from 'react'
import {Container,Form,FormGroup,Label,Button,Input,Card,Col,Row,CardBody} from 'reactstrap'
import axios from 'axios'
import conf from '../../conf.jsx'
import Notify from '../../components/notify/notify.jsx'
import Swal from 'sweetalert'
import Schema from 'validate'
const route=new Schema({
  COMA:{
    type:String,
    required:true
  },
  LONGITUDE:{
    type:Number,
    required:true
  },
  LOCATION:{
    type:Number,
    required:true
  },
  ROUTE_NAME:{
    type:String,
    required:true,
    length:{min:4,max:15}
  }
 
})
export default class componentName extends Component {
  
  constructor(props){
    super(props)
    this.state={
      LOCATION:null,
      LONGITUDE:null,
      ROUTE_NAME:'',
      COMA:','
     


    }

    this.getLocation=this.getLocation.bind(this)
    this.submit=this.submit.bind(this)
    
  }
  getLocation(){
    const location = window.navigator && window.navigator.geolocation
    if (location) {
        location.getCurrentPosition((position) => {
            this.setState(prev=>{
            prev.LOCATION=position.coords.latitude
            prev.LONGITUDE= position.coords.longitude
            
            return prev
            })
           
        }, (error) => {
            this.setState(prev=>{ prev.LOCATION='LATITUDE_ERROR' ;prev.LONGITUDE='LONGITUDE_ERROR';return prev })
        })
    }
}

submit(e){
  e.preventDefault();
  let error=route.validate(this.state)
  // console.log(error)
  if(error.length>0){
    for(let i=0;i<error.length;i++){
      Swal('Oops',error[i].message,'error')
    }
  }
  else if(!conf.stringValidate(this.state.ROUTE_NAME)){
    Swal('Oops','Enter the valid input for ROUTE_NAME','error')
  }else if(this.state.LOCATION=='LATITUDE_ERR'||this.state.LONGITUDE=='LONGITUDE_ERR'){
    Swal('Oops','Set your location then try again','error')
  }else if(error.length==0){
    
        // console.log(this.state)
            axios.post(conf.serverUrl+'route/addRoute.php',this.state)
            .then(({data})=>{
              console.log(data)
              if(data===1){
                this.setState((prev)=>{
                  prev.ROUTE_NAME=''
                  prev.LONGITUDE=''
                  prev.LOCATION=''
                  return prev
                   })
                   Swal('successfully','Route added','success')
                // this.refs.notification.notify(<div><h6 className='white'>Successfully</h6><p> added route.</p></div>,"success")
                //  console.log(this.state.name)
              
              
                
              }else {
                Swal('error','Failed to add route,this route exist','error')

                // this.refs.notification.notify(<div><h6 className='white'>Not success</h6><p> not added route,this route exist.</p></div>,"warning")
      
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
    <Card>
      <CardBody>
      <Form onSubmit={this.submit} autoComplete='off'>
      <center><h1 className="text-muted">ADD ROUTE</h1></center>
      <hr/>
      <Row>
        <Col lg="6">
      
        <FormGroup>
        <Label for="name">Name of the location</Label>
        <Input
        name="name"
        ref="name"
      
       
        id="name"
        type='text'
        onChange={({target})=>{this.setState(prev=>{prev.ROUTE_NAME=target.value.trimStart().toUpperCase();return prev})}}
        value={this.state.ROUTE_NAME}
        placeholder="Name"
        
        />
        </FormGroup>
        </Col>
        <Col lg="6">
        <FormGroup>
        <Label for="location">Get Location</Label>
        <Input
        id="location"
        id="location"
        type='text'
        placeholder="getLocation"
        disabled
        value={this.state.LOCATION+this.state.COMA+this.state.LONGITUDE}
        />
        {/* <p className="text-danger">{this.state.locationErr}</p> */}
        {/* {(this.state.latitude==''||this.state.longitude=='')?<p className="text-danger">{this.state.locationErr}</p>:<p style={{display:'none'}}></p>} */}
      </FormGroup>
        
        </Col>
      </Row>
    
     
      <Button className="btn-block btn-primary" onClick={this.getLocation}>GetLocation</Button>
      <hr/>
      <center><Button className="btn-round" >submit</Button></center>
      < Notify ref="notification"></ Notify>
    </Form>
      </CardBody>
    </Card>
    </Col>
  </Row>
   
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
  </Container>
    )
  }
}
