
import anychart from 'anychart'

const  base_data_table ={
    

 data : [
    
   ],


    columns : [
       
        {
            name: 'Nero.Doc',
            selector: row => row.paciente_nroDoc,
            sortable: true,
            width:'1',
        },

        {
            name: 'Nombres y Apellidos',
            selector: row => row.Usuario.first_name+' '+row.Usuario.last_name,
            sortable: true,
            width:'20',
        },
        
        
        {
            name: 'email',
            selector: row => row.Usuario.username,
            sortable: true,
            width:'10',
        },
       
        {
            name: 'Sexo',
            selector: row => row.paciente_sex,
            sortable: true,
            minWidth:'2',
            minWidth:'1',
        },
        
        {
            name: 'fecha_Nac.',
            selector: row => row.paciente_fechanac,
            sortable: true,
            width:'5',
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