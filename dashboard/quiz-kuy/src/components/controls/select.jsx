import React from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { CustomInputBaseLight } from './input';
import { Typography, Grid, MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  errorValidation: {
    color: 'rgba(244, 67, 54, 1)',
    fontSize: '12px',
    marginLeft: '14px',
    marginTop: '3px',
  },
  listbox: {
    margin: 0,
    padding: 0,
    minWidth: 200,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 200,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    transform: 'translateY(4px)',
    boxShadow: '0px 3px 15px 3px rgba(0,0,0,0.25)',
    '& li[data-focus="true"], & li:active': {
      color: theme.palette.primary.main,
      backgroundColor: 'rgba(0, 152, 219, 0.25)',
      cursor: 'pointer',
    },
  },
}));

export default function Select(props) {
  const classes = useStyles();

  const {
    name,
    label,
    labelStyle = {},
    value = '',
    onChange,
    error = '',
    options = [],
    valueKey,
    labelKey,
    horizontal = false,
    item = false,
    placeholder = '',
    disabled = false,
    required = true,
    allowCustomValue = false,
    onInputChange = null,
    isLoading = false,
    search = false,
    ...others
  } = props;

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    inputValue,
  } = useAutocomplete({
    freeSolo: allowCustomValue,
    autoSelect: allowCustomValue,
    id: name,
    options: allowCustomValue ? options.map((item) => item[labelKey]) : options,
    getOptionLabel: allowCustomValue
      ? (option) => option
      : (option) => option[labelKey],
    value: allowCustomValue
      ? value
      : options.filter((item) => item[valueKey] == value)[0] || null,
    onInputChange: onInputChange,
    onChange: (e, val) => {
      if (allowCustomValue) {
        onChange({
          target: {
            name: name,
            value: val,
          },
        });
      } else if (val !== null) {
        onChange({
          target: {
            name: name,
            value: val[valueKey],
          },
        });
      }
    },
  });

  if (!horizontal) {
    return (
      <>
        <div {...getRootProps()}>
          <Typography
            variant="caption"
            style={{ fontWeight: 'bold', display: 'block', ...labelStyle }}
          >
            {label}
          </Typography>
          <CustomInputBaseLight
            autoComplete={false}
            fullWidth
            disabled={disabled}
            placeholder={placeholder}
            startAdornment={search && <SearchIcon />}
            endAdornment={
              (isLoading && <CircularProgress size={20} />) ||
              (!allowCustomValue && !search && <ArrowDropDownIcon />) ||
              (options.length == 0 && inputValue.length > 0 && (
                <Tooltip arrow title="Tidak ada data">
                  <InfoIcon style={{ color: '#FFA500' }} />
                </Tooltip>
              ))
            }
            error={error}
            {...others}
            {...getInputProps()}
          />
        </div>
        <div>
          {!disabled && groupedOptions.length > 0 ? (
            <ul className={classes.listbox} {...getListboxProps()}>
              {groupedOptions.map((option, index) => (
                <MenuItem key={index} {...getOptionProps({ option, index })}>
                  {allowCustomValue ? option : option[labelKey]}
                </MenuItem>
              ))}
            </ul>
          ) : null}
        </div>
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
            {label}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <div {...getRootProps()}>
            <CustomInputBaseLight
              autoComplete={false}
              fullWidth
              disabled={disabled}
              placeholder={placeholder}
              startAdornment={search && <SearchIcon />}
              endAdornment={
                (isLoading && <CircularProgress size={20} />) ||
                (!allowCustomValue && !search && <ArrowDropDownIcon />) ||
                (options.length == 0 && inputValue.length > 0 && (
                  <Tooltip arrow title={'Tidak ada data'}>
                    <InfoIcon style={{ color: '#FFA500' }} />
                  </Tooltip>
                ))
              }
              error={error}
              {...others}
              {...getInputProps()}
            />
          </div>
          <div>
            {!disabled && groupedOptions.length > 0 ? (
              <ul className={classes.listbox} {...getListboxProps()}>
                {groupedOptions.map((option, index) => (
                  <MenuItem key={index} {...getOptionProps({ option, index })}>
                    {allowCustomValue ? option : option[labelKey]}
                  </MenuItem>
                ))}
              </ul>
            ) : null}
          </div>
          <div className={classes.errorValidation}>{error}</div>
        </Grid>
      </Grid>
    );
  }
}
