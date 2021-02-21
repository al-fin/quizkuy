import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingFetchData({isLoading, setLoading}) {
  return (
    <Dialog
      open={isLoading}
      onClose={() => setLoading(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <CircularProgress />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
