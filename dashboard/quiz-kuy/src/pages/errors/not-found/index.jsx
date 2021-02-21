import React from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import NotFoundIllustration from 'images/not-found.svg';
import ArrowBackIcon from '@material-ui/icons/ArrowBackOutlined';
import { useStyles } from './styles';

const NotFound = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.wrapper}>
      <Grid container style={{ padding: 12 }}>
        <Grid item xs={12} container justify="center" className={classes.mt}>
          <Grid item xs={10} sm={8} md={6} lg={4}>
            <img
              src={NotFoundIllustration}
              alt="404 Not Found"
              className={classes.img}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.mt}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              className={clsx([classes.title, classes.center, classes.mt])}
            >
              Ooops.. Halaman tidak ditemukan
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            container
            spacing={2}
            justify="center"
            className={classes.mt}
          >
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
              >
                Kembali
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
