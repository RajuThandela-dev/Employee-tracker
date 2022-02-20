import { CustomInput,Row,Col,Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import React from 'react'
import axios from 'axios'
import conf from './../../conf.jsx';
import login from './../../bf';
import Notify from "./../../components/notify/notify.jsx";
import {Card,CardBody,Container} from 'reactstrap'
import Swal from 'sweetalert'
import Schema from 'validate'
const user=new Schema({
    PASSWORD:{
        type:String,
        required:true
    },
    ADRESS:{
        type:String,
        required:true
    },
    PHONE_NUMBER:{
        type:Number,
        required:true,
        length:{min:10,max:12}
    },
    EMPLOYEE_DOB:{
        type:String,
        required:true
    },
    EMPLOYEE_GENDER:{
        type:String,
        required:true
    },
    EMPLOYEE_EMAIL:{
        type:String,
        required:true
    },
    EMPLOYEE_NAME:{
        type:String,
        required:true,
        length:{min:4,max:15}
    }
})

class Signup extends React.Component{
    constructor(){
        super();
        this.state={
          
           EMPLOYEE_NAME:'',
           EMPLOYEE_EMAIL:'',
            EMPLOYEE_GENDER:'',
            EMPLOYEE_DOB:'',
            PHONE_NUMBER:null,
            ADRESS:'',
           PASSWORD:''
          

           
           
        }
      
         this.submit=this.submit.bind(this)
         this.click=this.click.bind(this)
    }
    click(){
        this.setState({
            PASSWORD:Math.random().toString(36).substring(5)
        })
    }
 
    submit(e){
        e.preventDefault();
        let error=user.validate(this.state)
        console.log(error)
        if(error.length>0){
            for(let i=0;i<error.length;i++){
                Swal('Oops',error[i].message,'error')
            }
        }else if(!conf.phonValidate(this.state.PHONE_NUMBER)){
            Swal("oops",'Phone number with 6-9 and remaing 9 digit with 0-9',"error")
        }else if(isNaN(this.state.PHONE_NUMBER)){
            Swal("oops",'PHONE_NUMBER is required',"error")
        }else if(!conf.stringValidate(this.state.EMPLOYEE_NAME)){
            Swal("oops",'Enter valid input for EMPLOYEE_NAME',"error")
        }else if(error.length==0){
                  
                axios.post(conf.serverUrl+'Signup/signup.php', this.state)
                .then(({data})=>{
                    // console.log(data)
                    if(data===1){
                        console.log(data)
                        this.refs.date.value=''
                        Swal('success','signup successfull','success')
                            // this.refs.notification.notify(<div><h6 className='white'>Success</h6><p>signup successfull.</p></div>,"success");
                            this.setState(prev=>{
                            prev.EMPLOYEE_NAME=''
                            prev.EMPLOYEE_EMAIL=''
                            // emp_sex:'',
                            prev.EMPLOYEE_DOB=''
                            prev.PHONE_NUMBER=''
                            prev.ADRESS=''
                            prev.PASSWORD=''
                           
                            return prev
                            })
                        }
                    else if(data==111){
                        Swal('Oops','Signup unsuccessfull,Email field is taken by another user plz  try another.','error')

                            // this.refs.notification.notify(<div><h6>Error</h6><p>Signup unsuccessfull,Email field is taken by another user plz  try another.</p></div>,"warning");
                    }else{
                        Swal('Oops','Signup unsuccessfull,phone number is taken by other user try another.','error')

                        // this.refs.notification.notify(<div><h6>Error</h6><p>Signup unsuccessfull,phone number is taken by other user try another.</p></div>,"warning");

                    }
                })
                .catch((err)=>{
                        console.log(err)
                    
                })
        }
 
     
     }
    
render(){
    let date1=new Date().toLocaleDateString('en-gb')
    let [day,month,year]=date1.split('/')
    year=year-40;
    let max=new Date().toLocaleDateString('en-gb')
   
    let [day1,month1,year1]=max.split('/')
    
    year1=year1-20
     return(
         <Container style={{marginTop:80}}>
        <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col lg={10}>
            <Card>
               
               <CardBody>
               <center><h2 className='text-muted'>REGISTRATION</h2></center>
               <hr/>

               <Form onSubmit={this.submit} autoComplete={"off"} >
               <Row>
                   <Col lg={'6'}>
                    <FormGroup>
                        <Label for="Emp_name">Employee name</Label>
                        <Input
                        
                        
                        ref=""
                        type="text"  
                        placeholder="EMPLOYEE_NAME"
                        value={this.state.EMPLOYEE_NAME}
                        onChange={({target})=>{this.setState((prev)=>{prev.EMPLOYEE_NAME=target.value.trimStart().toUpperCase();return prev})}}
           
                      />
                    </FormGroup>
                   </Col>
                   <Col lg='6'>
                   <FormGroup>
                    <Label for="EMAIL">Email</Label>
                    <Input type="email" 
                    id='EMAIL'

                    value={this.state.EMPLOYEE_EMAIL}
                    placeholder="email"
                    onChange={({target})=>{this.setState((prev)=>{prev.EMPLOYEE_EMAIL=target.value;return prev})}}
                    
                    />
                    {/* {(this.state.emp_email=='')?<p className='text-danger'>{this.state.textEmail}</p>:<p style={{display:'none'}}></p>} */}
                    </FormGroup>
                   </Col>
                  
               </Row>
            
               
               
          
             
               <FormGroup check inline>
            <Label>Sex{' '}:<Label check>
              <Input
              ref='male'
               type="radio" 
               name="sex"
               value={'male'}
               onChange={({target})=>{this.setState((prev)=>{prev.EMPLOYEE_GENDER=target.value;return prev})}}
            //   checked={this.state.checked}
               />{' '}
             male
            </Label>
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input 
              type="radio"
               name="sex"
               ref='female'
               value={'female'}
               onChange={({target})=>{this.setState((prev)=>{prev.EMPLOYEE_GENDER=target.value;return prev})}}
            //    checked={this.state.checked}
               />{' '}
              female
            </Label>
          </FormGroup>

                
                 <Row>
                    <Col lg='6'>
                    <FormGroup>
            <Label for="DOB">DOB(Date of Birth)</Label>
          <input 
          type="date" 
          ref="date"
          className='form-control'
          min={year+'-'+month+'-'+day}
          max={year1+'-'+month1+'-'+day1}
          id='DOB'
          onChange={({target})=>{this.setState((prev)=>{prev.EMPLOYEE_DOB=target.value;return prev})}}
        
          />
           {/* {(this.state.DOB==='')?<p className='text-danger'>{this.state.textDob}</p>:<p style={{display:'none'}}></p>} */}
        </FormGroup>
                    </Col>
                    <Col lg='6'>
                    <FormGroup>
          <Label for="phone">Phone</Label>
          <Input
          pattern="[6-9]{1}[0-9]{9}"
          title="Phone number with 6-9 and remaing 9 digit with 0-9"
          type="number"
          placeholder='PHONE_NUMBER'
          value={this.state.PHONE_NUMBER}
          onChange={({target})=>{this.setState((prev)=>{prev.PHONE_NUMBER=parseInt(target.value.trimStart());return prev})}}
          id='phone'
         
           />
            </FormGroup>
                    </Col>

               </Row>
                <Row>
                        <Col lg="6">
                        <FormGroup>
                        <Label for="adress">adress</Label>
                        <Input
                        type="text" 
                        id='adress'
                        value={this.state.ADRESS}
                        placeholder="adress" 
                        onChange={({target})=>{this.setState((prev)=>{prev.ADRESS=target.value.trimStart();return prev})}}
                        />
                        {(this.state.adress=='')?<p className='text-danger'>{this.state.textAdress}</p>:<p style={{display:'none'}}></p>}
                        </FormGroup>  
                        </Col>
                        <Col>
                        <FormGroup>
                            <Row>
                                <Col lg="5">
                                <Label for="password">password</Label>
                                <Input
                                    type="text" 
                                    id='password'
                                    value={this.state.PASSWORD}
                                    placeholder="password"
                                    disabled
                                
                                />
                                </Col>
                                <Col lg="2" >
                                <br></br>
                                 <Button className=' btn-primary' onClick={this.click}>generate password</Button>
                                </Col>
                                <Col></Col>
                            </Row>
             
                 
                     </FormGroup>
                        </Col>
                      
                       
                </Row>
               
               <hr/>
              <Row>
                 <Col lg='4'></Col>
                  <Col lg='4'>
                  <Button className='btn-block'>Submit</Button>
                  </Col>
                 
              </Row>
             
              <Notify ref="notification" />
               </Form>
                        </CardBody>
                    </Card>
            </Col>
        </Row>
        <br/>  
         </Container>
       
     )
    }
}
export default Signup;