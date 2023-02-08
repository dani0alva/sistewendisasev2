import React from 'react';
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react";

const Header = (props) => {

const titulo=props.titulo;
const [isLoggedin, setIsLoggedin] = useState(false);
const navigate = useNavigate()


const enviarDahsboard = () => {
    navigate('/dashboard')
}

const enviarCrearPaciente = () => {
    navigate('/registro')
}

const enviarLoginEmpresa = () => {
    navigate('/loginEmp')
}

const enviarGraficos = () => {
    navigate('/charts')
}

const enviarTablas = () => {
    navigate('/tablas')
}

const enviarCargaImagen = () => {
    navigate('/CargaDetPac')
}


const logout = () => {

    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('empresa_id');
    localStorage.removeItem('empresa_rs');
    localStorage.removeItem('usu_nroDoc');
   
    setIsLoggedin(false);
    
    navigate('/loginEmp');
    
}

    return (
        <>


<button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
 
 <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
     <div className="input-group">
         <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
         <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
     </div>
 </form>
 <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
     <li className="nav-item dropdown">
         <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
         <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
             <li><a className="dropdown-item" href="#" onClick={()=>enviarDahsboard()}>Dashboard</a></li>

             <li><hr className="dropdown-divider" /></li>
             <li><a className="dropdown-item" href="#" onClick={()=>enviarLoginEmpresa()}>Login Empresa</a></li>
             <li><a className="dropdown-item" href="#" onClick={()=>enviarCrearPaciente()}>Crear Paciente</a></li>
             <li><hr className="dropdown-divider" /></li>
             <li><a className="dropdown-item" href="#" onClick={()=>enviarGraficos()}>Graficos</a></li>
             <li><a className="dropdown-item" href="#" onClick={()=>enviarTablas()}>Tablas</a></li>
             <li><a className="dropdown-item" href="#" onClick={()=>enviarCargaImagen()}>Carga Imagen</a></li>
             <li><a className="dropdown-item" href="#!"onClick={()=>logout()}>Logout</a></li>
         </ul>
     </li>
 </ul>
 
           </>
) }
export default Header;