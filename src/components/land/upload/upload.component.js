import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import "./upload.scss";
import USstates from "../../../assets/json/us-states.json";

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgressBar: false,
      buyLandFile: null,
      soldLandFile: null,
      usStates: USstates,
      usStateName: "Texas",
      usStateAbbv: "TX",
      countyName: "",
      countyNameErr: "",
      buyLandFileErr: "",
      buyLandFileName: "",
      soldLandFileName: "",
      soldLandFileErr: "",
    };
    this.onChangeCounty = this.onChangeCounty.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onSubmitFiles = this.onSubmitFiles.bind(this);
  }
  onChangeState(e) {
    this.setState({
      usStateName: e.target.value,
      usStateAbbv: e.target.options[e.target.options.selectedIndex].getAttribute("data-abbv"),
    });
  }
  onChangeCounty(e) {
    this.setState({ countyName: e.target.value, countyNameErr: "" });
  }
  onChangeFile(e) {
    if (e.target.name === "buyLand")
      this.setState({ buyLandFile: e.target.files[0], buyLandFileErr: "", buyLandFileName: e.target.files[0].name });
    if (e.target.name === "soldLand")
      this.setState({ soldLandFile: e.target.files[0], soldLandFileErr: "", soldLandFileName: e.target.files[0].name });
  }
  // On file upload (click the upload button)
  onSubmitFiles = (e) => {
    e.preventDefault();
    // Error Checking for all fields
    const isValid = () => {
      let isValid = true;
      if (!this.state.buyLandFile) {
        this.setState({ buyLandFileErr: "Please Add a Buy CSV File" });
        isValid = false;
      }
      if (!this.state.soldLandFile) {
        this.setState({ soldLandFileErr: "Please Add a Sold CSV File" });
        isValid = false;
      }
      // County
      if (this.state.countyName.trim().length < 3) {
        this.setState({ countyNameErr: "County Name is too short" });
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
      formData.append("county", this.state.countyName);
      formData.append("usStateName", this.state.usStateName);
      formData.append("usStateAbbv", this.state.usStateAbbv);
      // Update the formData object
      formData.append("buy.csv", this.state.buyLandFile);
      formData.append("sold.csv", this.state.soldLandFile);

      this.setState({ showProgressBar: true });
      // Send Files to backend API
      axios
        .post("http://localhost:5000/uploads/csv", formData, config)
        .then((response) => {
          console.log(response);
          this.setState({
            showProgressBar: false,
            countyName: "",
            buyLandFile: null,
            soldLandFile: null,
            buyLandFileName: "",
            soldLandFileName: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const usStates = this.state.usStates.map((state) => (
      <option value={state.name} data-abbv={state.abbv} key={state.abbv}>
        {state.name}
      </option>
    ));
    return (
      <Grid container component="section" className="upload-component" spacing={2}>
        <h3>Upload CSV Files</h3>
        <form noValidate onSubmit={this.onSubmitFiles}>
          <Grid item xs={12} sm={6} md={3} className="item-1">
            <FormControl className="child">
              <NativeSelect
                value={this.state.usStateName}
                onChange={this.onChangeState}
                inputProps={{
                  name: "state",
                  id: "state-native-helper",
                }}>
                {usStates}
              </NativeSelect>
              <FormHelperText>State</FormHelperText>
            </FormControl>
            <FormControl className="child">
              <TextField
                id="standard-basic"
                onChange={this.onChangeCounty}
                name="countyName"
                value={this.state.countyName}
              />
              <FormHelperText>
                County <span className="asterik">*</span>
              </FormHelperText>
              <span className="error">{this.state.countyNameErr}</span>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={9} className="item-2">
            <FormControl className="child">
              <div className="upload-btn-wrapper">
                <button>
                  Add Buy File <span className="asterik file"> *</span>
                </button>
                <input type="file" id="buy-land" name="buyLand" accept=".csv" onChange={this.onChangeFile} />
              </div>
              <span className="error file">{this.state.buyLandFileErr}</span>
              <span className="filename">{this.state.buyLandFileName}</span>
            </FormControl>
            <FormControl className="child">
              <div className="upload-btn-wrapper">
                <button>
                  Add Sold File <span className="asterik file"> *</span>
                </button>
                <input type="file" id="sold-land" name="soldLand" accept=".csv" onChange={this.onChangeFile} />
              </div>
              <span className="error file">{this.state.soldLandFileErr}</span>
              <span className="filename">{this.state.soldLandFileName}</span>
            </FormControl>
            <button className="child la-btn" type="submit">
              Upload Files
            </button>
          </Grid>
        </form>
        <LinearProgress className={this.state.showProgressBar ? "active" : "hidden"} />
        <p className={`note ${this.state.showProgressBar ? "hidden" : "active"}`}>
          <b>Note:</b> Uploaded files will overwrite any previous files for that county.
        </p>
      </Grid>
    );
  }
}
