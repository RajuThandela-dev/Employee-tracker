import React, { Component } from 'react'
import {Container,Form,Card,CardBody,Button,FormGroup,Col,Row,Label} from 'reactstrap'
import axios from 'axios'
import conf from '../../conf.jsx'
import Notify from '../../components/notify/notify.jsx'
import Swal from 'sweetalert'
export default class componentName extends Component {
    constructor(props){
        super(props)
        this.state={
            userInfo:[],
            empName:'',
            empErr:'',
            routeInfo:[],
            time:'',
            date:'',
            route:'',
            routeErr:'',
            dateErr:'',
            timeErr:'',
            empNameCheck:false,
            routeCheck:false,
            toggle:false,
            toggle1:false
          
        }
        this.date=this.date.bind(this)
        this.empName=this.empName.bind(this)
        this.submit=this.submit.bind(this)
        this.time=this.time.bind(this)
        this.route=this.route.bind(this)
    }
    route(e){
      e.persist()
     
      this.setState({
        route:e.target.value
      })
    }
    empName(e){
    
        this.setState({
         empName:e.target.value
         
        })
        
    }
    date(e){
      this.setState({
        date:e.target.value
      })
    }

    submit(e){
      e.preventDefault();
      if(this.state.route===''||this.state.date===''||this.state.time===''||this.state.empName===''){
        // this.setState(prev=>{
        //   prev.routeErr=(this.state.route==='')?"Must select route":''
        //   prev.dateErr=(this.state.date==='')?"Must select date":''
        //   prev.timeErr=(this.state.time==='')?"must select time":''
        //   prev.empErr=(this.state.empName==='')?'Must select employee name':''
        //   return prev


        // })
        if(this.state.empName===''){
          Swal('error','EMPLOYEE_NAME is required','error')
        }else if(this.state.route===''){
          Swal('error','ROUTE is required','error')
        }else if(this.state.date===''){
          Swal('error','DATE is required','error')
        }else{
          if(this.state.time===''){
            Swal('error','TIME is required','error')
          }
        }
      }else{

        if(this.state.empName!==''&&this.state.route!==''&&this.state.date!==''&&this.state.time!=''){
          let id=this.state.empName==''?'':this.state.empName.split(':')
          id=(id=='')?'':id[1].split(')')
          id=(id=='')?'':id[0];
          let val=this.state.route==''?'':this.state.route.split(':')
          val=val==''?'':val[1].split(")")
          val=val==''?'':val[0]
          let assignRoute={
            id:id,
            route:val,
            date:this.state.date,
            time:this.state.time
          }
          axios.post(conf.serverUrl+'route/assignRoute.php',assignRoute)
          .then(({data})=>{
            console.log(data)
            if(data==0){
              this.refs.empName.value=''
              this.refs.route.value=''
              this.refs.date.value=''
             this.refs.time.value=''
             this.setState((prev)=>{
               prev.empName=''
               prev.time=''
               prev.date=''
               prev.route=''
               prev.toggle=!prev.toggle 
               prev.toggle1=!prev.toggle1
               return prev;
              })   
              Swal('unsuccessfull','not route get assigned','error')
            //  this.refs.notification.notify(<div><h6 className='white'></h6><p>unsuccessfull</p></div>,"warning");
             
            }else{
             this.setState((prev)=>{
               prev.empName=''
               prev.time=''
               prev.date=''
               prev.route=''
              
               return prev;
              }) 
              this.refs.empName.value=''
              this.refs.route.value=''
              this.refs.date.value=''
             this.refs.time.value=''
             Swal('successfully','assigned route','success') 
            //  this.refs.notification.notify(<div><h6 className='white'>Successfully</h6><p> assigned route.</p></div>,"success");
              this.setState((prev)=>{
           
               prev.toggle=!prev.toggle 
               prev.toggle1=!prev.toggle1
               return prev
              })
                     
            }
          })
          .catch(err=>console.log(err))
        }
      }
     
     
      
      
     

    }
   
