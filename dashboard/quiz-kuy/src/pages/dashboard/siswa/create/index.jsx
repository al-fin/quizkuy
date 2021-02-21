import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Input, Button, Select } from 'components/controls';
import { useForm } from 'hooks/use-form';
import { useStyles } from './styles';
import * as yup from 'yup';
import { extractErrors } from 'utils';
import { createSiswa } from 'services/siswa';
import { useHistory } from 'react-router-dom';
import useNotification from 'hooks/use-notification';
import WithBack from 'components/with-back';
import { useGlobalDispatch } from 'contexts/global';
import axios from 'axios';
import { listKelas } from 'services/kelas';

const validationSchema = yup.object().shape({
  nama: yup.string().label('Nama').required(),
  nisn: yup.number().label('NISN').required(),
  email: yup.string().email().label('Email').required(),
  password: yup.string().label('Password').required(),
});

export default function Create() {
  const { values, errors, setErrors, handleInputChange } = useForm({
    nama: '',
    nisn: '',
    kelas_id: '',
    email: '',
    password: '',
  });

  const history = useHistory();
  const classes = useStyles();
  const { sendSuccess } = useNotification();
  const dispatch = useGlobalDispatch();

  const [options, setOptions] = React.useState({
    kelas: [],
  });

  React.useEffect(() => {
    dispatch({ loading: true });

    axios
      .all([listKelas()])
      .then((res) => {
        setOptions({
          ...options,
          kelas: res[0].data,
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
          email: values.email,
          nama: values.nama,
          nisn: values.nisn,
          kelas_id: values.kelas_id,
          password: values.password,
        };

        dispatch({ loading: true });
        createSiswa(body)
          .then((res) => {
            console.log(res);
            history.push('/dashboard/siswa');
            sendSuccess('Berhasil menambahkan Siswa!');
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
                Tambah Siswa
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
              name="nisn"
              label="NISN"
              value={values.nisn}
              onChange={handleInputChange}
              error={errors?.nisn}
              type="number"
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
            <Input
              name="email"
              label="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors?.email}
              type="email"
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              name="password"
              label="password"
              value={values.password}
              onChange={handleInputChange}
              error={errors?.password}
              type="password"
            />
          </Grid>

          <Grid item xs={12} className={classes.end}>
            <Button type="button" text="Tambah" onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
