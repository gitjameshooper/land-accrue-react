import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import jasonImg from "./../../assets/img/jason.jpg";
import mapImg from "./../../assets/img/googlemaps.jpg";
import tableImg from "./../../assets/img/table.png";
import logoPurpleImg from "./../../assets/img/la-mtn-logo-purple.png";
import logoWhiteImg from "./../../assets/img/la-mtn-logo-white.png";

import "./about.scss";

export default class About extends Component {
  render() {
    return (
      <Grid container component="section" className="about-component" spacing={8}>
        <Grid item xs={12}>
          <Typography variant="h1" component="h1" align="center">
            Welcome to the Land Accrue Pricing App
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={8} className="item-1">
          <div className="wrapper">
            <Typography variant="h2" component="h2" gutterBottom={true} noWrap>
              What is Land Accrue
            </Typography>
            <Typography variant="body1" component="p">
              Land Accrue is a Austin Texas based real estate investment company managed by Jason Mayfield. Land Accrue
              brings liquidity to real estate markets in the central Texas area by offering property owners a cash offer
              and no-hassle close. Our real estate company is known for providing superior customer service and access
              to the best listings in Texas while helping our clients find the right properties for them.
              <br />
              <a className="btn" href="https://www.landsofamerica.com/member/973029/" target="_new">
                View Land
              </a>
              <a className="btn" href="https://www.landaccrue.com/" target="_new">
                Visit Land Accrue
              </a>
            </Typography>
            <div className="contact">
              <Typography variant="h3" component="h3" gutterBottom={false}>
                Contact Us
              </Typography>
              <Typography variant="body1" component="p">
                2028 E. Ben White #240-6850 <br />
                Austin, TX 78741 <br />
                <a className="link" href="mailto:service@LandAccrue.com">
                  service@LandAccrue.com
                </a>
                <br />
                Tel: 512-645-2947 <br />
                Fax: 512-717-7343
              </Typography>
            </div>
          </div>
          <img className="logo-icon" alt="land accrue logo purple" src={logoPurpleImg} />
        </Grid>

        <Grid item className="item-2" xs={12} sm={4} md={4}>
          <img alt="jason mayfield" src={jasonImg} />
          <span>
            Jason Mayfield
            <br />
            Land Guru
          </span>
        </Grid>

        <Grid item className="item-3" xs={12} sm={4} md={4}>
          <img alt="county map" src={mapImg} />
        </Grid>
        <Grid item xs={12} sm={8} md={8} className="item-4">
          <div className="wrapper">
            <Typography variant="h2" component="h2" gutterBottom={true} noWrap>
              What does the pricing app do
            </Typography>
            <Typography variant="body1" component="p">
              The pricing app compares land that Land Accrue is interested in buying vs recently sold property in the
              same state and county. It uses longititude and latitude coordinates to find the closests properties based
              on location. It does this by extending out concentric circles based off miles from the buy property. Then
              it uses the acreage size and sold price to calculate the best offer price for the prospect property.
            </Typography>
            <a className="btn" href="./land" target="_self">
              See it in action
            </a>
          </div>
          <img className="logo-icon" alt="land accrue logo white" src={logoWhiteImg} />
        </Grid>
        <Grid item xs={12} sm={7} md={7} className="item-5">
          <div className="wrapper">
            <Typography variant="h2" component="h2" gutterBottom={true} noWrap>
              What you can do
            </Typography>
            <Typography variant="body1" component="p">
              You can load land comparables into the table based off of the state and county. The table consists of the
              buy properties with each of them having a dropdown list of the sold comparable properties. Each buy
              property is given a status(Green, Yellow, Red) based off of how many sold properties were found to give an
              accurate calculation of an estimated value. You will only be able to read the table data. Only admins can
              write to Land Accrue database.
            </Typography>
          </div>
          <img className="logo-icon" alt="land accrue logo purple" src={logoPurpleImg} />
        </Grid>
        <Grid item className="item-6" xs={12} sm={5} md={5}>
          <img alt="you can" src={tableImg} />
        </Grid>
      </Grid>
    );
  }
}
