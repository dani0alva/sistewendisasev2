import React from 'react';
import logo from './logo/logosf.png';
import Header from './header';

import {useEffect,useState } from 'react';

const NavBar = () => {

    let idempresa;
    if (typeof window !== "undefined") {
        idempresa=JSON.parse(localStorage.getItem("empresa_id")||0)
    }

    let logoem;
    if (typeof window !== "undefined") {
        logoem=localStorage.getItem("access_logo")
    }

    

    const [empresa_id,setEmpresaid]=useState(idempresa);

    const [logoempresa,setLogoEmpresa]=useState(logoem)
/*const logo=props.logo;*/


  
useEffect (()=>{
  localStorage.setItem("empresa_id", JSON.stringify(empresa_id));
  setLogoEmpresa(localStorage.getItem("access_logo"))
},[empresa_id])

return (


<nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">

  <a className="navbar-brand ps-3" href="#">
    <img src={logoempresa} className="card_logo"/></a>

    <Header/>
  </nav>
    ) 
}


export default NavBar;