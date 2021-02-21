import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Input, Button } from 'components/controls';
import { useForm } from 'hooks/use-form';
import { useStyles } from './styles';
import * as yup from 'yup';
import { extractErrors } from 'utils';
import { editGuru, detailGuru } from 'services/guru';
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
    nama: yup.string().label('Nama').required(),
    email: yup.string().email().label('Email').required(),
  });

  React.useEffect(() => {
    dispatch({ loading: true });
    detailGuru(id)
      .then(({ data }) => {
        setValues({
          ...values,
          nama: data.nama,
          email: data.email,
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
          password: values.password,
        };

        dispatch({ loading: true });
        editGuru(id, body)
          .then(({ data }) => {
            const profile = JSON.parse(localStorage.getItem('profile'));

            if (profile.id == id) {
              localStorage.setItem('profile', JSON.stringify(data));
            }
            history.push('/dashboard/guru');
            sendSuccess('Berhasil mengedit Guru!');
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
                Edit Guru
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
            <Button type="button" text="Edit" onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
