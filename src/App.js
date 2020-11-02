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
// class App extends Component {
//     constructor(props) {
//         super(props);

//         this.state = { loggedIn: false }
//     }

//     render() {
//         let token = localStorage.getItem('token');
//         if (!this.state.loggedIn && !this.state.pendingReq && token) {
//             let config = {
//                 headers: {
//                     'Content-type': 'application/json',
//                     'x-auth-token': token
//                 }
//             }

//             axios.get("http://localhost:5000/users", config).then(res => {
//                     this.setState({ "loggedIn": true });
//                     console.log(res);
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 });
//         }
//         return (
//        <Router>
//         <Header loggedIn={this.state.loggedIn} />
//         <Container component="main" maxWidth="lg">
//         <Switch>
//           <Route path="/" exact component={About} />

//              <Route path="/land" exact render={(props) => <Land {...props} loggedIn={this.state.loggedIn} />} />
//            <Route path="/login" exact>{this.state.loggedIn ? <Redirect to="/land" /> : <Login />} </Route>
//           </Switch>
//         </Container>
//         <Footer />
//       </Router>
//         );
//     }
// }
// <Route path="/land" exact component={Land} />
// <Route path="/land" exact render={(props) => <Land {...props} loggedIn={this.state.loggedIn} />} />
// <Route path="/login" exact>{this.state.loggedIn ? <Redirect to="/land" /> : <Login />} </Route>

// <Route path="/land" exact loggedIn={this.state.loggedIn} component={Land} />
export default App;