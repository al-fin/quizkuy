import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  uploadContainer: {
    width: '100%',
    marginBottom: theme.spacing(2),
    background: 'rgba(186, 190, 192, 0.1)',
    border: '0.5px solid rgba(186, 190, 192, 0.25)',
    padding: theme.spacing(1),
    boxSizing: 'border-box',
    borderRadius: 8,
    position: 'relative',
    cursor: 'pointer'
  },
  checkedIcon: {
    position: 'absolute',
    top: -12,
    right: -12,
    color: 'rgba(145,48,141, 1)',
    borderRadius: '50%',
  },
  uploadLabelContainer: {
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadLabel: {
    fontSize: 9,
    lineHeight: '1em',
    textAlign: 'center',
  },
  uploadImg: {
    width: '100%',
    height: 100,
    backgroundPosition: '50% 50%',
    backgroundSize: 'cover',
    border: '1.5px solid rgba(186, 190, 192, 0.25)',
    borderRadius: 8,
  },
  uploadContainerActive: {
    width: '100%',
    marginBottom: theme.spacing(2),
    background: 'rgb(145,48,141, 0.25)',
    border: '0.5px solid rgb(145,48,141, 0.25)',
    padding: theme.spacing(1),
    boxSizing: 'border-box',
    borderRadius: 8,
    position: 'relative',
    cursor: 'pointer'
  },
  uploadLabelContainerActive: {
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadLabelActive: {
    fontSize: 9,
    lineHeight: '1em',
    textAlign: 'center',
    color: 'rgb(145,48,141, 1)',
  },
  uploadImgActive: {
    width: '100%',
    height: 100,
    backgroundPosition: '50% 50%',
    backgroundSize: 'cover',
    border: '1.5px solid rgb(145,48,141, 0.25)',
    borderRadius: 8,
  },

  input: {
    display: 'none',
  },
  photo: {
    width: '100%',
    margin: '15px 0',
    borderRadius: 12,
    display: 'block',
  },
  errorValidation: {
    color: 'rgba(244, 67, 54, 1)',
    fontSize: '12px',
    marginLeft: '14px',
    marginTop: '3px',
  },
  hide: {
    display: "none",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2),
    textAlign: "center",
    margin: "0 auto",
  },
}));
