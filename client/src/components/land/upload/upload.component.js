import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MileSlider from "./mile-slider/mile-slider.component";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "./../../../axios-global";
import "./upload.scss";
import { Context } from "./../../../store";
import USstates from "../../../assets/json/us-states.json";

export default function Upload() {
  const [store, setStore] = useContext(Context);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [buyLand, setBuyLand] = useState({ file: null, name: "", err: "" });
  const [soldLand, setSoldLand] = useState({ file: null, name: "", err: "" });
  const [county, setCounty] = useState({ name: "", err: "" });
  const [usState, setUsState] = useState({ name: "Texas", abbv: "TX" });
  const [maxMileage, setMaxMileage] = useState(8);

  const onChangeMileage = (value) => {
    setMaxMileage(value);
  };

  const onChangeState = (e) => {
    setUsState({
      name: e.target.value,
      abbv: e.target.options[e.target.options.selectedIndex].getAttribute("data-abbv"),
    });
  };
  const onChangeCounty = (e) => {
    setCounty({ name: e.target.value.trim(), err: "" });
  };
  const onChangeFile = (e) => {
    if (e.target.name === "buyLand") setBuyLand({ file: e.target.files[0], err: "", name: e.target.files[0].name });
    if (e.target.name === "soldLand") setSoldLand({ file: e.target.files[0], err: "", name: e.target.files[0].name });
  };
  // On file upload (click the upload button)
  const onSubmitFiles = (e) => {
    e.preventDefault();
    // Error Checking for all fields
    const isValid = () => {
      let isValid = true;
      if (!buyLand.file) {
        setBuyLand({ ...buyLand, err: "Please Add a Buy CSV File" });
        isValid = false;
      }
      if (!soldLand.file) {
        setSoldLand({ ...soldLand, err: "Please Add a Sold CSV File" });
        isValid = false;
      }
      // County
      if (county.name.trim().length < 3) {
        setCounty({ ...county, err: "County Name is too short" });
        isValid = false;
      }
      return isValid;
    };

    if (isValid()) {
      // Create an object of formData
      const formData = new FormData();
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      formData.append("county", county.name);
      formData.append("usStateName", usState.name);
      formData.append("usStateAbbv", usState.abbv);
      formData.append("maxMileage", maxMileage);
      // Update the formData object
      formData.append("buy.csv", buyLand.file);
      formData.append("sold.csv", soldLand.file);

      setShowProgressBar(true);
      // Send Files to backend API
      axios
        .post("/uploads/csv", formData, config)
        .then((res) => {
          setShowProgressBar(false);
          setCounty({ name: "", err: "" });
          setBuyLand({ file: null, name: "", err: "" });
          setSoldLand({ file: null, name: "", err: "" });
          store.alert = { status: true, type: "good", msg: "Success: CSV data entered into database" };
          setStore({ ...store });
        })
        .catch((error) => {
          setShowProgressBar(false);
          store.alert = { status: true, type: "bad", msg: "Error: Can't upload CSVs" };
          setStore({ ...store });
          console.error(error);
        });
    }
  };

  return (
    <Grid container component="section" className="upload-component">
      <h3>Upload CSV Files</h3>
      <form noValidate onSubmit={onSubmitFiles}>
        <Grid item xs={12} sm={6} md={3} className="item-1">
          <FormControl className="child">
            <NativeSelect
              value={usState.name}
              onChange={onChangeState}
              inputProps={{
                name: "state",
                id: "state-native-helper",
              }}>
              {USstates &&
                USstates.map((state) => (
                  <option value={state.name} data-abbv={state.abbv} key={state.abbv}>
                    {state.name}
                  </option>
                ))}
            </NativeSelect>
            <FormHelperText>State</FormHelperText>
          </FormControl>
          <FormControl className="child">
            <TextField id="standard-basic" onChange={onChangeCounty} name="countyName" value={county.name} />
            <FormHelperText>
              County <span className="asterik">*</span>
            </FormHelperText>
            <span className="error">{county.err}</span>
          </FormControl>
          <FormControl className="child">
            <MileSlider onChangeMileage={onChangeMileage} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={9} className="item-2">
          <FormControl className="child">
            <div className="upload-btn-wrapper">
              <button>
                Add Buy File <span className="asterik file"> *</span>
              </button>
              <input
                type="file"
                id="buy-land"
                name="buyLand"
                accept=".csv"
                onChange={onChangeFile}
                onClick={(e) => {
                  e.target.value = null;
                }}
              />
            </div>
            <span className="error file">{buyLand.err}</span>
            <span className="filename">{buyLand.name}</span>
          </FormControl>
          <FormControl className="child">
            <div className="upload-btn-wrapper">
              <button>
                Add Sold File <span className="asterik file"> *</span>
              </button>
              <input
                type="file"
                id="sold-land"
                name="soldLand"
                accept=".csv"
                onChange={onChangeFile}
                onClick={(e) => {
                  e.target.value = null;
                }}
              />
            </div>
            <span className="error file">{soldLand.err}</span>
            <span className="filename">{soldLand.name}</span>
          </FormControl>
          <button className="child la-btn" type="submit">
            Upload Files
          </button>
        </Grid>
      </form>
      <LinearProgress className={showProgressBar ? "active" : "hidden"} />
      <p className={`note ${showProgressBar ? "hidden" : "active"}`}>
        <b>Note:</b> Uploaded files will overwrite any previous files for that county.
      </p>
    </Grid>
  );
}
