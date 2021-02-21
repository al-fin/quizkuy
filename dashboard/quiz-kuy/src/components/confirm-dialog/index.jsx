import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Button } from '../controls';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogContent: {
    textAlign: 'center',
  },
  dialogAction: {
    justifyContent: 'center',
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      cursor: 'default',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={confirmDialog.isOpen}
      classes={{ paper: classes.dialog }}
      TransitionComponent={Transition}
    >
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button
          text="No"
          color="default"
          //reset the property isOpen to false, and rest of the property can be
          //accessed from confirm dialog
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Button
          text="Yes"
          style={{ backgroundColor: 'red' }}
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}
