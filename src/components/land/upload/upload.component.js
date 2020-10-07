import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import './upload.scss';
import USstates from '../../../assets/json/us-states.json';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyLandFile: null,
            soldLandFile: null,
            usStates: USstates,
            usState: 'TX',
            countyName: ''
        }
        this.onChangeCounty = this.onChangeCounty.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);

    }
    onChangeState(e) {
        this.setState({ usState: e.target.value });
    }
    onChangeCounty(e) {
        this.setState({ countyName: e.target.value });
    }
   onChangeFile(e) { 
     if(e.target.files[0].name === 'buy.csv') this.setState({ buyLandFile: e.target.files[0] }); 
     if(e.target.files[0].name === 'sold.csv') this.setState({ soldLandFile: e.target.files[0] });      
    }; 
      // On file upload (click the upload button) 
    onUploadFiles = () => { 
     console.log(this.state);
      // Create an object of formData 
     const formData = new FormData(); 
     const config = {     
        headers: { 'content-type': 'multipart/form-data' }
      }
       formData.append('county', this.state.countyName); 
      // Update the formData object 
      formData.append( 
        this.state.buyLandFile.name, 
        this.state.buyLandFile
      );

      // formData.append( 
      //   this.state.soldLandFile.name, 
      //   this.state.soldLandFile
      // );
     
    
     
      // Details of the uploaded file 
      console.log(this.state.buyLandFile); 
     
      // Request made to the backend api 
      // Send formData object 
      axios.post("http://localhost:5000/uploads/csv", formData, config).then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        }); 
    }; 


    render() {
        const usStates = this.state.usStates.map(state => (

            <option value={state.abbv}  key={state.abbv}>{state.name}</option>

        ));
        return (
            <div className="upload-component row">

              <h3>Upload CSV Files</h3>
              
               <select id="us-state" className="form-control" onChange={this.onChangeState} value={this.state.usState}>
                {usStates}
              </select>
              

                <input type="text" className="form-control" onChange={this.onChangeCounty} name={this.state.countyName}  placeholder="County Name" aria-describedby="basic-addon2"/>

               <label>Buy Land CSV <br /><input type="file" id="buy-land" name="buyLand" accept=".csv" onChange={this.onChangeFile} /> </label>


               <label>Sold Land CSV <br /><input type="file" id="sold-land" name="soldLand" accept=".csv" onChange={this.onChangeFile} /> </label>
            
                <button onClick={this.onUploadFiles}> 
                  Upload Files
                </button> 
                <p>Note: You can only upload .csv files</p>

            </div>
        )
    }
}

