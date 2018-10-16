import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css' ;


const HEADER = ()=>{
    return (
        <div>
        <u><h1>CAMPUS RECRUITMENT SYSTEM</h1></u>
        
        <div>
            <NavLink to="/studentLogin" className="btn btn-info mybtn" style={{margin:5}} > Student Login </NavLink>

            <NavLink to="/companyLogin" className="btn btn-info mybtn" style={{margin:5}} > Company Login </NavLink>

            <NavLink to="/adminLogin" className="btn btn-info mybtn" style={{margin:5}} > Admin Login </NavLink>
           
        </div>
        </div>
    )
}


export default HEADER;
