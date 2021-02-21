import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  background: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    height: 200,
    width: '100%',
    background: theme.palette.primary.main,
  },
  content: {
    zIndex: 2,
    position: 'relative',
  },
}));
