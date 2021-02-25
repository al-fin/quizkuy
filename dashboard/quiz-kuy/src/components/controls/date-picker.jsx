import React from 'react';
import { LocalizationProvider, DesktopDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Input } from 'components/controls';

export default function DatePicker(props) {
  const {
    name,
    value,
    onChange,
    disabled,
    errors = null,
    setErrors,
    minDate = null,
    maxDate = null,
    ...others
  } = props;

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <DesktopDatePicker
        disabled={disabled}
        value={value}
        onChange={(newValue) => onChange(name, newValue)}
        minDate={minDate}
        maxDate={maxDate}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <Input
            forwardedRef={inputRef}
            {...inputProps}
            endAdornment={InputProps?.endAdornment}
            {...others}
          />
        )}
        onError={(reason) => {
          if (errors && setErrors) {
            switch (reason) {
              case 'minDate':
                setErrors({
                  ...errors,
                  [name]: `the end date must not be less than the start date`,
                });
                break;
              case null:
                delete errors[name];
                break;
            }
          }
        }}
      />
    </LocalizationProvider>
  );
}
