import React, { Component } from 'react';
import Upload from './upload/upload.component';
import DataTable from './table/table.component';
import axios from 'axios';
import './land.scss';
import Grid from '@material-ui/core/Grid';



export default class Land extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsState = this.onChangeUsState.bind(this);
        this.onChangeCounty = this.onChangeCounty.bind(this);
        this.onShowLandSubmit = this.onShowLandSubmit.bind(this);
        this.state = {
            tableLoading: false,
            usStates: [],
            usStateName: 'texas',
            usStateAbbv: 'tx',
            countyName: 'travis',
            countyId: '5f84d120e777edead6a09fa6',
            counties: [],
            properties: []
        }


    }
    onShowLandSubmit() {
        this.setState({ tableLoading: true});
        axios.get(`http://localhost:5000/counties/${this.state.countyId}`)
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({ properties: res.data[0].totalProperties.map(property => property), tableLoading: false});
                }

            }).catch(err => {
                // what now?
                console.log(err);
            });
    }
    onChangeUsState(e) {
        let abbv = e.target.options[e.target.options.selectedIndex].getAttribute('data-abbv');
        this.setState({
            usStateName: e.target.value,
            usStateAbbv: abbv
        });
        this.setState({ counties: this.state.usStates.filter(usState => usState.abbv === abbv).map(usState => usState.counties).flatMap(county => county) });

    }

    onChangeCounty(e) {
        this.setState({
            countyName: e.target.value,
            countyId: e.target.options[e.target.options.selectedIndex].getAttribute('data-county-id')
        });
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/us-states`)
            .then(res => {

                if (res.data.length > 0) {
                    this.setState({ usStates: res.data.map(usState => usState) });
                    this.setState({ counties: res.data.filter(usState => usState.abbv === this.state.usStateAbbv).map(usState => usState.counties).flatMap(county => county) });
                }
            }).catch(err => {
                // what now?
                console.log(err);
            });
    }

    render() {
        const usStates = this.state.usStates.map((usState) => (

            <option key={usState._id} value={usState.name} data-abbv={usState.abbv} >{usState.name}</option>
        ));

        const counties = this.state.counties.map((county) => (

            <option key={county._id} value={county.name} data-county-id={county._id}>{county.name}</option>
        ));

        // const properties = this.state.properties.map((property) => (

        //     <tr><td>{property.estValue3}</td><td>{property['SITUS CITY']}</td><td>{property['SITUS STATE']}</td><td>{property['SITUS ZIP CODE']}</td></tr>
        // ));

        return (

            <Grid container className="land-component" spacing={3}>
                <Grid item xs={12}>
                    <h2>Land Component</h2>
                </Grid>
                <Grid item xs={12}>
                    <h3>Show Land</h3>
                    <select required className="form-control" value={this.state.usStateName} onChange={this.onChangeUsState}>
                        {usStates}
                    </select>
                   <select required className="form-control" value={this.state.countyName} onChange={this.onChangeCounty}>
                   {counties}
                  </select>
                  <button onClick={this.onShowLandSubmit}>Show Land</button>
                    </Grid>
                    <Grid item xs={12}>
                 <DataTable isLoading={this.state.tableLoading} countyName={this.state.countyName} stateAbbv={this.state.usStateAbbv} propertyData={this.state.properties} />
                    </Grid>
        <Grid item xs={12}>
              
   
             <Upload />
        </Grid>
        </Grid>
        )

    }
}