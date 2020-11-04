import React from 'react';
import LabelIcon from '@material-ui/icons/Label';
import './info.scss';

export default function Info(props) {



    return (
        <div className="info-component">
			<h3>Information</h3>
			<ul>
				<li className="green"><LabelIcon /> Green</li>
				<li className="yellow"><LabelIcon /> Yellow</li>
				<li className="red"><LabelIcon /> Red</li>
			</ul>
		</div>
    );
}