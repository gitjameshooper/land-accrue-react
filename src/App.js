import React, { Component } from 'react';
import Store from './store';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/header/header.component';
import About from './components/about/about.component';
import Footer from './components/footer/footer.component';
import Login from './components/login/login.component';
import Land from './components/land/land.component';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import './App.scss';


const App = () => {
    return (
       <Store>
         <Router>
          <Header  />
          <Container component="main" maxWidth="lg">
          <Switch>
            <Route path="/" exact component={About} />
             <Route path="/land" exact component={Land} />
             <Route path="/login" exact component={Login} />
            </Switch>
          </Container>
          <Footer />
        </Router>
      </Store>

    );
}

export default App;