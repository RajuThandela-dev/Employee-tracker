import React, { Component } from 'react'
import Confs from './../../conf.jsx'
import {Card,CardBody,Form,FormGroup,Input,Label,Button,Col,Row} from 'reactstrap'
import axios from 'axios'
import Notify from './../../components/notify/notify.jsx'
import Swal from 'sweetalert'
import Schema from 'validate'
const cat=new Schema({
    CATAGORY:{
        type:String,
        required:true,
        length:{min:4,max:10}
    }
})
export default class AddItem extends Component {
    constructor(props){
        super(props)
        this.state={
            CATAGORY:''
            
        }
        // this.cat=this.cat.bind(this)
        this.submit=this.submit.bind(this)
      
    }
   
  
    submit(e){
        e.preventDefault()
        let error=cat.validate(this.state)
        if(error.length>0){
            Swal('error',error[0].message,'error')
        }else if(!Confs.stringValidate(this.state.CATAGORY)){
            Swal('error',"Enter valid input for the CATAGORY",'error')
        }else if(error.length==0){
             axios.post(Confs.serverUrl+"additem/addcategory.php",this.state)
            .then((res)=>{
                this.setState({
                    CATAGORY:''
                })
                console.log(res.data)
                if(res.data===1){
                    Swal('Success','catagory gets added','success')
                    //  this.refs.notification.notify(<div><h6 className='white'>Successfully</h6><p> inserted one row.</p></div>,"success")
                   
                }else{
                    Swal('Oops','catagory is exist','error')
                    // this.refs.notification.notify(<div><h6 className='white'>OOps!</h6><p>You already have this catagory in your table.</p></div>,"warning");
                }
            })
            .catch((err)=>{
                console.log(err)
            }) 
        }
  
    }
  render() {
    return (
      
            <Form onSubmit={this.submit} autoComplete='off'>
            <Row>
                <Col></Col>
                <Col lg='10'>
                <FormGroup>
            <Label for="catagory" >Catagory</Label>
            <Input 
            type="text"
            name="catagory" 
            id="catagory" 
            value={this.state.CATAGORY}
            onChange={({target})=>{this.setState(prev=>{prev.CATAGORY=target.value.trimStart();return prev})}}
          
            placeholder="Catagory" />
            {/* <p className="text-danger">{this.state.errorText}</p> */}
            <p>Add how many catagory you want</p>
            </FormGroup> 
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>
          
            <center><Button type='submit' onClick={this.submit} className='info'>Add</Button></center> 
            <Notify ref='notification'/>
            <br/> <br/> <br/> <br/>
            </Form>
       
       
    )
  }
}
