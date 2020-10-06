import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  Header from './components/header/header.component';
import  Home from './components/home/home.component';
import  Login from './components/login/login.component';
import  Land from './components/land/land.component';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import './App.scss';


class App extends Component {

  render() {
    return (
      <Router>
        <Header />
        <Container maxWidth="lg">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/land" exact component={Land} />
          <Route path="/login" exact component={Login} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;