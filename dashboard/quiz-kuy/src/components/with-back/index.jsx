import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default function WithBack({ style = {}, children }) {
  const history = useHistory();

  return (
    <Grid
      container
      alignItems="center"
      style={{ transform: 'translate(-15px)', ...style }}
    >
      <Tooltip title="Kembali">
        <IconButton onClick={() => history.goBack()}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      {children}
    </Grid>
  );
}
