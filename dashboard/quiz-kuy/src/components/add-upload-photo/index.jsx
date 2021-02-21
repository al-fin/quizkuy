import React from 'react';
import { useStyles } from './styles';
import Paper from '@material-ui/core/Paper';
import Add from '@material-ui/icons/Add';
import ButtonBase from '@material-ui/core/ButtonBase';

export default function AddUploadPhoto({
  onClick
}) {
  const classes = useStyles();

  return (
    <div>
      <ButtonBase onClick={onClick} className={classes.buttonBase}>
        <Paper className={classes.paperButton}>
          <div>
            <div className={classes.iconButton}>
              <Add fontSize="large" />
            </div>
            <div className={classes.textButton}>
            Add Photo
            </div>
          </div>
        </Paper>
      </ButtonBase>
    </div>
  );
}
