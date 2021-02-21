import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '600px',
  },
  mb4: {
    marginBottom: theme.spacing(4),
  },
  title: {
    fontWeight: 'bold',
  },
  end: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
