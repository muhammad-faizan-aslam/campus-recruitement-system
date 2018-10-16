import React, { Component } from 'react';
import fire from '../../config/Fire'
import swal from 'sweetalert'
class COMPANYMAINPAGE extends Component {
  constructor(props){
    super(props)

    this.state = {
      companyData:'',
      studentData:[],
      vacancyData:[],
      appliedVacancy:[]
     
    }
   
  }


  logOut = () =>{
    this.props.userLogout('companyLogin')
     
  }

  postVacancy = (e) => {
    e.preventDefault();
    const { companyID , employeename , position , salary ,experience , companyname , qualification , city , email } = this.state;
   
    
    let db = fire.database()
    db.ref(`Users/${companyID}/vacancy/`)
    .push({
      employeename,
      qualification ,
      city ,
      experience,
      email,
      position,
      salary,
      companyname
    })
    .then(() => {
      swal('Success', 'VACANCY POST SUCCESSFULLY', 'success');
      this.setState({
        formShow:false
      })
  })

    this.setState({
      Employeename : '',
      qualification :'' ,
      city : '',
      phoneno : '',
      email : ''
    })
  }

  handleChange = (e) => {

    this.setState({
     [ e.target.name ] : e.target.value 
    
    })
  }

  componentWillMount(){
    this.setState({
      studentData:[],
      formShow : false ,
      studentinfoShow:false,
      appliedStudentShow:false,
      companyData:'' ,
      employeename :'',
      qualification:'',
      email :'',
      city:'',
      experience :'',
      companyname:'',
      position:'',
      salary:''
    })
    this.authListener()
  
  }
  authListener(){
    const { companyData , companyID , studentData ,vacancyData } = this.state
    let db = fire.database()
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
          let uid = user.uid
        db
        .ref(`Users/${user.uid}`)
            .once('value', company => {
                // let companyData = company.val();
                this.setState({
                   companyData : company.val() ,
                   companyID : uid 
                })
              })

              db.ref(`Users/${uid}/vacancy`)
              .on('child_added', vacancy => {
                let vacancyList = vacancy.val();
                vacancyData.push(vacancyList);
                this.setState({
                    vacancyData ,
                   
                })
              })
                console.log("vacancyData============>", vacancyData)              
            } 
      else {
  
        // this.setState({user : null })
        // User is signed out.
        // ...
      }
    });

    db.ref(`Users`)
    .on('child_added', student => {
    
      let studentObj = student.val();
      if(studentObj.Type ==='student'){
        studentData.push(studentObj);
    this.setState({
                studentData
                  })
        console.log("studentobj============>", studentObj )
      }
 
              })
                console.log("StudentDATA====>",studentData)
  }

 renderVacancyform = ( ) => {
   const { employeename , position , salary ,experience , companyname , qualification , city , email } = this.state;
    return (
         
      <div className="container">
      <form  style={{maxwidth:400,margin:'auto',width:'50%'}}   onSubmit={this.postVacancy}  >
              <h2></h2>

              <div className="form-group">
                <label htmlFor="Employeename">Name :</label>
                <input type="text" className="form-control" id="Employeename" placeholder="Enter Employeename"
                value={employeename}
                onChange={this.handleChange}
                name="employeename"/>
              </div>

              
              <div className="form-group">
                <label htmlFor="Companyname">Company Name :</label>
                <input type="text" className="form-control" id="Companyname" placeholder="Enter Company Name"
                value={companyname}
                onChange={this.handleChange}
                name="companyname"/>
              </div>


               
               <div className="form-group">
                <label htmlFor="Position">Position :</label>
                <input type="text" className="form-control" id="Position" placeholder="Enter Position "
                value={position}
                onChange={this.handleChange}
                name="position"/>
              </div>
              <div className="form-group">
                <label htmlFor="Experience">Experience :</label>
                <input type="text" className="form-control" id="Experience" placeholder="Enter Experience "
                value={experience}
                onChange={this.handleChange}
                name="experience"/>
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
                <label htmlFor="Salary">Salary :</label>
                <input type="text" className="form-control" id="Salary" placeholder="Enter Salary" 
                 value={salary}
                 onChange={this.handleChange}
                name="salary"/>
              </div>

              


             
              
            
              

              <button type="submit" className="frombtn">SUBMIT</button>
              </form>
      </div>
    )
  }


 studentInfo = ()=>{

  const {studentData} = this.state;
   return (
    <div className="container">
  <h2>ALL VACANCIES</h2>
            
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Student Name</th>
        <th>Qualification</th>
        <th>Location</th>
        <th>Email</th>
        <th>Phone no</th>

      </tr>
    </thead>
    <tbody>
    { 
       studentData.map((student,index)=>{
         if(student.studentinfo){
         return <tr key={index}>
         <td>{student.studentinfo.fullname}</td>
         <td>{student.studentinfo.qualification}</td>
         <td>{student.studentinfo.city}</td>
         <td>{student.studentinfo.email}</td>
         <td>{student.studentinfo.phoneno}</td>
      
       </tr>}
       })
     }
      
     
    </tbody>
  </table>
</div>
   )
 } 
 viewAppliedStudent(appliedStudentkeys){
const {appliedVacancy  } = this.state
if(appliedStudentkeys){
  console.log('appliedStudentkeys',appliedStudentkeys)
  appliedStudentkeys.map((studentkey,index)=>{
    return fire.database().ref(`Users/${studentkey}/studentinfo`)
  .once('value', student => {
    let studentObj = student.val();
    // console.log("student applied ============>", studentObj )
  
    appliedVacancy.push(student.val());
  this.setState({
              appliedVacancy
                })
      
    

            })
    
  })
  
}

 
  this.setState({formShow: false , studentinfoShow : false , vacancyShow:false , appliedStudentShow : true })

 }
 appliedStudent = ()=>{

  const {appliedVacancy} = this.state;
   return (
    <div className="container">
  <h2>APPLIED STUDENTS</h2>
            
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Student Name</th>
        <th>Qualification</th>
        <th>Location</th>
        <th>Email</th>
        <th>Phone no</th>
        <th>
       <button type="button"  className="btn btn-large btn-primary"
       onClick={()=> this.setState({formShow: false , studentinfoShow : false , vacancyShow:true , appliedStudentShow : false , appliedVacancy:[] })}
       >BACK</button>
       </th>

      </tr>
    </thead>
    <tbody>
    
    { 
      
       appliedVacancy.map((student,index)=>{
         console.log('applied vancy single', student)
        if(student){
         return <tr key={index}>
         <td>{student.fullname}</td>
         <td>{student.qualification}</td>
         <td>{student.city}</td>
         <td>{student.email}</td>
         <td>{student.phoneno}</td>
      
       </tr>

        }
        else{
          return  <td>NO DATA FOUND</td>
        }
       })
     }
      
     
    </tbody>
  </table>
</div>
   )
 } 



 myVacancy =()=>{
  const { vacancyData , appliedStudentShow} = this.state ;
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
      vacancyData.map((vacancylist,index)=>{
         console.log('vacancylist',vacancylist)
       
        return <tr key={index}>
        <td>{vacancylist.employeename}</td>
        <td>{vacancylist.companyname}</td>
        <td>{vacancylist.position}</td>
        <td>{vacancylist.qualification}</td>
        <td>{vacancylist.city}</td>
        <td>{vacancylist.experience}</td>
        <td>{vacancylist.salary}</td>
        <td>{vacancylist.email}</td>

         <td>
           {
             vacancylist.studentUIds 
             ?
             <button type="button" className="btn btn-primary"  value='View' 
             
             onClick={()=> this.viewAppliedStudent(vacancylist.studentUIds)}
              
                        >VIEW STUDENT APPLY</button>
                        :
               'NO STUDENT APPLY'
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
const { companyData , formShow , studentinfoShow , vacancyShow , appliedStudentShow} = this.state
    
    return (
    
      <div className="App">

                <h1>WELCOME {companyData.companyname}</h1>

        <button type="button" className="btn btn-warning"
                onClick={this.logOut}
        >LOGOUT</button>
        <br/> <br/>
          
          <div className="container">
            
            <div className="row">
              
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">

             
              <button  className="btn btn-large btn-block btn-success"
              onClick={()=>{this.setState({ vacancyShow : false ,  formShow: true , studentinfoShow : false , appliedStudentShow : false})}}
              >POST VACANCY</button>
              
                
              </div>

              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">

              
                <button type="button" className="btn btn-large btn-block btn-success"
                  onClick={()=>{this.setState({formShow: false , studentinfoShow : false , vacancyShow:true , appliedStudentShow : false })}}
                >
               MY VACANCY
                </button>

                </div>

              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">

              
                <button type="button" className="btn btn-large btn-block btn-success"
                  onClick={()=>{this.setState({formShow: false , studentinfoShow : true , vacancyShow:false ,  appliedStudentShow : false })}}
                >
                Student Details
                </button>

                  
                </div>
              
            </div>
            
          </div>
          { 
            vacancyShow 
            &&
            this.myVacancy()
          }

          {
            formShow
            && 
            this.renderVacancyform()
          }


           {
            studentinfoShow
            && 
            this.studentInfo()
          }

           {
            appliedStudentShow
            && 
            this.appliedStudent()
          }

         
          
      </div>
    );
  }
}

export default COMPANYMAINPAGE;
