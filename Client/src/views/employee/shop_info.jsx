import React from 'react'
export default class ShopInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:'raj',
            age:50
        }
    }
    componentDidMount(){
        console.log(" componentDidMount")
    }
    componentWillMount(){
        console.log(" componentwillMount")
    }
 
  
    render(){
        console.log(this.state.age)
        return(
            <h1 style={{margin:50}}>{console.log(this.state.name)}</h1>
        )
    }
} 