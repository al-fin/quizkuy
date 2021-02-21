/* eslint-disable react/display-name */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import { changeStatusQuiz } from 'services/quiz';
import { getDashboard } from 'services/dashboard';
import { useGlobalDispatch } from 'contexts/global';
import Table from 'components/table';
import moment from 'config/moment';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { green, red } from '@material-ui/core/colors';
import InfoCount from 'components/statistics/info-count';
import Grid from '@material-ui/core/Grid';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useGlobalDispatch();

  const [data, setData] = React.useState({
    quiz_aktif: [],
    counter: {},
    chart: {},
  });

  function fetchData() {
    dispatch({ tableLoading: true, countLoading: true });
    getDashboard()
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        dispatch({ tableLoading: false, countLoading: false });
      });
  }

  React.useEffect(() => {
    fetchData();
  }, []);

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
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <InfoCount
            Icon={AssignmentTurnedInOutlinedIcon}
            title="Total Quiz"
            count={data.count?.quiz}
            onReFetch={fetchData}
            onClick={() => history.push('/dashboard/quiz')}
          />
        </Grid>
        <Grid item xs={4}>
          <InfoCount
            Icon={AccountBalanceIcon}
            title="Total Bank Soal"
            count={data.count?.bank_soal}
            onReFetch={fetchData}
            onClick={() => history.push('/dashboard/bank-soal')}
          />
        </Grid>
        <Grid item xs={4}>
          <InfoCount
            Icon={SchoolOutlinedIcon}
            title="Total Siswa"
            count={data.count?.siswa}
            onReFetch={fetchData}
            onClick={() => history.push('/dashboard/siswa')}
          />
        </Grid>

        <Grid item xs={4}>
          <InfoCount
            Icon={AssignmentIndOutlinedIcon}
            title="Total Guru"
            count={data.count?.guru}
            onReFetch={fetchData}
            onClick={() => history.push('/dashboard/guru')}
          />
        </Grid>
        <Grid item xs={4}>
          <InfoCount
            Icon={EqualizerOutlinedIcon}
            title="Total Kelas"
            count={data.count?.kelas}
            onReFetch={fetchData}
            onClick={() => history.push('/dashboard/kelas')}
          />
        </Grid>
        <Grid item xs={4}>
          <InfoCount
            Icon={CollectionsBookmarkOutlinedIcon}
            title="Total Pelajaran"
            count={data.count?.pelajaran}
            onReFetch={fetchData}
            onClick={() => history.push('/dashboard/pelajaran')}
          />
        </Grid>

        <Grid item xs={12}>
          <Table
            startAdornment={
              <PlayArrowIcon
                style={{
                  color: green[500],
                  background: green[50],
                  borderRadius: '50%',
                  fontSize: 40,
                  marginRight: 10,
                }}
              />
            }
            title="Quiz yang sedang Aktif"
            columns={[
              { title: 'Nama', field: 'nama' },
              {
                title: 'Kode',
                field: 'kode',
                render: (item) => (
                  <span className="STATUS_GREY">{item.kode}</span>
                ),
              },
              {
                title: 'Tanggal',
                field: 'tanggal',
                render: (item) => moment(item.tanggal).format('DD MMMM YYYY'),
              },
              {
                title: 'Durasi',
                field: 'durasi',
                render: (item) => `${item.durasi} Menit`,
              },
              { title: 'Kelas', field: 'kelas.nama' },
              {
                title: 'Pelajaran',
                field: 'bank_soal.pelajaran.nama',
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
            data={data.quiz_aktif}
            options={{
              exportButton: false,
            }}
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
                tooltip: 'Refresh',
                icon: 'refresh',
                isFreeAction: true,
                onClick: fetchData,
              },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
}
