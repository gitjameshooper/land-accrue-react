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
       <Link to="#" className="menu-bars" onClick={showSideBar}> <MenuIcon  /> </Link>
       <img className="la-logo" src={logo} alt="Logo" />
      <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSideBar} >
          <li className="navbar-toggle nav-text"><CloseIcon /></li>
          <li className="nav-text"><Link to="/" className="navbar-link"><span><RoomIcon /></span>About</Link></li>
          <li className="nav-text"><Link to="/login" className="navbar-link"><span><SupervisorAccountIcon /></span>Admin Login </Link></li>
          <li className="nav-text"><Link to="/land" className="navbar-link"><span><LandscapeIcon /></span>Land</Link></li>
          </ul>

      </nav>
    </div>
  );
}
 