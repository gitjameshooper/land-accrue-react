import React, { Component, forwardRef } from 'react';
import MaterialTable, { MTableBodyRow } from 'material-table';
import './table.scss';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

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
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};



export default class DataTable extends Component {

    constructor(props) {
        super(props);

    }
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }  
    render() {

        return (
          <div className="table-component">
            <MaterialTable
            isLoading={this.props.isLoading}
            icons={tableIcons}
            title={this.props.countyName + ', '+this.props.stateAbbv+ ' Land'}
            data={this.props.propertyData}
            columns={[
              { title: 'Status', field: 'statusColor' },
              { title: 'Owner Name/Distance(mi)', field: 'OWNER MAILING NAME', render: rowData => rowData['OWNER MAILING NAME'] ? rowData['OWNER MAILING NAME'] : `${rowData['distance']}(mi)` },
              { title: 'Address', field: 'SITUS FULL ADDRESS', render: rowData => rowData['SITUS STREET ADDRESS'] ? rowData['SITUS STREET ADDRESS'] : rowData['ADDRESS'] },
              { title: 'Lot Acreage', field: 'LOT ACREAGE' },
              { title: 'Avg. PPA', field: 'avgPPA1', render: rowData => rowData['avgPPA1'] ? `$${rowData['avgPPA1']}` : `$${rowData['PRICE PER ACRE']}` },    
              { title: 'Sold Price', field: 'SOLD PRICE'},
              { title: 'EST Value', field: 'estValue1', type: 'numeric' },
              { title: 'EST Value2', field: 'estValue2', type: 'numeric' },
              { title: 'EST Value3', field: 'estValue3', type: 'numeric' },
              { title: 'Final Offer', field: 'jasonOffer', type: 'numeric' }
            
            ]}
            parentChildData={(row, rows) => rows.find(a => a['_id'] === row.parentId)}
            options={{
              selection: true,
              draggable: false,
              pageSize: 25,
              pageSizeOptions: [25,50,100,200]
            }}
             localization={{
              pagination: {
                  labelDisplayedRows: '{from}-{to} of {count}',
                  labelRowsPerPage: 50,
                  rowsPerPage: 100
              }
            }}
            actions={[
              {
                tooltip: 'Remove All Selected Users',
                icon: 'delete',
                onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
              }
            ]}
          />
          </div>
        )
    }
}