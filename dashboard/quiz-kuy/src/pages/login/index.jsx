/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Grid, Typography } from '@material-ui/core';
import { useForm, Form } from 'hooks/use-form';
import { Button, Input } from 'components/controls';
import { useStyles } from './styles';
import PurpleContainer from 'templates/purple-container';
import * as yup from 'yup';
import { extractErrors } from 'utils';
import { loginGuru } from 'services/guru';
import ErrorDialog from 'error-handler/error-dialogs';
import useNotification from 'hooks/use-notification';
import Cookies from 'js-cookie';
import { tokenExpiration } from 'config';
import Logo from 'images/logo.png';

const validationSchema = yup.object().shape({
  email: yup.string().label('Email').required().email(),
  password: yup.string().label('Password').required(),
});

const initialValues = {
  email: '',
  password: '',
};

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    open: false,
    message: 'Email atau password salah!',
  });
  const { sendSuccess } = useNotification();

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialValues
  );

  React.useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      history.push('/dashboard');
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        console.log(values);
        setErrors({});
        setLoading(true);
        loginGuru({
          email: values.email,
          password: values.password,
        })
          .then(async (res) => {
            Cookies.set('token', res.data.token, {
              expires: tokenExpiration,
            });
            Cookies.remove('token');
            Cookies.set('token', res.data.token, {
              expires: tokenExpiration,
            });
            localStorage.setItem('profile', JSON.stringify(res.data));

            history.push(`/dashboard`);
            sendSuccess('Login berhasil!');
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setErrors(extractErrors(err));
      });
  };

  return (
    <>
      <PurpleContainer>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '80vh' }}
        >
          <Grid item xs={12} sm={8} md={6} lg={5}>
            <Paper className={classes.pageContent}>
              <Form onSubmit={handleSubmit}>
                <Grid container>
                  <Grid item xs={12}>
                    <div className={classes.logoSpace}>
                      <img src={Logo} className={classes.logo} alt="logo" />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" className={classes.title}>
                      Quiz<span style={{ fontWeight: '300' }}>Kuy</span>
                    </Typography>
                    <Typography variant="body1" className={classes.textLight}>
                      Login sebagai Guru
                    </Typography>
                  </Grid>

                  <Grid container spacing={2} justify="center">
                    <Grid item xs={10}>
                      <Input
                        label="email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <Input
                        label="password"
                        name="password"
                        onChange={handleInputChange}
                        error={errors.password}
                        type="password"
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <Button
                        text={loading ? 'Loading...' : 'Login'}
                        type="submit"
                        fullWidth="true"
                        style={{ marginTop: 20 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </Paper>
          </Grid>
        </Grid>
      </PurpleContainer>

      <ErrorDialog error={error} setError={setError} />
    </>
  );
}
