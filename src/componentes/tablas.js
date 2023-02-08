
import React from 'react';
import { useEffect, useState,useMemo } from "react";
import { useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component';
import base_data_table from '../fuente/tabladedatos';
import FilterComponent from './filtrotabla';
import Piepagina from "./footer2";
import axios from "axios";
import { URL_BACKEND } from '../enviroments/enviroments';

const Tablas = () => {

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


    const URL = `${URL_BACKEND}/pacientedetail/${empresa_id}`;


    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = pacientes.filter(
		item => item.paciente_nroDoc && item.paciente_nroDoc.toLowerCase().includes(filterText.toLowerCase()),
	);

    const navigate = useNavigate()

    const handlerServicioDetalle = (fila) => {
       navigate(`/CargaDetPac/${fila.paciente_id}`)
      
    }

    const handlerDashboard = (fila) => {
           navigate(`/dashboard`)
        }
     
    
    const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
            console.log("el filtro para borrar es: "+filterText);
			if (filterText) {

                console.log("el filtro para borrar es: "+filterText);
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
         <h1 className="mt-4">Tables</h1>
         <ol className="breadcrumb mb-4">
             <li className="breadcrumb-item"><a href="#" onClick={()=>handlerDashboard()} >Dashboard</a></li>
             <li className="breadcrumb-item active">Tables</li>
         </ol>
         <div className="card mb-4">
             <div className="card-body">
                 DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the
                 <a target="_blank" href="https://datatables.net/">official DataTables documentation</a>
                 .
             </div>
         </div>
         <div className="card mb-4">
             <div className="card-header">
                 <i className="fas fa-table me-1"></i>
                 DataTable Example
             </div>
             <div className="card-body">
                { empresa_rs?
             <DataTable
                                columns={base_data_table.columns}
                                data={filteredItems}
                                pagination
		                        
                                paginationResetDefaultPage={resetPaginationToggle}
                                subHeader
			                    subHeaderComponent={subHeaderComponentMemo}

                                onRowClicked={(row)=>handlerServicioDetalle(row)}
                                fixedHeader
		                        fixedHeaderScrollHeight='600px'
                                paginationRowsPerPageOptions={[10, 15]}
                                theme='light'

                                pointerOnHover={true}
                                highlightOnHover={true}
                                /*customStyles={customStyles}*/
                                striped={true}
                            
                                
                                />
                                :
                                <DataTable
                                columns={base_data_table.columns}
                                data={null}
                                pagination
		                        
                                paginationResetDefaultPage={resetPaginationToggle}
                                subHeader
			                    subHeaderComponent={subHeaderComponentMemo}

                                onRowClicked={(row)=>handlerServicioDetalle(row)}
                                fixedHeader
		                        fixedHeaderScrollHeight='600px'
                                paginationRowsPerPageOptions={[10, 15]}
                                theme='light'

                                pointerOnHover={true}
                                highlightOnHover={true}
                                /*customStyles={customStyles}*/
                                striped={true} />
                            
                            }
             </div>
         </div>
     </div>
 </main>
 
 <Piepagina empresa_rs={empresa_rs}/>
</div>

) }
export default Tablas;