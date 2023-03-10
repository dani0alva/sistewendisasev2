import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './navBar';
import { DataContextProvider } from "../context/dataContext";
import {Routes,Route} from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from 'axios';
import Dashboard from './dashboard';

import Charts from './charts';
import Login from './login/login';
import Registro from './login/registro';

import Tablas from './tablas';
import Boton from './Boton';
import CargarDetallePaciente from './cargar_detalle_pc';

import LoginEmp from './login/loginEmp';
import RegistroEmp from './login/registroEmp';
import { URL_BACKEND } from '../enviroments/enviroments';
import axiosInstance from "../axiosApi/axiosApi";
import CargaMasiva from './cargamasiva';
const Menuprincipal=(props)=>{

    let usunroDoc;
    if (typeof window !== "undefined") {
        usunroDoc=localStorage.getItem("usu_nroDoc")
    }

    let idempresa;
    if (typeof window !== "undefined") {
        idempresa=JSON.parse(localStorage.getItem("empresa_id")||0)
    }

    let rsempresa;
    if (typeof window !== "undefined") {
       rsempresa=localStorage.getItem("empresa_rs")
    }

    let logoem;
    if (typeof window !== "undefined") {
        logoem=localStorage.getItem("access_logo")
    }

    
    const [usu_nroDoc,setUsuNeroDoc]=useState(usunroDoc);
    const [logoempresa,setLogoEmpresa]=useState(logoem)

    const [empresa_id,setEmpresaid]=useState(idempresa);
    const [empresa_rs,setEmpresars]=useState(rsempresa);

    const URL = `${URL_BACKEND}/empresadetail/${empresa_id}`;

    const [servicioEmpresa,setservicioEmpresa]=useState([]);

    /*const setearnerodoc=()=>{
        setUsuNeroDoc("78784654");
        console.log("entra aqui")
    }*/

    const listar=()=>{

        if(empresa_id>0){
            axios.get(URL)
        .then(response=>{
            setservicioEmpresa(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }
    }

    useEffect(()=>{
        listar();

    },[])


/*
   useEffect(()=>{
        setUsuNeroDoc(usunroDoc);

    },[usu_nroDoc])*/
    
    useEffect (()=>{
        localStorage.setItem("empresa_id", JSON.stringify(empresa_id));
    },[empresa_id])

    return(
        <div className="sb-nav-fixed">
      <NavBar logo={logoempresa}/>
     <div id="layoutSidenav">

            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            {/*<a className="nav-link" href="index.html">*/}
                              <Link to="/dashboard" className="nav-link" >
                              <nav className="sb-sidenav-menu-nested nav">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                                </nav>
                              </Link>
                            {/*</a>*/}
                            <div className="sb-sidenav-menu-heading">Sesion</div>
                              <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link to="/loginEmp" className="nav-link" >Login Empresa</Link>
                                    <Link to="/registro" className="nav-link" >Crear Paciente</Link>
                                </nav>
                             
                            <Link to="/charts" className="nav-link" >
                                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                Graficos
                            </Link>
                            
                            <Link to="/tablas" className="nav-link" >
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Tablas
                            </Link>

                            <Link to="/CargaDetPac" className="nav-link" >
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Cargar Imagen
                            </Link>

                            <Link to="/cargamasiva" className="nav-link" >
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Cargar Masiva
                            </Link>

                            
                            
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logeado con DNI:</div>
                        {usu_nroDoc}
                    </div>
                </nav>
            </div>
           
        <DataContextProvider>
                <Routes>

                    <Route path='/' element={<LoginEmp/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/filtro' element={<Boton/>}/>
                    <Route path='/charts' element={<Charts/>}/>
                    <Route path='/loginEmp' element={<LoginEmp  /*setearnerodoc={setearnerodoc}*//> }/>   
                    <Route path='/login' element={<Login/>}/> 
                    <Route path='/tablas' element={<Tablas/>}/>    
                    <Route path='/CargaDetPac' element={<CargarDetallePaciente/>}/>   
                    <Route path='/registro' element={<Registro/>}/>    
                    <Route path='/registroEmp' element={<RegistroEmp servicio={servicioEmpresa} /> }/>
                    <Route path='/CargaDetPac/:servEmpId' element={<CargarDetallePaciente/> }/>
                    <Route path='/cargamasiva/' element={<CargaMasiva/> }/>
                    
                </Routes>
              
        </DataContextProvider>
        
        
        </div>
        

        </div>
       
    )
    
}

    
export default Menuprincipal;