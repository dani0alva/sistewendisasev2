import { useState, useEffect, useContext } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosApi/axiosApi";
import validator from "validator";
import swal from 'sweetalert'
import DatePicker from "react-datepicker";
import  { registerLocale, setDefaultLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Footer from '../footer';

registerLocale('es', es)

const Registro=(props)=>{

const [nombre, setNombre] = useState("")
const [apellidos, setApellidos] = useState("")
const [email, setEmail] = useState("")

const [pais, setPais] = useState("")
const [ciudad, setCiudad] = useState("")
const [sexo, setSexo] = useState("")
const [telefono, setTelefono] = useState("")
const [tipoDoc, setTipoDoc] = useState("")
const [nroDoc, setNroDoc] = useState("")

const [desabilitarboton, setDesabilitarboton] = useState(false)

const [direccion, setDireccion] = useState("")

let idempresa;
if (typeof window !== "undefined") {
    idempresa=JSON.parse(localStorage.getItem("empresa_id")||0)
}

let rsempresa;
if (typeof window !== "undefined") {
   rsempresa=localStorage.getItem("empresa_rs")
}

const [empresa_id,setEmpresaid]=useState(idempresa);
const [empresa_rs,setEmpresars]=useState(rsempresa);

const [contraseña, setContraseña] = useState("")
const [contraseñar, setContraseñar] = useState("")
const [emailError, setEmailError] = useState('')
const [startDate, setStartDate] = useState(new Date());
const [habiliardoc,setHabilitarDoc]= useState(true)

const [paciente, setPaciente] = useState([]) 

const navigate = useNavigate()

const handlerLogin = () => {
    navigate('/login')
}

const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmail(email);
    } else {
      /*setEmailError('Enter valid Email!')*/
    }
  };

  const setDocumento =(id) => {
    if( id !== null & id !== undefined){
        if(id!=="Tipo Documento"){
            setTipoDoc(id);
            setHabilitarDoc(false)
        }else{
            setTipoDoc("");
            setNroDoc("");
            setHabilitarDoc(true)
        }
    }
}

  const mostrarAlertExito=()=>{
    swal({
        title:"exito",
        text:"Se registro con existo",
        icon:"success",
        button:"Aceptar",
        timer:7000

    });
}

const mostrarAlertError=()=>{
    swal({
        title:"error",
        text:"erro al registrar",
        icon:"error",
        button:"Aceptar",
        timer:7000

    });
}
const  updateNumber = (e) => {
    const val = e.target.value;
      if (e.target.validity.valid)
      { setTelefono(e.target.value);}
      else if (val === '' || val === '-'){ setTelefono(val)};
  }

const mostrarAlertWarningEmail=()=>{
    swal({
        title:"error",
        text:"Se olvido ingesar el Email ,y el email debe ser unico unico",
        icon:"warning",
        button:"Aceptar",
        timer:7000

    });
}
const mostrarAlertWarningDocumento=()=>{
    swal({
        title:"error",
        text:"Se olvido ingesar el Nero. de Documento",
        icon:"warning",
        button:"Aceptar",
        timer:7000

    });
}

const mostrarAlertWarningPassword=()=>{
    swal({
        title:"error",
        text:"Las contraseñas no coinciden o es vacia",
        icon:"warning",
        button:"Aceptar",
        timer:7000

    });
}
   


const manejadorSubmit=(e)=>{

    setTimeout(() => {
        setDesabilitarboton(false); // count is 0 here
    }, 10000);
    setDesabilitarboton(true);

    e.preventDefault();

    registrar(empresa_id,nombre,apellidos,email,tipoDoc,nroDoc,telefono,pais,ciudad,sexo,startDate,contraseña,contraseñar);
    /*window.location.reload();*/
    


}



