import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function RadioGroup(props) {
  const {
    name,
    label,
    labelStyle = {},
    value,
    onChange,
    items,
    error = '',
  } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <FormLabel>
        <Typography
          variant="caption"
          style={{
            fontWeight: 'bold',
            display: 'block',
            color: 'black',
            ...labelStyle,
          }}
        >
          {label}
        </Typography>
      </FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((itemSingular) => (
          <FormControlLabel
            key={itemSingular.id}
            value={itemSingular.id}
            control={<Radio color="primary" />}
            label={itemSingular.title}
          />
        ))}
      </MuiRadioGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
