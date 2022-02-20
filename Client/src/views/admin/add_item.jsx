import React from 'react'
import axios from 'axios'
import confi from './../../conf.jsx'
import {Row,Col,Button,Card,Container,CardBody ,Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import conf from './../../conf.jsx';
import Notify from '../../components/notify/notify.jsx'
import Catagory from './add_catagory'
import Schema from 'validate'
import Swal from 'sweetalert'
const addItem=new Schema({
   
    ITEM_QUANTITY:{
        type:Number,
        required:true
    },
    ITEM_RATE:{
        type:Number,
        required:true
    },
    ITEM_CATAGORY:{
        type:String,
        required:true
    },
    ITEM_NAME:{
        type:String,
        required:true,
        length:{min:4,max:10}
    }
})
export default class AddItem extends React.Component{
    constructor(props){
        super(props)
        this.state={
            ITEM_NAME:'',
            ITEM_CATAGORY:'',
            TOTAL:null,
           
            ITEM_RATE:null,
            ITEM_QUANTITY:null,
            total:'',
            errorName:'',
            errorCatagory:'',
           check:false,
           tog:true,
            errorRate:'',
            errorQty:'',
            toggle:true,
            catagory:[]
        }
        this.submit11=this.submit11.bind(this)
        // this.itemName=this.itemName.bind(this)
        this.itemCatagory=this.itemCatagory.bind(this)
    }  
      
  
    itemCatagory(e){
        this.setState({
            ITEM_CATAGORY:e.target.value
            
        })
    }

   
  
 
    componentDidUpdate(){
        if(this.state.tog){
            axios.get(conf.serverUrl+'additem/sendCataItem.php')
            .then(({data})=>{
                console.log(data)
                if(data==0){
                    console.log('bug')
                    this.setState(prev=>{
                     
                        prev.tog=!prev.tog
                        prev.check=false
                        return prev
                    })
                   
                }else{
                    console.log("hey")
                    this.setState(prev=>{
                        prev.catagory=data.catagory
                        prev.tog=!prev.tog
                        prev.check=true
                        return prev
                    })
                }
               
            })
            .catch(err=>{
                console.log(err)
            })
  
        }
    }
   componentDidMount(){
        axios.get(conf.serverUrl+'additem/sendCataItem.php')
                .then(({data})=>{
                    console.log(data)
                    if(data==0){
                        console.log('bug')
                        this.setState(prev=>{
                            prev.check=false
                            return prev
                        })
                       
                    }else{
                        console.log("hey")
                        this.setState(prev=>{
                            prev.catagory=data.catagory
                            prev.check=true
                            return prev
                        })
                    }
                   
                })
                .catch(err=>{
                    console.log(err)
                })
      
    }
    submit11(e){
      e.preventDefault()
        let error=addItem.validate(this.state)
        console.log(error)
        if(error.length>0){
            for(let i=0;i<error.length;i++){
                Swal('error',error[i].message,'error')
            }
           
        }else if(!conf.stringValidate(this.state.ITEM_NAME)){
            Swal('error','Enter the valid input for ITEM_NAME','error')
        }
        else if(isNaN(this.state.ITEM_RATE)||isNaN(this.state.ITEM_QUANTITY)){
            Swal('error','Input is required','error')
        }else if(!conf.length(this.state.ITEM_RATE)){
            Swal('error','Enter min 2 and max 5  value can be entered in ITEM_QUANTITY field','error')
        }else if(!conf.lengthQuantity(this.state.ITEM_QUANTITY)){
            Swal('error','Enter min 1 and max 3 value can be entered in ITEM_RATE field','error')
        }else if(error.length==0){
            axios.post(conf.serverUrl+'additem/additem.php', this.state)
                                .then(({data})=>{
                                    console.log(data)
                                    if(data===1){
                                        Swal('success','Item inserted to the stock','success')
                                        this.refs.qty.value=""
                                        this.refs.rate.value=''
                                    //    this.refs.notification.notify(<div><h6 className='white'>Successfully</h6><p> inserted one row.</p></div>,"success");
                                       this.setState(prev=>{
                                           prev.toggle=true
                                       prev.ITEM_NAME=''
                                        prev.ITEM_QUANTITY=NaN
                                        
                                       prev.ITEM_RATE=NaN
                                        prev.ITEM_CATAGORY=''
                                        prev.tog=true
                                       return prev
                                        
                                       })
                                     }
                                     else{
                                        Swal('unsuccessfull','This item is already exist','error')
                                        //  this.refs.notification.notify(<div><h6 className='white'>Unsuccessfully</h6><p>item already exists.</p></div>,"warning");
                                        
                                        }
                
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
        }
      
    }
   
    render(){

 
       
        return(
        <Container>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col lg='10'>
                { (this.state.toggle)?
                        <Container style={{marginTop:80}}>
                     <Card>
                     <CardBody>
                     <center><h2 className='text-muted' >ADD NEW ITEM</h2></center>
                     <hr/>
                    <Form onSubmit={this.submit11} autoComplete='off'>
                    <Row>
                        <Col lg='6'> 
                        <FormGroup>
                    <Label for="ItemName">Item Name</Label>
                    <Input 
                     type="text"
                     name="itemname" 
                     id="ItemName"
                     value={this.state.ITEM_NAME}
                     onChange={({target})=>{this.setState(prev=>{prev.ITEM_NAME=target.value.trimStart().toUpperCase();prev.toggle=true;return prev})}} 
                     placeholder="Item Name"
                      />
 {/* {(!isNaN(this.state.itemName))?<p className="text-danger">{this.state.errorName}</p>:((this.state.itemName.length<4)?<p className="text-danger">{this.state.errorName}</p>:<p style={{display:"none"}}/>)} */}
                    </FormGroup> 
                     </Col>
                        <Col lg='6'>
                        <FormGroup>
                    <Label for="catagory">Select catagory</Label>
                    <Input type="select"   onChange={this.itemCatagory}  id="catagory">
                     <option value=''>Choose catagory</option>
        {(this.state.check)?this.state.catagory.map(cat=><option >{cat.cat_name}</option>):<option value=''>no data</option>}
                   
                      </Input>
                    
                    </FormGroup> 
                    <p className='info' onClick={()=>this.setState({
                        toggle:!this.state.toggle
                    })}>Click here to add new catagory of item</p>
                        </Col>
                       
                    </Row>
                   
                
                    <Row>
                        <Col lg='6'>
                        <FormGroup>
                    <Label for="rate">Rate</Label>
                    <Input 
                    type="number" 
                    name="rate"
                    id="rate"
                    ref='rate'
                    value={this.state.ITEM_RATE}
                    onChange={({target})=>{this.setState(prev=>{prev.ITEM_RATE=parseInt(target.value.trimStart())})}}  
                    placeholder="Rate"
                    />
                    {/* <p className="text-danger">{this.state.errorRate}</p> */}
                    </FormGroup> 
                        </Col>
                        <Col lg='6'>
                        <FormGroup>
                    <Label for="quantity">Quantity</Label>
                    <Input 
                    ref='qty'
                    type="number" 
                    name="quantity"
                    id="quantity"
                    value={this.state.ITEM_QUANTITY}
                    onChange={({target})=>{this.setState(prev=>{prev.ITEM_QUANTITY=parseInt(target.value.trimStart())})}} 
                    placeholder="Quantity" 
                    />
                        {/* <p className="text-danger">{this.state.errorQty}</p> */}
                    </FormGroup> 
                        </Col>
                    </Row>
                  
                  
                    
                    <hr/>
                    <center> <Button className="info btn-round"> Submit </Button></center>
                    </Form> 

                    <Notify ref="notification"/>
                     </CardBody>
                     </Card>
                     </Container>
                    :
                    <Container style={{marginTop:100}}>
                      <Card >
                     <CardBody>
                     <center><h1 className='text-muted'>ADD CATAGORY</h1></center>
                                <Catagory/>
                                <p className='info' onClick={()=>{
                                    this.setState({
                                        toggle:!this.state.toggle,
                                        tog:!this.state.tog
                                    })
                                }}>Click here to go back</p>
                           </CardBody>
                           </Card>
                    </Container>
                    }
              
                   
         
                </Col>
            </Row>
               <br/>  <br/>  <br/>
         </Container>          
        )
    }
} 

