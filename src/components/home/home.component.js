import React, { Component } from 'react';
import './home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default class Home extends Component {

    render() {
        return (
            <div className="home-component">
                <h1>Home</h1>
           <FontAwesomeIcon icon={faCoffee} />
            </div>
        )
    }
}