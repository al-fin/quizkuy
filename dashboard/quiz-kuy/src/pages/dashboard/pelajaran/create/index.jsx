import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Input, Button } from 'components/controls';
import { useForm } from 'hooks/use-form';
import { useStyles } from './styles';
import * as yup from 'yup';
import { extractErrors } from 'utils';
import { createPelajaran } from 'services/pelajaran';
import { useHistory } from 'react-router-dom';
import useNotification from 'hooks/use-notification';
import WithBack from 'components/with-back';
import { useGlobalDispatch } from 'contexts/global';

export default function Create() {
  const { values, errors, setErrors, handleInputChange } = useForm({
    nama: '',
  });

  const history = useHistory();
  const classes = useStyles();
  const { sendSuccess } = useNotification();
  const dispatch = useGlobalDispatch();

  const validationSchema = yup.object().shape({
    nama: yup.string().label('Username').required(),
  });

  const handleSubmit = () => {
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        setErrors({});
        const body = {
          nama: values.nama,
        };

        dispatch({ loading: true });
        createPelajaran(body)
          .then((res) => {
            console.log(res);
            history.push('/dashboard/pelajaran');
            sendSuccess('Berhasil menambahkan Pelajaran!');
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
                Tambah Pelajaran
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

          <Grid item xs={12} className={classes.end}>
            <Button type="button" text="Tambah" onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
