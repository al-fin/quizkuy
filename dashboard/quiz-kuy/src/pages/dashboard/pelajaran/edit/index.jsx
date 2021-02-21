import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Input, Button } from 'components/controls';
import { useForm } from 'hooks/use-form';
import { useStyles } from './styles';
import * as yup from 'yup';
import { extractErrors } from 'utils';
import { editPelajaran, detailPelajaran } from 'services/pelajaran';
import { useHistory, useParams } from 'react-router-dom';
import useNotification from 'hooks/use-notification';
import WithBack from 'components/with-back';
import { useGlobalDispatch } from 'contexts/global';

export default function Edit() {
  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    nama: '',
    email: '',
    password: '',
  });

  const { id } = useParams();
  const dispatch = useGlobalDispatch();

  const history = useHistory();
  const classes = useStyles();
  const { sendSuccess } = useNotification();

  const validationSchema = yup.object().shape({
    nama: yup.string().label('Username').required(),
    email: yup.string().email().label('Email').required(),
  });

  React.useEffect(() => {
    dispatch({ loading: true });
    detailPelajaran(id)
      .then(({ data }) => {
        setValues({
          ...values,
          nama: data.nama,
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
        };

        dispatch({ loading: true });
        editPelajaran(id, body)
          .then(() => {
            history.push('/dashboard/pelajaran');
            sendSuccess('Berhasil mengedit Pelajaran!');
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
                Edit Pelajaran
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
            <Button type="button" text="Edit" onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
