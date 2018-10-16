import React, { Component } from 'react';
import fire from '../../config/Fire'
import swal from 'sweetalert'



class COMPANYEDIT extends Component {
  constructor(props){
    super(props)

    this.state = {
        companyname : '',
        qualification :'' ,
        city : '',
        phoneno : '',
        email : ''
    }
    
   this.handleChange = this.handleChange.bind(this)
  }


  logOut = () =>{
    this.props.userLogout('companyLogin')
     
  }

  addDetails = (e) => {
    const companykey = new URL(window.location.href).searchParams.get('key')
    e.preventDefault();
    const {  companyname , qualification , city , phoneno  , email } = this.state ;
    let db = fire.database()
    db.ref(`Users/${companykey}`)
    .update({
      companyname,
      qualification ,
      city ,
      phoneno,
      email
    })
    .then(() => {
      swal('Success', 'Student Details Updated', 'success');
        this.props.history.push('/adminMainPage')
  })


  }

  gotoBack(){
    this.props.history.push(`/adminMainPage`)
  }


  handleChange = (e) => {

    this.setState({
     [ e.target.name ] : e.target.value 
    
    })
  }
  componentWillMount() {
    const companykey = new URL(window.location.href).searchParams.get('key')
    console.log('Studentkey>>>>>>>>>',companykey)
  
    let db = fire.database();
    db.ref(`Users/${companykey}`)
    .once('value', companyInfo=>{
        const companyData = companyInfo.val();
        this.setState({
            companyname : companyData.companyname || '',
            phoneno : companyData.phoneno || '',
            email : companyData.UserEmail || ''
              })
              console.log("studentobj============>", companyData )
    })

      }
 




            adddetails = ( ) => {
                const { companyname , phoneno , email } = this.state;
                 return (
                      
                   <div className="container">
                   <form  style={{maxwidth:400,margin:'auto',width:'50%'}}   onSubmit={this.addDetails}  >
                           <h2>ADD DETIALS</h2>
             
                           <div className="form-group">
                             <label htmlFor="companyname">companyname:</label>
                             <input type="text" className="form-control" id="companyname" placeholder="Enter companyname"
                             value={companyname}
                             onChange={this.handleChange}
                             name="companyname"/>
                           </div>
             
                          
                           
                           <div className="form-group">
                             <label htmlFor="Email">Email Address:</label>
                             <input type="text" className="form-control" id="Email" placeholder="Enter Email" 
                              value={email}
                              onChange={this.handleChange}
                             name="email"/>
                           </div>
             
                           
             
             
                           <div className="form-group">
                             <label htmlFor="Phoneno">Phone no:</label>
                             <input type="text" className="form-control" id="Phoneno" placeholder="Enter Phoneno"
                              value={phoneno}
                              onChange={this.handleChange}
                             name="phoneno"/>
                           </div>
                           
                         
                           
             
                           <button type="submit" className="frombtn">UPDATE</button>
                           </form>
                   </div>
                 )
               }


 
  render() {
    
    return (
    
      <div className="App">

                <h1>WELCOME </h1>

           <button type="button" className="btn btn-primary"
                onClick={()=> this.gotoBack()}
        >BACK</button> <span>   </span>
        <button type="button" className="btn btn-warning"
                onClick={this.logOut}
        >LOGOUT</button>

        <br/>
        <br/> <br/>
          
         


         


         { 
               this.adddetails()
          }

         
          
      </div>
    );
  }
}

export default COMPANYEDIT ;
