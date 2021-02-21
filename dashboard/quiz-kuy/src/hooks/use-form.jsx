import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, callback = null) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (errors[name]) {
      delete errors[name];
    }

    if (callback !== null) {
      callback(value);
    }
  };

  const handleDatepickerChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setValues({
      ...values,
      [name]: checked,
    });
    if (errors[name]) {
      delete errors[name];
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    setErrors,
    setValues,
    handleInputChange,
    handleCheckboxChange,
    handleDatepickerChange,
    resetForm,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      //   margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {children}
    </form>
  );
}
