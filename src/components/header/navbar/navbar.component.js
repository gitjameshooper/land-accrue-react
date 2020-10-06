import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon  from '@material-ui/icons/Close';
import './navbar.scss';

export default function NavBar() {
  const [sideBar, setSideBar] = React.useState(null);

  const showSideBar = () => setSideBar(!sideBar); 

 
  return (
    <div>
    <div className="navbar">
       <Link to="#" className="menu-bars"> <MenuIcon onClick={showSideBar} /> </Link>
    </div>
    <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
      <ul className="nav-menu-items" onClick={showSideBar} >
        <li className="navbar-toggle nav-text"><CloseIcon /></li>
        <li className="nav-text"><Link to="/" className="navbar-link">Home</Link></li>
        <li className="nav-text"><Link to="/login" className="navbar-link">Admin Login </Link></li>
        <li className="nav-text"><Link to="/land" className="navbar-link">Land</Link></li>
        </ul>

    </nav>
    </div>
  );
}
 