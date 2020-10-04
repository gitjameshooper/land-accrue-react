import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Header from './components/header/header.component';
import  Home from './components/home/home.component';
import  Login from './components/login/login.component';
import  Comps from './components/comps/comps.component';


import './App.scss';

function App() {
    return (
      <Router>
        <Header />
        <div className="container logo">
          <Route path="/" exact component={Home} />
          <Route path="/comps" exact component={Comps} />
          <Route path="/login" exact component={Login} />
        </div>
      </Router>
    );
}

export default App;