import React from "react";
import Grid from "@material-ui/core/Grid";
import LabelIcon from "@material-ui/icons/Label";
import "./info.scss";

export default function Info(props) {
  return (
    <Grid container component="section" className="info-component" spacing={2}>
      <h4>Information</h4>
      <Grid item xs={12} sm={6} className="item-1">
        <ul>
          <li className="green">
            <LabelIcon /> Green<p>4+ Sold Properties found giving the most reliable price estimate</p>
          </li>
          <li className="yellow">
            <LabelIcon /> Yellow<p>2-3 Sold Properties found giving less reliable price estimate</p>
          </li>
          <li className="red">
            <LabelIcon /> Red<p>0-1 Sold Properties found giving a no reliable price estimate</p>
          </li>
        </ul>
      </Grid>
      <Grid item xs={12} sm={6} className="item-2">
        <h4>Quick Notes</h4>
        <ul>
          <li>All data uploaded will overwrite previous CVS data for that state and county</li>
          <li>Estimated values calculation</li>
        </ul>
      </Grid>
    </Grid>
  );
}
