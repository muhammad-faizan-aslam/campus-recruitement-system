import React, { Component } from 'react';
import fire from '../../config/Fire'
import swal from 'sweetalert'
class STUDENTMAINPAGE extends Component {
  constructor(props){
    super(props)

    this.state = {

      
      vacancyPosts:[],
      formShow : false ,
      vacanciesShow:false,
      userData:'',
      fullname :'',
      qualification:'',
      phoneno :'',
      city:'',
      studentApplied :[],
      studentUIds:[]
     
     
    }
    // this.logOut = this.logOut.bind(this)
    // this.addDetails = this.addDetails.bind(this)
  }


  logOut = () =>{
    this.props.userLogout('studentLogin')
     
  }

  addDetails = (e) => {
    e.preventDefault();
    const { userID , fullname , qualification , city , phoneno  , email } = this.state ;
    let db = fire.database()
    db.ref(`Users/${userID}/studentinfo/`)
    .update({
      fullname,
      qualification ,
      city ,
      phoneno,
      email
    })
    .then(() => {
      swal('Success', 'Student Details Updated', 'success');
      this.setState({
        formShow:false
      })
  })

    
  }

  handleChange = (e) => {

    this.setState({
     [ e.target.name ] : e.target.value 
    
    })
  }

  componentWillMount(){
    this.authListener()
    this.setState({
     
    })
   
  
  }
  
componentDidMount(){
 
}
  
