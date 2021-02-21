import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import MUICheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function Checkbox(props) {
  const {
    name,
    label,
    labelStyle = {},
    value,
    onChange,
    horizontal = false,
    item = false,
    ...other
  } = props;

  if (!horizontal) {
    return (
      <FormControlLabel
        control={<MUICheckbox color="primary" />}
        label={label}
        labelPlacement="end"
        checked={value}
        name={name}
        onChange={onChange}
        {...other}
      />
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
          <MUICheckbox
            color="primary"
            name={name}
            checked={value}
            onChange={onChange}
            {...other}
          />
        </Grid>
      </Grid>
    );
  }
}
