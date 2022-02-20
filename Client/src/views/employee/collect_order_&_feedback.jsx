import React from 'react'
import {Form,FormGroup,Table,Label,Input, Container,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText,CardBody, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Conf from '../../conf.jsx'
import axios from 'axios';
import Notify from '../../components/notify/notify.jsx'
import Swal from 'sweetalert'
export default class CollectOrderFeedback extends React.Component{
    constructor(props){
        super(props)
        this.state={
            clickErr:'',
            activeTab:'1',
            feedback:'',
            feedbackErr:'',
            catagory1:[],
            shopName1:[] ,
            sum:0,
                DbcategoryErr:'',
                shopName:'',
                catagory:'',
                itemName:'',
                Rate:'',
                qty:'',
                total:'',
                grandTotal:0
           ,
                shopGetError:'',
                shopNameErr:'',
                catagoryErr:'',
                itemNameErr:'',
                RateErr:'',
                qtyErr:'',
                totalErr:''
           ,
            itemInfoArr:[],
            itemNameArr:'',
            addData:[]
            

        }
        this.feedbackFun=this.feedbackFun.bind(this)
        this.feedbackSubmit=this.feedbackSubmit.bind(this)
        this.shopname=this.shopname.bind(this)
        this.itemn=this.itemn.bind(this)
        this.catagory=this.catagory.bind(this)
        this.qty=this.qty.bind(this)
        // this.rate=this.rate.bind(this)
        // this.total=this.total.bind(this)
        this.table=this.table.bind(this)
       this.pop=this.pop.bind(this)
        this.order=this.order.bind(this)
    }
    pop(i){
 
        this.setState((prev)=>{
            prev.addData.splice(i,1);
          
            return prev;
        });
    }
    toggle(tab){
        if(this.state.activeTab!==tab){
            this.setState({
                activeTab:tab
            })
        }
    }
    shopname(e){
        e.persist();
        this.setState((prev) => {
            prev.shopName = e.target.value;
            return prev;
        })     
    }
    itemn(e){
        e.persist();
        this.setState((prev)=>{
            prev.itemName=e.target.value
            return prev;
        })
        let Item={
            check:2,
            itemName:e.target.value
        }
        axios.post(Conf.serverUrl+'order/getAllItem.php',Item)
        .then(({data})=>{
            console.log(data)
            if(data===0){
                this.setState((prev)=>{
                    prev.itemNameArr=''
                    return prev
                })
            }
            else{
                this.setState((prev)=>{
                    prev.Rate=data.ItemName[0].rate
                    return prev
                })
            }
           
        })
        .catch(err=>{
            console.log(err)
        })

    }
    catagory(e){
        e.persist();
        this.setState((prev)=>{
            prev.catagory=e.target.value
            return prev;
        })
     
            let Catagory={
                catName:e.target.value,
                check:1
            }
            axios.post(Conf.serverUrl+'order/getAllItem.php',Catagory)
            .then(({data})=>{
                console.log(data)
                if(data===0){
                    this.setState((prev)=>{
                        prev.itemInfoArr=''
                        return prev
                    })
                }else{
                    this.setState((prev)=>{
                        prev.itemInfoArr=data.itemInfo
                        return prev
                    })
                }
               
            })
            .catch(err=>{
                console.log(err)
            })
        
        
        }
    qty(e){
        e.persist();
        this.setState((prev)=>{
            prev.qty=e.target.value
            return prev;
        })
      
    }
    
order(e){
    e.preventDefault()
  if(!(this.state.addData.length==0)){
  
    axios.post(Conf.serverUrl+'order/collect_order.php', this.state.addData)
    .then(({data})=>{
        console.log(data)
        this.refs.shopName.value=""
          if(data=='1'){
              Swal('success','placed order','success')
            // this.refs.notifi.notify(<div><h6 className='white'>Successfully</h6><p>placed order.</p></div>,"success");
            this.setState({
                addData:[],
                clickErr:''
            })
        }else{
            console.log('no')
        }
     
       
    })
    .catch(err=>{
        console.log(err)
    })

  
  }else{
    Swal('error','Please add item then click submit','error')
  }
  console.log(this.state.clickErr)

 
   
    
}
clear(){
    this.refs.shopName.value=""
    this.refs.cat.value=""
    this.refs.itemName.value=""
    this.refs.rate.value=""
    this.refs.qty.value=""
    this.refs.total.value="" 
}
table(){
   
  if(this.state.shopName===''||this.state.itemName===''||this.state.catagory===''||this.state.qty===''||this.state.Rate===''){
   
      if(this.state.shopName===''){
          Swal('error','SHOP_NAME is required','error')
      }else if(this.state.itemName===''){
        Swal('error','ITEM_NAME is required','error')
      }else if(this.state.catagory===''){
        Swal('error','CATAGORY is required','error')
      }else if(this.state.qty===''){
        Swal('error','QUANTITY is required','error')
      }else{
          if(this.state.Rate===''){
            Swal('error','RATE is required','error')
          }
        
      }
  }else{
   
   
    if(this.state.qty.length>4){
        Swal('error','Quantity should must be less then or equal to 4 digit','error')
    }else if(this.state.qty<=0){
        Swal('error','Must enter the valid quantity','error')

    }
    if(this.state.qty.length<=4&&this.state.qty>0&&this.state.shopName!==''&&this.state.itemName!==''&&this.state.Rate!==''){
                   
                    this.refs.cat.value=""
                    this.refs.itemName.value=""
                    this.refs.rate.value=""
                    this.refs.qty.value=""
                    this.refs.total.value="" 
                    let grandTotal=0;
                    let total=this.state.Rate*this.state.qty
                 if(this.state.qty>0){
                    let collectOrder={
                    shopName:this.state.shopName,
                    catagory:this.state.catagory,
                    itemName:this.state.itemName,
                    rate:this.state.Rate,
                    qty:this.state.qty,
                    total,
                    grandTotal,
                    empId:localStorage.getItem('id'),
                    check:1
                }
                this.state.addData.push(collectOrder)
                //   this.state.addData.map
                this.refs.rate.value=""
                this.refs.total.value="" 
                this.setState({
                   
                        Rate:'',
                        itemName:'',
                        catagory:'',
                        
                        qty:''
                 
                })
            }else{
               console.log(false)
            }
    }
  }

}
feedbackFun(e){
    this.setState({
        feedback:e.target.value.trimStart()
    })
}
feedbackSubmit(e){
    e.preventDefault()
    if(this.state.feedback===''){
       
        Swal('error','ISSUES is required','error')
    }else if(!isNaN(this.state.feedback)){
      
        Swal('error','enter valid input for ISSUES','error')
    }else{
       
        let date=new Date()
        let feedbackData={
            check:1,
            currentDate:date.toLocaleDateString(),
            currentTime:date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
            E_id:localStorage.getItem('id'),
            msg:this.state.feedback
        }
        axios.post(Conf.serverUrl+'Feedback/addFeedback.php',feedbackData)
        .then(({data})=>{
            console.log(data)
            if(data===1){
                Swal('success','message sent successfully','success')
                this.setState({
                    feedback:''
                })
            }else{
                Swal('unsuccessfull','message not sent','error')
                
            }
        })
        .then(err=>console.log(err))
    }
}

componentDidMount(){

    console.log(this.state.sum)
    console.log(this.state.submitErr)
    this.setState(prev=>{
      
            prev.total=prev.Rate*prev.qty
        return prev
    })
    axios.get(Conf.serverUrl+'additem/senCatagoryData.php')
    .then(({data})=>{
        console.log(data)
       
        if(data==0){
            this.setState(prev=>{
                prev.DbcategoryErr='THERE IS NO STOCK PLEASE CONTACT ADMIN'
                return prev
            })
        }else if(data.length>0){
            this.setState({
                catagory1:data
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
    let obj={empId:localStorage.getItem('id')}
    axios.post(Conf.serverUrl+'order/getAllShop.php',obj)
    .then(({data})=>{
        if(data==2){
            this.setState(prev=>{
                prev.shopGetError='NO ROUTE ARE ASSIGNED BY THE ADMIN'
                return prev
            })
        }else if(data==0){
            this.setState(prev=>{
                prev.shopGetError='NO SHOP ARE THERE IN THIS ROUTE PLEASE ADD SOME SHOPS'
                return prev
            })
        }
        else if(data.shopInfo.length==0){
            this.setState(prev=>{
                prev.shopGetError='NO SHOP ARE THERE IN THIS ROUTE PLEASE ADD SOME SHOPS'
                return prev
            })
        }else if(data.shopInfo.length>0){
            this.setState({
                shopName1:data.shopInfo
            })
        }
      
    })
    .catch(err=>{
        console.log(err)
    })
   
    
}
    render(){
     let sum=0;
    for(let i=0;i<this.state.addData.length;i++){
        sum=sum+this.state.addData[i].total
    }
     
        return(
           <Container style={{marginTop:80}}>
           <Row>
               <Col></Col>
               <Col></Col>
               <Col></Col>
               <Col sm='10'>
               <Nav tabs>
       
     
                 <NavItem >
                 <NavLink      
              
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
                className='bg-white'
                >
                Collect orders
        </NavLink>
             </NavItem>
          
    
             <NavItem>
             <NavLink
              
            style={{backgroundColor:'white'}}
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
                className='bg-white'
                >
                Feedback                   
            </NavLink>
             </NavItem>
             <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1" >
                        <Row>
                            <Col sm='12'>
                          
                            <Card body style={{width:900}}>
                                <CardBody>
                                <form onSubmit={this.order} autoComplete="off">
                                 
                                 <center><h2 className='text-muted'>COLLECT ORDER</h2></center>
                                 <hr/>
                                    <Row>
                                    
                                    <Col lg='6'>
                                    
                                    <FormGroup>
                                <Label for="shopName">select shop Name</Label>
                                <select   ref="shopName" className="form-control"  onChange={this.shopname}>
                                 <option value="">select shop</option>
                                 {(this.state.shopName1.length>0)?this.state.shopName1.map(x=><option value={x.shopName}>{x.shopName}</option>):<option value=''>{this.state.shopGetError}</option>}
                                 </select>
                         {(this.state.shopName=='')?<p className="text-danger">{this.state.shopNameErr}</p>:<p style={{display:'none'}}></p>}
                                 </FormGroup>
                                    </Col>
                                    <Col lg='6'>
                                    
                                    <FormGroup>
                               
                               <Label for="cat">select catagory</Label>
                            
                                <select   ref="cat" className="form-control"  onChange={this.catagory}>
                                <option value="">select catagory</option>
                               {this.state.catagory1.length>0? this.state.catagory1.map((x)=>
                                   <option >{x.cat_name}</option>):<option value="">{this.state.DbcategoryErr}</option>}
                                </select>
                            
                          
                              
                        {(this.state.catagory=='')?<p className="text-danger">{this.state.catagoryErr}</p>:<p style={{display:'none'}}></p>}
                                </FormGroup>
                                    </Col>
                                  
                                    </Row>
                                 
                                
                             
                                  <div>
                                  <FormGroup>
                              
                              <Label for="itemName">Item Name</Label>
                              <select   ref="itemName" className="form-control"  onChange={this.itemn} >
                               <option value="">select item</option>
                               {(this.state.itemInfoArr.length>0)?this.state.itemInfoArr.map(x=><option >{x.Item_name}</option>):<option value=''>PEASE SELECT CATAGORY</option>}
                               </select>
                             
                              
                 {(this.state.itemName=='')? <p className="text-danger">{this.state.itemNameErr}</p>:<p style={{display:'none'}}></p>}
                               </FormGroup>
                                 <Row>
                                     <Col sm='6'>
                                     <FormGroup>
                                
                                 <Label for="rate">Rate</Label>
                                 <input 
                                 ref="rate"
                                 className="form-control"
                                 type="number"
                                 name="rate"
                                   placeholder='Rate'
                                    id="rate"
                                   value={this.state.Rate} 
                                   
                                    disabled>
                                 </input>
                                    
        {(this.state.Rate=='')?<p className="text-danger">{this.state.RateErr}</p>:<p style={{display:'none'}}></p>}
                                  </FormGroup>
                                     </Col>
                                     <Col sm='6'>
                                     <FormGroup>
                               
                               <Label for="qty">Quantity</Label>
                               <input 
                                className="form-control"
                               ref="qty"
                                id="qty"
                                name="qty"
                               type="number"  
                    
                               placeholder='Quantity'
                               onChange={this.qty}
                               >
                               </input>
                                  
                        {(this.state.qty=='')?<p className="text-danger">{this.state.qtyErr}</p>:((this.state.qty.length>4)?<p className="text-danger">{this.state.qtyErr}</p>:<p style={{display:'none'}}></p>)}
                                </FormGroup>
                                     </Col>
                                 </Row>
                               
                                 </div>
                          
                                 
                                
                                 <FormGroup>
                               
                               <Label for="total">Total</Label>
                               <input
                               ref="total"
                                type="number" 
                                className="form-control"
                                id="total"
                                name="total"
                                 placeholder='Total'
                               
                                 value={this.state.Rate*this.state.qty}
                                 disabled >
                               </input>
                       
                               <p className="text-danger">{this.state.clickErr}</p>
                      
                                </FormGroup>
                                <p>Please add the data one by one then click on submit button</p>
                              <Row>
                                  <Col sm='6'>
                                  <Button className="float-left btn-round btn-block" onClick={this.table}>Add</Button>

                                  </Col>
                                  <Col sm='6'>
                                  <Button className="float-right  btn-round btn-block">submit</Button>
                                    <Notify ref='notifi'/>
                                  </Col>
                              </Row>
                              <hr/>
                                {/* <Button onClick="clear" className="btn-sm btn-round" onClick={this.clear.bind(this)}>clear</Button> */}
                                    </form>
                                    {(this.state.addData.length===0)?
                                    <p style={{display:'none'}}></p>
                                :
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
                                
                                    {this.state.addData.map((x,key)=>
                                    
                                    <tr>
                                     <th >{key+1}</th>
                                     <td>{x.shopName}</td>
                                     <td>{x.catagory}</td>
                                     <td>{x.itemName}</td>
                                     <td>{x.rate}</td>
                                     <td>{x.qty}</td>
                                     <td>{x.total}</td>
                                     <td><Button className="btn-sm" onClick={()=>{
                                         this.pop(key);
                                     }}>delete</Button></td> 
                                    

                                    </tr>
                                   
                                    )}
                                    {
                                       (sum===0)?
                                       <tr style={{display:'none'}}>
                                       <td></td>
                                       <td colSpan='5' style={{alignItems:'right'}}>Grand Total</td>
                                       <td>{sum}</td>
                                       <td></td>
                                   </tr>
                                   :
                                   <tr>
                                   <td></td>
                                   <td colSpan='5' style={{alignItems:'right'}}>Grand Total</td>
                                   <td>{sum}</td>
                                   <td></td>
                               </tr>
                                    }
                                  
                            
                               
                                </tbody>
                                </Table>}
                                   
                                </CardBody>
                            </Card>
                            </Col>
                        </Row>
                          
                    </TabPane>
                    <TabPane tabId="2">
                    <Card style={{width:900}}>
                        <CardBody>
                            <Form onSubmit={this.feedbackSubmit}>
                            <Row>
                                <Col></Col>
                                <Col sm='10'>
                                <FormGroup>
                                <Label for="feedback">Feedback</Label>
                                 <Input 
                                     type="textarea"
                                     name="feedback" 
                                     id="feedback"
                                    value={this.state.feedback}
                                    onChange={this.feedbackFun}
                                     placeholder="Feedback" />
                    <p className="text-danger">{this.state.feedbackErr}</p>
                                 </FormGroup>
                                </Col>
                                <Col></Col>
                                <Col></Col>
                            </Row>
                          <Row>
                              <Col></Col>
                              <Col></Col>
                              <Col sm='8'>  <Button className='float-right'>send</Button></Col>
                              <Col></Col>
                          </Row>
                               
                                 <Notify ref="notification"/>
                            </Form>
                        </CardBody>
                    </Card>
                    </TabPane>
                    </TabContent>
              </Nav>

               </Col>
           </Row>
          
          
           </Container>
        )
    }
} 