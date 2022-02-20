import React from 'react'
import axios from 'axios'
import {Container,Collapse,Card,CardBody,Button,Row,Col} from 'reactstrap'
import conf from '../../conf.jsx'

export default class AssignRoute extends React.Component{
    constructor(props){
        super(props)
        this.state={
            shopInfo:[],
            dataCheck:true
        }
    }
    componentDidMount(){
        var obj={
            empid:localStorage.getItem('id')
        }
        axios.post(conf.serverUrl+'route/viewRouteAndShopInfo.php',obj)
        .then(({data})=>{
            console.log(data)
            if(data==0){
                this.setState((prev)=>{
                    prev.dataCheck=false
                    return prev
                })
            }else{
                this.setState((prev)=>{
                    prev.shopInfo=data
                    prev.dataCheck=true
                    return prev
                })
            }

        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        var $this=this
        return(
           
         <Container style={{marginTop:80}}>
          <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col lg='10'>
                {(this.state.dataCheck)?
            this.state.shopInfo.map((x,key)=>
                <Card>
                <CardBody>
                   
                    <p>Route name:<p className='float-right'>{x.routeName}</p></p>
                    <p>View shop Information:<Button onClick={()=>{
                        this.setState((prev)=>{
                            prev.shopInfo[key].isOpen= prev.shopInfo[key].isOpen==undefined?true:!prev.shopInfo[key].isOpen
                            return prev
                        })
                    }} className="float-right btn-sm">{this.state.shopInfo[key].isOpen==undefined ? "View shop Info": (this.state.shopInfo[key].isOpen? "Close":"View shop Info" )}</Button></p>
                    <Collapse isOpen={this.state.shopInfo[key].isOpen==undefined?false:this.state.shopInfo[key].isOpen}>
                    <hr/>
                    {   
                        (x.arr.length==0)?
                        <div>
                            <p>No shop are there in this route plz add some shop</p>
                        </div>
                        
                        :
                        x.arr.map((y,key)=>
                        <div>
                                 <center><p>{key+1+'. '+"Shop Information"}</p></center>
                                 <hr/>
                                 <p>Shop Name:<p className="float-right">{y.Shop_name}</p></p>
                                 <p>Shop Owner Name:<p className="float-right">{y.Shop_ownername}</p></p>
                                 <p>Shop Email:<p className="float-right">{y.Shop_email}</p></p>
                                 <p>Owner number:<p className="float-right">{y.Owner_phoneno}</p></p>
                                 <p>Shop adress:<p className="float-right">{y.Shop_adress}</p></p>
                                 <p>watch location<Button className="float-right btn-sm" onClick={()=>{
                                      window.location.replace('https://www.google.com/maps/search/'+y.shopLoc)
                                 }}>navigate</Button></p>
                                <hr/>
                        </div>
                       
                        )
                    }
                        
                    </Collapse>
                </CardBody>
                </Card>
            )
               
         :
         <div>
             <br/>  <br/>  <br/>  <br/>
             <center><h1 className='text-muted'>NO ROUTE IS ASSIGNED BY THE ADMIN</h1></center>
         </div>}
          
                </Col>
            </Row>
            <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>
         </Container>
        )
    }
} 