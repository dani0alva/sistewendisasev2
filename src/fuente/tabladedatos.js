
import anychart from 'anychart'

const  base_data_table ={
    

 data : [
    
   ],


    columns : [
       
        {
            name: 'Nero.Doc',
            selector: row => row.paciente_nroDoc,
            sortable: true,
        },
        
        {
            name: 'email',
            selector: row => row.Usuario.username,
            sortable: true,
        },
       
        {
            name: 'Sexo',
            selector: row => row.paciente_sex,
            sortable: true,
        },
        {
            name: 'Telefono',
            selector: row => row.paciente_tel,
            sortable: true,
        },

    
        {
            name: 'fecha_Nac.',
            selector: row => row.paciente_fechanac,
            sortable: true,
        },
/*
        {
            name: 'Enfermedad',
            selector: row => row.paciente_diagnostico[0].diag_disease,
            sortable: true,
        },

       /**/ 
       
       
       
    ],

    
 paginationOptions : {
	rowsPerPageText: 'Filas por página',
	rangeSeparatorText: 'de',
	selectAllRowsItem: true,
	selectAllRowsItemText: 'Todos',
    
},


legend: {
    background: 'lightgreen 0.4',
    position: 'absolute'},
/*
chart : [
        ["January", 10000],
        ["February", 12000],
        ["March", 18000],
        ["April", 11000],
        ["May", 9000]
    ],
*/

chart : [
    ["January", 10000],
    ["February", 12000],
    ["March", 18000],
    ["April", 11000],
    ["May", 9000]
],
stage : anychart.graphics.create(),
}

export default base_data_table;