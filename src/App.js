import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Header from './components/header/header.component';
import  Home from './components/home/home.component';
import  Login from './components/login/login.component';
import  Land from './components/land/land.component';
import './App.scss';


class App extends Component {

  render() {
    return (
      <Router>
        <Header />
        <div className="container logo">
          <Route path="/" exact component={Home} />
          <Route path="/land" exact component={Land} />
          <Route path="/login" exact component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;