import { FETCH_STATES } from '../actions/types';

const initialState = {
	states: [],
	state: {}
}

export default function (state = initialState, action) {
	switch (action.type) {
	 	case FETCH_STATES:
	 		return {
	 			...state,
	 			states: action.payload
	 		}
		default:
			return state;
	}
}