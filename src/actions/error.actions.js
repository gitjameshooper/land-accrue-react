import axios from 'axios';
import { CLEAR_ERRORS, GET_ERRORS } from '../actions/types';

// Return Errors

export const returnErrors = () => (msg, status, id = null) => {

	return {
		type: GET_ERRORS,
		payload: {msg, status, id}
	}
}

// Clear Errors

export const clearErrors = () => () => {

	return {
		type: CLEAR_ERRORS,
	}
   
}