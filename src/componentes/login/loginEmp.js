import { useEffect, useState } from "react";
import {Routes,Route, useNavigate} from 'react-router-dom'

import axios from 'axios';
import axiosInstance from "../../axiosApi/axiosApi";
import swal from 'sweetalert'
import { setAuthToken } from "../config/authToken";
import piepagina from "../footer2";
import Footer from '../footer';

const LoginEmp =()=>{

    
    const [email, setEmail] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [desabilitarboton, setDesabilitarboton] = useState(false)
    
    let idempresa;
    if (typeof window !== "undefined") {
        idempresa=JSON.parse(localStorage.getItem("empresa_id")||0)
    }

    let rsempresa;
    if (typeof window !== "undefined") {
       rsempresa=localStorage.getItem("empresa_rs")
    }

    let usunroDoc;
    if (typeof window !== "undefined") {
        usunroDoc=localStorage.getItem("usu_nroDoc")
    }

    const [empresa_id,setEmpresaid]=useState(idempresa);
    const [empresa_rs,setEmpresars]=useState(rsempresa);
    const [usu_nroDoc,setUsuNeroDoc]=useState(usunroDoc);
    

   

    const [token,setToken]=useState("");

    const navigate = useNavigate()

    const handlerRegistro = () => {
        navigate('/registroEmp')
    }


    const mostrarAlertError=()=>{
        swal({
            title:"error",
            text:"Usuario o contraseña incorrecta",
            icon:"error",
            button:"Aceptar",
            timer:5000

        });
    }

    const mostrarAlertExito=()=>{
        swal({
            title:"exito",
            text:"Se logueo con existo",
            icon:"success",
            button:"Aceptar",
            timer:5000

        });
    }

 
     async function manejadorSubmit(e){

        setTimeout(() => {
            setDesabilitarboton(false); // count is 0 here
        }, 10000);
        setDesabilitarboton(true);

        e.preventDefault();

        let usuario={
            username:email,
            password:contraseña}
             /*
            try {
                const response =  await axiosInstance.post('/token/obtain/', usuario);
                console.log("el token es : "+response);
                axiosInstance.defaults.headers['Authorization'] = "JWT" + response.data.access;
                const token  =  response.data.token;
                setToken(token);
                localStorage.setItem('access_token', response.data.access)
                localStorage.setItem('refresh_token', response.data.refresh);
                

                mostrarAlertExito();
                return response;

            } catch (error) {
                mostrarAlertError();
                throw error;
            }*/

             await axiosInstance.post('/token/obtain/', usuario)
            .then((res) => {

                console.log(res);

                localStorage.setItem("access_token", res.data.access);
                localStorage.setItem("refresh_token", res.data.refresh);
                localStorage.setItem("empresa_id", res.data.empresa_id);
                localStorage.setItem("empresa_rs", res.data.empresa_rs);
                localStorage.setItem("usu_nroDoc", res.data.usu_nroDoc);
                
                axiosInstance.defaults.headers["Authorization"] =
                    "JWT " + localStorage.getItem("access_token");
                
                let token  =  res.data.access;
                let id = res.data.empresa_id;
                let rs = res.data.empresa_rs;
                let usu_nroDoc = res.data.usu_nroDoc;

                setToken(token);
                setEmpresaid(id);
                setEmpresars(rs);
                setUsuNeroDoc(usu_nroDoc);

                //setToken(token);
                /*this.setState({
                    loggedIn: true,
                });*/

                mostrarAlertExito();
            })
            .catch((err) => {
                console.log(err.message);
                mostrarAlertError();
            });
    };
    

    useEffect (()=>{
        /*localStorage.setItem("access_token",JSON.stringify(token));*/
        localStorage.setItem("empresa_id", JSON.stringify(empresa_id));
        localStorage.setItem("empresa_rs", empresa_rs);
        localStorage.setItem("usu_nroDoc", usu_nroDoc);
    },[empresa_rs])

    return(


        <div id="layoutSidenav_content">
        <div className="bg-secondary">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content ">
                <main >
                    <div className="container ">
                        {/*<h1>{empresa_rs}</h1>*/}
                        <div className="row justify-content-center ">
                            <div className="col-lg-5 mb-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login Empresa</h3></div>
                                    <div className="card-body">


                                        <form onSubmit={manejadorSubmit}>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" alue={email} onChange={(e)=>setEmail(e.target.value)}/>
                                                <label htmlFor="inputEmail">Email address</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputPassword" type="password" placeholder="Password"  value={contraseña} onChange={(e)=>setContraseña(e.target.value)}/>
                                                <label htmlFor="inputPassword">Password</label>
                                            </div>
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                <label className="form-check-label" htmlFor="inputRememberPassword">Recordar Password</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a className="small" href="password.html">Olvide Password?</a>
                                                <a className="btn btn-primary" disabled={desabilitarboton}><button className="btn btn-primary btn-block" >Login</button></a>
                                            </div>
                                        </form>


                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><a className="btn btn-outline-dark mt-auto" href="#" onClick={()=>handlerRegistro()}>Necesita nueva cuenta? Click Aqui!</a></div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
           
        </div>
        
        <Footer empresa_rs={empresa_rs}/>
    </div>
    
    </div>      
    )

    
}

export default LoginEmp;