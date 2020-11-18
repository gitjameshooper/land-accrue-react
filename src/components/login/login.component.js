import React, { useState, useContext } from "react";
import { Context } from "./../../store";
import { Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./login.scss";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const redirect = "/land";
  const [store, setStore] = useContext(Context);
  const [email, setEmail] = useState({ address: "", err: "" });
  const [password, setPassword] = useState({ text: "", err: "" });
  const [error, setError] = useState({ status: false, msg: "" });
  const [progressBar, setProgressBar] = useState(false);
  if (store.user.loggedIn) {
    return <Redirect to={redirect} />;
  }

  const onChangeEmail = (e) => {
    setEmail({ ...email, address: e.target.value, err: "" });
  };

  const onChangePassword = (e) => {
    setPassword({ ...password, text: e.target.value, err: "" });
  };
  // Error Checking for all fields
  const isValid = () => {
    let isValid = true;
    if (!email.address) {
      setEmail({ ...email, err: "Email required" });
      isValid = false;
    }
    if (!password.text) {
      setPassword({ ...password, err: "Password required" });
      isValid = false;
    }

    return isValid;
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();

    if (isValid()) {
      const config = {
        headers: { "content-type": "application/json" },
      };
      let data = {
        email: email.address,
        password: password.text,
      };
      setProgressBar(true);
      // Send Files to backend API
      axios
        .post("http://localhost:5000/users/auth", data, config)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          store.alert = { status: true, type: "good", msg: "Success: Logged In" };
          store.user = { loggedIn: true, adminName: res.data.user.name };
          setStore({ ...store });
          setProgressBar(false);
        })
        .catch((err) => {
          setError({ ...error, status: !err.response.data.status, msg: err.response.data.msg });
          setProgressBar(false);
          console.error(err);
        });
    }
  };

  return (
    <Grid container component="section" className={`${classes.root} login-component`}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={7} className="land-image" />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
          <LinearProgress className={progressBar ? "active" : "hidden"} />
          {error.status ? <p className="error">{error.msg}</p> : ""}
          <form className={classes.form} noValidate onSubmit={onSubmitLogin}>
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
              onChange={onChangeEmail}
            />
            {email.err ? <p className="error">{email.err}</p> : ""}
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
              onChange={onChangePassword}
            />
            {password.err ? <p className="error">{password.err}</p> : ""}
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Log In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
