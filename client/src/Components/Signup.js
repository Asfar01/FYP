import React, { Component } from 'react';
import axios from 'axios';



class Signup extends Component{
    constructor (props){
        super(props)
        this.state={

            name:{

                firstname: '',
                lastname: ''
            },
            
            phone:'',
            email:'',
            username:'',
            password:''
        }
        this.handleClick=this.handleClick.bind(this)
        this.send=this.send.bind(this)
    }
    handleClick(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    send(){
       event.preventDefault();
       const signupdata={
        firstname:this.state.name.firstname,
        lastname:this.state.name.lastname,
        phone:this.state.phone,

        email:this.state.email,
        username:this.state.username,
        password:this.state.password
       }
       axios.post('http://localhost:4000/api/v1/auth/signup', signupdata )
        .then(response=>response.data)

    }
    render(){

    return (
          <div>    
            <form>
               <input type="text" placeholder="firstname" value={this.state.name.firstname} name={["name","firstname"]} onChange={this.handleClick}/>
               <input type="text" placeholder="lastname" value={this.state.name.lastname} name="lastname" onChange={this.handleClick}/>           
               <input type="text" placeholder="phone" value={this.state.phone} name="phone" onChange={this.handleClick}/>
              
              
               <input type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleClick}/>
              
               <input type="text" placeholder="username" value={this.state.username} name="username" onChange={this.handleClick}/> 
               <input type="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handleClick}/> 
              
              
               <input onClick={this.send} type="submit"/>
            </form>
          </div>

        )
     }
}


export default Signup;