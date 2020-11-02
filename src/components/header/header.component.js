import React, { Component, useState, useContext } from 'react';
import { Context } from './../../store';
import './header.scss';
import NavBar from './navbar/navbar.component';


export default function Header(props) {

    const [storeState, setStoreState] = useContext(Context);



    return (
         
        <header>

        <NavBar />

    </header>
    );
}