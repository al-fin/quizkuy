import React from 'react';
import { InputBase, Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="Rp "
    />
  );
}

export const useStyles = makeStyles(() => ({
  errorValidation: {
    color: 'rgba(244, 67, 54, 1)',
    fontSize: '12px',
    marginLeft: '14px',
    marginTop: '3px',
  },
}));

export const CustomInputBase = withStyles((theme) => ({
  root: {
    borderRadius: 4,
    transition: '0.2s ease-out',
    transform: 'translateY(4px)',
    color: '#FFF',
    border: `2px solid rgba(255,255,255,0.075)`,
    background: 'rgba(255,255,255,0.2)',
    '&:hover': {
      background: 'rgba(255,255,255,0.1)',
    },
  },
  adornedStart: {
    paddingLeft: 10,
    color: '#FFF',
  },
  adornedEnd: {
    paddingRight: 10,
    color: '#FFF',
  },
  input: {
    padding: 11,
    color: '#FFF',
  },
  focused: {
    background: 'rgba(255,255,255,0.1)',
  },
  error: {
    border: `2px solid rgba(242, 80, 86, 1)`,
    background: 'rgba(255,255,255,0.1)',
    color: 'rgba(242, 80, 86, 1)',
  },
}))(InputBase);

export default function Input(props) {
  const {
    name,
    label,
    labelStyle = {},
    value,
    onChange,
    error = '',
    horizontal = false,
    item = false,
    currency = false,
    type = 'text',
    forwardedRef = null,
    required = true,
    inputProps = null,
    ...other
  } = props;
  const classes = useStyles();

  if (!horizontal) {
    return (
      <>
        <Typography
          variant="caption"
          style={{ fontWeight: 'bold', display: 'block', ...labelStyle }}
        >
          {label} {label && required && <span style={{ color: 'red' }}>*</span>}
        </Typography>
        <CustomInputBase
          ref={forwardedRef}
          fullWidth
          name={name}
          value={value}
          onChange={onChange}
          error={error}
          inputComponent={currency ? NumberFormatCustom : 'input'}
          required={required}
          {...inputProps}
          {...other}
          type={currency ? 'text' : type}
          inputProps={{ min: 0 }}
        />
        <div className={classes.errorValidation}>{error}</div>
      </>
    );
  } else {
    return (
      <Grid container alignItems="center" item={item}>
        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 'bold', display: 'block', ...labelStyle }}
          >
            {label}{' '}
            {label && required && <span style={{ color: 'red' }}>*</span>}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <CustomInputBase
            ref={forwardedRef}
            fullWidth
            name={name}
            value={value}
            onChange={onChange}
            error={error}
            inputComponent={currency ? NumberFormatCustom : 'input'}
            required={required}
            {...inputProps}
            {...other}
            type={currency ? 'text' : type}
            inputProps={{ min: 0 }}
          />
          <div className={classes.errorValidation}>{error}</div>
        </Grid>
      </Grid>
    );
  }
}
