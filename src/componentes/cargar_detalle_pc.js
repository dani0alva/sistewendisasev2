import React from 'react';
import { useRef,useEffect,useContext,useState } from 'react';
import {Routes,Route, useNavigate, renderMatches, json} from 'react-router-dom'
import axios, { formToJSON } from "axios";
import { Direction } from 'react-data-table-component';
import swal from 'sweetalert'
import { URL_BACKEND } from '../enviroments/enviroments';
import Footer from './footer';
import axiosInstance from "../axiosApi/axiosApi";
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import { reverse } from '@tensorflow/tfjs';
import { useParams } from "react-router-dom";

const CargarDetallePaciente =({ label, checked, ...props })=>{


    const buttonRef = useRef(null);
    const checkRef = useRef(null);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nombrecompleto,setNombreCompleto] =useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [edad, setEdad] = useState(0);
    const [telefono, setTelefono] = useState('');

    const [tipodoc, setTipoDoc] = useState('');
    const [nroDoc, setNroDoc] = useState('');
    const [sexo, setSexo] = useState('');
    const [idpaciente, setIdPaciente] = useState('');
    const [iddiagnostico, setIdDiagnostico] = useState(0);
    const [desabilitarcheck, setDesabilitarcheck] = useState(false);
    const [desabilitarcarga, setDesabilitarcarga] = useState(false);
    const [desabilitarcombo, setDesabilitarcombo] = useState(false);
    const [desabilitaronlyimg, setDesabilitarcargaonlyimg] = useState(true);

    const [respDNI, setResponsableDni] = useState(''); 

    /*checked de sexo*/
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    /*const defaultChecked = checked ? checked : false;*/

    /*checked de habilitar*/
    const [isMorningChecked, setIsMorningChecked] = useState(true);

    const [nivel_disease_left, set_Nivel_Disease_Left] = useState("0");
    const [nivel_disease_right, set_Nivel_Disease_Right] = useState("0");

    const [nivel_disease_change_left, set_Nivel_Disease_Change_Left] = useState("0");
    const [nivel_disease_change_right, set_Nivel_Disease_Change_Right] = useState("0");

    const [iddisase, set_Iddisase] = useState("");


    const [disabled, setdisabled] = useState(true);
    const [enabled, setenabled] = useState(false);

    const [etiqueta, setEtiqueta] = useState("Cargar Nivel");

    const [image_left,setImgLeft] = useState(null);
    const [image_right,setImgRigth] = useState(null);
    const [pacientes,setPacientes]=useState([]);

    const [imagenes,setImagenes]=useState(null);

    const [disase,set_disase] = useState([]);

   

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
        usunroDoc=JSON.parse(localStorage.getItem("usu_nroDoc")||"0")
    }


    const [empresa_id,setEmpresaid]=useState(idempresa);
    const [empresa_rs,setEmpresars]=useState(rsempresa);
    const [usu_nroDoc,setUsuNeroDoc]=useState(usunroDoc);

    const {servEmpId} = useParams();

    const URL_RN = {
        model: "https://www.facetagrafica.pe/modelo_redes_js/model.json"
        //model: "https://orangerx.b-cdn.net/model/model.json"
        //model: "C:/prueba/modelos/modelo_js/model.json"
        };

    const [model, setModel] = useState();

    const URL = `${URL_BACKEND}/pacientedetail/${empresa_id}`;
    const URLDISASE = `${URL_BACKEND}/disase/`;
    const URLGUARDAR = `${URL_BACKEND}/diagnostico/`;
    const URLACTUALIZAR = `${URL_BACKEND}/diagnosticodetail/${iddiagnostico}`; 
    const URLFILTRO = `${URL_BACKEND}/pacientefiltro/${servEmpId}`;  
    

    let  response = [];

   
    //const handlehabilitar = () => {
    async function handlehabilitar() {

        const denabled = !disabled;
        setdisabled(denabled);
        setenabled(disabled);

        //sethidden(enabled);
        const disMorningChecked = !isMorningChecked;
        setIsMorningChecked(disMorningChecked);
        if(disMorningChecked){
            setEtiqueta("Cargar Nivel");
        }else{
            setEtiqueta("Modificar Nivel");
        }
          
    }

    
    

    const referencia =useRef()
    const referencia2 =useRef()
    const referencia3 =useRef()
   //USE REF
   
   const uploadFilesleft = () =>{
    referencia2.current.click()
   }

   const uploadFilesright = () =>{
    referencia3.current.click()
   }


   //este estado servira para mostrar la imagen capturada
   const [preview,setPreview] = useState('');
   const [preview2,setPreview2] = useState('');
   /*carga de imagenes de la tabla*/
   const [preview3,setPreview3] = useState("");
   const [preview4,setPreview4] = useState("");

    const cargarimagenleft =(e) =>{
        const files1 = e.target.files[0];

        if( files1.value !== null & files1 !== undefined){
            setImgLeft(files1)

        }else{
            mostrarAlertError()
            setImgLeft("")
        }
    }

    const cargarimagenright =(e) =>{
        const files1 = e.target.files[0];

        if( files1.value !== null & files1 !== undefined){
            setImgRigth(files1)

        }else{
            mostrarAlertError()
            setImgRigth("")
        }
    }

    const cargarimagen =(e) => {
        setImagenes([])
        console.log("la cantidad de imagnes seleccionadas es:"+e.target.files.length)
        
        var control = document.getElementById('inputGroupFile01');

        const files1 = e.target.files[0];
        const files2 = e.target.files[1];
        
        /*
        let archivo ={};
        
        var i = 0,
        files = control.files,
        len = files.length;
        const filtro = 'left';

        for (; i < len; i++) {
            
          
           console.log("Filename: " + files[i].name);
           archivo = {name:files[i].name,type:files[i].type,size:files[i].size}
           
            let reader = new FileReader()

            reader.readAsDataURL(files[i])

            reader.onloadend = ()=>{
                setPreview3(reader.result.toString())
            }

            console.log("preview es: " + preview3);

        
        }

        setImagenes(files)
        console.log("las imahes eson :"+imagenes)
        var i = 0,
        len = imagenes.length;

        for (; i < len; i++) {
            console.log("el nombre es:"+imagenes[i].name);
        }

        */

        /*
        
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function(progressEvent){
            var fileContentArray = this.result.split(/\r\n|\n/);
            for(var line = 0; line < lines.length-1; line++){
            console.log(line + " --> "+ lines[line]);
            }
        };
        reader.readAsText(file);*/

        
        
        if( files1.value !== null & files2 !== undefined){
            setImgLeft(files1)
            setImgRigth(files2)

        }else{
            mostrarAlertError()
            setImgLeft("")
            setImgRigth("")
        }
       
    }

    const mostrarAlertError=()=>{
        swal({
            title:"Ingrese las dos imagenes",
            text:"La ultima seleccionada debe ser la de la izquierda",
            icon:"error",
            button:"Aceptar",
            timer:7000

        });
    }

    const mostrarAlertExito=()=>{
        swal({
            title:"Vista Preliminar",
            text:"La ultima seleccionada debe ser la de la izquierda",
            icon:"success",
            button:"Aceptar",
            timer:7000

        });
    }

    const confirmacionExito=(diagnostico)=>{

        swal({
            title: "Estas Seguro?",
            text: "Estas seguro de guardar el registro sin imagenes",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                try {
                    response =  axiosInstance.post(URLGUARDAR, diagnostico);
                    console.log("se guardo el diagnostico",response.data);
        
                    setIdDiagnostico(response.data.diag_id)
                    mostrarAlertRegistoExito();
        
                    return response;
        
                    } catch (error) {
                    console.log(error.stack);
                    mostrarAlertRegistroError();
                    } 
              
            } else {
              swal("Se olvido cargar las imagenes!");
            }
          });
    }

    const mostrarAlertRegistoExito=()=>{
        swal({
            title:"Registrado con Exito",
            text:"Se registro un nuevo diagnostico",
            icon:"success",
            button:"Aceptar",
            timer:7000

        });
    }

    const mostrarAlertRegistroError=()=>{
        swal({
            title:"Error al Registrar",
            text:"No se registro por algun motivo",
            icon:"error",
            button:"Aceptar",
            timer:7000

        });
    }

    const mostrarAlertActualizarExito=()=>{
        swal({
            title:"Actualizado con Exito",
            text:"Se actulizo el diagnostico previo",
            icon:"success",
            button:"Aceptar",
            timer:7000

        });
    }

    const mostrarAlertActualizarError=()=>{
        swal({
            title:"Error al Actualizar",
            text:"No se actualizo por algun motivo",
            icon:"error",
            button:"Aceptar",
            timer:7000

        });
    }

    const mostrarAlertErrorPredic=()=>{
        swal({
            title:"error",
            text:"No se pudo realizar la prediccion",
            icon:"error",
            button:"Aceptar",
            timer:7000

        });
    }

    const mostrarAlertErrorPredicOtro=()=>{
        swal({
            title:"error",
            text:"Prediccion disponible solo para retinopatia",
            icon:"error",
            button:"Aceptar",
            timer:7000

        });
    }

    

    const mostrarAlertExitoPredic=()=>{
        swal({

            title:"exito",
            text:"se realizo prediccion correctamente",
            icon:"success",
            button:"Aceptar",
            timer:7000

        });
    }


    useEffect(()=>{
      
        if(image_left){

            const reader = new FileReader()
           
            reader.readAsDataURL(image_left)
            reader.onloadend = ()=>{
                setPreview(reader.result.toString())
            }
        }else{
            setPreview('')
        }
      
    },[image_left])

    useEffect(()=>{
       
        if(image_right){
            const reader = new FileReader()
            reader.onloadend = ()=>{
                setPreview2(reader.result.toString())
            }
            reader.readAsDataURL(image_right)
        }else{
            setPreview2('')
        }
      
    },[image_right])

    /*useEffect(()=>{
        tf.ready().then(()=>{
            registrar
        });
        },[])*/

        
    const  updateNumber = (e,extra) => {

            const val = e.target.value;

            if(extra=="telefono")
            { 
                if (e.target.validity.valid)
                { 
                    setTelefono(e.target.value);
                }
                    else if (val === '' || val === '-'){ setTelefono(val)};
            }



            if(extra=="nleft")
            {
                
                if (e.target.validity.valid)
                { 
                set_Nivel_Disease_Left(e.target.value);
                }
            }
            if(extra=="nright")
            {
                if (e.target.validity.valid)
                { 
                set_Nivel_Disease_Right(e.target.value);
                }
            }
        
      }

    const updateEdad  = (e) => {
        const val = e.target.value;
          if (e.target.validity.valid & val<110)
          { setEdad(e.target.value);}
         }

     
    const listar=()=>{
        if(empresa_id >0){
        if( servEmpId !== null & servEmpId !== undefined){
            axiosInstance.get(URLFILTRO)
            .then(response=>{
                setPacientes([response.data]);
            })
            .catch(error=>{
                console.log(error);

            })
             
         }else{
            /*lista los pacientes*/ 

            
            axiosInstance.get(URL)
            .then(response=>{
               setPacientes(response.data);
            })
            .catch(error=>{
                console.log(error);

            })

             /*lista disase*/
             axiosInstance.get(URLDISASE)
            .then(response=>{
                set_disase(response.data);
            })
            .catch(error=>{
                console.log(error);
    
            })
        }  
        }
        }


    useEffect(()=>{

        

        listar(); 
        
            
         },[])

  
        
   

    useEffect(()=>{
        if( servEmpId !== null & servEmpId !== undefined){
        setDesabilitarcarga(true)
         }
    },[])


    const setCamposDiagnostico = (id) => { 
            
            let array2 =[]

            if(id!=="Diagnostico"){
            setImgLeft("")
            setImgRigth("")

            
            array2=pacientes.filter((list) => list.paciente_id==idpaciente)

           
            setPreview3(array2[0].paciente_diagnostico.filter((list) => list.diag_id==id)[0].diag_img_eye_left);
            setPreview4(array2[0].paciente_diagnostico.filter((list) => list.diag_id==id)[0].diag_img_eye_right);
            
            let nivelleft = array2[0].paciente_diagnostico.filter((list) => list.diag_id==id)[0].diag_nivel_disease_left
            let nivelrigth = array2[0].paciente_diagnostico.filter((list) => list.diag_id==id)[0].diag_nivel_disease_right
            let nivelchangeleft = array2[0].paciente_diagnostico.filter((list) => list.diag_id==id)[0].diag_nivel_disease_change_left
            let nivelchangerigth = array2[0].paciente_diagnostico.filter((list) => list.diag_id==id)[0].diag_nivel_disease_change_right
            let usunroDoc =  array2[0].paciente_diagnostico.filter((list) => list.diag_id==id)[0].diag_rnroDoc

            set_Nivel_Disease_Left(nivelleft)
            set_Nivel_Disease_Change_Left(nivelchangeleft)

            set_Nivel_Disease_Right(nivelrigth)
            set_Nivel_Disease_Change_Right(nivelchangerigth)
            setResponsableDni(usunroDoc);   


            /*
            for (let i = 0; i <= 5; i++) {

                if(pacientes.filter((list) => list.paciente_id==idpaciente)[0].paciente_diagnostico[i].diag_id==id)
                {
                setPreview3(pacientes.filter((list) => list.paciente_id==idpaciente)[0].paciente_diagnostico[i].diag_img_eye_left);
                setPreview4(pacientes.filter((list) => list.paciente_id==idpaciente)[0].paciente_diagnostico[i].diag_img_eye_right);
                
                let nivelleft = pacientes.filter((list) => list.paciente_id==idpaciente)[0].paciente_diagnostico[i].diag_nivel_disease_left
                let nivelrigth = pacientes.filter((list) => list.paciente_id==idpaciente)[0].paciente_diagnostico[i].diag_nivel_disease_right
                let nivelchangeleft = pacientes.filter((list) => list.paciente_id==idpaciente)[0].paciente_diagnostico[i].diag_nivel_disease_change_left
                let nivelchangerigth = pacientes.filter((list) => list.paciente_id==idpaciente)[0].paciente_diagnostico[i].diag_nivel_disease_change_right
                let usunroDoc =  pacientes.filter((list) => list.paciente_id==idpaciente)[0].paciente_diagnostico[i].diag_rnroDoc

                set_Nivel_Disease_Left(nivelleft)
                set_Nivel_Disease_Change_Left(nivelchangeleft)

                set_Nivel_Disease_Right(nivelrigth)
                set_Nivel_Disease_Change_Right(nivelchangerigth)
                setResponsableDni(usunroDoc);

                break;
                }
            }*/

            

        }else{

            set_Nivel_Disease_Left("")
            set_Nivel_Disease_Change_Left("")
            set_Nivel_Disease_Right("")
            set_Nivel_Disease_Change_Right("")
            setResponsableDni("");
            setPreview("");
            setPreview2("");
            setPreview3("");
            setPreview4("");
        }

  
 
}
    const setCamposPaciente  = (id) => {

     if( id !== null & id !== undefined){
        if(id!=="Nero Docu."){

            /*document.getElementById(`inputFirstName`).value=pacientes.filter((list) => list.paciente_id==id)[0].Usuario.first_name; 
            document.getElementById(`inputLastName`).value=pacientes.filter((list) => list.paciente_id==id)[0].Usuario.last_name;
            */

            setIdPaciente(id);
            setNombre(pacientes.filter((list) => list.paciente_id==id)[0].Usuario.first_name);
            setApellido(pacientes.filter((list) => list.paciente_id==id)[0].Usuario.last_name);
            setNombreCompleto(pacientes.filter((list) => list.paciente_id==id)[0].Usuario.first_name+' '+pacientes.filter((list) => list.paciente_id==id)[0].Usuario.last_name);
            setEmail(pacientes.filter((list) => list.paciente_id==id)[0].Usuario.email);
            setDireccion(pacientes.filter((list) => list.paciente_id==id)[0].paciente_dir);
            setTelefono(pacientes.filter((list) => list.paciente_id==id)[0].paciente_tel);
            setNroDoc(pacientes.filter((list) => list.paciente_id==id)[0].paciente_nroDoc);

            if(pacientes.filter((list) => list.paciente_id==id)[0].paciente_sex=="M"){
                setChecked1(true);
                setChecked2(false);
            }else{
                setChecked2(true);
                setChecked1(false);
            }

            let fecha1 = new Date(pacientes.filter((list) => list.paciente_id==id)[0].paciente_fechanac);
            let fecha2 = new Date()

            let resta = fecha2.getTime() - fecha1.getTime()

            document.getElementById(`inputEdad`).value=Math.round(resta/ (1000*60*60*24*365))

            setEdad(Math.round(resta/ (1000*60*60*24*365)));
            setDesabilitarcombo(true);
            


        }else{
            setIdPaciente("");
            setNombre("");
            setApellido("");
            setNombreCompleto("");
            setResponsableDni("");
            setEmail("");
            setDireccion("");
            setTelefono("");
            setNroDoc("");
            setEdad("");
            setIdDiagnostico(0);
            set_Nivel_Disease_Left("")
            set_Nivel_Disease_Change_Left("")
            set_Nivel_Disease_Right("")
            set_Nivel_Disease_Change_Right("")
            setPreview("");
            setPreview2("");
            setPreview3("");
            setPreview4("");
            setDesabilitarcombo(false);
            setChecked1(false);
            setChecked2(false);
            
        }
    }else{
        setNombre("");
        setApellido("");
        setChecked1(false);
        setChecked2(false);

    }
} 



