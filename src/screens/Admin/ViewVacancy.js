import React, { Component } from 'react';
import fire from '../../config/Fire'
// import swal from 'sweetalert'
class VIEWVACANCY extends Component {
  constructor(props){
    super(props)

    this.state = {
        vacancyData:[] ,
        appliedVacancy:[],
        companyVacancyShow:true
    }
   
  }


  logOut = () =>{
    this.props.userLogout('adminLogin')
     
  }

  gotoBack(){
    this.props.history.push(`/adminMainPage`)
  }
  componentWillMount() {
    const {
        vacancyData,
        // studentData,
        // companyData
    } = this.state;

    const companyKey = new URL(window.location.href).searchParams.get('key')

    let db = fire.database();
    db.ref(`Users/${companyKey}/vacancy`)
      .on('child_added', vacancy => {
        let vacancyList = vacancy.val();
        vacancyData.push(vacancyList);
        this.setState({
            vacancyData ,
            companyName : vacancy.val().companyname
        })
      })
        console.log("vacancyData============>", vacancyData)
      
 


  
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
    
     
      this.setState({companyVacancyShow:false})
    
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
           onClick={()=> this.setState({companyVacancyShow : true })}
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
    

vacancies = ()=>{
    const { vacancyData , companyName } = this.state ;
    return (
     <div className="container">
   <h2>
       <span  style={{color:'lightgreen'}} >COMPANY NAME</span> {companyName}</h2>
             
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
       studentData.map((studentInfo,index)=>{
         const Studentkey = studentInfo.studentkey;
         console.log('studentkey',Studentkey)
         if(studentInfo.studentObj.studentinfo){

          return <tr key={index}>
          <td>{studentInfo.studentObj.studentinfo.fullname}</td>
          <td>{studentInfo.studentObj.studentinfo.qualification}</td>
          <td>{studentInfo.studentObj.studentinfo.city}</td>
          <td>{studentInfo.studentObj.studentinfo.email}</td>
          <td>{studentInfo.studentObj.studentinfo.phoneno}</td>
          <td>
            <button type="button" class="btn btn-danger"  value='EDIT' 
            
            onClick={()=>{this.editStudent(index, Studentkey)}}

            >EDIT</button>
            
          </td>
          <td>
            <button type="button" class="btn btn-danger"  value='Delete'
            onClick={()=>this.deleteUser(index, Studentkey)}
            >DELETE</button>
            
          </td>
       
        </tr>
         }
         else {
         return <tr key={index}>
          <td>{studentInfo.studentObj.UserName}</td>
          <td>NULL</td>
          <td>NULL</td>
          <td>{studentInfo.studentObj.UserEmail}</td>
          <td>NULL</td>
          <td>
          <button type="button" class="btn btn-danger"  value='EDIT'
          
          onClick={()=>{this.editStudent(index, Studentkey)}}
          >EDIT</button>
          </td>
          <td>
            <button type="button" class="btn btn-danger"  value='Delete' 
             onClick={()=>this.deleteUser(index, Studentkey)}
            >DELETE</button>
            
          </td>
       
        </tr>
         }
         
       })
     }
      
     
    </tbody>
  </table>
</div>
   )
 } 

 companyInfo = ()=>{

  const { companyData} = this.state;
   return (
    <div className="container">
  <h2>ALL COMPANIES</h2>
            
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Company Name</th>
        <th>Email</th>
        <th>Phone no</th>
        <th>Joining Time</th>

      </tr>
    </thead>
    <tbody>
    {
       companyData.map((companyInfo,index)=>{
         const compnayKey = companyInfo.key;
         return <tr key={index}>
         <td>{companyInfo.companyObj.companyname}</td>
         <td>{companyInfo.companyObj.UserEmail}</td>
         <td>{companyInfo.companyObj.phoneno}</td>
         <td>{companyInfo.companyObj.JoiningTime}</td>
         {/* <td>{companyInfo.studentObj.phoneno}</td> */}
         <td>
           
           <button type="button" class="btn btn-primary"  value='View' >VIEW VANCANCY</button>
           
         </td>
         <td>
           
           <button type="button" class="btn btn-primary"  value='View'
           onClick={()=>this.editCompany(index, compnayKey)}
           >EDIT</button>
           
         </td>
         <td>
           
           <button type="button" class="btn btn-primary"  value='View' 
           
           onClick={()=>this.deleteCompany(index, compnayKey)}
           
           >DELETE</button>
           
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
const {  studentinfoShow , companyVacancyShow } = this.state
    
    return (
    
      <div className="App">

                <h1>WELCOME </h1>

           <button type="button" className="btn btn-primary"
                onClick={()=> this.gotoBack()}
        >BACK</button> <span>   </span>
        <button type="button" className="btn btn-warning"
                onClick={()=> this.logOut()}
        >LOGOUT</button>
        <br/>

       <br/>
          
         


          {
              companyVacancyShow ?   this.vacancies() : this.appliedStudent()

          }


           {
            studentinfoShow
            && 
            this.studentInfo()
          }

         
          
      </div>
    );
  }
}

export default VIEWVACANCY;
