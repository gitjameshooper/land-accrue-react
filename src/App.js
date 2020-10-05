import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Header from './components/header/header.component';
import  Home from './components/home/home.component';
import  Login from './components/login/login.component';
import  Comps from './components/comps/comps.component';
import './App.scss';


const initialState = {};
const middleware = [reduxThunk];
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  );



function App() {
    return (
      <Provider store={store}>
      <Router>
        <Header />
        <div className="container logo">
          <Route path="/" exact component={Home} />
          <Route path="/comps" exact component={Comps} />
          <Route path="/login" exact component={Login} />
        </div>
      </Router>
      </Provider>
    );
}

export default App;