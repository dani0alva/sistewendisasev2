import { useState, useEffect, useContext } from "react"
import axiosInstance from "../../axiosApi/axiosApi";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import swal from 'sweetalert'
import Footer from '../footer';

const RegistroEmp=(props)=>{


const [nombre, setNombre] = useState("")
const [apellidos, setApellidos] = useState("")
const [razon_social, setRazonSocial] = useState("")

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

const [email, setEmail] = useState("")
const [telefono, setTelefono] = useState("")
const [direccion, setDireccion] = useState("")
const [cargo,setCargo]=useState("")
const [contraseña, setContraseña] = useState("")
const [contraseñar, setContraseñar] = useState("")
const [tipoDoc, setTipoDoc] = useState("")
const [nroDoc, setNroDoc] = useState("")
const [sexo, setSexo] = useState("")
const navigate = useNavigate()

const [desabilitarboton, setDesabilitarboton] = useState(false)
const [habiliardoc,setHabilitarDoc]= useState(true)
const [proveedor, setProveedor] = useState([]) 
const empresas = [props.servicio];


const handlerLogin = () => {
    navigate('/loginEmp')
}

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

const setCamposEmpresa = (id) => {

 if( id !== null & id !== undefined){
    if(id!=="RUC"){

    
    console.log("la empresa es :",empresas[0].empresa_rs)
    /*setRazonSocial(empresas.filter((list) => list.empresa_id==id)[0].empresa_rs);
    setDireccion(empresas.filter((list) => list.empresa_id==id)[0].empresa_ubi);
    setEmpresaid(empresas.filter((list) => list.empresa_id==id)[0].empresa_id);*/

    setRazonSocial(empresas[0].empresa_rs);
    setDireccion(empresas[0].empresa_ubi);
    setEmpresaid(empresas[0].empresa_id);

    }else{

        
        setRazonSocial("");
        setDireccion("");
        setEmpresaid("");
    }
    }else{
        
        setRazonSocial("");
        setDireccion("");
        setEmpresaid("");
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

const emailValidation=(email)=>{
    
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!email || regex.test(email) === false){
        /*seterrorEmail("Email is not valid")*/
           
        return false;
    }else{setEmail(email);}
    return true;
};

  

  const  updateNumber = (e) => {
    const val = e.target.value;
      if (e.target.validity.valid)
      { setTelefono(e.target.value);}
      else if (val === '' || val === '-'){ setTelefono(val)};
  }


const manejadorSubmit=(e)=>{


    setTimeout(() => {
        setDesabilitarboton(false); // count is 0 here
    }, 10000);
    setDesabilitarboton(true);

    e.preventDefault();

    registrar(empresa_id,nombre,apellidos,email,tipoDoc,nroDoc,telefono,cargo,sexo,contraseña,contraseñar);
    /*window.location.reload();*/

}



const registrar=(empresa_id,nombre,apellidos,email,tipo_documento,nero_documento,telefono,cargo,sexo,contraseña,contraseñar)=>{
    
    let empresa={
        empresa_id:empresa_id,
        first_name:nombre,
        last_name:apellidos,
        email:email,
        username:email,
        password:contraseña,
        tipo_doc:tipo_documento,
        nero_doc:nero_documento,
        telefono:telefono,
        cargo:cargo,
        sexo:sexo,
        registro:1
    }

    if(email!=="")
    { 
    if(nroDoc!=="")
    { 
    if(contraseña===contraseñar && contraseña!=="")
    {
        
             axiosInstance.post('/user/create/',empresa)
            
            .then(response=>{
                setProveedor(response.data);
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

/*
useEffect(()=>{
    setTimeout(() => {
        setDesabilitarboton(false); // count is 0 here
    }, 10000);
    setDesabilitarboton(true);
   
},[])*/


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
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Crear Nuevo Usuario</h3></div>
                                    <div className="card-body">

                                        <form onSubmit={manejadorSubmit}>

                                            <div className="row mb-3">
                                            <div className="col-md-4">
                                                    <select className="form-select" aria-label="Default select example" onChange={(e) => setCamposEmpresa(e.target.value)}>
                                                    
                                                    <option  defaultValue="default">RUC</option>
                                                    { 
                                                    empresas.map((empresa)=>(

                                                       
                                                    <option key={empresa.empresa_id} value={[empresa.empresa_id]}>{empresa.empresa_ruc}</option>
                                                    
                                                   
                                                    )

                                                    )
                                                    }
                                                    </select>
                                                </div>

                                                <div className="col-md-8">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputRazonSocial" type="text" placeholder="Ingrese Razon Social" value={razon_social} onChange={(e)=>setRazonSocial(e.target.value)} disabled/>
                                                        <label htmlFor="inputRazonSocial">Razon Social</label>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                 
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputFirstName" type="text" placeholder="Ingresa tu Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
                                                        <label htmlFor="inputFirstName">Nombre Responsable</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputLastName" type="text" placeholder="Ingresa tu Apellido" value={apellidos} onChange={(e)=>setApellidos(e.target.value)}/>
                                                        <label htmlFor="inputLastName">Apellidos Responsable</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                    <input  type="tel" className="form-control" id="inputTelefono" placeholder="930404735" value={telefono} onChange={(e)=>updateNumber(e) } pattern="^-?[0-9]\d*\.?\d*$"/>
                                                        <label htmlFor="inputTelefono">Telefono</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputCargo" type="text" placeholder="Ingresa tu Apellido" value={cargo} onChange={(e)=>setCargo(e.target.value)}/>
                                                        <label htmlFor="inputCargo">Cargo</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <select className="form-select" aria-label="Default select example" onChange={(e) => setDocumento(e.target.value)}>
                                                    <option defaultValue>Tipo Documento</option>
                                                    <option key="1" value="DNI">DNI</option>
                                                    <option key="2" value="PASAPORTE">Pasaporte</option>
                                                    <option key="3" value="CARNET">Carnet de Extranjeria</option>
                                                    <option key="4" value="LIBRETA">Libreta Electoral</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputNeroDoc" type="text" placeholder="Ingresa tu Apellido" value={nroDoc} onChange={(e)=>setNroDoc(e.target.value)} disabled={habiliardoc}/>
                                                        <label htmlFor="inputNeroDoc">Nro Documento</label>
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
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="inputDireccion" type="text" placeholder="Ingrese el domicilio fiscal"  value={direccion} onChange={(e)=>setDireccion(e.target.value)} disabled/>
                                                        <label htmlFor="inputDireccion">Direccion Comercial</label>
                                                    </div>

                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3">
                                                    <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com"  value={email} onChange={(e)=>setEmail(e.target.value) }/>
                                                    <label htmlFor="inputEmail">Correo Electronico</label>
                                                    </div>
                                            </div>
                                        
                                            </div>

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
                                                {/*<div className="d-grid"><a className="btn btn-primary btn-block" href="#">CrearCuenta</a></div>*/}
                                                <div className="d-grid"><button className="btn btn-primary btn-block" disabled={desabilitarboton} >CrearCuenta</button></div>
                
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                   
                                        <div className="small"><a href="#" onClick={()=>handlerLogin()}>Tienes una cuenta? Ir al login</a></div>
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
export default RegistroEmp