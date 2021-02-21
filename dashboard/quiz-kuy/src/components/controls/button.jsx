import React from 'react';
import { Button as MuiButton, makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

const RedButton = withStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(MuiButton);

const GreenButton = withStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(MuiButton);

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
  },
  label: {
    textTransform: 'none',
  },
}));

export default function Button(props) {
  const { text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();

  const Btn =
    color == 'red' ? RedButton : color == 'green' ? GreenButton : MuiButton;

  return (
    <Btn
      disableElevation
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      classes={{ root: classes.root, label: classes.label }}
      {...other}
    >
      {text}
    </Btn>
  );
}
