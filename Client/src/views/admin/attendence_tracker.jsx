import React from 'react'
import {Container,Card,CardBody,Button,Row,Col} from 'reactstrap'
import Axios from 'axios';
import conf from '../../conf.jsx'
export default class AttendenceTracker extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            dataCheck:true
        }
    }
    componentDidMount(){
        Axios.get(conf.serverUrl+'trackEmp/getLoc.php')
        .then(({data})=>{
                console.log(data)
                if(data==0){
                    this.setState(prv=>{
                        prv.dataCheck=false
                        return prv
                    })
                }else{
                    data=data.map(x=>{
                        x.date1=new Date(x.date1).toLocaleDateString('en-gb')
                        x.date1=x.date1.split('/')
                        x.date1=x.date1[0]+'-'+x.date1[1]+'-'+x.date1[2]
                        return x
                    })
                    this.setState(prv=>{
                        prv.data=data
                        return prv
                    })
                }
              
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
    
        return(
            <Container style={{marginTop:80}}>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col sm="10">
                {this.state.dataCheck?
               this.state.data.map((x,key)=>
               <Container>
                    <Card>
                    <CardBody>
                        <p className='text-muted'>{key+1+". "+x.empName}</p>
                       <hr/>
                       <p>Click to view the employee<br/><Button onClick={()=>{
                         window.location.replace('https://www.google.com/maps/search/'+x.location)

                       }} className="float-right btn- btn-sm">view</Button> last location</p>
                       <hr/>
                       <p>last visited date:<p className='float-right'>{x.date1}</p></p>
                       <p>last visited time:<p className='float-right'>{x.time1}</p></p>
                    </CardBody>
                 </Card>
                 </Container>
               )
               
                :<div><br/><br/><br/><br/><br/><h2 className='text-muted'>NO USER HAS MARKED THEIR ATTENDENCE</h2></div>}
                </Col>
            </Row>
             
            </Container>
        )
    }
} 