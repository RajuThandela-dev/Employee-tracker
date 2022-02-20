import React from 'react'
import conf from '../../conf.jsx'
import {Table,Row,Col,Container,Card,CardBody,Button,Input,Label,Form,FormGroup,Collapse} from 'reactstrap'
import Axios from 'axios';
import Swal from 'sweetalert'
export default class ViewActivity extends React.Component{
    constructor(props){
        super(props)
        this.state={
            date:"",
            fromDate:'',
            fromDateErr:'',
            toDate:'',
            toDateErr:'',
            data:[],
            dataCheck:true,
            select:[],
            selectCheck:true,
            empName:'',
            empNameErr:'',
            equal:''
            
        } 
        this.submit=this.submit.bind(this)
        this.fromDate=this.fromDate.bind(this)
        this.toDate=this.toDate.bind(this)
        this.select=this.select.bind(this)

    }
    select(e){
        this.setState({
            empName:e.target.value
        })
       
      
    }
    toDate(e){
        this.setState({
            toDate:e.target.value
           
        })
    }
    fromDate(e){
        this.setState({
          fromDate:e.target.value
          
        })
    }
    submit(e){
        e.preventDefault()
        if(this.state.fromDate==''||this.state.toDate==''||this.state.empName==''){
            this.setState(prev=>{
                prev.fromDate=(prev.fromDate==='')?'':prev.fromDate
                prev.fromDateErr=(prev.fromDate==='')?'From date can\'t be empty':''
                prev.toDate=(prev.toDate=='')?'':prev.toDate
                prev.toDateErr=(prev.toDate==='')?'To date can\'t be empty':''
                prev.empName=(prev.empName=='')?'':prev.empName
                prev.empNameErr=(prev.empName=='')?'Must select employee name':''
                return prev
            })
            if(this.state.empName==''){
                Swal('error','NAME is required','error')
            }
            else if(this.state.fromDate==''){
                Swal('error','FROM_DATE is required','error')
            }else{
                if(this.state.toDate==''){
                    Swal('error','TO_DATE is required','error') 
                }
            }
        }else{
            var FromDate=new Date(this.state.fromDate).getTime()
            var toDate=new Date(this.state.toDate).getTime()
            var empId=this.state.empName.split("(")
            empId=empId[1].split(')')
            empId=empId[0]
           
            if(FromDate>toDate){
                Swal('error','From date must be smaller then to date','error') 
            }else{
               if(toDate==FromDate){
                Swal('error','both the date should not be equal','error') 
               }
            }
            // this.setState((prev)=>{
            //     prev.fromDateErr=FromDate>toDate?'From date must be lesser then to date':''
            //     prev.equal=(toDate==FromDate)?'From and to date should not be equal':''
            //     return prev
            // })
            if(FromDate<toDate&&FromDate!=toDate){
                var obj={
                    empId:empId,
                    fromDate:this.state.fromDate,
                    toDate:this.state.toDate
    
                } 
                Axios.post(conf.serverUrl+'route/checkActivity.php',obj)
                .then(({data})=>{
                    console.log(data)
                    if(data==0){
                        Swal('Oops','No orders have taken by the selected employee','error')
                        this.setState((prev)=>{
                            prev.dataCheck=false
                            return prev
                        })
                    }else{
                        data=data.map(x=>{
                            x.currentDate=new Date(x.currentDate).toLocaleDateString('en-gb')
                            x.currentDate=x.currentDate.split('/')
                            x.currentDate=x.currentDate[0]+'-'+x.currentDate[1]+'-'+x.currentDate[2]
                          return x;
                        })
                        Swal('success','There are some orders','success')
                        this.setState((prev)=>{
                            prev.data=data
                            prev.dataCheck=true
                            return prev
                        })
                      
                    }
                })
                .catch(err=>{console.log(err)})    
            }
          
              
       }
           
           
      
    }
    componentDidMount(){
      
        Axios.get(conf.serverUrl+'getalluser/getAllUser.php')
        .then(({data})=>{
            console.log(data)
            if(data==0){
                    this.setState((prev)=>{
                        prev.selectCheck=false
                        return prev
                    })
            }else{
                    this.setState((prev)=>{
                        prev.select=data.user
                        prev.selectCheck=true
                        return prev
                    })
            }
        })
        .catch(err=>{
            console.log(err)
        })
        let date=new Date().toLocaleDateString('en-gb');
        date=date.split('/')
        this.setState((prev)=>{
            prev.date= date[2]+'-'+date[1]+'-'+date[0]
            return prev
        })
        

    }
    render(){
        for(let i=0;i<this.state.data.length;i++){
            this.state.data[i].sum=0;
           for(let j=0;j<this.state.data[i].json.order.length;j++){
               this.state.data[i].sum+=parseInt(this.state.data[i].json.order[j].total)
           }
     }
        // let sum=0;
        // this.state.data.map(x=>x.json.order.map(y=>sum+=y.total))
        let date=new Date().toLocaleDateString('en-gb')
        let [day,month,year]=date.split('/')
        year=parseInt(year)-1
        return(
            <Container style={{marginTop:80}}>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col lg="10">
                    <Card>
                 <CardBody>
                     <Form onSubmit={this.submit}>
                     <center><h2 className='text-muted'>VIEW ACTIVITY</h2></center>
                     <hr/>
                     <Row>
                         <Col></Col>
                         <Col lg="10">
                         <FormGroup>
                        <Label>Select employee</Label>
                        <select className='form-control' onChange={this.select} >
                            <option value=''>select employee</option>
                            {this.state.select.map((x,key)=>
                                 <option value={key+1+'.'+x.emp_name+"("+x.emp_id+")"}>{key+1+'.'+x.emp_name+"("+x.emp_id+")"}</option>
                                )}
                        </select>
                        {/* {this.state.empName==''?<p className='text-danger'>{this.state.empNameErr}</p>:<p style={{display:'none'}}></p>} */}
                        </FormGroup>
                         </Col>
                         <Col></Col>
                         <Col></Col>
                     </Row>
                   
                        <Row>
                         <Col></Col>
                         <Col lg="10">
                         <FormGroup>
                             <Label>select from date</Label>
                             <input 
                             type="date"
                             className='form-control'
                             max={this.state.date}
                             min={year+'-'+month+'-'+day}
                             onChange={this.fromDate}
                            
                             ></input>
                            {/* <p className='text-danger'>{this.state.fromDateErr}</p> */}
                         </FormGroup>
                         </Col>
                         <Col></Col>
                         <Col></Col>
                     </Row>
                        
                         <Row>
                         <Col></Col>
                         <Col lg="10">
                         <FormGroup>
                             <Label>To date</Label>
                             <input
                              type="date"
                              className='form-control'
                              onChange={this.toDate}
                              max={this.state.date}
                              min={year+'-'+month+'-'+day}
                             
                              ></input>
                              {/* <p className='text-danger'>{this.state.toDateErr}</p> */}
                         </FormGroup>
                         {/* <p className="text-danger">{this.state.equal}</p> */}
                         </Col>
                         <Col></Col>
                         <Col></Col>
                     </Row>
                         
                         <hr/>
                         <center><Button>view</Button></center>
                     </Form>
                 </CardBody>
             </Card>
             <br/>
             {this.state.dataCheck?
                this.state.data.map((x,key)=>
                <Card>
                <CardBody>
                    <p>{key+1+". "+"Your activity on Date "+x.currentDate+" and time "+x.currentTime}</p>
                    <p>Click to view orders:<Button className='float-right btn-sm' onClick={()=>{
                        this.setState((prev)=>{
                            prev.data[key].open=prev.data[key].open==undefined?true:!prev.data[key].open
                            return prev
                        })
                    }}>{this.state.data[key].open===undefined?'view':(this.state.data[key].open?'close':'view')}</Button></p>
                    <Collapse isOpen={this.state.data[key].open?true:false}>
                    <hr/>
                   <Table responsive bordered>
                                     <thead>
                                       <tr>
                                           <th>#</th>
                                           <th>Shop Name</th>
                                           <th>Catagory</th>
                                           <th>Item name</th>
                                           <th>Rate</th>
                                           <th>Quantity</th>
                                           <th>Total</th>
                                           <th></th>
                                       </tr>
                                       </thead>
                                       <tbody>
                                       
                                           {x.json.order.map((y,k)=>
                                           
                                           <tr>
                                            <th >{k+1}</th>
                                            <td>{y.shopName}</td>
                                            <td>{y.catagory}</td>
                                            <td>{y.itemName}</td>
                                            <td>{y.rate}</td>
                                            <td>{y.qty}</td>
                                            <td>{y.total}</td>
                                            {/* <td><Button className="btn-sm" onClick={()=>{
                                                this.pop(key);
                                            }}>delete</Button></td>  */}
                                           
   
                                           </tr>
                                          
                                           )}
                                           <tr>
                                               <td></td> 
                                               <td colSpan='5'>Grand total</td>
                                                <td>{x.sum}</td>
                                           </tr>
                                   
                                      
                                       </tbody>
                                       </Table>
                  </Collapse>
                  
                </CardBody>
                 </Card>
                )
             :
             <div>
                 <br/>  <br/>
                 <center><h2 className='text-muted'>NO ORDER ARE TAKEN BY THE PARTICULAR EMPLOYEE</h2></center>
             </div>
             }
            
                    </Col>

                </Row>
            </Container>
        )
    }
} 