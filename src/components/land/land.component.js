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
            countyName: 'hunt',
            countyId: '5f87ab33865ca01abaad9c3c',
            counties: [],
            properties: []
        }


    }
    onShowLandSubmit() {
        this.setState({ tableLoading: true });
        axios.get(`http://localhost:5000/counties/${this.state.countyId}`)
            .then(res => {
                if (res.data.length > 0) {

                    res.data[0].totalProperties.forEach(property => {
                        if (property.soldArr) {
                            property.soldArr.forEach((soldProperty) => {
                                soldProperty['parentId'] = property['_id'];
                                res.data[0].totalProperties.push(soldProperty);
                            });
                        }
                    })
                    this.setState({ properties: res.data[0].totalProperties.map(property => property), tableLoading: false });
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

        return (

            <Grid container className="land-component">
                <Grid item xs={6} className="top-blocks">
                    <h3>Load Land</h3>
                    <p>How to use:</p>
                    <ol>
                        <li>Select a State. This will populate the counties</li>
                        <li>Then Select a County</li>
                        <li>Click the Land Button to load the land into the table</li>
                    </ol>
                    <select required className="form-control" value={this.state.usStateName} onChange={this.onChangeUsState}>
                        {usStates}
                    </select>
                   <select required className="form-control" value={this.state.countyName} onChange={this.onChangeCounty}>
                   {counties}
                  </select>
                  <button className="la-btn" onClick={this.onShowLandSubmit}>Load Land</button>
                </Grid>
                <Grid item xs={6} className="top-blocks">
                    <Upload />
                </Grid>
                <Grid item xs={12} className="bottom-block">
                    <DataTable isLoading={this.state.tableLoading} countyName={this.state.countyName} stateAbbv={this.state.usStateAbbv} propertyData={this.state.properties} />
                </Grid>
            </Grid>
        )

    }
}