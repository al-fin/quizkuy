import React from 'react';
import {
  LocalizationProvider,
  DateRangePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {Input} from 'components/controls';

export default function DatePicker(props) {
  const { name, value, handleDatepickerChange, ...others } = props;

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <DateRangePicker allowSameDateSelection
        calendars={2}
        value={value}
        onChange={(newValue) => handleDatepickerChange(name, newValue)}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <Input forwardedRef={startProps.inputRef} inputProps={startProps.inputProps} label="Start Date" {...others} />
            <Input forwardedRef={endProps.inputRef} inputProps={endProps.inputProps} label="End Date" {...others} />
          </React.Fragment>
        )}
        inputP
      />
    </LocalizationProvider>
  );
}
