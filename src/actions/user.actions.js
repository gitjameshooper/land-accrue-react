import axios from 'axios';
import { returnErrors } from './error.actions';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, AUTH_USER, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from '../actions/types';

// Check token & load user

export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });
    // Get token from local storage
    const token = getState().user.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) config.headers['x-auth-token'] = token;

    axios.get('http://localhost:5000/users', config)
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({ type: AUTH_ERROR });
        });
}

export function loginUser(data) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post('http://localhost:5000/users', data)
            .then(res => {
                dispatch({type: AUTH_USER})
                localStorage.setItem('jwt_token', res.data.token);
                // window.location = '/';
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt_token');
            })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Server Error, try later.'})
            });
    }
}
