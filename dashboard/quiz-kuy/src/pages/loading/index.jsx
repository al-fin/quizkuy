import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './styles';

export default function Loading() {
  const classes = useStyles();
  const lang = localStorage.getItem('i18nextLng');

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <div>
        <Grid item container justify="center" alignItems="center">
          <CircularProgress />
        </Grid>
        <Typography variant="subtitle1" className={classes.text}>
          {lang === 'id' ? 'Tunggu Sebentar...' : 'Please Wait...'}
        </Typography>
      </div>
    </Grid>
  );
}
