import React from 'react'
import { Col,Row,Container,Collapse,Button,Card,CardBody,CardTitle,CardHeader} from 'reactstrap'
import conf from './../../conf.jsx'
import axios from 'axios'
import Swal from 'sweetalert2'
import MoreInfo from './moreInfo'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
export default class EmpInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            getAllUser:[],
            collapse:false,
            data:true,
            check:false,
            toggle:false,
            hidden:false
        }
        this.toggle=this.toggle.bind(this)
    }
 
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    componentWillMount(){
        console.log(this.state.data)
        axios.get(conf.serverUrl+'getalluser/getAllUser.php')
        .then(({data})=>{
            console.log(data);
            if(data===0){
                this.setState({
                    data:false
                })
            }else{
                if(data.user[0].success===1){
                    var user=data.user
                    this.setState({
                        getAllUser:user
                    })
                }
              
               
            }
          
        })
        .catch((err)=>{console.log(err)})
    }
    componentDidUpdate(){
        if(this.state.toggle){
            
        axios.get(conf.serverUrl+'getalluser/getAllUser.php')
        .then(({data})=>{
            console.log(data);
            if(data===0){
                this.setState(prev=>{
                    prev.data=false
                    prev.toggle=!prev.toggle
                    return prev
                })
            }else{
                if(data.user[0].success===1){
                    var user=data.user
                    this.setState(prev=>{
                        prev.getAllUser=user
                        prev.toggle=!prev.toggle
                        return prev
                    })
                }
              
               
            }
          
        })
        .catch((err)=>{console.log(err)})
        }
    }
    render(){
         
        for(let i=0;i<this.state.getAllUser.length;i++){
            this.state.getAllUser[i].text='';
            
            for(let j=0;j<this.state.getAllUser[i].pass.length;j++){
              
                this.state.getAllUser[i].text=this.state.getAllUser[i].text+'*'
                
            }
           }
        return(
<Container style={{marginTop:80}} >
{(this.state.data===true)?
    this.state.getAllUser.map((user,key)=>
    
        <Row>
            <Col >
            </Col>
            <Col>
      
            </Col>
            <Col >
          
            </Col>
            <Col lg={10} xs={10}>  <Card>
                <CardBody >
                <p key={user.id}>
    {key+1+'. '+user.emp_name.toUpperCase()}
    <Button
     className='info float-right btn-sm'
    onClick={()=>{
        this.setState((prev,props)=>{
            prev.getAllUser[key].isOpen=prev.getAllUser[key].isOpen==undefined?true: !prev.getAllUser[key].isOpen;
            console.log(prev);
            return prev;
        });
    }}
     style={{ marginBottom: '1rem' }}
    >
    {this.state.getAllUser[key].isOpen==undefined ? "More info": (this.state.getAllUser[key].isOpen? "Close":"More info" )}
     
     </Button>
     </p>

    <Container >
 
    <Collapse isOpen={this.state.getAllUser[key].isOpen==undefined? false:this.state.getAllUser[key].isOpen }>
      <Card >
          <hr/>
        <CardHeader >MORE INFORMATION</CardHeader>
        <hr/>
       <CardBody>
       <p >EMP-ID:<p className='float-right'>{user.emp_id}</p></p> 
        <p >NAME:<p className='float-right'>{user.emp_name.toUpperCase()}</p></p> 
        <p >EMAIL:<p className='float-right'>{user.emp_email.toLowerCase()}</p></p>
        <p >SEX:<p className='float-right'>{user.emp_sex.toUpperCase()}</p></p>
        <p >DOR:<p className='float-right'>{user.emp_doj}</p></p>
        <p >DOB:<p className='float-right'>{user.emp_dob}</p></p>
        <p >ADRESS:<p className='float-right'>{user.emp_adress}</p></p>
        <p >PHONE NUMBER:<p className='float-right'>{user.emp_phone}</p></p>
        <p >PASSWORD:<i onClick={()=>{this.setState(prev=>{prev.hidden=!prev.hidden;return prev;})}}className={this.state.hidden?"far fa-eye fa-lg":"far fa-eye-slash fa-lg"}></i><p className='float-right'>{this.state.hidden?user.pass:user.text}</p></p> 
        <hr/>
        <Button className='btn-sm float-right' onClick={()=>{
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                   
                        if (result.value) {
                        let field={
                            empid:user.emp_id,
                            check:1
                        }
                        axios.post(conf.serverUrl+'Signup/deleteUser.php',JSON.stringify(field))
                        .then(({data})=>{
                            console.log(data)
                            if(data===1){
                              this.setState(prev=>{
                                prev.toggle=!prev.toggle  
                                return prev
                              })
                            }
                            Swal.fire(
                                'Deleted!',
                                'Employee has been deleted.',
                                'success'
                            )
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    
                    }
                })
        
        }}><i class="fas fa-trash"> </i>{'  '} Delete user{' '}</Button>
    </CardBody>
  </Card>
</Collapse>
</Container>
</CardBody>
</Card></Col>
        </Row>
   
)
:
<Container>
<br/><br/><br/><br/><br/><br/>
<center><h1 className='text-muted'>REGISTER NEW USER THEN TRY AGAIN</h1></center>
</Container>
}
 <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
</Container>

            )
    }
} 