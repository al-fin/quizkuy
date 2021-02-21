import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Input, Button, Select } from 'components/controls';
import { useForm } from 'hooks/use-form';
import { useStyles } from './styles';
import * as yup from 'yup';
import { extractErrors } from 'utils';
import { editSiswa, detailSiswa } from 'services/siswa';
import { listKelas } from 'services/kelas';
import { useHistory, useParams } from 'react-router-dom';
import useNotification from 'hooks/use-notification';
import WithBack from 'components/with-back';
import { useGlobalDispatch } from 'contexts/global';
import axios from 'axios';

export default function Edit() {
  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    nama: '',
    nisn: '',
    email: '',
    kelas_id: '',
    password: '',
  });

  const { id } = useParams();
  const dispatch = useGlobalDispatch();

  const history = useHistory();
  const classes = useStyles();
  const { sendSuccess } = useNotification();

  const [options, setOptions] = React.useState({
    kelas: [],
  });

  const validationSchema = yup.object().shape({
    nama: yup.string().label('Nama').required(),
    nisn: yup.number().label('NISN').required(),
    kelas_id: yup.number().label('Kelas').required(),
    email: yup.string().email().label('Email').required(),
  });

  React.useEffect(() => {
    dispatch({ loading: true });

    axios.all([listKelas()]).then((res) => {
      setOptions({
        ...options,
        kelas: res[0].data,
      });
    });

    detailSiswa(id)
      .then(({ data }) => {
        setValues({
          ...values,
          nama: data.nama,
          nisn: data.nisn,
          email: data.email,
          kelas_id: data.kelas_id,
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
          nisn: values.nisn,
          email: values.email,
          kelas_id: values.kelas_id,
          password: values.password,
        };

        dispatch({ loading: true });
        editSiswa(id, body)
          .then(() => {
            history.push('/dashboard/siswa');
            sendSuccess('Berhasil mengedit Siswa!');
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
                Edit Siswa
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
            <Button type="button" text="Edit" onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
