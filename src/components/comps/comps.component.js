import React, { Component } from 'react';
import axios from 'axios';

export default class State extends Component {
	constructor (props){
		super(props);

		this.onChangeState = this.onChangeState.bind(this);
		this.state = {
			states: [],
			stateName : '',
			abbv : '',
			counties : ''
		}

	
	}

	onChangeState(e) {
		this.setState({
			stateName: e.target.value
		});

	}
    
    componentDidMount(){
    	
		axios.get('http://localhost:5000/states')
		.then(res => {
			if(res.data.length > 0){
				console.log(res.data);
				this.setState({states: res.data.map(state => state.name)});
			}
		 });
    }

    render() {
        return (
            <div className="container comps-component">
            CompsComponent {this.state.stateName}
            <select required className="form-control" value={this.state.stateName} onChange={this.onChangeState}>
            {
                this.state.states.map(function (state) {
                	return <option key={state} value={state}>{state}</option>
                })
            }

            </select>
            </div>
        )
    }
}