async function postregistrar(e){
    
    e.preventDefault();

        var currentDateObj = new Date();
        var numberOfMlSeconds = currentDateObj.getTime();
        var addMlSeconds = 5*60 * 60000;
        var d = new Date(numberOfMlSeconds - addMlSeconds);

        const diagnostico={

            diag_disease:"RETINOPATIA",
            dis_id:parseInt(iddisase),
            diag_img_eye_right:preview2,
            diag_img_eye_left:preview,
            diag_nivel_disease_right:parseInt(nivel_disease_right),
            diag_nivel_disease_left:parseInt(nivel_disease_left),
            diag_nivel_disease_change_right:parseInt(document.getElementById("inputNivelEyeRight").value),
            diag_nivel_disease_change_left:parseInt(document.getElementById("inputNivelEyeLeft").value),
            
            diag_fech_cre:d,
            diag_fech_mod:null,
            diag_est:1,
            paciente_id:parseInt(idpaciente),
            diag_rnroDoc:usu_nroDoc
        }

        console.log("xml de diagnostico es:"+JSON.stringify(diagnostico));

    
        if(iddisase!=='Disase')
        { 
            if(preview2=='' ||preview==''){ 
                confirmacionExito(diagnostico);
            }else{
                try {
                    response = await axiosInstance.post(URLGUARDAR, diagnostico);
        
                    setIdDiagnostico(response.data.diag_id)
                    mostrarAlertRegistoExito();
        
                    return response;
        
                    } catch (error) {
                    console.log(error.stack);
                    mostrarAlertRegistroError();
                    }

            }
        }else{
            
            swal("Se olvido seleccionar la enfermedad!");}
    }
    
         

    /*const URL = `${URL_BACKEND}/paquete/`;*/

        const registrar =(e)=> {

            postregistrar(e);
            buttonRef.current.disabled = true;
        }


        async function actualizar(e) {


            setTimeout(() => {
                setDesabilitarcheck(false); // count is 0 here
            }, 10000);
            setDesabilitarcheck(true);

            if(isMorningChecked){
            if(iddisase==1){ 
                try {

                    /*Prediccion para Retinpatia*/
                    const  model= await tf.loadLayersModel(URL_RN.model)
            
                    // Load the model.
                    console.log('Successfully loaded model');
            
                    // Hacer la prediccion del ojo izquierdo.
            
                    const imgLeft = document.getElementById("img1");
                    let tensorLeft = tf.browser.fromPixels(imgLeft)
                    // .resizeNearestNeighbor([299,299]) // change the image size here
                    //.expandDims()
                    .reshape([1, 299, 299, 3])
                    //.mean(2)
                    
                    .toFloat()
                    //.div(tf.scalar(255.0))
                    .div(255)
                    .reverse(-1);
                    
                        
                    let predictLeft = await model.predict(tensorLeft).dataSync();
                    
                    console.log('la prediccion es :',predictLeft[0],"---",predictLeft[1],"---",predictLeft[2],"---",predictLeft[3]);
            
                    let nivelLeft=0;
                
        
                    for (let i = 0; i < predictLeft.length; i++) {
                        let valor=predictLeft[i]
                        let cont=0;
                        for(let j = 0; j < predictLeft.length; j++){
            
                            if(valor>predictLeft[j]){
                                cont = cont +1;
                            }
                            if(cont==3){
                            nivelLeft=i+1;
                            break;
                            }
                        }
            
                        if(nivelLeft!=0){
                            break;
                        }
                    }
                    console.log(nivelLeft);
                    set_Nivel_Disease_Left(nivelLeft.toString());
            
                    // Hacer la prediccion del ojo derecho.
            
                    const imgRigth = document.getElementById("img2");
                    let tensorRigth = tf.browser.fromPixels(imgRigth)
                    //.resizeNearestNeighbor([299,299]) // change the image size here
                
                    //.expandDims()
                    .reshape([1, 299, 299, 3])
                    //.mean(2)
                    .toFloat()
                    //.div(tf.scalar(255.0))
                    .div(255)
                    .reverse(-1);
                        
                    let predictRigth = await model.predict(tensorRigth).dataSync();
                    console.log('la prediccion es :',predictRigth[0]+"---"+predictRigth[1]+'---'+predictRigth[2]+"---"+predictRigth[3]);
            
                    let nivelRigth=0
        
                    for (let i = 0; i < predictRigth.length; i++) {
                        let valor=predictRigth[i]
                        let cont=0;
                        for(let j = 0; j < predictRigth.length; j++){
            
                            if(valor>predictRigth[j]){
                                cont = cont +1;
                            }
                            if(cont==3){
                            nivelRigth=i+1;
                            break;
                            }
                        }
                        if(nivelRigth!=0){
                            break;
                        }
                    }
                    console.log(nivelRigth);
                    set_Nivel_Disease_Right(nivelRigth.toString());
            
                    mostrarAlertExitoPredic();
                } catch (error) {
                    console.log(error.stack);
                    mostrarAlertErrorPredic();
                }
            }else{
                /*otra prediccion pronto a realizarse*/
                mostrarAlertErrorPredicOtro();
            }
        }else{

            
            if(iddiagnostico>0)
            {


                var currentDateObj = new Date();
                var numberOfMlSeconds = currentDateObj.getTime();
                var addMlSeconds = 5*60 * 60000;
                var d = new Date(numberOfMlSeconds - addMlSeconds);

                const diagnostico={

                    diag_disease:"RETINOPATIA",
                    dis_id:parseInt(iddisase),
                    paciente_id:parseInt(idpaciente),
                    diag_nivel_disease_change_left: parseInt(document.getElementById("inputNivelEyeLeft").value),
                    diag_nivel_disease_change_right:parseInt(document.getElementById("inputNivelEyeRight").value),
                    diag_fech_mod:d

                }
            
                try {
                const response = await axiosInstance.put(URLACTUALIZAR,diagnostico);
                mostrarAlertActualizarExito();

                return response;
                } catch (error) {
                mostrarAlertActualizarError();
                console.log(error.stack);
                }
 
            }else{

                postregistrar(e);
               

            }
        }
    }

    useEffect (()=>{
        /*localStorage.setItem("access_token",JSON.stringify(token));*/
        localStorage.setItem("empresa_id", JSON.stringify(empresa_id));
        localStorage.setItem("empresa_rs", empresa_rs);
        localStorage.setItem("usu_nroDoc", usu_nroDoc);
    },[empresa_rs])
        
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
                                    
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Cargar Imagen</h3></div>
                                    <div className="card-body">
                                    <form className="row g-1" onSubmit={registrar}>
                                        <div className="row mb-3">
                                        <div className="col-md-3">

                                                    <select id="inputIdPaciente" className="form-select" aria-label="Default select example" onChange={(e) => setCamposPaciente(e.target.value)}>
                                                    
                                                    <option  defaultValue="default" >Nero Docu.</option>
                                                    { 
                                                    pacientes.map((paciente)=>(

                                                    <option key={paciente.paciente_id} value={[paciente.paciente_id]}>{paciente.paciente_nroDoc}</option>
                                                    
                                                   
                                                    )

                                                    )
                                                    }
                                                    </select>
                                              
                                        </div>
                                            <div className="col-md-6" >
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className="form-control" id="inputNombreCompleto" type="text" placeholder="Ingresa tu Nombre" value={nombrecompleto} onChange={(e)=>setNombre(e.target.value)} disabled/>
                                                <label htmlFor="inputNombreCompleto">Nombres</label>
                                                </div>
                                            </div>
                                            

                                            <div className="col-md-3" hidden={desabilitarcarga}>
                                            
                                            <select  id="inputIdDisase" className="form-select" aria-label="Default select example" value={iddisase} onChange={(e)=>set_Iddisase(e.target.value)}>
                                                
                                                <option  defaultValue="default" >Disase</option>
                                                
                                                
                                                { 
                                                 disase.map((disase)=>(

                                                    <option key={disase.dis_id} value={disase.dis_id}>{disase.dis_nom}</option>
                                                 
                                                 ))
                                                }

                                            </select>

                                        </div>
                                                    
                                            <div className="col-md-3" hidden={!desabilitarcarga}>
                                            
                                                <select disabled={!desabilitarcombo} id="inputIdDiagnostico" className="form-select" aria-label="Default select example" onChange={(e) => setCamposDiagnostico(e.target.value)}>
                                                    
                                                    <option  defaultValue="default" >Diagnostico</option>
                                                    
                                                    { 
                                                    pacientes.map((paciente)=>(

                                                        paciente.paciente_diagnostico.map((diagnostico)=>(

                                                            <option key={diagnostico.diag_id} value={[diagnostico.diag_id]}>{diagnostico.Disase.dis_nom}</option>
                                                    
                                                        ))

                                                    ))
                                                    }


                                                </select>

                                            </div>
                                     
                                            
                                        </div>
                                        
                                        <div className="row mb-3">

                                        <div className="col-md-8">
                                            
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={direccion} onChange={(e)=>setDireccion(e.target.value)} disabled/>
                                                <label htmlFor="inputAddress">Direccion</label>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input  type="tel" className="form-control" id="inputTelefono" placeholder="930404735" value={telefono} onChange={(e)=>updateNumber(e,'telefono') } pattern="^-?[0-9]\d*\.?\d*$" disabled/>
                                                <label htmlFor="inputTelefono">Telefono</label>
                                            </div>   
                                        </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <div className="col-md-4">

                                                        <div className="form-check"  >
                                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={checked1} onChange={() => setSexo("M")}/>
                                                            Masculino
                                                        </label>
                                                        </div>

                                                        <div className="form-check" >
                                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={checked2} onChange={() => {setSexo("F")}} />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                            Femenino
                                                        </label>
                                                        </div>
                                                        
                                            </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputNroDoc" type="text" placeholder="Ingresa tu Apellido" value={nroDoc} onChange={(e)=>setNroDoc(e.target.value)} disabled/>
                                                        <label htmlFor="inputNroDoc">Nro Documento</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputEdad" type="text" placeholder="Ingresa tu Edad" value={edad} onChange={(e)=>updateEdad(e) } pattern="^-?[0-9]\d*\.?\d*$" disabled/>
                                                        <label htmlFor="inputEdad">Edad</label>
                                                    </div>
                                                </div>


                                        </div>


                                        <div className="row mb-3" hidden={desabilitarcarga}>
                                            <div className="col-md-6">
                                                <label htmlFor="inputImg" className="form-label">image_left</label>
                                                
                                                {
                                                    image_left?
                                                <img id="img1" src={preview} onClick={uploadFilesleft} className="img-thumbnail" alt="..."/>
                                                    :<img id="img1" src="" onClick={uploadFilesleft} className="img-thumbnail" alt="..."/>
                                            }
                                                </div>
                                            <div className="col-md-6" >
                                            <label htmlFor="inputImg" className="form-label">image_right</label>
                                            {
                                                    image_right?
                                                <img id="img2" src={preview2} onClick={uploadFilesright} className="img-thumbnail" alt="..."/>
                                                :<img src="" onClick={uploadFilesright} className="img-thumbnail" alt="..."/>
                                            }
                                            </div>
                                        </div>


                                        <div className="row mb-3" hidden={!desabilitarcarga}>
                                            <div className="col-md-6">
                                                <label htmlFor="inputImg" className="form-label">image_left</label>
                                                
                                                <img id="img1" src={preview3}  className="img-thumbnail" alt="..."/>
                                                   
                                                </div>
                                            <div className="col-md-6">
                                            <label htmlFor="inputImg" className="form-label">image_right</label>
                                           
                                                <img id="img2" src={preview4}  className="img-thumbnail" alt="..."/>
                                               
                                            </div>
                                        </div>


                                        <div className="row mb-3" >
                                            <div className="col-md-6">
                                            <div className="form-floating">
                                                <input  className="form-control" id="inputNivelEyeLeft" type="text"  value={nivel_disease_left} onChange={(e)=>updateNumber(e,"nleft") } pattern="[0-5]{0,1}"   disabled = {disabled}/>
                                                <label htmlFor="inputNivelEyeLeft">Nivel Ojo Izquierdo</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className="form-floating">
                                                <input  className="form-control" id="inputNivelEyeRight" type="text" value={nivel_disease_right} onChange={(e)=>updateNumber(e,"nright") } pattern="[0-5]{0,1}" disabled = {disabled}/>
                                                <label htmlFor="inputNivelEyeRight">Nivel Ojo Derecho</label>
                                                </div> 
                                            </div>
                                        </div>


                                        <div className="row mb-3" hidden={!desabilitarcarga}>
                                            <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input  className="form-control" id="inputNivelEyeLeft" type="text" value={nivel_disease_change_left}   disabled = {disabled}/>
                                                <label htmlFor="inputNivelEyeLeft">Nivel Ojo Izquierdo Change</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input  className="form-control" id="inputNivelEyeRight" type="text" value={nivel_disease_change_right}  disabled = {disabled}/>
                                                <label htmlFor="inputNivelEyeRight">Nivel Ojo Derecho Change</label>
                                                </div> 
                                            </div>
                                        </div>



                                        <div className="row mb-3" >
                                            <div className="col-md-6" hidden={desabilitarcarga}>
                                                <input accept='image/*' ref={referencia}
                                                type="file" className="form-control" 
                                                id="inputGroupFile01" multiple onChange={(e)=>cargarimagen(e)}/>
                                            </div>

                                            <div className="col-md-6" hidden={desabilitaronlyimg}>
                                                <input accept='image/*' ref={referencia2}
                                                type="file" className="form-control" 
                                                id="inputGroupFile02" onChange={(e)=>cargarimagenleft(e)}/>
                                            </div>

                                            <div className="col-md-6" hidden={desabilitaronlyimg}>
                                                <input accept='image/*' ref={referencia3}
                                                type="file" className="form-control" 
                                                id="inputGroupFile03" onChange={(e)=>cargarimagenright(e)}/>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} disabled/>
                                                    <label htmlFor="inputEmail">Email</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6" hidden={!desabilitarcarga}>
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control" id="ResponsableDni" type="email" placeholder="45142357" value={respDNI} onChange={(e)=>setResponsableDni(e.target.value)} disabled/>
                                                    <label htmlFor="ResponsableDni">DNI del responsable</label>
                                                </div>
                                            </div>
                                        </div>

                                       
                                        <div className="row mb-3" hidden={desabilitarcarga}>
                                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                        <div className="col-md-3">
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="gridCheck">
                                                    Editar
                                                </label>
                                                <input className="form-check-input" type="checkbox" id="gridCheck" onChange={handlehabilitar} checked={isMorningChecked}/>
                                            </div>
                                        </div>  
              
                                        
                                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0" >
                                            
                                            <label className="form-check-label" htmlFor="gridCheck">
                                                {   
                                                    isMorningChecked ?
                                                    <i className="bi bi-database-fill-up"><input className="form-check-input" type="checkbox" id="gridCheck" disabled={desabilitarcheck} onChange={actualizar} checked={false} />{etiqueta}</i>
                                                    :<i className="bi bi-pencil-square"><input className="form-check-input"  type="checkbox" id="gridCheck" disabled={desabilitarcheck} onClick={actualizar} checked={false} />{etiqueta}</i>
                                                }
                                                

                                            </label>
                                            
                                        
                                            </div>
                                        </div>
                                        
                                        </div>
                                        
                                        <div className="row mb-3" hidden={desabilitarcarga}> 
                                        <div className="mt-4 mb-0">
                                                <div className="d-grid"><button className="btn btn-primary" ref={buttonRef} disabled={enabled} >Procesar</button></div>
                
                                            </div>
                                            </div>
                                        </form>

                                        

                               
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

export default CargarDetallePaciente;