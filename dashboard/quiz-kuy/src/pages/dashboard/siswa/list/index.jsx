/* eslint-disable react/display-name */
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useStyles } from './styles';
import {
  listSiswa,
  deleteSiswa,
  updateStatusSiswa,
  approveAllSiswa,
} from 'services/siswa';
import { useGlobalDispatch } from 'contexts/global';
import Table from 'components/table';
import { Tabs, AppBar, Tab } from '@material-ui/core';
import queryString from 'query-string';
import { listKelas } from 'services/kelas';

export default function List() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useGlobalDispatch();

  const [data, setData] = React.useState([]);
  const [kelas, setKelas] = React.useState([]);

  const params = queryString.parse(window.location.search);
  const [kelasId, setKelasId] = React.useState(params.kelas_id || '1');
  const handleChangeKelasId = (event, newValue) => {
    setKelasId(newValue);
    history.push({
      search: `?kelas_id=${newValue}`,
    });
  };

  function fetchData() {
    dispatch({ tableLoading: true });
    listSiswa({ kelas_id: kelasId })
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        dispatch({ tableLoading: false });
      });
  }

  function fetchKelas() {
    listKelas().then((res) => {
      setKelas(res.data);
    });
  }

  React.useEffect(() => {
    fetchKelas();
    fetchData();
    // eslint-disable-next-line
  }, [location]);

  function handleDelete(e, data) {
    const confirmation = window.confirm(
      'Apakah kamu yakin ingin menghapus data ini?'
    );
    if (confirmation) {
      dispatch({ tableLoading: true });
      deleteSiswa(data.id)
        .then(() => {
          fetchData();
        })
        .finally(() => {
          dispatch({ tableLoading: false });
        });
    }
  }

  function handleApprove(e, selected) {
    const index = data.findIndex((item) => item.id == selected.id);
    const new_data = data;
    new_data[index].status = 'TERVERIFIKASI';
    setData([...new_data]);
    updateStatusSiswa(selected.id, {
      status: 'TERVERIFIKASI',
    });
  }

  function handleBukaKunci(e, selected) {
    const index = data.findIndex((item) => item.id == selected.id);
    const new_data = data;
    new_data[index].status = 'TERVERIFIKASI';
    setData([...new_data]);
    updateStatusSiswa(selected.id, {
      status: 'TERVERIFIKASI',
    });
  }

  function handleApproveAll() {
    const new_data = data.map((item) => {
      if (item.status == 'MENUNGGU VERIFIKASI') {
        item.status = 'TERVERIFIKASI';
        return item;
      } else {
        return item;
      }
    });

    setData([...new_data]);
    approveAllSiswa();
  }

  function handleReject(e, selected) {
    const index = data.findIndex((item) => item.id == selected.id);
    const new_data = data;
    new_data[index].status = 'DITOLAK';
    setData([...new_data]);
    updateStatusSiswa(selected.id, {
      status: 'DITOLAK',
    });
  }

  return (
    <>
      <div className={classes.tablePaper}>
        <AppBar position="static" elevation={2}>
          <Tabs value={kelasId} onChange={handleChangeKelasId}>
            {kelas.map((item) => (
              <Tab
                key={item.id}
                label={item.nama}
                value={item.id}
                className={classes.tab}
              />
            ))}
          </Tabs>
        </AppBar>
        <Table
          title="Siswa"
          columns={[
            { title: 'Nama', field: 'nama' },
            { title: 'Email', field: 'email' },
            { title: 'NISN', field: 'nisn' },
            { title: 'Kelas', field: 'kelas' },
            {
              title: 'Status',
              field: 'status',
              render: (item) => (
                <span
                  className={
                    item.status == 'DITOLAK'
                      ? 'STATUS_RED'
                      : item.status == 'TERVERIFIKASI'
                      ? 'STATUS_GREEN'
                      : 'STATUS_GREY'
                  }
                >
                  {item.status}
                </span>
              ),
            },
          ]}
          data={data}
          actions={[
            {
              tooltip: 'Detail',
              icon: 'visibility',
              onClick: (_, selected) =>
                history.push(`/dashboard/siswa/detail/${selected.id}`),
            },
            {
              tooltip: 'Edit',
              icon: 'edit',
              onClick: (_, selected) =>
                history.push(`/dashboard/siswa/edit/${selected.id}`),
            },
            {
              tooltip: 'Hapus',
              icon: 'delete',
              onClick: handleDelete,
            },
            (item) => ({
              hidden: item.status != 'MENUNGGU VERIFIKASI',
              tooltip: 'Setujui',
              icon: 'check',
              onClick: handleApprove,
            }),
            (item) => ({
              hidden: item.status != 'MENUNGGU VERIFIKASI',
              tooltip: 'Tolak',
              icon: 'close',
              onClick: handleReject,
            }),
            (item) => ({
              hidden: item.status != 'TERKUNCI',
              tooltip: 'Buka Kunci',
              icon: 'lock_open',
              onClick: handleBukaKunci,
            }),

            // FREE ACTIONS :
            {
              tooltip: 'Tambah',
              icon: 'add',
              isFreeAction: true,
              onClick: () => history.push(`/dashboard/siswa/create`),
            },
            {
              tooltip: 'Refresh',
              icon: 'refresh',
              isFreeAction: true,
              onClick: fetchData,
            },
            {
              hidden:
                data.filter((item) => item.status == 'MENUNGGU VERIFIKASI')
                  .length == 0,
              isFreeAction: true,
              tooltip: 'Setujui Semua',
              icon: 'check',
              onClick: handleApproveAll,
            },
          ]}
        />
      </div>
    </>
  );
}
