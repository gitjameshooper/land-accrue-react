import React, { useContext } from 'react';
import { Context } from './../../store';
import DataTable from './table/table.component';
import TabPanel from './tabs/tabs.component';
import './land.scss';
import Grid from '@material-ui/core/Grid';



export default function Land(props) {

    const [storeState, setStoreState] = useContext(Context);

    return (
        <Grid container component="section" className="land-component">
              <TabPanel />
              <Grid item xs={12} className="bottom-block">
                    <DataTable isLoading={storeState.land.tableLoading} countyName={storeState.land.countyName} stateAbbv={storeState.land.usStateAbbv} />
               </Grid>
        </Grid>
    )

}
