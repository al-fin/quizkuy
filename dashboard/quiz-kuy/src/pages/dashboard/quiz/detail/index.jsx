/* eslint-disable react/display-name */
import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import {
  Input,
  Select,
  DatePicker,
  Checkbox,
  Button,
} from 'components/controls';
import { useForm } from 'hooks/use-form';
import { useStyles } from './styles';
import { resetJawaban, detailQuiz, changeStatusQuiz } from 'services/quiz';
import { useParams } from 'react-router-dom';
import WithBack from 'components/with-back';
import { useGlobalDispatch } from 'contexts/global';
import axios from 'axios';
import { listKelas } from 'services/kelas';
import { listBankSoal } from 'services/bank-soal';
import Table from 'components/table';
import moment from 'config/moment';
import { useHistory, useLocation } from 'react-router-dom';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import EditIcon from '@material-ui/icons/Edit';
import StopIcon from '@material-ui/icons/Stop';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function getStatusColor(status) {
  switch (status) {
    case 'BELUM_DIMULAI':
      return 'STATUS_GREY';
    case 'BELUM_DIKERJAKAN':
      return 'STATUS_GREY';
    case 'SUDAH_DIKERJAKAN':
      return 'STATUS_GREEN';
    case 'BELUM_DIKOREKSI':
      return 'STATUS_ORANGE';
    default:
      return 'STATUS_GREY';
  }
}

