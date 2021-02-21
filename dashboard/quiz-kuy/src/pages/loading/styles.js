import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
  },
  text: {
    color: '#AAA',
    textAlign: 'center',
    display: 'block',
    marginTop: theme.spacing(2),
  },
}));
