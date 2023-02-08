
import React from 'react';
import { useEffect, useState,useMemo } from "react";
import DataTable from 'react-data-table-component';
import { useNavigate} from 'react-router-dom'
import AnyChart from 'anychart-react/dist/anychart-react.min.js'
import base_data_table from '../fuente/tabladedatos';
import FilterComponent from './filtrotabla';
import Piepagina from "./footer2";
import { URL_BACKEND } from '../enviroments/enviroments';
import axios from "axios";

const Dashboard = () => {
    const [pacientes,setPacientes]=useState([]);
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
    const [resumen_est,setResumen_est]=useState([]);
    const [chart,setChart]=useState([]);

    const URL = `${URL_BACKEND}/pacientedetail/${empresa_id}`;

    const URLResumen = `${URL_BACKEND}/pacienteResumen/${empresa_id}`;


    const cargar_grafico=(array_resumen)=>{
     
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

    const listarResumen=()=>{
        if(idempresa >0){
        axios.get(URLResumen)
        .then(response=>{
            setResumen_est(response.data);
            cargar_grafico(response.data);
            
        })
        .catch(error=>{
            console.log(error);
    
        })
    } 
    }
    
    useEffect(()=>{
    
       listarResumen();
    },[])
    

    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    
    const filteredItems = pacientes.filter(
		item => item.paciente_nroDoc && item.paciente_nroDoc.toLowerCase().includes(filterText.toLowerCase()),
	);
    
    const navigate = useNavigate()
    const handlerServicioDetalle = (fila) => {
        
           navigate(`/CargaDetPac/${fila.paciente_id}`)
          
        }
     
    
    const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent  onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);


    const listar=()=>{
        if(idempresa >0){
        axios.get(URL)
        .then(response=>{
           setPacientes(response.data);
        })
        .catch(error=>{
            console.log(error);

        })
        }  
    }

useEffect(()=>{

     

       listar();

    },[])

    return (
        
    <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Dashboard</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    
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


                        <div className="card mb-4">


                            <div className="card-header">
                                <i className="fas fa-table me-1"></i>
                                DataTable Example
                            </div>
                            <div className="card-body">

                            <DataTable
                                columns={base_data_table.columns}
                                data={filteredItems}
                                pagination
		                        paginationComponentOptions={base_data_table.paginationOptions}
                                paginationResetDefaultPage={resetPaginationToggle}
                                onRowClicked={(row)=>handlerServicioDetalle(row)}
                                fixedHeader
		                        fixedHeaderScrollHeight='600px'
                                paginationRowsPerPageOptions={[10, 15]}
                                theme='light'

                                pointerOnHover={true}
                                highlightOnHover={true}
                                /*customStyles={customStyles}*/
                                striped={true}
                                subHeader
			                    subHeaderComponent={subHeaderComponentMemo}
                                />
                            
                            </div>



                    </div>
                </main>
                <Piepagina empresa_rs={empresa_rs}/>

                
            </div>
    
            
    ) }
export default Dashboard;