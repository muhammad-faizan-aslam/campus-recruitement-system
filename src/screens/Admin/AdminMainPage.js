import React, { Component } from 'react';
import fire from '../../config/Fire'
// import swal from 'sweetalert'
class ADMINMAINPAGE extends Component {
  constructor(props){
    super(props)

    this.state = {

      studentData:[] ,
      companyData:[]
    }
   
  }


  logOut = () =>{
    this.props.userLogout('companyLogin')
     
  }


  componentWillMount() {
    const {
        studentData,
        companyData
    } = this.state;
    let db = fire.database();
    db.ref(`Users`)
    .on('child_added', student => {
    
      let studentObj = student.val();
      if(studentObj.Type ==='student'){
        studentData.push({ studentObj :studentObj , studentkey: student.key });
    this.setState({
                studentData
                  })
        console.log("studentobj============>", studentData )
      }
 
              })
    // fire.database().ref('Users')
            
    //     .on('child_added', student => {
    //       if(student.Type==='student')
    //       {
    //         let studentINFO = student.val() ;
    //         studentData.push({ studentObj :studentINFO.studentInfo , Studentkey: student.key });
    //         this.setState({ studentData });
    //       console.log()
    //       }
    //     })

    db.ref('Users')
        .orderByChild('Type')
        .equalTo('company')
        .on('child_added', company => {
          let companyInfo = company.val() ;
            companyData.push({ companyObj : companyInfo , key: company.key });
            this.setState({
                companyData
            })
            console.log("company Data",companyData)
        })
}

deleteUser(index, Studentkey){
  const {
          studentData
      } = this.state;
    
  alert('work')
  
  
                    fire.database().ref(`Users/${Studentkey}`)
                        .remove()
                        .then(() => {
                            studentData.splice(index, 1);
                            this.setState({ studentData });
                        })
                      
   
}



deleteCompany(index, compnayKey){
  const { companyData } = this.state ;
  fire.database().ref(`Users/${compnayKey}`)
  .remove()
  .then(()=>{
    companyData.splice(index, 1);
    this.setState({ companyData })
  })
}

// deleteStudent = (index, key) => {
//   const {
//       studentData
//   } = this.state;

//   swal({
//       title: "Are you sure you you want to delete this Student?",
//       text: "Once deleted, you will not be able to recover this record!",
//       icon: "warning",
//       buttons: true,
//       dangerMode: true,
//   })
//       .then((willDelete) => {
//           if (willDelete) {
//               fire.database().ref(`Users/${key}`)
//                   .remove()
//                   .then(() => {
//                       studentData.splice(index, 1);
//                       this.setState({ studentData });
//                   })
//               swal('Success', 'Student Deleted');

//           } else {
//               swal("Your record is safe!");
//           }
//       });
// }

editStudent(index, Studentkey){
  this.props.history.push(`/studentEdit?key=${Studentkey}`)
}

editCompany(index, compnayKey){
  this.props.history.push(`/companyEdit?key=${compnayKey}`)
}

viewVacancy(index, compnayKey){
  this.props.history.push(`/viewVacancy?key=${compnayKey}`)
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
           
           <button type="button" class="btn btn-primary"  value='View' 
           
           onClick={()=>this.viewVacancy(index, compnayKey)}
           >VIEW VANCANCY</button>
           
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
const {   formShow , studentinfoShow } = this.state
    
    return (
    
      <div className="App">

                <h1>WELCOME </h1>

        <button type="button" className="btn btn-warning"
                onClick={()=> this.logOut()}
        >LOGOUT</button>
        <br/>

       <br/>
          
          <div className="container">
            
            <div className="row">
              
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

             
              <button  className="btn btn-large btn-block btn-success"
              onClick={()=>{this.setState({formShow: true , studentinfoShow : false})}}
              >POST VACANCY</button>
              
                
              </div>

              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

              
                <button type="button" className="btn btn-large btn-block btn-success"
                  onClick={()=>{this.setState({formShow: false , studentinfoShow : true})}}
                >
                Student Details
                </button>

                  
                </div>
              
            </div>
            
          </div>


          {
            formShow
            && 
            this.companyInfo()
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

export default ADMINMAINPAGE;
