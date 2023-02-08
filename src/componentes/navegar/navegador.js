import { useEffect, useState } from "react";
import {Routes,Route, Router} from 'react-router-dom'

import { Link } from 'react-router-dom';
import axios from "axios";
/*import menuprincipal from "./menuprincipal";*/
import Footer from "../footer";
import Menuprincipal from "../menuprincipal";




const  Navegador=()=>{

  


    return(

        <div>
        
            <Menuprincipal/>


        </div>
 
      
    )
}

export default Navegador;