import React from 'react';
import { useStyles } from './styles';

export default function PurpleContainer({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.background}></div>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
