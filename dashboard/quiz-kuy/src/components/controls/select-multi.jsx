/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

export const CustomTextField = withStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      paddingBottom: 0,
      '& fieldset': {
        border: '2px solid #DDD',
        borderRadius: 4,
        transition: '0.2s ease-out',
        transform: 'translateY(4px)',
      },
      '&:hover fieldset': {
        border: '2px solid #DDD',
        borderRadius: 4,
        transition: '0.2s ease-out',
        transform: 'translateY(4px)',
      },
      '&.Mui-focused fieldset': {
        border: `2px solid ${theme.palette.primary.main}`,
        background: 'rgba(145, 48, 141, 0.1)',
        boxShadow: '0px 0px 5px 1px rgba(145, 48, 141, 0.25)',
        color: theme.palette.primary.main,
      },
      '&.Mui-error fieldset': {
        border: `2px solid rgba(242, 80, 86, 1)`,
        background: 'rgba(242, 80, 86, 0.1)',
        boxShadow: '0px 0px 5px 1px rgba(242, 80, 86, 0.25)',
        color: 'rgba(242, 80, 86, 1)',
      }
    },
  },
}))(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  errorValidation: {
    color: 'rgba(244, 67, 54, 1)',
    fontSize: '12px',
    marginLeft: '14px',
    marginTop: '3px',
  },
}));

export default function SelectMulti({
  name,
  label,
  labelStyle = {},
  value = [],
  onChange,
  error = '',
  options = [],
  labelKey,
  horizontal = false,
  item = false,
  placeholder = '',
  disabled = false,
  required = true,
  ...others
}) {
  const classes = useStyles();

  if (!horizontal) {

    return (
      <div>
        <Typography
          variant="caption"
          style={{ fontWeight: 'bold', display: 'block', marginBottom: 2, ...labelStyle }}
        >
          {label}{' '}
          {label && required && <span style={{ color: 'red' }}>*</span>}
        </Typography>
        <Autocomplete
          multiple
          disabled={disabled}
          options={options.map((option) => option[labelKey])}
          value={value}
          onChange={(event, newValue) => {
            console.log('newValue', newValue);
            onChange({
              target: {
                name: name,
                value: newValue
              }
            });
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip key={index} color="primary" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <CustomTextField error={error} {...params} variant="outlined" placeholder={placeholder} {...others} />
          )}
        />
        <div className={classes.errorValidation}>{error}</div>
      </div>
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
          <Autocomplete
            multiple
            disabled={disabled}
            options={options.map((option) => option[labelKey])}
            value={value}
            onChange={(event, newValue) => {
              onChange({
                target: {
                  name: name,
                  value: newValue
                }
              });
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <CustomTextField error={error} {...params} variant="outlined" placeholder={placeholder} {...others} />
            )}
          />
          <div className={classes.errorValidation}>{error}</div>
        </Grid>
      </Grid>
    );
  }
}
