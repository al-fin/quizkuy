import React from 'react';
import { InputBase, Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import MaskedInput from 'react-text-mask';

export const useStyles = makeStyles(() => ({
  errorValidation: {
    color: 'rgba(244, 67, 54, 1)',
    fontSize: '12px',
    marginLeft: '14px',
    marginTop: '3px',
  },
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', 'B', 'P', '2', 'T', '/', /\d/, /\d/, '-', /\d/, /\d/, '/','P', 'K', '/', /\w/, /\w/, '/', /\d/,/\d/,/\d/,/\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

export const CustomInputBase = withStyles((theme) => ({
  root: {
    border: '2px solid #DDD',
    borderRadius: 4,
    transition: '0.2s ease-out',
    transform: 'translateY(4px)'
  },
  adornedStart: {
    paddingLeft: 10,
  },
  adornedEnd: {
    paddingRight: 10,
  },
  input: {
    padding: 11,
  },
  focused: {
    border: `2px solid ${theme.palette.primary.main}`,
    background: 'rgba(145, 48, 141, 0.1)',
    boxShadow: '0px 0px 5px 1px rgba(145, 48, 141, 0.25)',
    color: theme.palette.primary.main,
  },
  error: {
    border: `2px solid rgba(242, 80, 86, 1)`,
    background: 'rgba(242, 80, 86, 0.1)',
    boxShadow: '0px 0px 5px 1px rgba(242, 80, 86, 0.25)',
    color: 'rgba(242, 80, 86, 1)',
  },
  disabled: {
    background: '#EFEFEF',
  },
}))(InputBase);

export default function InputSIUP(props) {
  const {
    name,
    label,
    labelStyle = {},
    value,
    onChange,
    error = '',
    horizontal = false,
    item = false,
    forwardedRef = null,
    required=true,
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
          {label} {label && required && (
            <span style={{color: 'red'}}>*</span>
          )}
        </Typography>
        <CustomInputBase
          ref={forwardedRef}
          fullWidth
          name={name}
          value={value}
          onChange={onChange}
          error={error}
          required={required}
          {...other}
          type={'text'}
          inputComponent={TextMaskCustom}
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
            {label} {label && required && (
              <span style={{color: 'red'}}>*</span>
            )}
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
            required={required}
            {...other}
            type={'text'}
            inputComponent={TextMaskCustom}
          />
          <div className={classes.errorValidation}>{error}</div>
        </Grid>
      </Grid>
    );
  }
}
