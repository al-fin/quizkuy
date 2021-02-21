import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '70vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
  },
  img: {
    width: '100%',
    textAlign: 'center',
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  mt: {
    marginTop: theme.spacing(2),
  },
}));
