import React from 'react';
import { useState } from 'react';
import { URL_BACKEND } from '../enviroments/enviroments';
import axiosInstance from "../axiosApi/axiosApi";
import Footer from './footer';

const CargaMasiva =({ label, checked, ...props })=>{

    const[ocultarcarga,setOcultarCarga]= useState(false);
    const [desabilitarcarga, setDesabilitarcarga] = useState(false);
    const [imagenes,setImagenes]=useState(null);
    const [file,setfile]=useState(null);
    const [base64URL,setbase64URL]=useState(null);
    let base64URL2=""
    
    
    const esperar = tiempo => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('ok');
          }, tiempo);
        })
      }
      
      

    let  getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            console.log(baseURL);
            resolve(baseURL);
          };
          console.log(fileInfo);
        });
      };

    let rsempresa;
    if (typeof window !== "undefined") {
    rsempresa=localStorage.getItem("empresa_rs")
    }

    const [empresa_rs,setEmpresars]=useState(rsempresa);

    let idempresa;
    if (typeof window !== "undefined") {
        idempresa=JSON.parse(localStorage.getItem("empresa_id")||0)
    }

    const [empresa_id,setEmpresaid]=useState(idempresa);

    let usunroDoc;
    if (typeof window !== "undefined") {
        usunroDoc=JSON.parse(localStorage.getItem("usu_nroDoc")||"0")
    }

    const [usu_nroDoc,setUsuNeroDoc]=useState(usunroDoc);

    const URLGUARDAR = `${URL_BACKEND}/diagnostico/`;
    const URLACTUALIZAR = `${URL_BACKEND}/diagnosticodetail/`; 
    const URLEXISTEDIAGNOSTICO = `${URL_BACKEND}/diagnosticodetaildniexist/`;
    const URLGETDIAGNOSTICO = `${URL_BACKEND}/diagnosticodetaildni/`;
    
    const URLEXISTEPACIENTE = `${URL_BACKEND}/pacientefiltrodni/`; 
    


    const mostrarAlertRegistroErrorUsu=(nerodeimagen)=>{
        swal({
            title:"Error al Registrar",
            text:"Error al crear el usuario"+nerodeimagen,
            icon:"error",
            button:"Aceptar",
            timer:7000

        });
    }

    const mostrarAlertRegistroError=(nerodeimagen)=>{
        swal({
            title:"Error al Registrar",
            text:"Error al guardar el registro"+nerodeimagen,
            icon:"error",
            button:"Aceptar",
            timer:7000

        });
    }

    const mostrarAlertActualizaError=(nerodeimagen)=>{
        swal({
            title:"Error al Actualizar",
            text:"Error al actualizar el registro"+nerodeimagen,
            icon:"error",
            button:"Aceptar",
            timer:7000

        });
    }

    const mostrarAlertRegistroErrorImagen=(nerodeimagen)=>{
        swal({
            title:"Error al Cargar la imagen",
            text:"No se presento un error al covertir a base64 la imagen "+nerodeimagen,
            icon:"error",
            button:"Aceptar",
            timer:7000

        });
    }

    const mostrarAlertRegistrosinImagenes=()=>{
        swal({
            title:"Sin archivos cargados",
            text:"Error escoja algunas imagenes",
            icon:"error",
            button:"Aceptar",
            timer:7000

        });
    }


    async function subirimagenes (e){

    /*const subirimagenes=(e)=>{ */

        e.preventDefault();
        var i = 0,
        len = imagenes.length;
        const filtro = 'left';
        let idpaciente=0;
        let pos1 =0;
        let pos2 =0;
        let pos3 =0;
        let pos4 =0;
        let pos5 =0;
        let pos6 =0;
        let fecha_nac ="";
        let nombre ="";
        let cod_pac="";
        let sexo="";
        let eye="";

        let password ="123456";
        let pais = "Peru";
        let ciudad = "Lima";
        let tipo_doc = "COD_SIST";

        let first_name=""
        let last_name=""
        let email=""
        let response=null
        let result=null
        let response_diag=null
        let vprueba=10
        const validImageFiles = [];
        var currentDateObj = new Date();
        var numberOfMlSeconds = currentDateObj.getTime();
        var addMlSeconds = 5*60 * 60000;
        var d = new Date(numberOfMlSeconds - addMlSeconds);

        let seguro = confirm("Seguro que desea hacer la carga masiva de "+len +" imagenes");

        if(seguro){
        if(len!==0){ 

            setTimeout(() => {
                setDesabilitarcarga(false); // count is 0 here
            }, 10000);
            setDesabilitarcarga(true);    

        for (; i < len; i++) 
        {

            console.log("Type: " +imagenes[i].name)
            pos1=imagenes[i].name.indexOf("_")
            pos2=imagenes[i].name.indexOf("_",pos1+1)
            pos3=imagenes[i].name.indexOf("_",pos2+1)
            pos4=imagenes[i].name.indexOf("_",pos3+1)
            pos5=imagenes[i].name.indexOf("_",pos4+1)
            pos6=imagenes[i].name.indexOf(".",pos5+1)

            nombre=imagenes[i].name.substring(0,pos1)+" "+imagenes[i].name.substring(pos1+1,pos2)
            cod_pac=imagenes[i].name.substring(pos2+1,pos3)

            
            fecha_nac=imagenes[i].name.substring(pos3+1,pos4).substring(0,4)+'-'+imagenes[i].name.substring(pos3+1,pos4).substring(4,6)+'-'+imagenes[i].name.substring(pos3+1,pos4).substring(6,8)

            if(imagenes[i].name.substring(pos4+1,pos5)=="Female")
            {sexo="F"}else{sexo="M"}

            eye=imagenes[i].name.substring(pos5+1,pos6)
            first_name=imagenes[i].name.substring(pos1+1,pos2)
            last_name=imagenes[i].name.substring(0,pos1)
            email=imagenes[i].name.substring(pos2+1,pos3)+"@gmail.com"

            console.log("nombre es:"+nombre," y el codigo de pac es:"+cod_pac)
            console.log("fecha de nac es:"+fecha_nac," el sexo es:"+sexo," la posicion del ojo es: "+eye)
           
            console.log("la posicion es: ",i)
            console.log("la posicion es: ",URLEXISTEDIAGNOSTICO+cod_pac)
            cod_pac="1"+cod_pac;
            response=await axiosInstance.get(URLEXISTEDIAGNOSTICO+cod_pac);

            
            /*.then(response=>{*/

            if(response.data===-1)
            {
                    let usuario=
                    {
                            empresa_id:empresa_id,
                            first_name:first_name,
                            last_name:last_name,
                            email:email,
                            username:email,
                            password:password,
                            pais:pais,
                            ciudad:ciudad,
                            tipo_doc:tipo_doc,
                            nero_doc:cod_pac,
                            telefono:"",
                            sexo:sexo,
                            fecha_nac:fecha_nac,
                            registro:2
                    }

                    try {

                            await axiosInstance.post('/user/create/',usuario)
                            .then(response=>{
                                console.log("guardo el usuario",response)
                            })
                       
                            response =await axiosInstance.get(URLEXISTEPACIENTE+cod_pac)
                        /* .then(response=>{*/

                            idpaciente=response.data.paciente_id

                            let reader = new FileReader()

                            if(eye==="OS"){
                                console.log("entro al crear ojo izquierdo")
        
                                let diagnostico;
                    
                                let file = imagenes[i];
                                
                                await getBase64(file)
                                .then(result => {
                                    file["base64"] = result;
                                    setbase64URL(result);
                                    base64URL2=result;
                                })
                                .catch(err => {
                                    console.log(err);
                                    mostrarAlertRegistroErrorImagen(i);
                                });


                                diagnostico={
        
                                    diag_disease:"RETINOPATIA",
                                    dis_id:4,
                                    
                                    diag_img_eye_right:"",
                                    diag_img_eye_left:base64URL2,
        
                                    diag_nivel_disease_right:0,
                                    diag_nivel_disease_left:0,
                                    diag_nivel_disease_change_right:0,
                                    diag_nivel_disease_change_left:0,
                                    diag_fech_cre:d,
                                    diag_fech_mod:null,
                                    diag_est:1,
                                    paciente_id:idpaciente,
                                    diag_rnroDoc:usu_nroDoc
                                }

                                await axiosInstance.post(URLGUARDAR, diagnostico)
                                .then(response=>{
                                console.log("llego a guardar",response)
                                })
                                .then( console.log("termino de esperar"))
                                .catch(error=>{
                                    console.log(error,"-", "llego al cacth","-", base64URL2);
                                    mostrarAlertRegistroError(i);})

                            }else{
        
                                console.log("entro al crear ojo derecho")

                                let diagnostico;
                                let file = imagenes[i];
                                
                                await getBase64(file)
                             
                                .then(result => {
                                    file["base64"] = result;
                                    setbase64URL(result);
                                    base64URL2=result;
                                })
                                .catch(err => {
                                    console.log(err);
                                    mostrarAlertRegistroErrorImagen(i);
                                });
                               
                                 diagnostico={
        
                                    diag_disease:"RETINOPATIA",
                                    dis_id:4,
                                    
                                    diag_img_eye_right:base64URL2,
                                    diag_img_eye_left:"",
        
                                    diag_nivel_disease_right:0,
                                    diag_nivel_disease_left:0,
                                    diag_nivel_disease_change_right:0,
                                    diag_nivel_disease_change_left:0,
                                    diag_fech_cre:d,
                                    diag_fech_mod:null,
                                    diag_est:1,
                                    paciente_id:idpaciente,
                                    diag_rnroDoc:usu_nroDoc
                                 }

                                await axiosInstance.post(URLGUARDAR, diagnostico)
                                    .then(response=>{
                                    console.log("llego a guardar",response);
                                    })
                                    .then( console.log("termino de esperar"))
                                    .catch(error=>{
                                        console.log(error,"-", "llego al cacth","-", base64URL2);
                                        mostrarAlertRegistroError(i);})
                            }


                        /*return response;
                        })
                        .catch(error=>{
                            console.log(error);
                            mostrarAlertRegistroError();
        
                        })*/
                    
                   
                    } catch (error) {
                    
                    console.log(error.stack);
                    mostrarAlertRegistroErrorUsu(i)
                    }
                
                    
            }else if(response.data==0){

                response=await axiosInstance.get(URLEXISTEPACIENTE+cod_pac)
                .then(response=>{
                    console.log("se valido el paciente",response)
                })
                        
                idpaciente= response.data.paciente_id

                let reader = new FileReader()

                       
                if(eye==="OS"){
        
                    let diagnostico;
                
                    let file = imagenes[i];
                                
                    await getBase64(file)
                    .then(result => {
                        file["base64"] = result;
                        setbase64URL(base64URL);
                        base64URL2=result;
                    })
                    .catch(err => {
                        console.log(err);
                        mostrarAlertRegistroErrorImagen(i);
                    });


                    diagnostico={
        
                        diag_disease:"RETINOPATIA",
                        dis_id:4,
                                    
                        diag_img_eye_right:"",
                        diag_img_eye_left:base64URL2,
        
                        diag_nivel_disease_right:0,
                        diag_nivel_disease_left:0,
                        diag_nivel_disease_change_right:0,
                        diag_nivel_disease_change_left:0,
                        diag_fech_cre:d,
                        diag_fech_mod:null,
                        diag_est:1,
                        paciente_id:idpaciente,
                        diag_rnroDoc:usu_nroDoc
                    }
                                
                   
                        await axiosInstance.post(URLGUARDAR, diagnostico)
                        .then(response=>{
                            console.log("llego a guardar",response);
                            })
                            .then( console.log("termino de esperar"))
                            .catch(error=>{
                                console.log(error,"-", "llego al cacth","-", base64URL2);
                                mostrarAlertRegistroError(i);})
                       
                    
                }else{
    
                    
                    let diagnostico;
                
                    
                    let file = imagenes[i];
                                
                    await getBase64(file)
                    .then(result => {
                        file["base64"] = result;
                        setbase64URL(base64URL);
                        base64URL2=result;
                    })
                    .catch(err => {
                        console.log(err);
                        mostrarAlertRegistroErrorImagen(i);
                    });

                    diagnostico={
        
                        diag_disease:"RETINOPATIA",
                        dis_id:4,
                                    
                        diag_img_eye_right:base64URL2,
                        diag_img_eye_left:"",
        
                        diag_nivel_disease_right:0,
                        diag_nivel_disease_left:0,
                        diag_nivel_disease_change_right:0,
                        diag_nivel_disease_change_left:0,
                        diag_fech_cre:d,
                        diag_fech_mod:null,
                        diag_est:1,
                        paciente_id:idpaciente,
                        diag_rnroDoc:usu_nroDoc
                    }
        
                    
                        await axiosInstance.post(URLGUARDAR, diagnostico)
                        .then(response=>{
                            console.log("llego a guardar",response);
                            })
                            .then( console.log("termino de esperar"))
                            .catch(error=>{
                                console.log(error,"-", "llego al cacth","-", base64URL2);
                                mostrarAlertRegistroError(i);})
                        
                        
                    
                }


                   
            } else {

                let diag_id=0;

                console.log("entro al put")
                
                response =  await axiosInstance.get(URLEXISTEPACIENTE+cod_pac);
                idpaciente= response.data.paciente_id
                response_diag=await axiosInstance.get(URLGETDIAGNOSTICO+cod_pac)
                /*.then(response_diag=>{
                        console.log("se valido el diagnostico",response_diag)
                    })*/

                    diag_id=response_diag.data[0].diag_id
                    
                    let reader = new FileReader()

                        if(eye=="OS"){

                            console.log("entro al actualizar  ojo izquierdo")
                
                            let diagnostico;
                        
                            let file = imagenes[i];
                            
                            await getBase64(file)
                            .then(result => {
                                file["base64"] = result;
                                console.log("File Is", file);
                                setfile(file)
                                setbase64URL(result);
                                base64URL2=result;
                                
                            })
                            .catch(err => {
                                console.log(err);
                                mostrarAlertRegistroErrorImagen();
                            });

                             
                            diagnostico={

                                diag_disease:"RETINOPATIA",
                                dis_id:4,
                                paciente_id:idpaciente,
                                diag_img_eye_left:base64URL2,
                                diag_fech_mod:d,
                                posicion:"left"
                            }

                            await axiosInstance.put(URLACTUALIZAR+diag_id,diagnostico)
                            .then(response=>{
                                console.log("llego a guardar",response)
                                })
                                .then( console.log("termino de esperar"))
                                .catch(error=>{
                                    console.log(error,"-", "llego al cacth","-", base64URL2)
                                    mostrarAlertActualizaError(i);})
                           
                            
                        }else{
                        
                            console.log("entro al actualizar  ojo derecho")
                            let diagnostico;
                        
                            let file = imagenes[i];

                            await getBase64(file)
                            .then(result => {
                                file["base64"] = result;
                                console.log("File Is", file);
                                setfile(file)
                                setbase64URL(result);
                                base64URL2=result;
                            })
                            .catch(err => {
                                console.log(err);
                                mostrarAlertRegistroErrorImagen();
                            });
                           
                            diagnostico={

                                diag_disease:"RETINOPATIA",
                                dis_id:4,
                                paciente_id:idpaciente,
                                diag_img_eye_right:base64URL2,
                                diag_fech_mod:d,
                                posicion:"right"
                            }
                                
                                await axiosInstance.put(URLACTUALIZAR+diag_id,diagnostico)
                                .then(response=>{
                                    console.log("llego a guardar",response)
                                    })
                                    .then( console.log("termino de esperar"))
                                    .catch(error=>{
                                        console.log(error,"-", "llego al cacth","-", base64URL2)
                                        mostrarAlertActualizaError(i);})
                            
                        }
                    
            }
        
            
        }

        
        mostrarAlertMasivoExito();
    }else{mostrarAlertRegistrosinImagenes();}}
        
    }

