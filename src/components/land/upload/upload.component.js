import React, { Component } from 'react';
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
        this.onChangeState = this.onChangeState.bind(this);
        this.onFileUpload = this.onChangeState.bind(this);

    }
    onChangeState(e) {
        this.setState({ usState: e.target.value });
    }

      // On file upload (click the upload button) 
    onUploadFiles = () => { 
     
      // Create an object of formData 
      const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "myFile", 
        this.state.buyLandFile, 
        this.state.selectedFile.name 
      ); 
     
      // Details of the uploaded file 
      console.log(this.state.selectedFile); 
     
      // Request made to the backend api 
      // Send formData object 
      axios.post("api/uploadfile", formData); 
    }; 


    render() {
        const usStates = this.state.usStates.map(state => (

            <option value={state.abbv}  key={state.abbv}>{state.name}</option>

        ));
        return (
            <div className="upload-component row">
            <div className="col">
              <h3>Upload CSV Files</h3>
              <div class="input-group">
               <select id="us-state" className="form-control" onChange={this.onChangeState} value={this.state.usState}>
                {usStates}
              </select>
              </div>
              <div class="input-group">
                <input type="text" className="form-control" placeholder="County Name" aria-describedby="basic-addon2"/>
                <span class="input-group-addon" id="basic-addon2">"e.g. travis"</span>
              </div>
              <div className="row">
              <div className="col">
               <label>Buy Land CSV <br /><input type="file" id="buy-land" name="buyLand" accept=".csv" onChange={this.onFileChange} /> </label>
               </div>
               <div className="col">
               <label>Sold Land CSV <br /><input type="file" id="sold-land" name="soldLand" accept=".csv" onChange={this.onFileChange} /> </label>
               </div>
               </div>
                <button onClick={this.onUploadFiles}> 
                  Upload Files
                </button> 
                <p>Note: You can only upload .csv files</p>
              </div>
            </div>

        )
    }
}