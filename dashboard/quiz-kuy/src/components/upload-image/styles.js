import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  mb: {
    marginBottom: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  upload: {
    width: '100%',
    border: '2px dashed #DDD',
    borderRadius: 8,
    minHeight: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: theme.spacing(2),
    boxSizing: 'border-box',
  },
  textGrey: {
    color: '#AAA',
  },
  uploadButton: {
    background: 'rgba(0,0,0,0.2)',
    color: '#FFF',
    '&:hover': {
      background: 'rgba(0,0,0,0.2)',
      color: '#FFF',
    },
  },
  uploadButtonText: {
    background: 'rgba(0,0,0,0)',
    color: '#acafb3',
    '&:hover': {
      background: 'rgba(0,0,0,0)',
      color: '#acafb3',
    },
  },
  img: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    objectFit: 'cover',
    background: 'rgba(0,0,0,0.2)',
  },
}));
