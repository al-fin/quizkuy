import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  paperButton: {
    padding: theme.spacing(2),
    transition: '0.1s ease-out',
    boxShadow: 'none',
    border: '2.5px dashed #DDD',
    color: '#FFF',
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', },
  iconButton: {
    paddingTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#DDD'
  },
  textButton: {
    paddingBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#CCC'
  },
  titleSpace: {
    paddingTop: 20,
    paddingBottom: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  buttonBase: { color: '#FFF', display: 'block', width: '100%' },
}));
