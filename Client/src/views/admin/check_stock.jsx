import React from 'react'
import axios from 'axios'
import Conf from '../../conf.jsx'
import {Spinner,Card,CardBody,Button,Form,FormGroup,Container,Input,Label,Table,Row,Col} from 'reactstrap'
import conf from '../../conf.jsx';
import Swal from 'sweetalert'
export default class CheckStock extends React.Component{
    constructor(props){
        super(props);
        this.state={
          dataCheck:true,
           catagory:'',
            value:[],
            response:false,
            val:[]
        }
        this.submit=this.submit.bind(this);
        this.dropdowm=this.dropdowm.bind(this)
    }
    dropdowm(e){
        this.setState({
            catagory:e.target.value
        })
     
    }
    submit(e){
        e.preventDefault();
      if(this.state.catagory===''){
        //   this.setState({
        //       errorCatagory:'Must select Catagory'
        //   })
           Swal('error','Must select Catagory','error')
      }
      else {
          this.setState({
              errorCatagory:''
          })
          var cat={
              data:this.state.catagory
          }
        
          axios.post(conf.serverUrl+'checkstok/checkstock.php',cat)
          .then(({data})=>{
            if(data==0){
                
                this.setState({
                    dataCheck:false,
                    errorCatagory:'Oops!You have no stock'
                })
                
            }
            else{
                console.log(data)
                Swal('success','click ok to view the stock','success')
                this.setState({
                    dataCheck:true,
                    value:data.data
                    // response:res.data.data[0].res
                })
                // console.log(this.state.value)
               
            }
          })
          .catch(err=>{
              console.log(err)         
          })
      }
    }
    componentDidMount(){
        
        axios.get(Conf.serverUrl+'additem/senCatagoryData.php')
        .then(({data})=>{
            console.log(data)
         
               
            
            this.setState({
                val:data
            })
        })
        .catch(err=>{
            console.log(err)
        })
        
    }

    render(){
       
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
                        <center><h1 className='text-muted'>CHECK STOCK</h1></center>
                        <hr/>
                        <Row>
                            <Col></Col>
                            <Col lg='10'>
                            <FormGroup>
                         <Label for="catagory">Select catagory</Label>
                         <Input type="select"  onChange={this.dropdowm}  id="catagory">
                         <option value=''>Choose catagory</option>
                         {this.state.val.map(cat=><option >{cat.cat_name}</option>)}
                          </Input>
                        <p className="text-danger">{this.state.errorCatagory}</p>
                   
                       </FormGroup> 
                            </Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                        <hr/>
                      <center><Button className='info' type='submit'>check</Button></center>
                        </Form>
                    </CardBody>
                </Card>
           </Container>
           {(this.state.dataCheck)?
            <Container style={{marginTop:30}}>
         
              {(this.state.value.length===0)?<p style={{diplay:'none'}}></p>:
                 <Card>
                 <CardBody>
              <Table responsive bordered size='sm'>
              <thead bordered>
                  <tr>
                      <th>#</th>
                      <th>Item Name</th>
                      <th>Catagory</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Rate</th>
                      <th>Quantity</th>
                  </tr>
              </thead>
              <tbody>
                  
                      {this.state.value.map((val,key)=>
                      <tr>
                          <th scope='row'>{key+1}</th>
                          <td>{val.itemname}</td>
                          <td>{val.cat_name}</td>
                          <td>{val.item_date}</td>
                          <td>{val.item_time}</td>
                          <td>{val.Rate}</td>
                          <td>{val.quantity}</td>
                      </tr>
                      )}
              
              </tbody>
            </Table>
            </CardBody>
            </Card>
            }      
         
           
         </Container>
          :
          <Container>
          <br/><br></br><br/>
          <center><h2 className='text-muted'>OOPS!YOU HAVE NO STOCK OF THE SELECTED CATEGORY</h2></center> 
          </Container>
    }
                </Col>
            </Row>
           
           <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </Container>
        )
    }
} 