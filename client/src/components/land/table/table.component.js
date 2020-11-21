import React, { useRef, forwardRef, useContext, useState, useEffect } from "react";
import { Context } from "./../../../store";
import MaterialTable from "material-table";
import "./table.scss";
import axios from "./../../../axios-global";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LabelIcon from "@material-ui/icons/Label";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import GetAppIcon from "@material-ui/icons/GetApp";
import SaveIcon from "@material-ui/icons/Save";
import ImportExportIcon from "@material-ui/icons/ImportExport";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function DataTable(props) {
  const [store, setStore] = useContext(Context);
  const [properties, setProperties] = useState([]);
  const [landTotals, setLandTotals] = useState({ green: 0, red: 0, yellow: 0 });
  const tableRef = useRef(null);
  const toggleRows = () => {
    let links = tableRef.current.querySelectorAll(
      ".MuiTableRow-root[level='0'] .MuiTableCell-body button.MuiIconButton-root[tabindex='0']"
    );
    links.forEach((value) => {
      value.click();
    });
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const changePrice = (e, rowData) => {
    let i = properties.findIndex((property) => property._id === rowData._id);
    properties[i]["finalOffer"] = Number(e.target.value);
    setProperties(properties);
  };
  const saveRows = (rowData) => {
    const parentRows = rowData
      .filter((property) => property.county && property.statusColor)
      .map((property) => property);
    axios({
      method: "patch",
      url: `/api/counties/${store.land.countyId}/properties`,
      data: {
        rowData: parentRows,
      },
    })
      .then((res) => {
        store.alert = { status: true, type: "good", msg: "Success: Prices Saved" };
        setStore({ ...store });
      })
      .catch((err) => {
        store.alert = { status: true, type: "bad", msg: "Error: Can't Save Row" };
        setStore({ ...store });
        console.error(err);
      });
  };

  const deleteRows = (rowData) => {
    const idArr = rowData
      .filter((property) => property.county && property.statusColor)
      .map((property) => property["_id"]);

    axios({
      method: "delete",
      url: `/api/counties/${store.land.countyId}/properties`,
      data: {
        rowData: idArr,
      },
    })
      .then((res) => {
        // Update Color Status
        const allIdArr = rowData.map((property) => {
          if (property.statusColor === "green") landTotals.green -= 1;
          if (property.statusColor === "yellow") landTotals.yellow -= 1;
          if (property.statusColor === "red") landTotals.red -= 1;
          return property["_id"];
        });
        setLandTotals(landTotals);
        // Update Rows in DOM
        const updatedProperties = [...properties];
        allIdArr.forEach((value) => {
          let i = updatedProperties.findIndex((property) => property._id === value);
          updatedProperties.splice(i, 1);
        });
        setProperties(updatedProperties);

        store.alert = { status: true, type: "good", msg: "Success: Rows Deleted" };
        setStore({ ...store });
      })
      .catch((err) => {
        store.alert = { status: true, type: "bad", msg: "Error: Can't Delete Row" };
        setStore({ ...store });
        console.error(err);
      });
  };

  useEffect(() => {
    if (store.land.countyId && store.land.tableLoading) {
      axios
        .get(`/api/counties/${store.land.countyId}`)
        .then((res) => {
          if (res.data.length > 0) {
            let county = res.data[0],
              green = 0,
              yellow = 0,
              red = 0;
            // Add Sold properties to totalproperties(parent) for table view
            county.totalProperties.forEach((property) => {
              if (property.statusColor === "green") green++;
              if (property.statusColor === "yellow") yellow++;
              if (property.statusColor === "red") red++;
              if (property.soldArr) {
                property.soldArr.forEach((soldProperty) => {
                  soldProperty["parentId"] = property["_id"];
                  county.totalProperties.push(soldProperty);
                });
              }
            });
            setTimeout(() => {
              store.alert = { status: true, type: "good", msg: "Success: Table Loaded" };
              store.land.tableLoading = false;
              setStore({ ...store });
            }, 1000);

            setLandTotals({ green: green, red: red, yellow: yellow });
            setProperties(res.data[0].totalProperties.map((property) => property));
          }
        })
        .catch((err) => {
          store.alert = { status: true, type: "bad", msg: "Error: Can't load Table Data" };
          store.land.tableLoading = false;
          setStore({ ...store });
          console.error(err);
        });
    }
  }, [store, setStore]);

  return (
    <div ref={tableRef} className="table-component">
      <div className="toolbar">
        {!store.land.tableLoading && (
          <div className="land-totals">
            <span className="items">
              <LabelIcon className="label-icon green" />
              <span className="num-text">{landTotals.green}</span>
            </span>
            <span className="items">
              <LabelIcon className="label-icon yellow" />
              <span className="num-text">{landTotals.yellow}</span>
            </span>
            <span className="items">
              <LabelIcon className="label-icon red" />
              <span className="num-text">{landTotals.red}</span>
            </span>
          </div>
        )}
        <div className="actions-bar">
          {store.user.loggedIn && store.land.countyId && (
            <a
              title="Download CSV"
              download
              className="download items"
              rel="noopener noreferrer"
              target="_blank"
              href={`/api/downloads/csv/${store.land.countyId}`}>
              <GetAppIcon />
            </a>
          )}
          <span title="Toggle Rows" className="toggle items" onClick={toggleRows}>
            <ImportExportIcon />
          </span>
        </div>
      </div>

      <MaterialTable
        isLoading={store.land.tableLoading}
        icons={tableIcons}
        title={
          store.land.countyName
            ? `Land in ${store.land.countyName.toUpperCase()}, ${store.land.usStateAbbv.toUpperCase()}`
            : ""
        }
        data={properties}
        columns={[
          {
            title: "Status",
            field: "statusKey",
            render: (rowData) => <LabelIcon className={`label-icon ${rowData["statusColor"]}`} />,
          },
          {
            title: "Owner Name/Distance(mi)",
            field: "ownerMailingName",
            render: (rowData) =>
              rowData["ownerMailingName"] ? rowData["ownerMailingName"] : `${rowData["distance"]} (mi)`,
          },
          {
            title: "Address",
            field: "situsStreetAddress",
            render: (rowData) =>
              rowData["situsStreetAddress"] ? (
                <a
                  className="property-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${rowData["propertyLink"]}`}>
                  {rowData["situsStreetAddress"]}
                </a>
              ) : (
                rowData["address"]
              ),
          },
          { title: "Lot Acreage", field: "lotAcreage", type: "numeric" },
          {
            title: "Avg. PPA",
            field: "avgPPA1",
            render: (rowData) =>
              rowData["finalPPA"]
                ? `$${numberWithCommas(rowData["finalPPA"])}`
                : rowData["pricePerAcre"]
                ? `$${numberWithCommas(rowData["pricePerAcre"])}`
                : 0,
          },
          {
            title: "Sold Price",
            field: "soldPrice",
            type: "numeric",
            render: (rowData) => (rowData["soldPrice"] ? `$${numberWithCommas(rowData["soldPrice"])}` : ""),
          },
          {
            title: "EST Values",
            field: "estValue1",
            type: "numeric",
            render: (rowData) =>
              rowData["estValue1"] ? (
                <span>
                  1: ${numberWithCommas(rowData["estValue1"])}
                  <br />
                  2: ${numberWithCommas(rowData["estValue2"])}
                  <br />
                  3: ${numberWithCommas(rowData["estValue3"])}
                </span>
              ) : (
                ""
              ),
          },
          {
            title: "Final Offer",
            field: "finalOffer",
            type: "numeric",
            render: (rowData) =>
              rowData["finalOffer"] === undefined ? (
                " "
              ) : store.user.loggedIn ? (
                <input
                  type="text"
                  className="final-offer"
                  onBlur={(e) => changePrice(e, rowData)}
                  placeholder={rowData["finalOffer"]}
                />
              ) : (
                `$${numberWithCommas(rowData["finalOffer"])}`
              ),
          },
        ]}
        parentChildData={(row, rows) => rows.find((a) => a["_id"] === row.parentId)}
        options={{
          selection: true,
          selectionProps: (rowData) => ({
            disabled: rowData.finalOffer === undefined,
            color: "primary",
          }),
          draggable: false,
          pageSize: 50,
          pageSizeOptions: [25, 50, 100, 200],
          actionsColumnIndex: -1,
        }}
        localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} of {count}",
            labelRowsPerPage: 50,
            rowsPerPage: 100,
          },
        }}
        actions={[
          {
            icon: () => <SaveIcon />,
            tooltip: "Save Price",
            onClick: (e, rowData) => saveRows(rowData),
          },
          {
            icon: () => <DeleteOutline />,
            tooltip: "Delete Property",
            onClick: (e, rowData) => {
              let d = window.confirm("Are you sure you want to delete the rows?");
              if (d === true) {
                deleteRows(rowData);
              }
            },
          },
        ]}
      />
    </div>
  );
}
