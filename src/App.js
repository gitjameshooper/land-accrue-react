import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Navbar from './components/navbar.component';
import  Home from './components/home.component';
import  User from './components/user.component';
import  State from './components/state.component';


import './app.css';

function App() {
    return (
      <div>
      <Router>
       
        <Navbar />
        <br />
        <Route path="/" exact component={Home} />
        <Route path="/state" exact component={State} />
        <Route path="/user" exact component={User} />

      </Router>
    
      </div>

    );
}

export default App;