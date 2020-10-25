import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './home.scss';


export default class Home extends Component {

    render() {
        return (


            <Grid container component="home" className="home-component">
                <h1>Welcome to the Land Accrue Pricing App</h1>
      
      		<Grid item xs={12} sm={4} md={7}>
      		    <h2>What is Land Accrue</h2>
      	     		<p>Land Accrue is a Austin Texas based real estate investment company managed by Jason Mayfield. Land Accrue brings liquidity to real estate markets in the central Texas area by offering property owners a cash offer and no-hassle close.</p>

      		</Grid>
      		<Grid item xs={12} sm={4} md={7}>
      		    <h2>What does the pricing app do</h2>
      		    <p>The pricing app compares land that Land Accrue is interested in buying vs recently sold property in the same state and county. It uses the coordinates to find the closests properties based on location and acreage size to calculate the best offer price.</p>

      		</Grid>  
      		<Grid item xs={12} sm={4} md={7}>
      		    <h2>What can you do</h2>
      		    <p>You can load land to see how the app works. You will only be able to read data. Only admins can write to Land Accrue database.</p>

      		</Grid> 
      	 
    	</Grid>
        )
    }
}