import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  danger: {
    backgroundColor: '#C51919',
    '& .MuiButton-label': {
      color: '#3c44b126',
    },
    '&:hover': {
      backgroundColor: '#C51919',
    },
  },
  success: {
    backgroundColor: '#23a821',
    '&:hover': {
      backgroundColor: '#23a821',
    },
  },
}));

export default function ActionButton(props) {
  const { color, children, onClick, ...others } = props;
  const classes = useStyles();

  return (
    <Button
      className={`${classes.root} ${classes[color]}`}
      onClick={onClick}
      {...others}
    >
      {children}
    </Button>
  );
}
