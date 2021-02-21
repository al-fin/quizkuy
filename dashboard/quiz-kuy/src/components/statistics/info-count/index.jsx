import React from 'react';
import { useStyles } from './styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import SyncIcon from '@material-ui/icons/Sync';
import './styles.css';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useGlobalState } from 'contexts/global';

/*
 * size : large | small
 */
export default function InfoCount({
  title = '',
  count = 0,
  Icon = InfoIcon,
  size = 'large',
  onClick = null,
  onReFetch = null,
  ...others
}) {
  const classes = useStyles();
  const state = useGlobalState();

  return (
    <ButtonBase onClick={onClick} className={classes.buttonBase}>
      <Card className={classes.card} {...others}>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <Typography variant="body1" className={classes.title}>
              {title}
            </Typography>
            <Typography
              variant={size == 'large' ? 'h3' : 'h5'}
              className={classes.count}
            >
              {count}
            </Typography>
          </Grid>
          <Grid item xs={4} container justify="flex-end">
            <div
              className={classes.iconContainer}
              style={{
                width: size == 'large' ? 85 : 60,
                height: size == 'large' ? 85 : 60,
              }}
            >
              {state.countLoading === false && (
                <Icon
                  className={classes.icon}
                  style={{
                    fontSize: size == 'large' ? 60 : 40,
                  }}
                />
              )}
              {state.countLoading !== false && (
                <SyncIcon
                  onClick={onReFetch}
                  className={classes.icon}
                  style={{
                    animation:
                      state.countLoading === true
                        ? `spin 1s linear infinite`
                        : null,
                    fontSize: size == 'large' ? 60 : 40,
                  }}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Card>
    </ButtonBase>
  );
}
