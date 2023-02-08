import React from 'react';
import logo from './logo/logosf.png';
import Header from './header';

const NavBar = (props) => {

const titulo=props.titulo;


return (

  <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">

    <a className="navbar-brand ps-3" href="index.html">Start Bootstrap</a>

    <Header/>
  </nav>
    ) 
}

export default NavBar;