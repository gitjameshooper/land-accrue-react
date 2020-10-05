import axios from 'axios';
import { FETCH_STATES, AUTH_USER, AUTH_ERROR } from './types';


export function getStates() {
    return function(dispatch){
    	  axios
            .get(`http://localhost:5000/states`)
            .then(res => res.data)
            .then(states => 
                dispatch({type: FETCH_STATES, payload: states})

              
            )
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Server Error, try later.'})
            });
    }
}

	// axios.get('http://localhost:5000/states')
	// 	.then(res => {
	// 		if(res.data.length > 0){
	// 			console.log(res.data);
	// 			this.setState({states: res.data.map(state => state.name)});
	// 		}
	// 	 });