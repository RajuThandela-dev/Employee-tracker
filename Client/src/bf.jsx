import React from 'react';
export default class BF extends React.Component{
    constructor(props){
        super(props)
        this.state={
            login:'true'
        }
    }
    render(){
        return(
            <div>{console.log(this.state.login)}</div>
        )
    }
}