import React from 'react'
import {Form,FormGroup,Label,Input, Container,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText,CardBody, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Conf from '../../conf.jsx'
import Axios from 'axios';
import Notify from '../../components/notify/notify.jsx'
import Schema from 'validate'
import Swal from 'sweetalert'
const shopReg=new Schema({
    ID:{
        type:Number
    },
    SHOP_ADRESS:{
        type:String,
        required:true 
    },
    SHOP_LOCATION:{
        type:String,
        required:true
    },
    SHOP_EMAIL:{
        type:String,
        required:true
    },
    PHONE_NUMBER:{
        type:Number,
        required:true,

    },
    SHOP_OWNER_NAME:{
        type:String,
        required:true,
        length:{min:4,max:10}    
    },
    SHOP_NAME:{
        type:String,
        required:true,
        length:{min:4,max:10}     
    }
})
export default class SetShopLocRegisterNewShop extends React.Component{
    constructor(props){
        super(props)
        this.state={
            activeTab:'1',
            latitude:null,
            longitude:null,
            locationErr:'',
            SHOP_NAME:'',
            nameErr:'',
            SHOP_OWNER_NAME:'',
            ownerNameErr:'',
            PHONE_NUMBER:null,
            numberErr:'',
            SHOP_ADRESS:'',
            adressErr:'',
            SHOP_EMAIL:'',
            emailErr:'',
            SHOP_LOCATION:'',
            COMA:',',
            ID:parseInt(localStorage.getItem('id'))

            
        }
        this.getLocation=this.getLocation.bind(this)
        this.submit=this.submit.bind(this)
       
    }
  
    toggle(tab){
        if(this.state.activeTab!==tab){
            this.setState({
                activeTab:tab
            })
        }
    }

   
    getLocation(){
        const location = window.navigator && window.navigator.geolocation
        if (location) {
            location.getCurrentPosition((position) => {
                this.setState(prev=>{
                    prev.SHOP_LOCATION=position.coords.latitude+','+position.coords.longitude
                    return prev
                })
            }, (error) => {
                this.setState(prev=>{prev.SHOP_LOCATION='LOCATION_err';return prev} )
            })
        }
    }
    submit(e){
        e.preventDefault()
        let error=shopReg.validate(this.state)
        console.log(error)
        if(error.length>0){
            for(let i=0;i<error.length;i++){
                Swal('error',error[i].message,'error')
            }
        }else if(!Conf.stringValidate(this.state.SHOP_NAME)){
            Swal('error','Enter the valid input for SHOP_NAME','error')
        }else if(!Conf.stringValidate(this.state.SHOP_OWNER_NAME)){
            Swal('error','Enter the valid input for SHOP_OWNER_NAME','error')
        }else if(isNaN(this.state.PHONE_NUMBER)){
            Swal('error','PHONE_NUMBER is required','error')
        }else if(!Conf.phonValidate(this.state.PHONE_NUMBER)){
            Swal("oops",'Phone number with 6-9 and remaing 9 digit with 0-9',"error")
        }else if(this.state.SHOP_LOCATION=='LOCATION_err'){
            Swal("oops",'Set your location then try again',"error")
        }else if(error.length==0){
            Axios.post(Conf.serverUrl+'shopInformation/addShopInfo.php',this.state)
                            .then(({data})=>{
                                console.log(data)
                                if(data===1){
                                    Swal('success','information stored successfully','success')
                                    // this.refs.notification.notify(<div><h6 className='white'>Shop</h6><p>information stored successfull.</p></div>,"success");
                                    this.setState({
                                        SHOP_NAME:'',
                                        SHOP_OWNER_NAME:'',
                                       PHONE_NUMBER:'',
                                        SHOP_EMAIL:'',
                                        SHOP_ADRESS:'',
                                        latitude:'',
                                        longitude:''
                                    })
                                }
                                else if(data=='000'||data=='555'){
                                    Swal('Oops!','You are not in the assigned location ','error')
                                    // this.refs.notification.notify(<div><h6 className='white'>Oops!</h6><p>You are not in the assigned location .</p></div>,"warning");
    
                                }
                                else{
                                    Swal('Oops!','information already exist','error')
                                    // this.refs.notification.notify(<div><h6 className='white'>Shop</h6><p>information already exist.</p></div>,"warning");
                                   
                                }
                            })
                            .catch(err=>{console.log(err)})
        }
      
      
    }
   
    render(){
        return(
            <Container  style={{marginTop:80}}>
                   <Row><Col></Col><Col></Col><Col></Col>
                       <Col lg='10'>
                       <Card style={{width:1000}}>
                            <CardBody>
                            <Form onSubmit={this.submit} autoComplete={'off'}>
                                <Card >
                                <CardBody>
                                <center><h1 className='text-muted'>REGISTER NEW SHOP</h1></center>
                                <hr/>
                                <Row>
                                   
                                    <Col lg='6'>
                                    <FormGroup>
                                <Label for="shopname">Shop Name</Label>
                                 <Input 
                                     type="text"
                                     name="shopname" 
                                     id="shopname"
                                    value={this.state.SHOP_NAME}
                                    onChange={({target})=>{
                                        this.setState(prev=>{
                                            prev.SHOP_NAME=target.value.trimStart().toUpperCase();return prev
                                            })}}
                                     placeholder="shop name" 
                                     />
                  {/* <p className="text-danger">{this.state.nameErr}</p> */}
                                 </FormGroup>
                                    </Col>
                                
                                    <Col lg='6'>
                                    <FormGroup>
                                <Label for="shopownernme">Shop owner name</Label>
                                 <Input 
                                     type="text"
                                     name="shopownernme" 
                                     id="shopownernme"
                                    value={this.state.SHOP_OWNER_NAME}
                                     onChange={({target})=>{this.setState(prev=>{prev.SHOP_OWNER_NAME=target.value.trimStart().toUpperCase();return prev})}}
                                     placeholder="shop owner name" 
                                     />
                    {/* // <p className="text-danger">{this.state.ownerNameErr}</p> */}
                                 </FormGroup>
                                    </Col>
                                </Row>
                                
                               <Row>
                                   <Col lg='6'>
                                   <FormGroup>
                                <Label for="phone">Owner phone number</Label>
                                 <Input 
                                //   pattern="[7-9]{1}[0-9]{9}"
                                //   title="Phone number with 7-9 and remaing 9 digit with 0-9"
                                     type="number"
                                     name="phone" 
                                     id="phone"
                                     onChange={({target})=>{this.setState(prev=>{prev.PHONE_NUMBER=parseInt(target.value.trimStart());return prev})}}
                                   value={this.state.PHONE_NUMBER}
                                     placeholder="Owner phone number" />
                    {/* // <p className="text-danger">{this.state.numberErr}</p> */}
                                 </FormGroup>
                                   </Col>
                                   <Col lg='6'>
                                   <FormGroup>
                                <Label for="email">Shop Email</Label>
                                 <Input 
                                     type="email"
                                     name="email" 
                                     id="email"
                                     onChange={({target})=>{this.setState(prev=>{prev.SHOP_EMAIL=target.value;return prev})}}
                                   value={this.state.SHOP_EMAIL}
                                     placeholder="Shop email" />
                    {/* <p className="text-danger">{this.state.emailErr}</p> */}
                                 </FormGroup>
                                   </Col>
                               </Row>
                               
                               
                               <FormGroup>
                                <Label for="location">Shop location</Label>
                                 <Input 
                                     type="text"
                                     name="location" 
                                     id="location"
                                     disabled
                                    value={this.state.SHOP_LOCATION}
                                   
                                     placeholder="Shop location" />
                    {/* <p className="text-danger">{this.state.errPurpose}</p> */}
                                 </FormGroup>
                                 <p className="text-danger">{this.state.locationErr}</p>
                                 <Button className='btn-block btn-primary' onClick={this.getLocation}>Get current Location</Button>
                                 <FormGroup>
                                <Label for="adress">Shop adress</Label>
                                 <Input 
                                     type="text"
                                     name="adress" 
                                     id="adress"
                                    value={this.state.SHOP_ADRESS}
                                     onChange={({target})=>{this.setState(prev=>{prev.SHOP_ADRESS=target.value.trimStart();return prev})}}
                                     placeholder="Shop adress" />
                    {/* // <p className="text-danger">{this.state.adressErr}</p> */}
                                 </FormGroup>
                                 <center><Button className="">submit</Button></center>
                                 </CardBody>
                        </Card>
                                </Form>
                                <Notify ref='notification'/>
                            </CardBody>
                        </Card>
                            
                       </Col>
                   </Row>
            </Container>
           
        )
    }
} 