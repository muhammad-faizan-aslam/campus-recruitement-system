import React, { Component } from 'react';
import fire from '../../config/Fire';
import { NavLink } from 'react-router-dom';
import './../css/form.css'
import swal from 'sweetalert';


class COMPANYSIGNUP extends Component {

  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.signup = this.signup.bind(this)

    this.state ={
      companyname :'',
      email :'',
      password :'',
      phoneno : '',
   
      
    }
 
  }

 
  signup(e){
    const {companyname, email , password , phoneno } = this.state;
    e.preventDefault();

    this.props.checkLogin('companyMainPage')

    fire
  .auth().createUserWithEmailAndPassword(email,password)
  .then((res)=>{
    
        console.log('res',res)
      let db = fire.database();
      db.ref('Users/'+res.user.uid)
      .set({
        companyname : companyname , UserEmail : email , UserPassword : password , phoneno : phoneno ,
        UserId : res.user.uid , Type : 'company' , JoiningTime : res.user.metadata.creationTime
      })  

      swal('SUCCESSFULLY REGISTERED','','success')
      
      this.setState({
        companyname :'',email:'',password:'' , phoneno: ''
      })
  }).catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code;
    var errorMessage = error.message;
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

    const { email  , password , companyname , phoneno } = this.state;
    
    return (
    
      <div className="App">

            
            <div className="container">
            <form  style={{maxwidth:500,margin:'auto'}}   onSubmit={this.signup}  >
                    <h2>COMPANY SIGNUP</h2>
                    <div className="input-container">
                        <i className="fa fa-user icon"></i>
                        <input className="input-field" type="text" placeholder="Enter your companyname" 
                        value={companyname}
                        onChange={this.handleChange} name="companyname"/>
                    </div>

                     <div className="input-container">
                        <i className="fa fa-phone icon"></i>
                        <input className="input-field" type="text" placeholder="Enter your Phone no" 
                        value={phoneno}
                        onChange={this.handleChange} name="phoneno"/>
                    </div>

                    <div className="input-container">
                        <i className="fa fa-envelope icon"></i>
                        <input className="input-field" type="text" placeholder="Enter your Email" 
                        value={email}
                        onChange={this.handleChange}  name="email"/>
                    </div>
                    
                    <div className="input-container">
                        <i className="fa fa-key icon"></i>
                        <input className="input-field" type="password" placeholder="Create a Password"
                        value={password}
                        onChange={this.handleChange} name="password"/>
                    </div>

                    <button type="submit" className="frombtn">Register</button>
                    </form>
                    <div className="container" style={{backgroundcolor:'#f1f1f1'}}>
                  
                    <NavLink to="/" className="btn cancelbtn"  > BACK  </NavLink>
                    <span className="psw">Have You Already Account  ?
                    <NavLink to="/companyLogin"> LOGIN  </NavLink>
                  </span>
                    </div>
            </div>
            
            
            
            
            
            
            

      </div>
    );
  }
}

export default COMPANYSIGNUP;
