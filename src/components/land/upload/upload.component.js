import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import './upload.scss';
import USstates from '../../../assets/json/us-states.json';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgressBar: false,
            buyLandFile: null,
            soldLandFile: null,
            usStates: USstates,
            usStateName: 'Texas',
            usStateAbbv: 'TX',
            countyName: '',
            countyNameErr: '',
            buyLandFileErr: '',
            soldLandFileErr: ''
        }
        this.onChangeCounty = this.onChangeCounty.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onSubmitFiles = this.onSubmitFiles.bind(this);

    }
    onChangeState(e) {
        this.setState({ usStateName: e.target.value });
        this.setState({ usStateAbbv: e.target.options[e.target.options.selectedIndex].getAttribute('data-abbv') });
    }
    onChangeCounty(e) {
        this.setState({ countyName: e.target.value });
        this.setState({ countyNameErr: '' });
    }
    onChangeFile(e) {
        if (e.target.name === 'buyLand') this.setState({ buyLandFile: e.target.files[0] });
        this.setState({ buyLandFileErr: '' });
        if (e.target.name === 'soldLand') this.setState({ soldLandFile: e.target.files[0] });
        this.setState({ soldLandFileErr: '' });
    };
    // On file upload (click the upload button) 
    onSubmitFiles = (e) => {
        e.preventDefault();
        // Error Checking for all fields
        const isValid = () => {
            let isValid = true;
            if (!this.state.buyLandFile) {
                this.setState({ buyLandFileErr: 'Please Add a Buy Land File' });
                isValid = false;
            }
            if (!this.state.soldLandFile) {
                this.setState({ soldLandFileErr: 'Please Add a Sold Land File' });
                isValid = false;
            }
            // County 
            if (this.state.countyName.trim().length < 3) {
                this.setState({ countyNameErr: 'County Name is too short' });
                isValid = false;
            }
            return isValid;
        }


        if (isValid()) {
            // Create an object of formData 
            const formData = new FormData();
            const config = {
                headers: { 'content-type': 'multipart/form-data' },
                onDownloadProgress: progressEvent => {
                    let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total);
                    console.log(percentCompleted);
                    console.log(progressEvent);
                }

            }
            formData.append('county', this.state.countyName);
            formData.append('usStateName', this.state.usStateName);
            formData.append('usStateAbbv', this.state.usStateAbbv);
            // Update the formData object 
            formData.append(
                'buy.csv',
                this.state.buyLandFile
            );
            formData.append(
                'sold.csv',
                this.state.soldLandFile
            );

            this.setState({ showProgressBar: true });
            // Send Files to backend API
            axios.post("http://localhost:5000/uploads/csv", formData, config).then(response => {
                    console.log(response);
                    this.props.reloadLandOptions();
                    this.setState({ showProgressBar: false, countyName: '' });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };


    render() {
        const usStates = this.state.usStates.map(state => (

            <option value={state.name} data-abbv={state.abbv} key={state.abbv}>{state.name}</option>

        ));
        return (
            <div className="upload-component">

              <h4>How to Upload CSV Files</h4>
              <form noValidate onSubmit={this.onSubmitFiles}>
                        <FormControl>
                        <InputLabel htmlFor="state-native-helper"></InputLabel>
                        <NativeSelect
                          value={this.state.usStateName}
                          onChange={this.onChangeState}
                          inputProps={{
                            name: 'state',
                            id: 'state-native-helper',
                          }}
                        >
                         {usStates}
                     
                        </NativeSelect>
                      </FormControl>
                      <TextField id="standard-basic" label="County Name" onChange={this.onChangeCounty} name={this.state.countyName} />

               <span className="error">*{this.state.countyNameErr}</span>

                <div className="MuiFormControl-root upload-btn-wrapper">
                      <button>Upload Buy file</button>
                      <input type="file" id="buy-land" name="buyLand" accept=".csv" onChange={this.onChangeFile} /> 
                </div>
               <div className=" MuiFormControl-root upload-btn-wrapper">
                      <button>Upload Sold file</button>
                      <input type="file" id="sold-land" name="soldLand" accept=".csv" onChange={this.onChangeFile} />
                </div>
                <span className="error">*{this.state.buyLandFileErr}</span>
                <span className="error">*{this.state.soldLandFileErr}</span>
                <button className="MuiFormControl-root la-btn" type="submit">
                  Upload Files
                </button> 
                <p>Note: You can only upload .csv files. Uploaded files will overwrite any previous files for that county</p>
                </form>
                <LinearProgress className={this.state.showProgressBar ? "active" : "hidden"} />

            </div>
        )
    }
}