  authListener(){
    const { userData , userID , vacancyPosts , studentApplied } = this.state
    let db = fire.database()
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
          let uid = user.uid
        db
        .ref(`Users/${user.uid}/studentinfo`)
            .once('value', student => {
                let userdata = student.val();
                console.log('userData',student.val())
                let studentkey = student.key;
                // userData.push(student.val())
                this.setState({
                   userData :student.val() ,
                   userID : uid ,
                   fullname : userdata.fullname || " ", 
                   phoneno : userdata.phoneno || " " ,
                    qualification : userdata.qualification || " " , 
                    city :userdata.city || " " , 
                    email :userdata.email || " ",
                    studentkey : studentkey 
                })
               })
              db
              .ref(`Users/${user.uid}/appliedjoblist`)
              
                  .on('child_added', student => {
                      // let studentAppliedVacancy = student.val();
                      // console.log('studentAppliedVacancy',student.val())
                      studentApplied.push( student.val() )
                      this.setState({
                         studentApplied
                      })
                      
                    })
                    
              
                    console.log('studentApplied=====', studentApplied)
            } 
      else {
  
        // this.setState({user : null })
        // User is signed out.
        // ...
      }
    });


    // fire.database().ref('Users')
    // .orderByChild('Type')
    // .equalTo('company')
    // .on('child_added', company => {
    //     fire.database().ref(`Users/${company.key}/vacancy`)
    //     .on('child_added', vacancy => {
    //         vacancyPosts.push(vacancy.val());
    //         this.setState({
    //             vacancyPosts
    //         })
    //     })
    // })


      db.ref(`Users`)
      .on('child_added', company => {
      
        let companykey = company.key;
        if(company.val().Type ==='company'){
        fire.database().ref(`Users/${companykey}/vacancy`)
        .on('child_added', vacancy => {
            vacancyPosts.push( {vacancyObj : vacancy.val() , vacancyKEY : vacancy.key , companyKEY : companykey  });
            this.setState({
                vacancyPosts
            })
          })
        }
        })
     
                  console.log("vacancy====>",vacancyPosts)
  }

  applyForJob(companykey, vacancykey, index){
    const { userID , userData , studentApplied , vacancyPosts } = this.state

    fire.database().ref(`Users/${companykey}/vacancy/${vacancykey}`)
    .once('value', (snapshot) => {
        const studentUIds = snapshot.val().studentUIds || [];
        studentUIds.push(userID);

        fire.database().ref(`Users/${companykey}/vacancy/${vacancykey}`)
            .update({
                studentUIds
            })
            .then(() => {
              vacancyPosts.map(vacancy => {
                    if (vacancy.vacancyKEY === vacancykey) {
                        if(!vacancy.vacancyObj.studentUIds) {
                            vacancy.vacancyObj.studentUIds = [];
                        }
                        vacancy.vacancyObj.studentUIds.push(userID);
                        this.setState({ vacancyPosts });
                        return;
                    }
                })
            })
    })


            // fire.database().ref(`Users/${companykey}/vacancy/${vacancykey}`)
            // .update({
            //   userID
            // })

            // fire.database().ref(`Users/${userID}/appliedjoblist/`)
            // .push({
            //   companykey , vacancykey

            // })
            
          //  studentApplied.push({companykey,vacancykey})
          //  this.setState({studentApplied})
          //  console.log('studentApplied',studentApplied)
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


 vacancies = ()=>{

   const { vacancyPosts , studentApplied , userID} = this.state ;
   console.log('studentApplied=====> vaacancy', studentApplied)
   return (
    <div className="container">
  <h2>ALL VACANCIES</h2>
            
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Employee Name</th>
        <th>Company Name</th>
        <th>Position</th>
        <th>Qualification</th>
        <th>Location</th>
        <th>Experience</th>
        <th>Salary</th>
        <th>Contact Email</th>

      </tr>
    </thead>
    <tbody>
     {
       vacancyPosts.map((vacancylist,index)=>{
         const companykey = vacancylist.companyKEY ;
         const vacancykey = vacancylist.vacancyKEY ;
          console.log('vacancylist',vacancylist)

          console.log('uservacnkey',vacancylist.vacancyObj.studentUIds)
        
              return  <tr key={index}>
              <td>{vacancylist.vacancyObj.employeename}</td>
              <td>{vacancylist.vacancyObj.companyname}</td>
              <td>{vacancylist.vacancyObj.position}</td>
              <td>{vacancylist.vacancyObj.qualification}</td>
              <td>{vacancylist.vacancyObj.city}</td>
              <td>{vacancylist.vacancyObj.experience}</td>
              <td>{vacancylist.vacancyObj.salary}</td>
              <td>{vacancylist.vacancyObj.email}</td>
              <td>

                {/* <button type="button" className="btn btn-primary"  value='View' 
             
             onClick={()=> this.applyForJob(companykey, vacancykey, index)}
               >Apply</button> */}
                {
                  vacancylist.vacancyObj.studentUIds
                  &&
                  vacancylist.vacancyObj.studentUIds.includes(userID)
                  ?
                  <button type="button" className="btn btn-primary"  value='View' 
             disabled='disabled'
                 
                    >Applied</button>

                    :
                    <button type="button" className="btn btn-primary"  value='View' 
             
                    onClick={()=> this.applyForJob(companykey, vacancykey, index)}
                      >Apply</button>
                }
             
              </td>
              </tr>
            
          })
       
       
    
     
     }
      
     
    </tbody>
  </table>
</div>
   )
 } 
  render() {
const { userData , formShow , vacanciesShow } = this.state
  // console.log(userData.UserName)
    
    return (
    
      <div className="App">

                <h1>WELCOME STUDENT</h1>

        <button type="button" className="btn btn-warning"
                onClick={this.logOut}
        >LOGOUT</button>
        <br/> <br/>
          
          <div className="container">
            
            <div className="row">
              
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

             
              <button  className="btn btn-large btn-block btn-success"
              onClick={()=>{this.setState({formShow: true , vacanciesShow : false})}}
              >ADD DETAIL FORM</button>
              
                
              </div>

              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

              
                <button type="button" className="btn btn-large btn-block btn-success"
                  onClick={()=>{this.setState({formShow: false , vacanciesShow : true})}}
                >VACANCIES</button>

                  
                </div>
              
            </div>
            
          </div>


          {
            formShow
            && 
            this.adddetails()
          }


           {
            vacanciesShow
            && 
            this.vacancies()
          }

         
          
      </div>
    );
  }
}

export default STUDENTMAINPAGE;
