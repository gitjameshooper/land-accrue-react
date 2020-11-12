import React, { Component, useContext } from "react";
import { Context } from "./../../../store";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import axios from "axios";
import "./load-land.scss";
import LoadLandBtn from "./load-btn/load-btn.component";

export default class LoadLand extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsState = this.onChangeUsState.bind(this);
    this.onChangeCounty = this.onChangeCounty.bind(this);
    this.loadLandOptions = this.loadLandOptions.bind(this);
    this.state = {
      usStates: [],
      usStateName: "",
      usStateAbbv: "",
      countyName: "",
      countyId: "",
      counties: [],
    };
  }

  onChangeUsState(e) {
    let abbv = e.target.options[e.target.options.selectedIndex].getAttribute("data-abbv");
    this.setState({
      usStateName: e.target.value,
      usStateAbbv: abbv,
    });
    this.setState({
      counties: this.state.usStates
        .filter((usState) => usState.abbv === abbv)
        .map((usState) => usState.counties)
        .flatMap((county) => county),
    });
  }

  onChangeCounty(e) {
    this.setState({
      countyName: e.target.value,
      countyId: e.target.options[e.target.options.selectedIndex].getAttribute("data-county-id"),
    });
  }

  loadLandOptions() {
    axios
      .get(`http://localhost:5000/us-states`)
      .then((res) => {
        let usStates = res.data.sort((a, b) => (a.name > b.name ? 1 : -1)),
          counties = usStates[0].counties;
        if (res.data.length > 0) {
          this.setState({
            usStates: res.data.map((usState) => {
              usState.counties.sort((a, b) => (a.name > b.name ? 1 : -1));
              return usState;
            }),
          });
          this.setState({
            usStateName: res.data[0].name,
            usStateAbbv: res.data[0].abbv,
            countyName: res.data[0].counties[0].name,
            countyId: counties[0]["_id"],
          });
          this.setState({
            counties: res.data
              .filter((usState) => usState.abbv === this.state.usStateAbbv)
              .map((usState) => usState.counties)
              .flatMap((county) => county),
          });
        }
      })
      .catch((err) => {
        console.error(`${err.response.status}: ${err.response.data.msg}`);
      });
  }

  componentDidMount() {
    this.loadLandOptions();
  }

  render() {
    const usStates = this.state.usStates.map((usState) => (
      <option key={usState._id} value={usState.name} data-abbv={usState.abbv}>
        {usState.name}
      </option>
    ));

    const counties = this.state.counties.map((county) => (
      <option key={county._id} value={county.name} data-county-id={county._id}>
        {county.name}
      </option>
    ));

    return (
      <Grid container component="section" className="load-land-component" spacing={2}>
        <Grid item xs={12} sm={6} className="item-1">
          <h4>How to Load Land</h4>
          <ol>
            <li>Select a State. This will populate the counties</li>
            <li>Then Select a County</li>
            <li>Click the Land Button to load the land into the table</li>
          </ol>
        </Grid>
        <Grid item xs={12} sm={6} className="item-2">
          <FormControl>
            <NativeSelect
              value={this.state.usStateName}
              onChange={this.onChangeUsState}
              inputProps={{
                name: "state",
                id: "state-native-helper",
              }}>
              {usStates}
            </NativeSelect>
            <FormHelperText>State</FormHelperText>
          </FormControl>
          <FormControl>
            <NativeSelect
              value={this.state.countyName}
              onChange={this.onChangeCounty}
              inputProps={{
                name: "county",
                id: "county-native-helper",
              }}>
              {counties}
            </NativeSelect>
            <FormHelperText>County</FormHelperText>
          </FormControl>
          <LoadLandBtn
            countyId={this.state.countyId}
            countyName={this.state.countyName}
            usStateAbbv={this.state.usStateAbbv}
          />
        </Grid>
      </Grid>
    );
  }
}
