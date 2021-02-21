import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  pageContent: {
    borderRadius: 15,
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    boxShadow: '0px 2px 20px rgba(0,0,0,0.2)',
  },
  logoSpace: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: 100,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textLight: {
    fontWeight: 300,
    color: '#888',
    fontSize: 18,
    textAlign: 'center',
  },
  dashedDivider: {
    border: 'none',
    borderBottom: '4px dashed #DDD',
    marginTop: 15,
  },
  footerInPaper: {
    paddingTop: 20,
    paddingBottom: 40,
    textAlign: 'center',
  },
  errorValidation: {
    color: 'rgba(244, 67, 54, 1)',
    fontSize: '12px',
    marginLeft: '14px',
    marginTop: '3px',
    display: 'block',
  },
  forgotPassword: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 16,
    color: '#948F8F',
    fontStyle: 'italic',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
