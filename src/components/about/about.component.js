import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import jasonImg from './../../assets/img/jason.jpg';
import mapImg from './../../assets/img/googlemaps.jpg';
import youCanImg from './../../assets/img/youcan.jpg';

import './about.scss';


export default class About extends Component {

    render() {
        return (


        <Grid container component="about" className="about-component" spacing={8}>
	            <Grid item xs={12}><Typography variant="h1" component="h1" align="center">
	        		Welcome to the Land Accrue Pricing App
	      		</Typography>
            </Grid>
      		<Grid item xs={12} sm={8} md={8} justifyContent="center" alignItems="center">
      		    <Typography variant="h2" component="h2" gutterBottom="true">
			        What is Land Accrue
			      </Typography>
				  <Typography variant="body1" component="p">
      	     		Land Accrue is a Austin Texas based real estate investment company managed by Jason Mayfield. Land Accrue brings liquidity to real estate markets in the central Texas area by offering property owners a cash offer and no-hassle close.
   				      <br/> <a href="https://www.landsofamerica.com/member/973029/" target="_new">View Land</a><br />
                <a href="https://www.landaccrue.com/" target="_new">Contact Land Accrue</a>
           </Typography>
      		</Grid>

      		<Grid item className="jason-image" xs={12} sm={4} md={4}>
      		    <img src={jasonImg} />
      		</Grid> 
      		<Grid item className="map-image" xs={12} sm={4} md={4} >
      		    <img src={mapImg} />
      		    
      		</Grid>   
      		<Grid item xs={12} sm={8} md={8}>
      		    <Typography variant="h2" component="h2" gutterBottom="true">
			        What does the pricing app do
			      </Typography>
				  <Typography variant="body1" component="p">
      		 		The pricing app compares land that Land Accrue is interested in buying vs recently sold property in the same state and county. It uses the coordinates(longititude and latitude) to find the closests properties based on location. Then it uses the acreage size and sold price to calculate the best offer price for the prospect property.
				</Typography>
      		</Grid> 
      		  
      		<Grid item xs={12} sm={8} md={8}>
      		   <Typography variant="h2" component="h2" gutterBottom="true">
			        What can you do
			      </Typography>

      		    
	  		<Typography variant="body1" component="p">
				You can load land to see how the app works. You will only be able to read data. Only admins can write to Land Accrue database.
				</Typography>
      		</Grid> 
                    <Grid item className="map-image" xs={12} sm={4} md={4} >
              <img src={youCanImg} />
              
          </Grid>   
      	 
    	</Grid>
        )
    }
}