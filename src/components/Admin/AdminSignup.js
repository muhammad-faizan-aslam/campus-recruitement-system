import React, { Component } from 'react';
import fire from '../../config/Fire';
import {NavLink } from 'react-router-dom';
import './../css/form.css'
import swal from 'sweetalert';


class STUDENTSIGNUP extends Component {

  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.signup = this.signup.bind(this)
    

    this.state ={
      email :'',
      password :'',
      username :'',
     

      
    }
 
  }

 
  signup(e){
    const {username, email , password } = this.state;
    e.preventDefault();
    // this.props.adminSignup(username , email , password)

    fire
  .auth().createUserWithEmailAndPassword(email,password)
  .then((res)=>{
        this.props.checkLogin('adminMainPage')
        console.log('res',res)
       
      let db = fire.database();
      db.ref('Users/'+res.user.uid)
      .set({
        UserName : username , UserEmail : email , UserPassword : password , UserId : res.user.uid , Type : 'admin' , JoiningTime : res.user.metadata.creationTime
      })  

      swal('SUCCESSFULLY REGISTERED','','success')
      this.setState({
        username :'',email:'',password:''
      })
     
  
  }).catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code;
    let errorMessage = error.message;
    console.log('error',errorMessage)
    // ...
  });

  }

  

  handleChange(e){
    this.setState({
     [ e.target.name ] : e.target.value 
    
    })

    
  }
  render() {

    const { email  , password , username } = this.state;
    
    return (
    
      <div className="App">

            
            <div className="container">
            <form  style={{maxwidth:500,margin:'auto'}}   onSubmit={this.signup}  >
                    <h2>STUDENT SIGNUP</h2>
                   
                    <div className="input-container">
                        <i className="fa fa-user icon"></i>
                        <input className="input-field" type="text" placeholder="Username" 
                        value={username}
                        onChange={this.handleChange} name="username"/>
                    </div>

                    <div className="input-container">
                        <i className="fa fa-envelope icon"></i>
                        <input className="input-field" type="text" placeholder="Email" 
                        value={email}
                        onChange={this.handleChange}  name="email"/>
                    </div>
                    
                    <div className="input-container">
                        <i className="fa fa-key icon"></i>
                        <input className="input-field" type="password" placeholder="Password"
                        value={password}
                        onChange={this.handleChange} name="password"/>
                    </div>

                    <button type="submit" className="frombtn">Register</button>
                    </form>
                    <div className="container" style={{backgroundcolor:'#f1f1f1'}}>
                  
                  <NavLink to="/" className="btn cancelbtn"  > BACK  </NavLink>
                 
              
                  </div>
            </div>
            
            
            
            
            
            
            

      </div>
    );
  }
}

export default STUDENTSIGNUP;
