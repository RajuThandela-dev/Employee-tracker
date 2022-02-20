import React from 'react'
import axios from 'axios'
import conf from '../../conf.jsx'
import {Row,Col,Container,Card,CardBody,Button,Input,Collapse} from 'reactstrap'
export default class ViewRouteAndShopInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            assignInfo:[],
            check:false,
            days:'',
            hours:'',
            minutes:'',
            seconds:'',
            
        }
        this.setInterval=null
        this.viewTime=this.viewTime.bind(this)
    }
    componentDidMount(){
        let obj={
            local:localStorage.getItem('id')
        }
        axios.post(conf.serverUrl+'route/getAllAssignedRoute.php',obj)
        .then(({data})=>{
            console.log(data)
            if(data==0){
                this.setState((prev)=>{
                    prev.check=false
                    return prev
                })
            }else{
              
                console.log(data)
                this.setState((prev)=>{
                     prev.check=true
                    prev.assignInfo=data
                    return prev
                })
                
            }
            
        })
        .catch(err=>{console.log(err)})
       
        

    }
    
    viewTime(key){
        // if(key){
            let date = this.state.assignInfo[key].Date1;
            let time = this.state.assignInfo[key].time1;
            let $this=this;
            var date1=date;
            date1=date1.split('-')  
  
            var countDownDate = new Date(date1[1]+' '+date1[2]+","+date1[0]+' '+time).getTime();;
            // console.log(countDownDate)
         this.setInterval=setInterval(function() {
                var now = new Date().getTime();
                // console.log("now"+now)
                var distance = countDownDate - now;
                // console.log("Dis"+distance)
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    $this.setState((prev)=>{
                        prev.assignInfo[key].hours=hours< 0 ? undefined :hours
                        prev.assignInfo[key].minutes=minutes< 0 ? undefined : minutes
                        prev.assignInfo[key].days=days < 0 ? undefined: days
                        prev.assignInfo[key].seconds=seconds < 0 ?undefined :seconds
                        return prev;
                    })
                    if (distance < 0) { 
                    
                        $this.setState((prev)=>{
                            prev.assignInfo[key].expired='Your time has been expired please contact admin'
                        })  
                     
                    }
                }, 1000);
               
          
        // }
     
    }
    componentDidUpdate(){
       for(let i=0;i<this.state.assignInfo.length;i++){
           if(this.state.assignInfo[i].emp_id==localStorage.getItem('id')){
                    if(this.state.assignInfo[i].markAttendence=="1"){
                        console.log("heu")
                        clearInterval(this.setInterval)
                        this.setState((prev)=>{
                            prev.assignInfo[i].mark='You marked the attendence successfully'
                        })
                }
           }
       }
        
        for(let i=0;i<this.state.assignInfo.length;i++){
            if(this.state.assignInfo[i].expired=='Your time has been expired please contact admin'){
                console.log('valid')
                clearInterval(this.setInterval)
                var obj={
                    empId:localStorage.getItem('id')
                }
                axios.post(conf.serverUrl+'route/sendMail.php',obj)
                .then(({data})=>{
                    console.log(data)
                   
                })
                .catch(err=>{
                    console.log(err)
                    alert(err)
                })
                
        }
       
        }
    }

    
    
    render(){


        return(
            <Container style={{marginTop:80}}>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col lg='10'>
                {(this.state.check)?
             this.state.assignInfo.map((x,key)=>
             (localStorage.getItem('id')===x.emp_id)?
             <Card>
             <CardBody>
             <p>Route name:<p className='float-right'>{x.routeName}</p></p>
             <p>click to view the time left and navigate the route:<Button className="btn-sm float-right" onClick={()=>{
               
               this.setState((prev)=>{
                   prev.assignInfo[key].isOpen=prev.assignInfo[key].isOpen==undefined?true:!prev.assignInfo[key].isOpen
                   return prev;
               })
            
               this.viewTime(key)
             }}>{this.state.assignInfo[key].isOpen===undefined?"view":(this.state.assignInfo[key].isOpen?"close":'view')}</Button></p>
             <Collapse isOpen={this.state.assignInfo[key].isOpen}>
               {x.isOpen!=undefined? (
                   x.isOpen ?
                <div>
                    <hr></hr>
                 
                { (x.days===undefined||x.hours==undefined||x.minutes==undefined||x.seconds==undefined)?
                    <div>
                    <p>Report :</p>
                    
                    <p className='text-danger'>{x.expired}</p>
                    <p className='text-success'>{x.mark}</p>
                    </div>
                    :
                    <div>
                    <p id={key}>Time left :</p>
                    <p id={key} style={{fontSize:15}}>{x.days+' days '+x.hours+':'+x.minutes+':'+x.seconds}</p>
                
                    </div>
                    }
        

               </div> : null ): null
               
                }
                
               
              
                {/* <p><Input style={{width:"200px"}} className="form-control float-left" type="text" width='10' ></Input><p className="float-right"><Button className=" btn-sm">getLoc</Button></p></p><br/><br/> */}
               <Button onClick={
                   ()=>{      
                    window.location.replace('https://www.google.com/maps/search/'+x.location)
                   }
               }>View map    </Button>
             </Collapse>

               
            </CardBody>
            </Card>
             :
             <div>
               
             </div>
           
           
            )
            :
            <div>
                <br/> <br/> <br/> <br/>
                <center><h1 className="text-muted">NO ROUTE IS ASSIGNED BY THE ADMIN</h1></center>
            </div>
           }
           
                </Col>
            </Row>
            <br/> <br/> <br/> <br/>  <br/> <br/> <br/> <br/>  <br/> <br/> <br/> <br/>  <br/> <br/> <br/> <br/>
            </Container>
       
        )
    }
} 