import React, { Component, useState, useContext } from 'react';
import { Context } from './../../store';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import './login.scss';



// const classes = useStyles();
export default class Login extends Component {

    constructor(props, useStyles) {
        super(props);

        this.state = {
            redirect: '/land',
            showProgressBar: false,
            email: '',
            password: '',
            emailErr: '',
            passwordErr: ''
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
    }


    onChangeEmail(e) {
        if (e.target) {
            this.setState({ email: e.target.value });
        }
    }

    onChangePassword(e) {
        if (e.target) {
            this.setState({ password: e.target.value });
        }
    }

    onSubmitLogin = (e) => {
        e.preventDefault();
        // Error Checking for all fields
        const isValid = () => {
            let isValid = true;
            if (!this.state.emailErr) {
                this.setState({ emailErr: 'Email Blank' });
                isValid = false;
            }
            if (!this.state.passwordErr) {
                this.setState({ passwordErr: 'Password Blank' });
                isValid = false;
            }

            return isValid;
        }


        if (isValid()) {

            const config = {
                headers: { 'content-type': 'application/json' }
            }
            let data = {
                email: this.state.email,
                password: this.state.password
            }
            // Send Files to backend API
            axios.post("http://localhost:5000/users/auth", data, config).then(res => {

                    localStorage.setItem('token', res.data.token);
                    setStoreState({'loggedIn' : true})
                    // this.setState({'redirect': '/land'})
                    // this.props.reloadLandOptions();
                    // this.setState({ showProgressBar: false, countyName: '' });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    render() {
       const [storeState, setStoreState] = useContext(Context);

        if (storeState.loggedIn) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <Grid container component="section" className="login-component">
      <Grid item xs={false} sm={4} md={7} className="land-image" />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className="pap">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
          <form className="login-form" noValidate onSubmit={this.onSubmitLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.onChangeEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onChangePassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Log In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
        )
    }
}