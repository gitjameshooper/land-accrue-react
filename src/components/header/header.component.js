import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

export default class Header extends Component {

    render() {
        return (
            <header>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
				<Link to="/" className="navbar-brand">Home</Link>
				
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav mr-auto">
						<li className="navbar-item">
						 <Link to="/" className="navbar-link">Home</Link>
						 </li>		
						 <li className="navbar-item">
						 <Link to="/login" className="navbar-link">Login</Link>
						 </li>		
						 <li className="navbar-item">
						 <Link to="/comps" className="navbar-link">Comps</Link>
						 </li>
					</ul>
				</div>
			</nav>
			</header>
        )
    }
}