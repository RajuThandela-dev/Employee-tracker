import React from 'react'
import axios from 'axios'
import conf from '../../conf.jsx'
import {Row,Col,Table,Collapse,Container,Card,CardBody,Button} from 'reactstrap'

export default class ViewOrder extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            check:true
        }
        this.print.bind(this)
    }   
     componentDidMount(){
        axios.get(conf.serverUrl+'order/view_order.php')
        .then(({data})=>{
            if(data===0){
                this.setState((prev)=>{
                    prev.check=false
                    return prev
                })
            }else{
                console.log(data)
              
                this.setState(prev=>{
                    prev.data=data
                     return prev
                })
            }
           
           
        })
        .catch(err=>{
            console.log(err)
        })
    }
    print(key){
       
        window.document.write('<h5>E_TRACKER</h5>')
        window.document.write('<table>')
        window.document.write('<tr><th>')
        window.document.write('<tr>')
        window.document.write('<td>EMP_NAME :<b>'+this.state.data[key].empname+'</b></td></tr>')
      
        window.document.write('</table>')
        window.document.write('<table>')
        window.document.write('<tr><th>')
        window.document.write('<tr>')
        window.document.write('<td>EMP_ID <b>:'+this.state.data[key].empID+'</b></td></tr>')
      
        window.document.write('</table>')
     
        window.document.write('</table>')
        window.document.write('<table>')
        window.document.write('<tr><th>')
        window.document.write('<tr>')
        window.document.write('<td>DATE<b>:'+this.state.data[key].currentDate+'</b></td><tr>')
      
        window.document.write('</table>')
        window.document.write('<table >')
        window.document.write('<thead className="thead">')

        window.document.write('<tr><th>----</th><th>----------------------</th><th>------------------</th><th>-----------------</th><th>-------------</th><th>------------</th><th>---------------</th></tr>')

        window.document.write('<tr>')
        window.document.write('<th>No.</th>')
        window.document.write('<th>Shop Name</th>')
        window.document.write('<th>Catagory</th>')
        window.document.write('<th>Item name</th>')
        window.document.write('<th>Rate</th>')
        window.document.write('<th>Quantity</th>') 
        window.document.write(' <th>Total</th>')    
        window.document.write('  <th></th>')    
        window.document.write('  </tr>')   
        window.document.write('<tr><th>----</th><th>----------------------</th><th>------------------</th><th>-----------------</th><th>--------------</th><th>------------</th><th>---------------</th></tr>')

        window.document.write(' </thead>')  
        
        window.document.write('<tbody className=\'tbody\'>')  
        for(let i=0;i<this.state.data[key].jsonString.order.length;i++){
          
            window.document.write('<tr>') 
              window.document.write('<td style=\'marginLeft:5px;\'>'+(i+1)+'</td>') 
              window.document.write('<td >'+this.state.data[key].jsonString.order[i].shopName+'</td>') 
              window.document.write('<td >'+this.state.data[key].jsonString.order[i].catagory+'</td>') 
              window.document.write('<td >'+this.state.data[key].jsonString.order[i].itemName+'</td>') 
              window.document.write('<td >'+this.state.data[key].jsonString.order[i].rate+'</td>')
              window.document.write('<td >'+this.state.data[key].jsonString.order[i].qty+'</td>')
              window.document.write('<td >'+this.state.data[key].jsonString.order[i].total+'</td>')
              
              window.document.write('</tr>') 
         
        }
        window.document.write('<tr><td>----</td><td>----------------------</td><td>------------------</td><td>-----------------</td><td>--------------</td><td>------------</td><td>---------------</td></tr>')
        window.document.write('<tr>') 
        window.document.write('<td ></td>') 
        window.document.write('<td colSpan=\'5\' >Grand total</td>') 
        window.document.write('<td>'+this.state.data[key].sum+'</td>') 

        
        window.document.write('</tr>') 
        window.document.write('<tr><td>----</td><td>----------------------</td><td>------------------</td><td>-----------------</td><td>-------------</td><td>------------</td><td>---------------</td></tr>')

        window.document.write('</table>')
    
        window.print();
        window.close();
        conf.reload();

    }
    render(){
 
      for(let i=0;i<this.state.data.length;i++){
             this.state.data[i].sum=0;
            for(let j=0;j<this.state.data[i].jsonString.order.length;j++){
                this.state.data[i].sum+=parseInt(this.state.data[i].jsonString.order[j].total)
            }
      }
       
        return(
         <Container style={{marginTop:80}}>
         <Row>
             <Col></Col>
             <Col></Col>
             <Col></Col>
             <Col lg='10'>
             {this.state.check?
           this.state.data.map((x,key)=>
            <Container>
               <Card>
                   <CardBody>
                       <h5>{key+1+' '+x.empname} <p className="text-sm float-right">{"Date:"+x.currentDate}</p></h5>
                       <hr/>
                       <p>Emp-ID<p className='float-right'>{x.empID}</p></p>
                       <p>Orders:<Button className="float-right btn-sm" onClick={
                           ()=>{
                               this.setState((prev,props)=>{
                                   prev.data[key].isOpen=prev.data[key].isOpen===undefined?true: !prev.data[key].isOpen;
                                   console.log(prev);
                                   return prev;
                               }); 
         
                           }
                       }>{this.state.data[key].isOpen==undefined ? "View order": (this.state.data[key].isOpen? "Close":"View order" )}</Button></p>
                     
                  
                    {/* <p className="">{"time:"+x.currentTime}</p> */}
           <Collapse isOpen={this.state.data[key].isOpen==undefined? false:this.state.data[key].isOpen }>
            <Card>
               <CardBody>
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
                                       
                                           {x.jsonString.order.map((y,k)=>
                                           
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
                                       <br/>
                                       <Button className='btn-sm float-right' onClick={()=>{this.print(key)}}>print</Button>

                                       </Table>
                                    
                                       
               
               </CardBody>
               
            </Card>
           </Collapse>
         
                   </CardBody>
               </Card>
               
          
            </Container>
              
                  
            )
         :
         <Container>
             <br/> <br/><br/><br/>
             <center><h1>Oops!you not have orders</h1></center>
         </Container>}
       
             </Col>
         </Row>
       
            <br/>   <br/> <br/><br/><br/>     <br/>   <br/> <br/><br/><br/>      <br/>   <br/> <br/><br/><br/>
         </Container>
        )
    }
} 