export default function Detail() {
  const {
    values,
    setValues,
    errors,
    handleInputChange,
    handleChangeDatePicker,
    handleCheckboxChange,
  } = useForm({
    nama: '',
    durasi: 60,
    kelas_id: '',
    bank_soal_id: '',
    tanggal: new Date(),
    tampilkan_nilai: false,
    siswa: [],
  });

  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const { id } = useParams();

  const [options, setOptions] = React.useState({
    kelas: [],
    bank_soal: [],
  });

  function fetchQuiz() {
    dispatch({ tableLoading: true });
    detailQuiz(id)
      .then((res) => {
        setValues({ ...res.data });
      })
      .finally(() => {
        dispatch({ tableLoading: false });
      });
  }

  function fetchData() {
    dispatch({ loading: true });
    axios
      .all([listKelas(), listBankSoal()])
      .then((res) => {
        setOptions({
          ...options,
          kelas: res[0].data,
          bank_soal: res[1].data,
        });
      })
      .finally(() => {
        dispatch({ loading: false });
      });

    fetchQuiz();
  }

  React.useEffect(() => {
    fetchData();
  }, [location]);

  function toggleStatus() {
    dispatch({ loading: true });
    changeStatusQuiz(id, values.status == 'AKTIF' ? 'TIDAK AKTIF' : 'AKTIF')
      .then(() => {
        fetchData();
      })
      .finally(() => {
        dispatch({ loading: false });
      });
  }

  function handleResetJawaban(e, data) {
    const confirmation = window.confirm('Apakah kamu yakin?');
    if (confirmation) {
      dispatch({ tableLoading: true });
      resetJawaban({
        siswa_id: data.id,
        quiz_id: id,
      })
        .then(() => {
          fetchData();
        })
        .finally(() => {
          dispatch({ tableLoading: false });
        });
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper className="paper-dense">
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                container
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={6}>
                  <WithBack>
                    <Typography variant="h5" className={classes.title}>
                      Detail Quiz
                    </Typography>
                  </WithBack>
                </Grid>
                <span
                  className={
                    values.status == null
                      ? 'STATUS_GREY'
                      : values.status == 'AKTIF'
                      ? 'STATUS_GREEN'
                      : 'STATUS_RED'
                  }
                >
                  {values.status || 'LOADING...'}
                </span>
              </Grid>

              <Grid item xs={12}>
                <Input
                  disabled
                  name="nama"
                  label="nama"
                  value={values.nama}
                  onChange={handleInputChange}
                  error={errors?.nama}
                  type="text"
                />
              </Grid>

              <Grid item xs={6}>
                <Input
                  disabled
                  name="durasi"
                  label="Durasi"
                  value={values.durasi}
                  onChange={handleInputChange}
                  error={errors?.durasi}
                  type="number"
                  endAdornment="Menit"
                />
              </Grid>

              <Grid item xs={6}>
                <Select
                  disabled
                  options={options.kelas}
                  labelKey="nama"
                  valueKey="id"
                  name="kelas_id"
                  label="Kelas"
                  value={values.kelas_id}
                  onChange={handleInputChange}
                  error={errors?.kelas_id}
                  type="text"
                />
              </Grid>

              <Grid item xs={6}>
                <Select
                  disabled
                  options={options.bank_soal}
                  labelKey="judul"
                  valueKey="id"
                  name="bank_soal_id"
                  label="Bank Soal"
                  value={values.bank_soal_id}
                  onChange={handleInputChange}
                  error={errors?.bank_soal_id}
                  type="text"
                />
              </Grid>

              <Grid item xs={6}>
                <DatePicker
                  disabled
                  name="tanggal"
                  label="tanggal"
                  value={values.tanggal}
                  onChange={handleChangeDatePicker}
                  error={errors?.tanggal}
                />
              </Grid>

              <Grid item xs={6}>
                <Checkbox
                  disabled
                  name="tampilkan_nilai"
                  label="Tampilkan nilai ke siswa ?"
                  checked={values.tampilkan_nilai}
                  onChange={handleCheckboxChange}
                  error={errors?.tampilkan_nilai}
                />
              </Grid>

              <Grid item xs={6} className={classes.end}>
                <Button
                  startIcon={<EditIcon />}
                  variant="text"
                  href={`/dashboard/quiz/edit/${id}`}
                  text="Edit"
                />
              </Grid>

              <Grid item xs={12}>
                {values.status == 'TIDAK AKTIF' && (
                  <Button
                    startIcon={<PlayArrowIcon />}
                    color="green"
                    onClick={toggleStatus}
                    fullWidth
                    text="MULAI QUIZ"
                  />
                )}

                {values.status == 'AKTIF' && (
                  <Button
                    startIcon={<StopIcon />}
                    color="red"
                    onClick={toggleStatus}
                    fullWidth
                    text="STOP QUIZ"
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className="paper-dense">
            <Grid item container spacing={2}>
              <Grid
                item
                xs={12}
                container
                justify="space-between"
                alignItems="center"
              >
                <Typography variant="h5" className={classes.title}>
                  Bank Soal
                </Typography>

                <Button
                  variant="text"
                  href={`/dashboard/bank-soal/detail/${values.bank_soal_id}`}
                  text="DETAIL"
                  endIcon={<ArrowForwardIcon />}
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  disabled
                  name="judul"
                  label="judul"
                  type="text"
                  value={values?.bank_soal?.judul}
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  disabled
                  name="pelajaran"
                  label="pelajaran"
                  type="text"
                  value={values?.bank_soal?.pelajaran.nama}
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  disabled
                  name="jenis_soal"
                  label="Jenis Soal"
                  type="text"
                  value={values?.bank_soal?.jenis_soal}
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  disabled
                  value={values?.bank_soal?.jumlah_soal}
                  name="jumlah_soal"
                  label="Jumlah Soal"
                  type="number"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Table
            title="Data Siswa"
            columns={[
              { title: 'Nama', field: 'nama' },
              { title: 'NISN', field: 'nisn' },
              {
                title: 'Nilai',
                field: 'nilai',
                render: (item) =>
                  item.quiz_status == 'SUDAH_DIKERJAKAN' ? item.nilai : '-',
              },
              {
                title: 'Rank',
                field: 'rank',
                render: (item) =>
                  item.quiz_status == 'SUDAH_DIKERJAKAN' ? item.rank : '-',
              },
              {
                title: 'Jam',
                field: 'timestamp',
                render: (item) =>
                  item.quiz_status == 'BELUM_DIKOREKSI' ||
                  item.quiz_status == 'SUDAH_DIKERJAKAN'
                    ? moment(item.timestamp).format('hh:mm')
                    : '-',
              },
              {
                title: 'Status',
                field: 'status',
                export: false,
                render: (item) => (
                  <span className={getStatusColor(item.quiz_status)}>
                    {item.quiz_status.replaceAll('_', ' ')}
                  </span>
                ),
              },
            ]}
            data={values.siswa}
            actions={[
              (item) => ({
                hidden:
                  item.quiz_status != 'SUDAH_DIKERJAKAN' &&
                  item.quiz_status != 'BELUM_DIKOREKSI',
                tooltip: 'Detail',
                icon: 'visibility',
                onClick: (_, data) =>
                  history.push(
                    `/dashboard/quiz/detail-jawaban/${id}/${data.id}`
                  ),
              }),
              (item) => ({
                hidden:
                  item.quiz_status != 'SUDAH_DIKERJAKAN' &&
                  item.quiz_status != 'BELUM_DIKOREKSI',
                tooltip: 'Reset',
                icon: 'replay',
                onClick: handleResetJawaban,
              }),
              (item) => ({
                hidden: item.quiz_status != 'BELUM_DIKOREKSI',
                tooltip: 'Koreksi Jawaban',
                icon: 'playlist_add_check',
                onClick: (_, data) =>
                  history.push(
                    `/dashboard/quiz/koreksi-jawaban/${id}/${data.id}`
                  ),
              }),
              {
                isFreeAction: true,
                tooltip: 'Refresh',
                icon: 'refresh',
                onClick: fetchQuiz,
              },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
}
