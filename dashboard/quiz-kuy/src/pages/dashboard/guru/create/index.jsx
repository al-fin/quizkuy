import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Input, Button } from 'components/controls';
import { useForm } from 'hooks/use-form';
import { useStyles } from './styles';
import * as yup from 'yup';
import { extractErrors } from 'utils';
import { createGuru } from 'services/guru';
import { useHistory } from 'react-router-dom';
import useNotification from 'hooks/use-notification';
import WithBack from 'components/with-back';
import { useGlobalDispatch } from 'contexts/global';

export default function Create() {
  const { values, errors, setErrors, handleInputChange } = useForm({
    nama: '',
    email: '',
    password: '',
  });

  const history = useHistory();
  const classes = useStyles();
  const { sendSuccess } = useNotification();
  const dispatch = useGlobalDispatch();

  const validationSchema = yup.object().shape({
    nama: yup.string().label('Nama').required(),
    email: yup.string().email().label('Email').required(),
    password: yup.string().label('Password').required(),
  });

  const handleSubmit = () => {
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        setErrors({});
        const body = {
          email: values.email,
          nama: values.nama,
          password: values.password,
        };

        dispatch({ loading: true });
        createGuru(body)
          .then((res) => {
            console.log(res);
            history.push('/dashboard/guru');
            sendSuccess('Berhasil menambahkan Guru!');
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
                Tambah Guru
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
