/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import Th from './th';
import { useGlobalState } from 'contexts/global';
import { Typography } from '@material-ui/core';

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
import CachedIcon from '@material-ui/icons/Cached';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReplayIcon from '@material-ui/icons/Replay';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Visibility: forwardRef((props, ref) => (
    <VisibilityIcon {...props} ref={ref} />
  )),
  Refresh: forwardRef((props, ref) => <CachedIcon {...props} ref={ref} />),
  Replay: forwardRef((props, ref) => <ReplayIcon {...props} ref={ref} />),
  LockOpen: forwardRef((props, ref) => <LockOpenIcon {...props} ref={ref} />),
  PlaylistAddCheck: forwardRef((props, ref) => (
    <PlaylistAddCheckIcon {...props} ref={ref} />
  )),
};

const Table = ({
  startAdornment = null,
  title,
  options,
  columns,
  data,
  ...props
}) => {
  const state = useGlobalState();

  return (
    <MaterialTable
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {startAdornment}
          <Typography
            variant="h5"
            style={{ fontWeight: 'bold', display: 'inline-block' }}
          >
            {title}
          </Typography>
        </div>
      }
      isLoading={state.tableLoading}
      columns={[
        { title: '#', field: '_id', width: null, cellStyle: { width: 5 } },
        ...columns,
      ]}
      data={data.map((item, index) => ({ ...item, _id: index + 1 }))}
      localization={{
        pagination: {
          labelDisplayedRows: '{from}-{to} dari {count}',
          labelRowsSelect: 'Baris',
          labelRowsPerPage: 'Baris per halaman :',
          firstTooltip: 'Halaman pertama',
          previousTooltip: 'Halaman terakhir',
          nextTooltip: 'Halaman selanjutnya',
          lastTooltip: 'Halaman sebelumnya',
        },
        toolbar: {
          searchTooltip: 'Cari...',
          searchPlaceholder: 'Cari...',
        },
        header: {
          actions: 'Aksi',
        },
        body: {
          emptyDataSourceMessage: 'Tidak ada data',
          addTooltip: 'Tambah',
          deleteTooltip: 'Hapus',
          editTooltip: 'Edit',
        },
      }}
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
        exportButton: true,
        emptyRowsWhenPaging: false,
        pageSize: 5,
        pageSizeOptions: [5, 25, 100, 1000],
        actionsCellStyle: {
          color: '#888',
        },
        ...options,
      }}
      {...props}
    />
  );
};

export { Th };
export default Table;
