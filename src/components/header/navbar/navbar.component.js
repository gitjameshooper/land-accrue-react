import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon  from '@material-ui/icons/Close';
import RoomIcon from '@material-ui/icons/Room';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LandscapeIcon from '@material-ui/icons/Landscape';
import logo from './../../../assets/img/la-mtn-logo.png';
import './navbar.scss';

export default function NavBar() {
  const [sideBar, setSideBar] = React.useState(null);

  const showSideBar = () => setSideBar(!sideBar); 

 
  return (
    <div className="navbar">
       <Link to="#" className="menu-bars nav-item" onClick={showSideBar}> <MenuIcon  /> </Link>
       <Link className="la-logo" to="/"><img  src={logo} alt="Logo" /></Link>
      <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSideBar} >
          <li className="navbar-toggle nav-item"><CloseIcon /></li>
          <li className="nav-item"><Link to="/" className="nav-link"><RoomIcon className="icons"/><span className="nav-text">About<span className="bot-border"></span></span></Link></li>
          <li className="nav-item"><Link to="/login" className="nav-link"><SupervisorAccountIcon className="icons"/><span className="nav-text">Admin Login<span className="bot-border"></span></span></Link></li>
          <li className="nav-item"><Link to="/land" className="nav-link"><LandscapeIcon className="icons"/><span className="nav-text">Land<span className="bot-border"></span></span></Link></li>
          </ul>

      </nav>
    </div>
  );
}
 