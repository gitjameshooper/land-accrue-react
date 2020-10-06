import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'

export default class Header extends Component {

    render() {
        return (
            <header>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
				<Link to="/" className="navbar-brand"><FontAwesomeIcon icon={faBars} /></Link>
				
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav mr-auto">
						<li className="navbar-item">
						 <Link to="/" className="navbar-link">Home</Link>
						 </li>		
						 <li className="navbar-item">
						 <Link to="/login" className="navbar-link">Admin Login <FontAwesomeIcon icon={faUser} /></Link>
						 </li>		
						 <li className="navbar-item">
						 <Link to="/land" className="navbar-link">Land</Link>
						 </li>
					</ul>
				</div>
			</nav>
			</header>
        )
    }
}