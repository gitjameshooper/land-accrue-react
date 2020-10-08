import React, { Component } from 'react';
import Upload from './upload/upload.component';
import axios from 'axios';
import './land.scss';
import Grid from '@material-ui/core/Grid';

export default class Land extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsState = this.onChangeUsState.bind(this);
        this.onChangeCounty = this.onChangeCounty.bind(this);
        this.state = {
            usStates: [],
            usStateName: 'texas',
            stateAbbv: 'tx',
            countyName: 'travis',
            counties: []
        }


    }
    onShowLandSubmit() {

    }
    onChangeUsState(e) {
        this.setState({
            stateName: e.target.value
        });
    }

    onChangeCounty(e) {
        this.setState({
            countyName: e.target.value
        });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/us-states')
            .then(res => {

                if (res.data.length > 0) {
                    this.setState({ usStates: res.data.map(usState => usState.name) });
                    this.setState({ counties: res.data.filter(usState => usState.abbv === this.state.stateAbbv).map(usState => usState.counties.map(county => county.name))});
                }
            });
    }

    render() {
        console.log(this.state.counties);
        const usStates = this.state.usStates.map((usState) => (
            <option key={usState} value={usState}>{usState}</option>
        ));

        const counties = this.state.counties.map((county) => (

            <option key={county} value={county}>{county}</option>
        ));

        return (

            <Grid container className="land-component" spacing={3}>
                <Grid item xs={12}>
                    <h2>Land Component</h2>
                </Grid>
                <Grid item xs={12}>
                    <h3>Show Land</h3>
                    <select required className="form-control" value={this.state.stateName} onChange={this.onChangeUsState}>
                        {usStates}
                    </select>
              
                   <select required className="form-control" value={this.state.countyName} onChange={this.onChangeCounty}>
                       {counties}
                  </select>
                  <button onClick={this.onShowLand}>Show Land</button>
                    </Grid>
        <Grid item xs={12}>
              
   
             
                
             <Upload />
        </Grid>
        </Grid>

            

     


        )

    }
}