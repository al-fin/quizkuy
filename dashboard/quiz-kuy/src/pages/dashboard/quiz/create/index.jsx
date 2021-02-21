import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import {
  Input,
  Button,
  Select,
  DatePicker,
  Checkbox,
} from 'components/controls';
import { useForm } from 'hooks/use-form';
import { useStyles } from './styles';
import * as yup from 'yup';
import { extractErrors } from 'utils';
import { createQuiz } from 'services/quiz';
import { useHistory } from 'react-router-dom';
import useNotification from 'hooks/use-notification';
import WithBack from 'components/with-back';
import { useGlobalDispatch } from 'contexts/global';
import axios from 'axios';
import { listKelas } from 'services/kelas';
import { listBankSoal } from 'services/bank-soal';

const validationSchema = yup.object().shape({
  nama: yup.string().label('Nama').required(),
  bank_soal_id: yup.number().label('Quiz').required(),
  kelas_id: yup.number().label('Kelas').required(),
  durasi: yup.number().label('Durasi').required(),
  tanggal: yup.string().label('Email').required(),
});

export default function Create() {
  const {
    values,
    errors,
    setErrors,
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
  });

  const history = useHistory();
  const classes = useStyles();
  const { sendSuccess } = useNotification();
  const dispatch = useGlobalDispatch();

  const [options, setOptions] = React.useState({
    kelas: [],
    bank_soal: [],
  });

  React.useEffect(() => {
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
  }, []);

  const handleSubmit = () => {
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        setErrors({});
        const body = {
          nama: values.nama,
          durasi: values.durasi,
          kelas_id: values.kelas_id,
          bank_soal_id: values.bank_soal_id,
          tanggal: values.tanggal,
          tampilkan_nilai: values.tampilkan_nilai,
        };

        dispatch({ loading: true });
        createQuiz(body)
          .then((res) => {
            console.log(res);
            history.push('/dashboard/quiz');
            sendSuccess('Berhasil menambahkan Quiz!');
          })
          .finally(() => {
            dispatch({ loading: false });
          });
      })
      .catch((err) => {
        console.log(err);
        setErrors(extractErrors(err));
      });
  };

  return (
    <>
      <Paper className="paper-dense">
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12}>
            <WithBack>
              <Typography variant="h5" className={classes.title}>
                Tambah Quiz
              </Typography>
            </WithBack>
          </Grid>

          <Grid item xs={12}>
            <Input
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
              name="tanggal"
              label="tanggal"
              value={values.tanggal}
              onChange={handleChangeDatePicker}
              error={errors?.tanggal}
            />
          </Grid>

          <Grid item xs={6}>
            <Checkbox
              name="tampilkan_nilai"
              label="Tampilkan nilai ke siswa ?"
              value={values.tampilkan_nilai}
              onChange={handleCheckboxChange}
              error={errors?.tampilkan_nilai}
            />
          </Grid>

          <Grid item xs={6} className={classes.end}>
            <Button type="button" text="Tambah" onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
