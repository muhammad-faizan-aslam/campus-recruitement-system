import React, { Component } from 'react';
import {   Route , Switch , withRouter } from 'react-router-dom';
// import firebase from 'firebase';
import fire from './config/Fire'
import swal from 'sweetalert'
// import logo from './logo.svg';
import './App.css';
import './mystyle.css' ;


import ADMINSIGNIN from './components/Admin/AdminSignin';
import STUDENTSIGNUP from './components/Student/StudentSignup';
import STUDENTSIGNIN from './components/Student/StudentSignin';
import STUDENTMAINPAGE from './screens/Student/StudentMainPage'
import COMPANYSIGNUP from './components/Company/CompanySignup';
import COMPANYSIGNIN from './components/Company/CompanySignin';
import HEADER from './components/Header/Header'
import COMPANYMAINPAGE from './screens/Company/CompanyMainPage';
import ADMINMAINPAGE from './screens/Admin/AdminMainPage'

import STUDENTEDIT from './screens/Admin/StudentEdit'
import COMPANYEDIT from './screens/Admin/CompanyEdit'
import VIEWVACANCY from './screens/Admin/ViewVacancy'

class App extends Component {

  constructor(props){
    super(props)

    this.logout = this.logout.bind(this)
    this.signIn = this.signIn.bind(this)
    this.checkLogin = this.checkLogin.bind(this)
    this.adminSignIn = this.adminSignIn.bind(this)

    this.state ={
      user : {},
     
    
  
    btncss :{
      margin:5
    }
      
    }

    
    // this.signUp = this.signUp.bind(this)
  }
//   checkAdminLogin(){
//     const { isAdminlogin }   = this.state;
//         this.setState({
//           isAdminlogin : !isAdminlogin
//         })
// }
componentWillMount(){
  this.setState({isUser:false})
}
componentDidMount(){
  this.authListener()

}
authListener(){

  fire.auth().onAuthStateChanged((user) => {
    if (user) {

      this.setState({user})

      // User is signed in.
      // var displayName = user.displayName;
      // var email = user.email;
      // var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var isAnonymous = user.isAnonymous;
      // var uid = user.uid;
      // var providerData = user.providerData;
      // ...
    } else {

      this.setState({user : null })
      // User is signed out.
      // ...
    }
  });
}
  
 signIn(type,userEmail,userPass) {
 
 
  fire
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .then((res) => {
     
      let db = fire.database() ;
      db.ref(`Users/${res.user.uid}`)
      .once('value', user => {
        const userObj = user.val();
        if(!userObj) {
          return fire.auth().currentUser.delete()
          .then(() => {
            swal('Sorry', `This ${type} is deleted by admin`, 'error');
          })
        }
        
        if(userObj.Type === type) {
          swal('Signed In', `Welcome ${type}`, 'success');
         
          this.setState({isUser:true})
          this.props.history.push(`/${type}MainPage`);
        }
        else 
          swal('Warning', 'You are logging through wrong form', 'error');      
      })
    })
    .catch((error) => {
     
        swal('Sorry', error.message , 'error');
     
    })
   
  
  }


  adminSignIn(type,userEmail,userPass) {
 
 
    fire
      .auth()
      .signInWithEmailAndPassword(userEmail, userPass)
      .then((res) => {
       
       
          
          
        
            swal('Signed In', `Welcome ${type}`, 'success');
           
            this.setState({isUser:true})
            this.props.history.push(`/${type}MainPage`);
         
          
      })
      .catch((error) => {
       
          swal('Sorry', error.message , 'error');
       
      })
  
    
    }

  checkLogin(goto){
    alert("working")
    this.setState({
      isUser : true
    })
    this.props.history.push(`/${goto}`)
  }
 
  logout(goto){
    fire.auth().signOut();
    this.setState({
      isUser : false
    })
    this.props.history.push(`/${goto}`)
  }

  render() {

    const {  isUser } = this.state;
    
    return (
    
      <div className="App">
      

       
          
          <div>
            {
              !isUser 
              &&
              <HEADER  />

            }

              <Switch>
                  <Route path='/' component={this.MAINPAGE} exact />
                  <Route  path='/studentLogin' render={(props) => <STUDENTSIGNIN {...props}  studentSignin = {this.signIn} />} />
                  <Route  path='/studentSignup' render={(props) => <STUDENTSIGNUP {...props} checkLogin={this.checkLogin}  />}/>
                  <Route  path='/companyLogin'  render={(props) => <COMPANYSIGNIN {...props}  companySignin = {this.signIn} />} />
                  <Route  path='/companySignup' render={(props) => <COMPANYSIGNUP {...props}   checkLogin={this.checkLogin} /> } />
                  <Route  path='/adminLogin'  render={(props) => <ADMINSIGNIN {...props}  adminSignin = {this.adminSignIn} />}  />

                  <Route  path='/studentMainPage' render={(props)=> <STUDENTMAINPAGE {...props} userLogout={this.logout} /> }   /> 
                  <Route  path='/companyMainPage' render={(props)=> <COMPANYMAINPAGE {...props} userLogout={this.logout} /> }   /> 
                  <Route  path='/adminMainPage' render={(props)=> <ADMINMAINPAGE {...props} userLogout={this.logout} /> }   /> 

                  <Route  path='/studentEdit' render={(props)=> <STUDENTEDIT {...props} userLogout={this.logout} /> }   /> 
                  <Route path='/companyEdit' render={(props)=> <COMPANYEDIT {...props} userLogout={this.logout} />} />
                  <Route path='/viewVacancy' render={(props)=> <VIEWVACANCY {...props} userLogout={this.logout} />} />
                  
              </Switch>
          </div>
          
        

     


            {/* { isAdminlogin ?
              <ADMINLOGIN/>
                :
              <ADMINSIGNUP/>
            

            } */}
            {/* < STUDENTSIGNIN  studentSignin = {this.signIn} /> */}
            {/* < STUDENTSIGNUP  /> */}
            {/* {
              user ? 
              < COMPANYMAIN />
              :
            <  COMPANYSIGNIN  companySignin = {this.signIn} /> 
            } */}
            {/* <COMPANYSIGNUP/> */}
       
            



            
            
           
            
            

      </div>
    );
  }
}

export default withRouter(App);
