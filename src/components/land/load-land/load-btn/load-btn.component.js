import React, { useContext } from 'react';
import { Context } from './../../../../store';




export default function LoadLandBtn(props) {


	const [storeState, setStoreState] = useContext(Context);
	const onShowLandSubmit = () => {
    	setStoreState({...storeState, land: { tableLoading: true, countyId: props.countyId, countyName: props.countyName, usStateAbbv: props.usStateAbbv}});
  
    }
    	
	return (<button className="la-btn" onClick={onShowLandSubmit}>Load Land</button>);
}