const mostrarAlertMasivoExito=()=>{
    swal({
        title:"Carga Masivo con Exito",
        text:"Se realizo con exito la carga masiva",
        icon:"success",
        button:"Aceptar",
        timer:7000

    });
 }
const cargarimagenes =(e) => {
    
    console.log("la cantidad de imagnes seleccionadas es:"+e.target.files.length)
   
    setImagenes(e.target.files)
}


return(
<>
<div id="layoutSidenav_content">
        <div className="bg-secondary">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content ">
                <main>
                    <div className="container">
                        <div className="row justify-content-center ">
                            <div className="col-lg-9 mb-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Cargar Masiva</h3></div>
                                    <div className="card-body">
                                    <br/>
                                    {/*
                                    <div className="row mb-3" hidden={ocultarcarga}>
                                            <div className="col-md-6" >
                                                <input accept='.txt,.csv' 
                                                type="file" className="form-control" 
                                                id="inputFile01" onChange={(e)=>cargararchivoplano(e)}/>
                                            </div>


                                            <div className="col-md-6" disabled={desabilitarcarga}>
                                            <button type="button" className="btn btn-primary btn-lg">Cargar Archivo</button>
                                            </div>
                                    </div>
                                    */}
                                    

                                    <div className="row mb-3" hidden={ocultarcarga}>
                                            <div className="col-md-6" >
                                                <input accept='image/*' 
                                                type="file" className="form-control" 
                                                id="inputGroupFile04" multiple onChange={(e)=>cargarimagenes(e)}/>
                                            </div>

                                            <div className="col-md-6" >
                                            <button type="button" disabled={desabilitarcarga} className="btn btn-primary" onClick={subirimagenes}>Cargar Imagenes</button>
                                            </div>
                                    
                                    </div>

                               
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
</>

)


}

export default CargaMasiva;