const registrar=(empresa_id,nombre,apellidos,email,tipo_documento,nero_documento,telefono,pais,ciudad,sexo,startDate,contraseña,contraseñar)=>{
    
    let usuario={
        empresa_id:empresa_id,
        first_name:nombre,
        last_name:apellidos,
        email:email,
        username:email,
        password:contraseña,
        pais:pais,
        ciudad:ciudad,
        tipo_doc:tipo_documento,
        nero_doc:nero_documento,
        telefono:telefono,
        sexo:sexo,
        fecha_nac:startDate.getFullYear()+'-'+startDate.getMonth()+'-'+startDate.getDate(),
        registro:2
    }

    

    if(email!=="")
    { 
      
        if(nroDoc!=="")
        { 
            if(contraseña===contraseñar && contraseña!=="")
            {
                axiosInstance.post('/user/create/',usuario)
                
                .then(response=>{
                    setPaciente(response.data);
                    mostrarAlertExito();
                    return response;
                })
                .catch(error=>{
                    console.log(error);
                    mostrarAlertError();

                })
            }else{
                mostrarAlertWarningPassword();
            }
        }else{
            mostrarAlertWarningDocumento();
        }
        
    }else{
        mostrarAlertWarningEmail();
    }


}



useEffect (()=>{
    /*localStorage.setItem("access_token",JSON.stringify(token));*/
    localStorage.setItem("empresa_id", JSON.stringify(empresa_id));
    
},[empresa_id])


return(
    
        
<div id="layoutSidenav_content">
                                      

<div className="bg-secondary">
<div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Crear Nuevo Paciente</h3></div>
                                    <div className="card-body">

                                        <form onSubmit={manejadorSubmit}>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputFirstName" type="text" placeholder="Ingresa tu Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
                                                        <label htmlFor="inputFirstName">Nombres</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputLastName" type="text" placeholder="Ingresa tu Apellido" value={apellidos} onChange={(e)=>setApellidos(e.target.value)}/>
                                                        <label htmlFor="inputLastName">Apellidos</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputPais" type="text" placeholder="Ingresa tu Pais" value={pais} onChange={(e)=>setPais(e.target.value)} />
                                                        <label htmlFor="inputPais">Pais</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputCiudad" type="text" placeholder="Ingresa tu Ciudad" value={ciudad} onChange={(e)=>setCiudad(e.target.value)}/>
                                                        <label htmlFor="inputCiudad">Ciudad</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">

                                                
                                                    <div className="form-check" onChange={(e) => setSexo(e.target.value)}>
                                                        <input className="form-check-input" value="M" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                            Masculino
                                                        </label>
                                                    </div>
                                                    <div className="form-check" onChange={(e) => setSexo(e.target.value)}>
                                                        <input className="form-check-input" value="F" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                            Femenino
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                    <input  type="tel" className="form-control" id="inputTelefono" placeholder="930404735" value={telefono} onChange={(e)=>updateNumber(e) } pattern="^-?[0-9]\d*\.?\d*$"/>
                                                <label htmlFor="inputTelefono">Telefono</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                <select className="form-select" aria-label="Default select example" onChange={(e)=>setDocumento(e.target.value)}>
                                                    <option defaultValue>Tipo Documento</option>
                                                    <option value="DNI">DNI</option>
                                                    <option value="PASAPORTE">Pasaporte</option>
                                                    <option value="CARNET">Carnet de Extranjeria</option>
                                                    <option value="LIBRETA">Libreta Electoral</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inpuNeroDoc" type="text" placeholder="Ingresa tu Apellido" value={nroDoc} disabled={habiliardoc} onChange={(e)=>setNroDoc(e.target.value)}/>
                                                        <label htmlFor="inpuNeroDoc">Nro Documento</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                                        <label htmlFor="inputEmail">Correo Electronico</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                <label htmlFor="inputCiudad">Fecha de Nac.</label>
                                                <div className="col-md-6">
                                                <DatePicker   selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                locale="es"
                                                dateFormat="dd/MM/yyyy"
                                                />    
                                                </div></div>
                                            </div>
                                            <span style={{
                                            fontWeight: 'bold',
                                            color: 'red',
                                            }}>{emailError}</span>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputPassword" type="password" placeholder="Create a password" value={contraseña} onChange={(e)=>setContraseña(e.target.value)}/>
                                                        <label htmlFor="inputPassword">Password</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" value={contraseñar} onChange={(e)=>setContraseñar(e.target.value)}/>
                                                        <label htmlFor="inputPasswordConfirm">Confirmar Password</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 mb-0">
                                                <div className="d-grid"><button className="btn btn-primary btn-block" disabled={desabilitarboton}>CrearCuenta</button></div>
                
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                   
                                        {/*<div className="small"><a href="#"  onClick={()=>handlerLogin()}>Tienes una cuenta? Ir al login</a></div>*/}
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
export default Registro