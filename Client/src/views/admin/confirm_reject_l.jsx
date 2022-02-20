import React from 'react'
import axios from 'axios'
import Conf from '../../conf.jsx'
import {Row,Col,TabContent, TabPane, Nav, NavItem, NavLink,Alert,Button,Card,CardBody,Container,CardTitle,CardSubtitle,CardText} from 'reactstrap'
import conf from '../../conf.jsx';
import classnames from 'classnames'
import Swal from 'sweetalert'

const color_white ={
    style: { "color": "#fff"}
};

export default class ConfirmReajectLeave extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            confirm:false,
            empid:'',
            key:'',
            check:1,
            activeTab:'1',
            confirmed:[],
            confirmedCheck:true,
            rejected:[],
            rejectedCheck:true,
            confirmCheck:false,
            rejectCheck:false,
            ConfirmData:'',
            RejectData:'',
            toggle1:false,
            confirmedToggle:false,
            rejectedToggle:false
          

        }
    }
  
    toggle(tab){
        if(this.state.activeTab!==tab){
            this.setState({
                activeTab:tab
            })
        }
    }
 
  
    componentDidMount(){
        axios.get(Conf.serverUrl+'leave/getAll.php')
        .then( ({data}) =>{
                        console.log(data)
            // res.data.data = res.data.data.map( x => { 
            //     return {...x,display: true}
            // });
            if(data===0){
                this.setState({
                    check:0
                })
            }else{
                this.setState({
                    data:data.data
                })
            }
            
        })
        .catch(err=>{
            console.log(err)
        })
        axios.get(conf.serverUrl+'leave/confirmed.php')
        .then(({data})=>{
            console.log(data)
            if(data===0){
                this.setState((prev)=>{
                    prev.confirmedCheck=false
                    return prev
                })
            }
            else{
                data.confirm = data.confirm.map(x => {
                    x.currentDate = new Date(x.currentDate).toLocaleDateString();

                    return x;
                });
                this.setState((prev)=>{
                    prev.confirmed=data.confirm
                    return prev
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
        axios.get(conf.serverUrl+'leave/rejected.php')
        .then(({data})=>{
            console.log(data)
            if(data===0){       
                this.setState((prev)=>{
                    prev.rejectedCheck=false
                    return prev
                })
            }
            else{
                this.setState((prev)=>{
                    prev.rejected=data.reject
                    return prev
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    componentDidUpdate(){
        if(this.state.toggle1){
                    axios.get(Conf.serverUrl+'leave/getAll.php')
                    .then( ({data}) =>{
                                console.log(data)
                
                    if(data===0){
                        this.setState((prev)=>{
                            prev.check=0
                            prev.toggle1=!prev.toggle1
                            return prev
                        })
                        
                    }else{
                        this.setState((prev)=>{
                            prev.data=data.data
                            prev.toggle1=!prev.toggle1
                            return prev
                        })
                    
                    }
                })
                axios.get(conf.serverUrl+'leave/confirmed.php')
                .then(({data})=>{
                    console.log(data)
                    if(data===0){
                        this.setState((prev)=>{
                            prev.confirmedCheck=false
                            // prev.toggle1=!prev.toggle1
                            return prev
                        })
                    }
                    else{
                        data.confirm = data.confirm.map(x => {
                            x.currentDate = new Date(x.currentDate).toLocaleDateString();

                            return x;
                        });
                        this.setState((prev)=>{
                            prev.confirmed=data.confirm
                            // prev.toggle1=!prev.toggle1
                            return prev
                        })
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
                axios.get(conf.serverUrl+'leave/rejected.php')
                .then(({data})=>{
                    console.log(data)
                    if(data===0){       
                        this.setState((prev)=>{
                            prev.rejectedCheck=false
                            // prev.toggle1=!prev.toggle1
                            return prev
                        })
                    }
                    else{
                        this.setState((prev)=>{
                            prev.rejected=data.reject
                            // prev.toggle1=!prev.toggle1
                            return prev
                        })
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
     
    }
      
    }
    render(){
      
        return(
         <Container style={{marginTop:80}} >
         <Row>
             <Col></Col>
             <Col></Col>
             <Col></Col>
             <Col lg='10'>
             <Nav tabs>
           
                 <NavItem>
                    <NavLink
                    // style={{backgroundColor:'white'}}
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                    className='bg-white'
                    >
                    LEAVE REQUESTS
                    </NavLink>
                </NavItem>
              
                 <NavItem>
                 <NavLink
            //  style={{backgroundColor:'white'}}
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
              className='bg-white'
              >
             CONFIRM REQUEST
            </NavLink>
             </NavItem>
               
              
                 <NavItem >
            <NavLink
            // className='float-right'
            //  style={{backgroundColor:'white'}}
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
              className='bg-white'
              >
             Rejected Requests
            </NavLink>
          </NavItem>
               
     
           
      
         </Nav>
         <TabContent activeTab={this.state.activeTab}>
         <TabPane tabId="1">
          {(this.state.check===1)? this.state.data.map((data,key)=>
             
             <Card>   
                 
              <CardBody>
                  <hr></hr>
             <CardSubtitle><br></br><h3>{key+1+"."+' '+data.name}</h3></CardSubtitle>
             <hr></hr>
             <p >E_id:<p className='float-right'>{data.e_id}</p></p>
             <hr></hr>
           
                <h4>Purpose:</h4> 
                <p>{data.purpose}</p>   
                <hr></hr>
                <p >Message sent time:<p className='float-right'>{data.currentTime}</p></p>
                <p  >Message sent date:<p className='float-right'>{data.currentDate}</p></p>
                <p  >Request Leave Date:<p className='float-right'>{data.L_date}</p></p>
                    
                    <hr></hr>
                     <Button color='success ' onClick={()=>{
                         let valConfirm={
                             ID:data.id,
                             emp_id:data.e_id,
                             value:1
                         }
                       
                         axios.post(conf.serverUrl+'leave/confirm_reject.php',valConfirm)
                         .then(res=>{
                          console.log(res.data)
                          Swal('success','leave request confirmed','success')
                          this.setState((prev)=>{
                            prev.toggle1=!prev.toggle1
                            return prev
                        })
                      
                         }
                        )
                         .catch(err=>console.log(err))
                     
                     }} >confirm</Button>
                    <Button color='danger' className='float-right ' onClick={()=>{
                    
                     let valReject={
                         ID:data.id,
                         emp_id:data.e_id,
                         value:0
                     }
                     axios.post(conf.serverUrl+'leave/confirm_reject.php',valReject)
                     .then(res=>{
                         console.log(res.data)
                         Swal('success','leave request rejected','success')
                         this.setState((prev)=>{
                             prev.toggle1=!prev.toggle1
                             return prev
                         })
                     })
                     .catch(err=>console.log(err))
               
                   
                    }}>reject</Button>
          </CardBody>
             </Card> 
           
             ):
             <Container>
             <br/><br/><br/><br/><br/>
     <center><h1 className='text-muted'>OOPS!YOU HAVE NO REQUESTS</h1></center>
     </Container>
           }
          </TabPane>
          <TabPane tabId="2">
            {(this.state.confirmedCheck)?
                this.state.confirmed.map((data,key)=>
                        <div className="color-white p-color-white">
                            <Alert color='success'>
                               {key+1+'. '+data.emp_name}
                               <hr/>
                               <p style={{color:'#fff'}} >Emp_id:<p  style={{color:'#fff'}}  className='float-right'>{data.E_id}</p></p> 
                               <p style={{color:'#fff'}}>Purpose:</p> 
                               <p style={{color:'#fff'}}>{data.purpose}</p>
                               <hr style={{color:'#fff'}}></hr>
                               <p  style={{color:'#fff'}}>Message sent time:<p style={{color:'#fff'}} className='float-right'>{data.currentTime}</p></p>
                                <p  style={{color:'#fff'}}>Message sent date:<p style={{color:'#fff'}} className='float-right'>{data.currentDate}</p></p>
                            <p style={{color:'#fff'}}>Request Leave Date:<p style={{color:'#fff'}} className='float-right'>{data.L_date}</p></p>
                            </Alert>
                        </div>
                            
                  
                )
            :
            <Container>
                    <br/><br/><br/><br/><br/>
            <center><h1 className="text-muted">OPPS!YOU HAVE NO CONFIRMED REQUESTS</h1></center>
            </Container>
            }
          </TabPane>
          <TabPane tabId="3">{
              (this.state.rejectedCheck)?
              this.state.rejected.map((data,key)=>
              <Alert color='warning'>
                 {key+1+'. '+data.emp_name}
                 <p style={{color:'#fff'}}>Emp_id:<p className='float-right' style={{color:'#fff'}}>{data.E_id}</p></p> 
                 <hr style={{color:'#fff'}}></hr>
                 <p style={{color:'#fff'}}>Purpose:</p> 
                 <p style={{color:'#fff'}}>{data.purpose}</p>
                 <hr style={{color:'#fff'}}></hr>
                 <p style={{color:'#fff'}}>Message sent time:<p style={{color:'#fff'}} className='float-right'>{data.currentTime}</p></p>
                             <p style={{color:'#fff'}}>Message sent date:<p style={{color:'#fff'}} className='float-right'>{data.currentDate}</p></p>
                         <p style={{color:'#fff'}}>Request Leave Date:<p style={{color:'#fff'}} className='float-right'>{data.L_date}</p></p>
              </Alert>
    
  )
              :
              <Container>
              <br/><br/><br/><br/><br/>
              <center><h1 className="text-muted">OOPS!YOU HAVE NO REJECTED REQUEST</h1></center>
              </Container>
          }</TabPane>
         </TabContent>
      
             </Col>
         </Row>
           
         </Container>
        )
    }

} 