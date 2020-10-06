import React, { Component } from 'react';
import './login.scss';

export default class Login extends Component {
  
    constructor (props){
        super(props);    
    }
   onSubmit = data => console.log(data);

    render() {

        return (
            <div className="login-component">
    		  <div className='card'>
                <h4 className="card-header">
                    Login
                </h4>
                <div className="card-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            name="email"
                            type='email'
                            className="form-control form-control-lg"
                            placeholder="sample@email.com"
                            required/>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type='password'
                            name="password"
                            className="form-control form-control-lg"
                            placeholder="your password"
                            required/>
                    </div>
                    <div style={{'paddingTop': '30px'}}>
                        <button
                            type="submit"
                            className="btn btn-lg btn-light btn-block">
                            Login
                        </button>
                    </div>
                </form>
                </div>
                </div>
            </div>
        )
    }
}
