import React from 'react'
import {FormGroup,Col,Row,Label,Input,Button,Form,Container,Alert,Card,CardBody} from 'reactstrap'
import conf from '../../conf.jsx'
import axios from 'axios'
import Swal from 'sweetalert'
const today=new Date().toLocaleDateString("en-gb")
 const arr =today.split("/")
 const getDate=arr[2]+"-"+arr[1]+"-"+arr[0]




export default class EmpLeave extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fromDate:'',
            toDate:'',
            fromDateErr:'',
            toDateErr:'',
           getAllDate:[],
           dataCheck:true,
           equal:''
        }
        this.submit=this.submit.bind(this)
        this.fromDate=this.fromDate.bind(this)
        this.toDate=this.toDate.bind(this)
    }
    fromDate(e){
    
        this.setState({
            fromDate:e.target.value
        })
    }
    toDate(e){
      
        this.setState({
            toDate:e.target.value
        })
    }
    submit(e){
        e.preventDefault();
        if(this.state.fromDate==''||this.state.toDate==''){
        
            if(this.state.fromDate==''){
                Swal('error','FROM_DATE is required','error')
            }else{
                if(this.state.toDate==''){
                    Swal('error','TO_DATE is required','error') 
                }
            }
        }else{
            let fromDate=new Date(this.state.fromDate).getTime()
            let toDate=new Date(this.state.toDate).getTime()
        
            if(fromDate>toDate){
                Swal('error','From date must be smaller then to date','error') 
            }else{
               if(toDate==fromDate){
                Swal('error','both the date should not be equal','error') 
               }
            }
            if((fromDate<toDate) && (fromDate!=toDate)){
            var data={
                    fromDate:this.state.fromDate,
                    toDate:this.state.toDate,
                    check:1
                }
                axios.post(conf.serverUrl+'getLeaveDate/getDate.php',data)
                .then(({data})=>{
                    console.log(data)
                    if(data===0){
                        Swal('Oops','No employee are there on leave','error')
                        this.setState({
                            dataCheck:false
                        })
                    }else{
                        Swal('success','click on ok to view the leave','success')
                        this.setState({
                            getAllDate:data.checkDate,
                            dataCheck:true
                        })
                    }
                  
                   }
               
                )
                .catch(err=>{
                    console.log(err)
                })
            }
            else{
                console.log('false')
            }
        
        }
      
    }
       
       
       
      
   
    render(){
        let date=new Date().toLocaleDateString('en-gb')
        let [day,month,year]=date.split('/')
        year=parseInt(year)-1
     
        
    
        return(
            <Container>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col lg='10'>
                    <Container style={{marginTop:80}}>
         
         <Card>
             <CardBody>
             <Form onSubmit={this.submit}>
             <center><h1 className='text-muted'>EMPLOYEE LEAVE</h1></center>
             <hr/>
             <Row>
                 <Col></Col>
                 <Col lg='10'>
                 <FormGroup>
                <Label for="from_date">From Date</Label>
                <input 
                type="date" 
                name="date" 
                id="from_date"
                onChange={this.fromDate}
                min={year+'-'+month+'-'+day}
                max={getDate}
                placeholder="From date"
                className="form-control"
              
                />
               </FormGroup>
                 </Col>
                 <Col></Col>
                 <Col></Col>
             </Row>
        <Row>
            <Col></Col>
            <Col lg='10'>
            <FormGroup>
                <Label for="To_date">To Date</Label>
                <input
                type="date" 
                name="Todate" 
                id="To_date"
                placeholder="To date"
                onChange={this.toDate}
                min={year+'-'+month+'-'+day}
                max={getDate}
                className="form-control"
               
                />
                {/* <p className="text-danger">{this.state.toDateErr}</p> */}
               
            </FormGroup>

            </Col>
            <Col></Col>
            <Col></Col>
        </Row>
        <hr/>
      <center><Button >check</Button></center>
      </Form>
       </CardBody>
       
         
         </Card>
        
     </Container>
     <Container>
         {this.state.dataCheck?
              this.state.getAllDate.map(((x,key)=>
              <Alert color="white">
                  <h5 color="dark">{key+1+". "+x.name}</h5>
                  <hr/>
                  <p color="dark">Employee-id:<p color="dark" className="float-right">{x.empId}</p></p>
                  <p color="dark">Leave Date:<p color="dark" className="float-right">{x.lDate}</p></p>
              </Alert>
              ))
          :
          <Container>
              <br/> <br/> <br/> <br/>
             <center><h2 className='text-muted'>NO EMPLOYEES ARE ON LEAVE</h2></center>
          </Container>}
   
     </Container>
                    </Col>
                </Row>
                <br/> <br/> <br/> <br/>  <br/> <br/> <br/> <br/>  <br/> <br/> <br/> <br/>
           </Container>
        )
    }
} 