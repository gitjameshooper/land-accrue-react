import React, { useContext } from "react";
import { Context } from "./../../store";
import DataTable from "./table/table.component";
import TabPanel from "./tabs/tabs.component";
import "./land.scss";
import Grid from "@material-ui/core/Grid";

export default function Land() {
  const [store, setStore] = useContext(Context);

  return (
    <Grid container component="section" className="land-component">
      <TabPanel />
      <Grid item xs={12} className="bottom-block">
        <DataTable
          isLoading={store.land.tableLoading}
          countyName={store.land.countyName}
          stateAbbv={store.land.usStateAbbv}
        />
      </Grid>
    </Grid>
  );
}
