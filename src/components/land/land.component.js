import React, { Component } from 'react';
import Upload from './upload/upload.component';
import axios from 'axios';
import './land.scss';

export default class Land extends Component {
	constructor (props){
		super(props);

		// this.onChangeState = this.onChangeState.bind(this);
		this.state = {
			states: [],
			stateName : '',
			abbv : '',
			counties : ''
		}

	
	}

	// onChangeState(e) {
	// 	this.setState({
	// 		stateName: e.target.value
	// 	});

	// }
 
    // componentDidMount(){    	
		// axios.get('http://localhost:5000/states')
		// .then(res => {
		// 	if(res.data.length > 0){
		// 		console.log(res.data);
		// 		this.setState({states: res.data.map(state => state.name)});
		// 	}
		//  });
    // }

    render() {
    	// const states = this.props.states;
    	// const states = this.props.states.map(state => (
    	// 	<div><p key={state.id}>{state.name}</p><p>{state.abbv}</p></div>
     //    ));
        return (
            <div className="land-component row">
             Land Component
            
             <Upload />
     
            </div>
            
        )
    }
}
       // <select required className="form-control" value={this.state.stateName} onChange={this.onChangeState}>
       //      {
       //          this.state.states.map(function (state) {
       //          	return <option key={state} value={state}>{state}</option>
       //          })
       //      }
 
       //      </select>
       // States.PropTypes = {
       // 	getStates: PropTypes.func.isRequired,
       // 	states: PropTypes.array.isRequired
       // }
