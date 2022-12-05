import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as DatePickerMui, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Moment } from 'moment';

type Props = Omit<DatePickerProps<Moment,Moment>, 'renderInput'>;

export default function DatePicker(props: Props) {

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePickerMui
        {...props}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
