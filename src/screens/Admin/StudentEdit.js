import React, { Component } from 'react';
import fire from '../../config/Fire'
import swal from 'sweetalert'



class STUDENTEDIT extends Component {
  constructor(props){
    super(props)

    this.state = {
        fullname : '',
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
    const Studentkey = new URL(window.location.href).searchParams.get('key')
    e.preventDefault();
    const {  fullname , qualification , city , phoneno  , email } = this.state ;
    let db = fire.database()
    db.ref(`Users/${Studentkey}/studentinfo/`)
    .update({
      fullname,
      qualification ,
      city ,
      phoneno,
      email
    })
    .then(() => {
      swal('Success', 'Student Details Updated', 'success');
        this.props.history.push('/adminMainPage')
  })

    this.setState({
      fullname : '',
      qualification :'' ,
      city : '',
      phoneno : '',
      email : ''
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
    const Studentkey = new URL(window.location.href).searchParams.get('key')
    console.log('Studentkey>>>>>>>>>',Studentkey)

    // const { companyData } = this.state;

    let db = fire.database();
    db.ref(`Users/${Studentkey}/studentinfo`)
    .once('value', studentInfo=>{
        const studentData = studentInfo.val();
        this.setState({
            fullname : studentData.fullname || '',
            qualification : studentData.qualification || '' ,
            city : studentData.city || '',
            phoneno : studentData.phoneno || '',
            email : studentData.email || ''
              })
              console.log("studentobj============>", studentData )
    })

      }
 




            adddetails = ( ) => {
                const { fullname , phoneno , qualification , city , email } = this.state;
                 return (
                      
                   <div className="container">
                   <form  style={{maxwidth:400,margin:'auto',width:'50%'}}   onSubmit={this.addDetails}  >
                           <h2>ADD DETIALS</h2>
             
                           <div className="form-group">
                             <label htmlFor="Fullname">Fullname:</label>
                             <input type="text" className="form-control" id="Fullname" placeholder="Enter Fullname"
                             value={fullname}
                             onChange={this.handleChange}
                             name="fullname"/>
                           </div>
             
                           <div className="form-group">
                             <label htmlFor="Qualification">Qualification:</label>
                             <input type="text" className="form-control" id="Qualification" placeholder="Enter Qualification" 
                              value={qualification}
                              onChange={this.handleChange}
                             name="qualification"/>
                           </div>
             
                           <div className="form-group">
                             <label htmlFor="City">City:</label>
                             <input type="text" className="form-control" id="City" placeholder="Enter City" 
                              value={city}
                              onChange={this.handleChange}
                             name="city"/>
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
                           
                         
                           
             
                           <button type="submit" className="frombtn">SUBMIT</button>
                           </form>
                   </div>
                 )
               }


 
  render() {
// const {   formShow , studentinfoShow } = this.state
    
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

export default STUDENTEDIT ;
