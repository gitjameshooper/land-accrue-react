import React, { Component } from 'react';
import './header.scss';
import NavBar from './navbar/navbar.component';


export default class Header extends Component {

    constructor(props) {
        super(props);
      
    }

   
    render() {
        return (
            <header>
            
            <NavBar />

			</header>
        )
    }
}