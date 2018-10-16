import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './../css/form.css'



class COMPANYSIGNIN extends Component {

  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.signin = this.signin.bind(this)

    this.state ={
      email :'',
      password :'',
    }
 
  }

 
  signin(e){
      
    const { email , password } = this.state;
    e.preventDefault();
    this.props.companySignin( 'company' , email , password)

  }

  handleChange(e){

    this.setState({
     [ e.target.name ] : e.target.value 
    
    })
  }


  render() {

    const { email  , password } = this.state;
    
    return (
    
      <div className="App">

            
            <div className="container">
            <form  style={{maxwidth:500,margin:'auto'}}   onSubmit={this.signin}  >
                    <h2>COMPANY LOGIN</h2>
                    
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

                    <button type="submit" className="frombtn">LOGIN</button>

                   
                    </form>
                    <div className="container" style={{backgroundcolor:'#f1f1f1'}}>
                    
                     <NavLink to="/"  className="btn cancelbtn" > CANCEL  </NavLink>
                    <span className="psw">Create a new Account 
                    <NavLink to="/companySignup"> SIGNUP  </NavLink>
                  </span>
                    </div>
            </div>
            
            
            
            
            
            
            

      </div>
    );
  }
}

export default COMPANYSIGNIN;
