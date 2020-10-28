import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import './footer.scss';

export default class Footer extends Component {

    render() {
        return (
 			<Typography variant="body1" component="footer">
                <span>&copy; 2018 Land Accrue Property Investors.</span>
           </Typography>
        )
    }
}