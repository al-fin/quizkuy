/* eslint-disable react/display-name */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import { listQuiz, deleteQuiz, changeStatusQuiz } from 'services/quiz';
import { useGlobalDispatch } from 'contexts/global';
import Table from 'components/table';
import moment from 'config/moment';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { green, red } from '@material-ui/core/colors';

export default function List() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useGlobalDispatch();

  const [data, setData] = React.useState([]);

  function fetchData() {
    dispatch({ tableLoading: true });
    listQuiz()
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        dispatch({ tableLoading: false });
      });
  }

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  function handleDelete(e, data) {
    const confirmation = window.confirm(
      'Apakah kamu yakin ingin menghapus data ini?'
    );
    if (confirmation) {
      dispatch({ tableLoading: true });
      deleteQuiz(data.id)
        .then(() => {
          fetchData();
        })
        .finally(() => {
          dispatch({ tableLoading: false });
        });
    }
  }

  function toggleStatus(e, data) {
    dispatch({ tableLoading: true });
    changeStatusQuiz(data.id, data.status == 'AKTIF' ? 'TIDAK AKTIF' : 'AKTIF')
      .then(() => {
        fetchData();
      })
      .finally(() => {
        dispatch({ tableLoading: false });
      });
  }

  return (
    <>
      <Table
        title="Quiz"
        columns={[
          { title: 'Nama', field: 'nama' },
          {
            title: 'Kode',
            field: 'kode',
            render: (item) => <span className="STATUS_GREY">{item.kode}</span>,
          },
          {
            title: 'Durasi',
            field: 'durasi',
            render: (item) => `${item.durasi} Menit`,
          },
          {
            title: 'Tanggal',
            field: 'tanggal',
            render: (item) => moment(item.tanggal).format('dddd, DD MMMM YYYY'),
          },
          {
            title: 'Judul Soal',
            field: 'bank_soal.judul',
          },
          { title: 'Kelas', field: 'kelas.nama' },
          {
            title: 'Pelajaran',
            field: 'bank_soal.pelajaran.nama',
          },
          {
            title: 'Jumlah Soal',
            field: 'bank_soal.jumlah_soal',
          },
          {
            title: 'Jenis Soal',
            field: 'bank_soal.jenis_soal',
          },
          {
            title: 'Status',
            field: 'status',
            render: (item) => (
              <span
                className={
                  item.status == 'AKTIF' ? 'STATUS_GREEN' : 'STATUS_RED'
                }
              >
                {item.status}
              </span>
            ),
          },
        ]}
        data={data}
        actions={[
          (item) => ({
            tooltip: item.status == 'AKTIF' ? 'Stop Quiz' : 'Mulai Quiz',
            icon: () =>
              item.status == 'AKTIF' ? (
                <StopIcon style={{ color: red[500] }} />
              ) : (
                <PlayArrowIcon style={{ color: green[500] }} />
              ),
            onClick: toggleStatus,
          }),
          {
            tooltip: 'Detail',
            icon: 'visibility',
            onClick: (_, data) =>
              history.push(`/dashboard/quiz/detail/${data.id}`),
          },
          {
            tooltip: 'Edit',
            icon: 'edit',
            onClick: (_, data) =>
              history.push(`/dashboard/quiz/edit/${data.id}`),
          },
          {
            tooltip: 'Hapus',
            icon: 'delete',
            onClick: handleDelete,
          },
          {
            tooltip: 'Tambah',
            icon: 'add',
            isFreeAction: true,
            onClick: () => history.push(`/dashboard/quiz/create`),
          },
          {
            tooltip: 'Refresh',
            icon: 'refresh',
            isFreeAction: true,
            onClick: fetchData,
          },
        ]}
      />
    </>
  );
}
