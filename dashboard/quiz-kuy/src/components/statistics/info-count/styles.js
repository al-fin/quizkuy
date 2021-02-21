import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: '0px 6px 12px 2px rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(2),
    background: 'rgba(0, 152, 219, 1)',
    border: 'none',
    borderLeft: `5px solid #fff`,
  },
  title: {
    color: 'rgba(255,255,255,0.75)',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  count: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
  },
  iconContainer: {
    background: 'rgba(255,255,255, 0.2)',
    width: 60,
    height: 60,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#fff',
    fontSize: 40,
  },
  buttonBase: { color: '#FFF', display: 'block', width: '100%' },
}));
