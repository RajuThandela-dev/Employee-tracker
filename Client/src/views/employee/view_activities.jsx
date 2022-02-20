import React from 'react'
import conf from '../../conf.jsx'
import {Table,Container,Card,CardBody,Button,Input,Label,Form,FormGroup,Collapse,Row,Col} from 'reactstrap'
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
            equal:''
            
        } 
        this.submit=this.submit.bind(this)
        this.fromDate=this.fromDate.bind(this)
        this.toDate=this.toDate.bind(this)

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
        if(this.state.fromDate==''||this.state.toDate==''){
         
            if(this.state.fromDate===''){
                Swal('error','FROM_DATE is required','error')
            }else{
                if(this.state.toDate===''){
                    Swal('error','TO_DATE is required','error')
                }
            } 
        }else{
            var FromDate=new Date(this.state.fromDate).getTime()
            var toDate=new Date(this.state.toDate).getTime()
          
        
            if(FromDate>toDate){
                Swal('error','FROM_DATE must be lesser then TO_DATE','error')
            }else {
                if(FromDate==toDate){
                    Swal('error','Both the date should no be equal','error')
                }
            }
            if(FromDate<toDate&&FromDate!=toDate){
                var obj={
                    empId:localStorage.getItem('id'),
                    fromDate:this.state.fromDate,
                    toDate:this.state.toDate
    
                } 
                Axios.post(conf.serverUrl+'route/checkActivity.php',obj)
                .then(({data})=>{
                    console.log(data)
                    if(data==0){
                        Swal('error','No data are found ','error')
                        this.setState((prev)=>{
                            prev.dataCheck=false
                            return prev
                        })
                    }else{
                        Swal('success','click on ok to view data','success')
                        data=data.map(x=>{
                            x.currentDate=new Date(x.currentDate).toLocaleDateString('en-gb')
                            x.currentDate=x.currentDate.split('/')
                            x.currentDate=x.currentDate[0]+'-'+x.currentDate[1]+'-'+x.currentDate[2]
                          return x;
                        })
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
        let date=new Date().toLocaleDateString('en-gb');
        date=date.split('/')
        this.setState((prev)=>{
            prev.date= date[2]+'-'+date[1]+'-'+date[0]
            return prev
        })
        

    }
    render(){
        // let sum=0;
        // this.state.data.map(x=>x.json.order.map(y=>sum+=y.total))
        for(let i=0;i<this.state.data.length;i++){
            this.state.data[i].sum=0;
           for(let j=0;j<this.state.data[i].json.order.length;j++){
               this.state.data[i].sum+=parseInt(this.state.data[i].json.order[j].total)
           }
     }
        return(
          <Container style={{marginTop:80}}>
          <Row>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col lg='10'>
              <Card>
                 <CardBody>
                 <Form onSubmit={this.submit}>
                     <center><h2 className='text-muted'>VIEW ACTIVITY</h2></center>

                     <hr/>
                     <Row>
                         <Col></Col>
                         <Col sm='10'>
                         <FormGroup>
                             <Label>select from date</Label>
                             <input 
                             type="date"
                             className='form-control'
                             max={this.state.date}
                             onChange={this.fromDate}
                             ></input>
                            <p className='text-danger'>{this.state.fromDateErr}</p>
                         </FormGroup>
                         </Col>
                         <Col></Col>
                         <Col></Col>
                     </Row>
                        
                         <Row>
                         <Col></Col>
                         <Col sm='10'>
                         <FormGroup>
                             <Label>To date</Label>
                             <input
                              type="date"
                              className='form-control'
                              onChange={this.toDate}
                              max={this.state.date}
                              ></input>
                              <p className='text-danger'>{this.state.toDateErr}</p>
                         </FormGroup>
                         <p className='text-danger'>{this.state.equal}</p>
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
                 <center><h2 className='text-muted'>No orders are taken</h2></center>
             </div>
             }
              </Col>
          </Row>
           
          </Container>
        )
    }
} 