  time(e){
      // console.log(e.target.value)
      let time1=e.target.value
      var hours = parseInt(time1.substr(0, 2));
      if(time1.indexOf('am') != -1 && hours == 12) {
        time1 = time1.replace('12', '0');
      }
      if(time1.indexOf('pm')  != -1 && hours < 12) {
        time1 = time1.replace(hours, (hours + 12));
      }
      this.setState({
        time:time1.replace(/(am|pm)/, '')
      });
      
    }
  componentDidUpdate(){
      if(this.state.toggle){
          axios.get(conf.serverUrl+'route/getEmployee.php')
          .then(({data})=>{

              console.log(data)
              if(data===0){
                this.setState((prev)=>{
                  prev.empNameCheck=false
                   prev.toggle=!prev.toggle
                    return prev
                })
              }else{
                this.setState((prev)=>{
                  prev.userInfo=data.user
                  prev.toggle=!prev.toggle
                  return prev
              })
              }
            
          })
          .catch(err=>console.log(err))
      }
      if(this.state.toggle1){
             axios.get(conf.serverUrl+'route/getRouteInfo.php')
            .then(({data})=>{
              console.log(data)
              if(data==0){
                this.setState((prev)=>{
                  prev.routeCheck=false
                  prev.toggle1=!prev.toggle1
                  return prev
                })
              }else{
                this.setState((prev)=>{
                  prev.routeInfo=data
                  prev.toggle1=!prev.toggle1
                  return prev
                })
              }
            })
            .catch(err=>console.log(err))
     
      }
    
  
     
   }
    componentDidMount(){
      axios.get(conf.serverUrl+'route/getEmployee.php')
      .then(({data})=>{

          console.log(data)
          if(data===0){
            this.setState((prev)=>{
              prev.empNameCheck=false
             
                return prev
            })
          }else{
            this.setState((prev)=>{
              prev.userInfo=data.user
              prev.empNameCheck=true
           
              return prev
          })
          }
        
      })
      .catch(err=>console.log(err))
      axios.get(conf.serverUrl+'route/getRouteInfo.php')
      .then(({data})=>{
        console.log(data)
        if(data==0){
          this.setState((prev)=>{
            prev.routeCheck=false
            return prev
          })
        }else{
          this.setState((prev)=>{
            prev.routeInfo=data
            prev.routeCheck=true
            return prev
          })
        }
      })
      .catch(err=>console.log(err))
     
    }
  render() {
    let time=new Date().toLocaleTimeString()
    let date1=new Date().toLocaleDateString('en-gb')
    let [day,month,year]=date1.split('/')
    let date=new Date().toLocaleDateString('en-gb');
     let [day1,month1,year1]=date.split('/')
     day1=parseInt(day1)+1
     if(day1<10){
       day1="0"+day1
     }
    year=parseInt(year)+1
    return (
        <Container style={{marginTop:80}}>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col lg='10'>
          <Card>
               <CardBody>
                  <Form onSubmit={this.submit}>
                  <center><h1 className='text-muted'>ASSIGN ROUTE</h1></center>
                  <hr/>
                  <Row>
                    <Col lg='4'>
                    <FormGroup>
                        <Label for="empName">select empName</Label>
                        <select   ref='empName'   className="form-control" name="empName" id="empName" ref="empName" onChange={this.empName}>
                       
                           <option value="">select the employee</option>
                           {
                             (this.state.empNameCheck)?(
                              this.state.userInfo.map(
                                (x,key)=><option value={key+1+". "+x.emp_name+"(ID:"+x.emp_id+")"}>
                                {key+1+". "+x.emp_name+"(ID:"+x.emp_id+")"}
                                </option>
                                 
                                )
                           
                             ) 
                          
                            
                           :
                          <option value=''>register the employee</option>
                          }
                         
                        </select>
                      
                        
                        {(this.state.empName=='')?<p className="text-danger">{this.state.empErr}</p>:<p style={{display:'none'}}></p>}
                    </FormGroup>
                    
                    </Col>
                    <Col lg='4'>
                    <FormGroup>
                        <Label for="route">select route</Label>
                        <select  ref='route' className="form-control" name="route" id="route" ref="route"  onChange={this.route}>
                        <option value="">select the route</option>
                        {this.state.routeCheck?(
                            this.state.routeInfo.map((x,key)=><option value={key+1+". "+x.locationName+"(lat-long:"+x.location+")"}>{key+1+". "+x.locationName+"(lat-long:"+x.location+")"}</option>)

                        )
                         
                          :
                          <option value=''>add route</option>
                          }
                         
                        </select>
                        {this.state.route==''?<p className="text-danger">{this.state.routeErr}</p>:<p style={{display:'none'}}></p>}
                    </FormGroup>
                    </Col>
                    <Col lg='4'>
                    <FormGroup>
                        <Label for="date">select date</Label>
                        <input
                        ref='date'
                        id="date"
                        id="date"
                        min={year1+'-'+month1+'-'+day1}
                        max={year+'-'+month+'-'+day}
                        type='date'
                        value={this.state.date}
                        onChange={this.date}
                        className="form-control"
                      
                        // value={this.state.latitude+','+this.state.longitude}
                        />
                        <p className="text-danger">{this.state.dateErr}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                   
                   
                 
                  <FormGroup>
                        <Label for="time">select time</Label>
                        <input
                        ref='time'
                        id="time"
                        // min={time}
                      className="form-control"
                        type='time'
                        onChange={this.time}
                      
                      
                        // value={this.state.latitude+','+this.state.longitude}
                        />
                        <p className="text-danger">{this.state.timeErr}</p>
                 </FormGroup>
                    <hr/>
                    <center><Button className="btn-round">submit</Button></center>
                 </Form>
                 <Notify ref="notification"/>
               </CardBody>
           </Card>
          </Col>
        </Row>
         <br/> <br/> <br/> <br/> <br/> <br/> 
        </Container>
    
    )
  }
}
