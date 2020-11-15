import React from "react";
import Grid from "@material-ui/core/Grid";
import LabelIcon from "@material-ui/icons/Label";
import "./info.scss";

export default function Info(props) {
  return (
    <Grid container component="section" className="info-component" spacing={2}>
      <h3>Information</h3>
      <Grid item xs={12} sm={4} className="item-1">
        <h4>Status Ranking</h4>
        <ul>
          <li className="green">
            <LabelIcon /> <span className="status-title">Green</span>
            <span className="description"> (4+) Sold Properties found giving the most reliable price estimate</span>
          </li>
          <li className="yellow">
            <LabelIcon /> <span className="status-title">Yellow</span>
            <span className="description">(2-3) Sold Properties found giving less reliable price estimate</span>
          </li>
          <li className="red">
            <LabelIcon /> <span className="status-title">Red</span>
            <span className="description">(0-1) Sold Properties found giving a no reliable price estimate</span>
          </li>
        </ul>
      </Grid>
      <Grid item xs={12} sm={4} className="item-2">
        <h4>Estimated Values</h4>
        <ul>
          <li>
            <b>Estimate 1</b> is calculated by averaging the top 3 closests sold properties by distance
          </li>
          <li>
            <b>Estimate 2</b> is calculated by sorting with price per acre then averaging the middle 3
          </li>
          <li>
            <b>Estimate 3</b> is calculated by averaging all 5 properties
          </li>
        </ul>
      </Grid>
      <Grid item xs={12} sm={4} className="item-3">
        <h4>Quick Notes</h4>
        <ul>
          <li>All data uploaded will overwrite previous CSV data for that state and county</li>
          <li>You can only upload CSV files</li>
          <li>You must be logged in as an admin to upload files or change the final offer price</li>
        </ul>
      </Grid>
    </Grid>
  );
}
