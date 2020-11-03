import React, { Component } from 'react';
import Upload from './upload/upload.component';
import DataTable from './table/table.component';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import TabPanel from './tabs/tabs.component';

import axios from 'axios';
import './land.scss';
import Grid from '@material-ui/core/Grid';



export default class Land extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsState = this.onChangeUsState.bind(this);
        this.onChangeCounty = this.onChangeCounty.bind(this);
        this.onShowLandSubmit = this.onShowLandSubmit.bind(this);
        this.loadLandOptions = this.loadLandOptions.bind(this);
        this.state = {
            tableLoading: false,
            usStates: [],
            usStateName: '',
            usStateAbbv: '',
            countyName: '',
            countyId: '',
            counties: [],
            properties: []
        }


    }
    onShowLandSubmit() {
        this.setState({ tableLoading: true });
        axios.get(`http://localhost:5000/counties/${this.state.countyId}`)
            .then(res => {
                if (res.data.length > 0) {
                    let county = res.data[0];
                    // Add Sold properties to totalproperties(parent) for table view
                    county.totalProperties.forEach(property => {
                        if (property.soldArr) {
                            property.soldArr.forEach((soldProperty) => {
                                soldProperty['parentId'] = property['_id'];
                                county.totalProperties.push(soldProperty);
                            });
                        }
                    })
                    this.setState({ usStateAbbv: county.stateAbbv, countyName: county.name  ,properties: res.data[0].totalProperties.map(property => property), tableLoading: false });
                }

            }).catch(err => {

                console.error(`${err.response.status}: ${err.response.data.msg}`);
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

    loadLandOptions() {
        axios.get(`http://localhost:5000/us-states`)
            .then(res => {
                let usStates = res.data.sort((a, b) => (a.name > b.name) ? 1 : -1),
                counties = usStates[0].counties;

                if (res.data.length > 0) {
                    this.setState({ usStates: res.data.map(usState => { usState.counties.sort((a, b) => (a.name > b.name) ? 1 : -1); return usState; }) });
                    this.setState({ usStateName: res.data[0].name, usStateAbbv: res.data[0].abbv, countyName: res.data[0].counties[0].name, countyId: counties[0].id });
                    this.setState({ counties: res.data.filter(usState => usState.abbv === this.state.usStateAbbv).map(usState => usState.counties).flatMap(county => county) });
                }
            }).catch(err => {
                console.error(`${err.response.status}: ${err.response.data.msg}`);
            });
    }

    componentDidMount() {
        this.loadLandOptions();
    }

    render() {
        const usStates = this.state.usStates.map((usState) => (

            <option key={usState._id} value={usState.name} data-abbv={usState.abbv} >{usState.name}</option>
        ));

        const counties = this.state.counties.map((county) => (

            <option key={county._id} value={county.name} data-county-id={county._id}>{county.name}</option>
        ));

        return (

            <Grid container component="section" className="land-component">
                <TabPanel />
                <Grid item xs={12} md={6} className="top-blocks">

                    <h3>Load Land</h3>
                    <p>How to use:</p>
                    <ol>
                        <li>Select a State. This will populate the counties</li>
                        <li>Then Select a County</li>
                        <li>Click the Land Button to load the land into the table</li>
                    </ol>
                       <FormControl>
                        <InputLabel htmlFor="state-native-helper"></InputLabel>
                        <NativeSelect
                          value={this.state.usStateName}
                          onChange={this.onChangeUsState}
                          inputProps={{
                            name: 'state',
                            id: 'state-native-helper',
                          }}
                        >
                          {usStates}
                     
                        </NativeSelect>
                        <FormHelperText>State Populates the Counties</FormHelperText>
                      </FormControl>
                         <FormControl>
                        <InputLabel htmlFor="county-native-helper"></InputLabel>
                        <NativeSelect
                          value={this.state.countyName}
                          onChange={this.onChangeCounty}
                          inputProps={{
                            name: 'county',
                            id: 'county-native-helper',
                          }}
                        >
                          {counties}
                     
                        </NativeSelect>
                      </FormControl>
               
                  <button className="la-btn" onClick={this.onShowLandSubmit}>Load Land</button>
                </Grid>
                <Grid item xs={12} md={6} className="top-blocks">
                    <Upload reloadLandOptions={this.loadLandOptions}/>
                </Grid>
                <Grid item xs={12} className="bottom-block">
                    <DataTable isLoading={this.state.tableLoading} countyName={this.state.countyName} stateAbbv={this.state.usStateAbbv} propertyData={this.state.properties} />
                </Grid>
            </Grid>
        )

    }
}