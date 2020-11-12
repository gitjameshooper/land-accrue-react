import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "./../../../store";
import Upload from "./../upload/upload.component";
import Info from "./../info/info.component";
import LoadLand from "./../load-land/load-land.component";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import Box from "@material-ui/core/Box";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import GetAppIcon from "@material-ui/icons/GetApp";
import SaveIcon from "@material-ui/icons/Save";
import "./tabs.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs() {
  const [store, setStore] = useContext(Context);
  const [tabId, setTabId] = useState(0);
  const [slideTab, setSlideTab] = useState(false);

  const tabChange = (e, newValue) => {
    setTabId(newValue);
    setSlideTab(true);
  };
  const showSlideTab = () => setSlideTab(!slideTab);

  return (
    <div className="tabs-component">
      <AppBar position="static">
        <div className="slideToggle" onClick={showSlideTab}>
          {slideTab ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </div>
        <Tabs value={tabId} onChange={tabChange} aria-label="simple tabs example">
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Load Land" {...a11yProps(1)} />
          <Tab label="Upload Land" {...a11yProps(2)} />
          <Tab
            label={
              <a target="_new" href={`http://localhost:5000/downloads/csv/${store.land.countyId}`}>
                <GetAppIcon />
              </a>
            }
            {...a11yProps(3)}
          />
          <Tab label={<ImportExportIcon />} {...a11yProps(4)} />
          <Tab label={<SaveIcon />} {...a11yProps(5)} />
        </Tabs>
        {/* <span className="action-btns">Download CSV</span>
        <span className="action-btns">Save</span>
        <span className="action-btns">Open Close Toggle</span> */}
      </AppBar>
      <div className={slideTab ? "active tab-wrapper" : "hidden tab-wrapper"}>
        <TabPanel className="tab-sections" value={tabId} index={0}>
          <Info />
        </TabPanel>
        <TabPanel className="tab-sections" value={tabId} index={1}>
          <LoadLand />
        </TabPanel>
        <TabPanel className="tab-sections" value={tabId} index={2}>
          <Upload />
        </TabPanel>
        <TabPanel className="tab-sections" value={tabId} index={3}></TabPanel>
        <TabPanel className="tab-sections" value={tabId} index={4}></TabPanel>
        <TabPanel className="tab-sections" value={tabId} index={5}></TabPanel>
      </div>
    </div>
  );
}
