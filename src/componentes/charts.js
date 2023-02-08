

import React from 'react';
import AnyChart from 'anychart-react/dist/anychart-react.min.js'
import { useNavigate} from 'react-router-dom'
import Piepagina from "./footer2";
import base_data_table from '../fuente/tabladedatos';
import axios from "axios";
import { useEffect, useState } from "react";
import { URL_BACKEND } from '../enviroments/enviroments';

const Charts = () => {

  // Creates Area chart.
  const [resumen_est,setResumen_est]=useState([]);
  const [resumen_est_dis,setResumen_est_dis]=useState([]);
  const [chart,setChart]=useState([]);
  const [disase,set_disase] = useState([]);

  const [disase_nom,setDisaseNom]=useState("");


  const URLDISASE = `${URL_BACKEND}/disase/`;

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
  
  const URL = `${URL_BACKEND}/pacienteDisaseResumen/${empresa_id}`;

  const URLACUM = `${URL_BACKEND}/pacienteResumen/${empresa_id}`;
 
  const navigate = useNavigate()
  const handlerDashboard = (fila) => {
    navigate(`/dashboard`)
 }

  const cargar_graficoAcum=(array_resumen)=>{
     
    let array=[]
    let array2=[]
    let campo1=""
    let campo2=0
    let campomap=""

    for (let value of array_resumen) {

        campo1=value.mes
        campo2=value.cantidad

        array2.push(campo1);
        array2.push(campo2);

        array.push(array2)

        array2=[]
    }

    setChart(array)

    console.log(array)

}


  const cargar_grafico=(array_resumen,disase_nom)=>{

    setDisaseNom(disase_nom)
    
      let array_resumen_filtro = [];
      let array=[]

      if(disase_nom!=="Disase")
      {

        array_resumen_filtro =array_resumen.filter((list) => list.disase==disase_nom)
       
        
        let array2=[]
        let campo1=""
        let campo2=0
        let campomap=""

        for (let value of array_resumen_filtro) {

            campo1=value.mes
            campo2=value.cantidad

            array2.push(campo1);
            array2.push(campo2);

            array.push(array2)

            array2=[]
        }

        setChart(array);

        console.log(array);
      }else{


        cargar_graficoAcum(resumen_est);
      }

  }

  const listar_disase=()=>{
     /*lista disase*/
     axios.get(URLDISASE)
     .then(response=>{
         set_disase(response.data);
     })
     .catch(error=>{
         console.log(error);

     })
  }

  useEffect(()=>{

    listar_disase();
 },[])

  const listar=()=>{
    if(idempresa >0)
    {
        axios.get(URL)
        .then(response=>{
            setResumen_est_dis(response.data);
            
        })
        .catch(error=>{
            console.log(error);

        })
    } 
  }


  const listarResumenAcum=()=>{
    if(idempresa >0)
    {
        axios.get(URLACUM)
        .then(response=>{
            setResumen_est(response.data);
            cargar_graficoAcum(response.data);
            setDisaseNom("Disase")
            
        })
        .catch(error=>{
            console.log(error);

        })
    } 
  }

  useEffect(()=>{

    listarResumenAcum();
    },[])

    useEffect(()=>{

    listar();
    },[])


useEffect (()=>{
    /*localStorage.setItem("access_token",JSON.stringify(token));*/
    localStorage.setItem("empresa_id", JSON.stringify(empresa_id));
},[empresa_id])

    return (
       
        <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Charts</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item"><a href="#" onClick={()=>handlerDashboard()}>Dashboard</a></li>
                            <li className="breadcrumb-item active">Charts</li>
                        </ol>
                        <div className="card mb-4">
                            <div className="card-body">
                                Chart.js is a third party plugin that is used to generate the charts in this template. The charts below have been customized - for further customization options, please visit the official
                                <a target="_blank" href="https://www.chartjs.org/docs/latest/">Chart.js documentation</a>
                                .
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-3">
                                                
                                                <select  id="inputIdDisase" className="form-select" aria-label="Default select example" value={disase_nom} onChange={(e)=>cargar_grafico(resumen_est_dis,e.target.value)}>
                                                    
                                                    <option  defaultValue="default" >Disase</option>
                                                    
                                                    
                                                    { 
                                                    disase.map((disase)=>(

                                                        <option key={disase.dis_id} value={disase.dis_nom}>{disase.dis_nom}</option>
                                                    
                                                    ))
                                                    }

                                                </select>

                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-chart-area me-1"></i>
                                Area Chart Example
                            </div>
                            <div className="card-body">
                            <AnyChart
                                        id="areaChart"
                                        type="area"
                                        stage={base_data_table.stage}
                                        height= {300}
                                        data={chart}/>
                            </div>
                            <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <i className="fas fa-chart-bar me-1"></i>
                                        Bar Chart Example
                                    </div>
                                    <div className="card-body">
                                        <AnyChart
                                        id="columnChart"
                                        type="column"
                                        stage={base_data_table.stage}
                                        height= {300}
                                        data={chart}/>
                                    </div>
                                    <div className="card-footer small text-muted">Updated yesterday at 11:58 PM</div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <i className="fas fa-chart-pie me-1"></i>
                                        Pie Chart Example
                                    </div>
                                    <div className="card-body">
                                    <AnyChart
                                        id="pieChart"
                                        type="pie"
                                        stage={base_data_table.stage}
                                        height= {300}
                                        data={chart}
                                        legend= {base_data_table.legend} 
                                        />
                                        </div>
                                    <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </main>
                
                <Piepagina empresa_rs={empresa_rs}/>
                
        </div>
        
    )}

    export default Charts;