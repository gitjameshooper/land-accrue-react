import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { Context } from "./../../../store";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import axios from "./../../../axios-global";
import "./load-land.scss";
import LoadLandBtn from "./load-btn/load-btn.component";
import { useAsync } from "react-use";

export default function LoadLand() {
  const [store, setStore] = useContext(Context);
  const [usState, setUsState] = useState({ name: "", abbv: "" });
  const [counties, setCounties] = useState([]);
  const [county, setCounty] = useState({ id: "", name: "" });
  const usStates = useAsync(async () => {
    let allStates;
    try {
      const res = await axios.get(`/us-states`);
      allStates = res.data.sort((a, b) => (a.name > b.name ? 1 : -1));
      let counties = allStates[0].counties.sort((a, b) => (a.name > b.name ? 1 : -1));
      setUsState({ name: res.data[0].name, abbv: res.data[0].abbv });
      setCounty({ name: counties[0].name, id: counties[0]["_id"] });
      setCounties(counties);
    } catch (err) {
      store.alert = { status: true, type: "bad", msg: "Error: Can't load State and County Options" };
      setStore({ ...store });
      console.error(err);
    }
    return allStates;
  });

  const onChangeUsState = (e) => {
    let abbv = e.target.options[e.target.options.selectedIndex].getAttribute("data-abbv");

    setUsState({ name: e.target.value, abbv: abbv });
    setCounties(
      usStates.value
        .filter((usState) => usState.abbv === abbv)
        .map((usState) => {
          setCounty({ name: usState.counties[0].name, id: usState.counties[0]["_id"] });
          return usState.counties.sort((a, b) => (a.name > b.name ? 1 : -1));
        })
        .flatMap((county) => county)
    );
  };

  const onChangeCounty = (e) => {
    setCounty({
      name: e.target.value,
      id: e.target.options[e.target.options.selectedIndex].getAttribute("data-county-id"),
    });
  };

  return (
    <Grid container component="section" className="load-land-component">
      <h3>How to Load Land</h3>
      <Grid item xs={12} sm={6} className="item-1">
        <ol>
          <li>Select a State. This will populate the counties</li>
          <li>Then Select a County</li>
          <li>Click the Land Button to load the land into the table</li>
        </ol>
      </Grid>
      <Grid item xs={12} sm={6} className="item-2">
        <FormControl>
          <NativeSelect
            value={usState.name}
            onChange={onChangeUsState}
            inputProps={{
              name: "state",
              id: "state-native-helper",
            }}>
            {usStates.value &&
              usStates.value.map((usState) => (
                <option key={usState._id} value={usState.name} data-abbv={usState.abbv}>
                  {usState.name}
                </option>
              ))}
          </NativeSelect>
          <FormHelperText>State</FormHelperText>
        </FormControl>
        <FormControl>
          <NativeSelect
            value={county.name}
            onChange={onChangeCounty}
            inputProps={{
              name: "county",
              id: "county-native-helper",
            }}>
            {counties &&
              counties.map((county) => (
                <option key={county._id} value={county.name} data-county-id={county._id}>
                  {county.name}
                </option>
              ))}
          </NativeSelect>
          <FormHelperText>County</FormHelperText>
        </FormControl>
        <LoadLandBtn countyId={county.id} countyName={county.name} usStateAbbv={usState.abbv} />
      </Grid>
    </Grid>
  );
}
