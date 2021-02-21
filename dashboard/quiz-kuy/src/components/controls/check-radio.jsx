import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const CheckRadio = withStyles({
  root: {
    color: '#CCC',
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => (
  <Radio
    icon={<RadioButtonUncheckedIcon />}
    checkedIcon={<CheckCircleIcon />}
    {...props}
  />
));

export default CheckRadio;
