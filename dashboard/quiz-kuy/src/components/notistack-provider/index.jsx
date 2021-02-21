import React from 'react';
import { SnackbarProvider } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function NotistackProvider({children}) {
  const notistackRef = React.useRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <SnackbarProvider
      maxSnack={10}
      ref={notistackRef}
      action={(key) => (
        <IconButton onClick={onClickDismiss(key)} style={{color: 'white'}} size="small">
          <CloseIcon />
        </IconButton>
      )}>
      {children}
    </SnackbarProvider>
  );
}

export default NotistackProvider;
