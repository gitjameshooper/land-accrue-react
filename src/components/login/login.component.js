import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser} from '../../actions/user.actions';
import './login.scss';

class Login extends Component {
  
    // onSubmit(e) {
    // 	e.preventDefault();
    // 	console.log(e);
    //      this.props.loginUser();
    // }
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

 const mapStateToProps = state => ({
       	 users: state.users
       })
export default connect(mapStateToProps, {loginUser})(Login);