import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import jasonImg from './../../assets/img/jason.jpg';
import mapImg from './../../assets/img/googlemaps.jpg';
import youCanImg from './../../assets/img/youcan.jpg';
import logoPurpleImg from './../../assets/img/la-mtn-logo-purple.png';

import './about.scss';


export default class About extends Component {

    render() {
        return (


          <Grid container component="about" className="about-component" spacing={8}>
              <Grid item xs={12}>
                  <Typography variant="h1" component="h1" align="center">
                    Welcome to the Land Accrue Pricing App
                  </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={8} justifyContent="center" alignItems="center" className="item-1">
            <div className="wrapper">
              <Typography variant="h2" component="h2" gutterBottom="true">
              What is Land Accrue
            </Typography>
            <Typography variant="body1" component="p">
                 Land Accrue is a Austin Texas based real estate investment company managed by Jason Mayfield. Land Accrue brings liquidity to real estate markets in the central Texas area by offering property owners a cash offer and no-hassle close.
                 <br/> <a className="btn" href="https://www.landsofamerica.com/member/973029/" target="_new">View Land</a>

                <a className="btn" href="https://www.landaccrue.com/" target="_new">Visit Land Accrue</a>
                 </Typography>
                <div className="contact"><h3>Contact Us</h3><p>
                2028 E Ben White <br />
                    #240-6850 <br />
                    Austin TX 78741 service@LandAccrue.com <br />
                    Tel: 512-645-2947 <br />
                    Fax: 512-717-7343 
                 </p>
                 <img src={logoPurpleImg} />
                 </div>
          </div>
          </Grid>

          <Grid item className="item-2" xs={12} sm={4} md={4}>
          
              <img src={jasonImg} />
              <span>Jason Mayfield<br />Land Guru</span>
          </Grid> 
          
          <Grid item className="item-3" xs={12} sm={4} md={4} >

              <img src={mapImg} />
              
          </Grid>   
          <Grid item xs={12} sm={8} md={8} className="item-4">
             <div className="wrapper">
              <Typography variant="h2" component="h2" gutterBottom="true">
              What does the pricing app do
            </Typography>
          <Typography variant="body1" component="p">
               The pricing app compares land that Land Accrue is interested in buying vs recently sold property in the same state and county. It uses the coordinates(longititude and latitude) to find the closests properties based on location. It does this by extending out concentric circles based off miles from the buy property. Then it uses the acreage size and sold price to calculate the best offer price for the prospect property.
        </Typography>
         <a className="btn" href="./land" target="_self">See it in action</a>
        </div>
          </Grid> 
            
          <Grid item xs={12} sm={8} md={8} className="item-5">
          <div className="wrapper">
             <Typography variant="h2" component="h2" gutterBottom="true">
              What you can do
            </Typography>

              
        <Typography variant="body1" component="p">
        You can load land comparables into the table based off of the state and county. The table consists of the buy properties with each of them having a dropdown list of the sold comparable properties.
        You will only be able to read the table data. Only admins can write to Land Accrue database.
        </Typography>
        </div>
          </Grid> 
          <Grid item className="item-6" xs={12} sm={4} md={4} >
              <img src={youCanImg} />
              
          </Grid>   
         
      </Grid>
        )
    }
}