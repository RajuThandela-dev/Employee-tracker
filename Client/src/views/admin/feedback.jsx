import React from 'react'
import {Container,Alert,Col,Row} from 'reactstrap'
import Axios from 'axios';
import conf from '../../conf.jsx'

export default class Feedback extends React.Component{
    constructor(props){
        super(props)
        this.state={
           feedbackData:[],
           check:true
        }
        
    }
    componentWillMount(){
        Axios.get(conf.serverUrl+'FeedBack/getAllField.php')
        .then(({data})=>{
            console.log(data)
            if(data===0){
                this.setState({
                    check:false
                })
            }else{
                this.setState({
                    feedbackData:data.feedback
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
               <Col lg='10'>
               {(this.state.check)?
                this.state.feedbackData.map((data,key)=>
                <Alert color='white'>
                   <h5>{key+1+'. '+data.name}</h5>
                   <hr/>
                   <p>Employee ID:<p className="float-right">{data.E_id}</p></p>
                   <p>ISSUES:</p>
                   <p>{data.msg}</p>
                   <hr/>
                   <p>Date:<p className="float-right">{data.date}</p></p>
                   <p>Time:<p className="float-right">{data.time}</p></p>
                   <hr/>
                </Alert>
                ):
                <Container>
                 <br/> <br/> <br/> <br/>
                 <center><h2 className='text-muted'>OOPS!YOU HAVE NO ISSUES REGISTERED</h2></center>
                </Container>
               
                }
               </Col>
           </Row>
               
           </Container>
        )
    }
} 