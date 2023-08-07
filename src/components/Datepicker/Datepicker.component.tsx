import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React from 'react';

type DatepickerCompProps = {
  value?: string;
  border?: string;
  setValue?: (value: string) => void;
};

export default function DatepickerComp(props: DatepickerCompProps) {
  const handleDateChange = (date: any, value: any) => {
    if (props?.setValue) props?.setValue(value);
  };

  const dateTheme = (createMuiTheme as any)({
    overrides: {
      MuiPickersDay: {
        day: {
          color: '#52516A',
          fontFamily: 'Montserrat !important',
          fontSize: '0.75rem !important',
          fontWeight: '400 !important',
        },
        daySelected: {
          backgroundColor: '#3263C9',
          borderRadius: '7px',
          color: 'white !important',
        },
      },
      MuiTypography: {
        body1: {
          fontFamily: 'Montserrat !important',
          fontSize: '0.825rem !important',
          fontWeight: '400 !important',
          color: '#52516A !important',
        },
        body2: {
          fontFamily: 'Montserrat !important',
          fontSize: '0.75rem !important',
          fontWeight: '400 !important',
        },
      },
      MuiPickersCalendarHeader: {
        dayLabel: {
          color: '#94959E !important',
          fontSize: '10px !important',
          fontWeight: '400 !important',
          textTransform: 'uppercase',
        },
        daysHeader: {
          borderBottom: '1px solid #52516A22 !important',
          marginRight: '12px',
          marginLeft: '12px',
          marginBottom: '12px',
          paddingBottom: '12px',
        },
        switchHeader: {
          marginBottom: '16px',
          marginTop: '8px',
        },
      },
      MuiPickersCalendar: {
        transitionContainer: {
          marginTop: '0px !important',
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={dateTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          id='date-picker-inline'
          value={new Date(props?.value ?? '1970-01-01')}
          onChange={handleDateChange}
          autoOk={true}
          InputProps={{
            style: {
              fontSize: '0.75rem',
              fontWeight: 500,
              fontFamily: 'Montserrat',
              color: '#7E7E8A',
              border: props?.border ? props?.border : '2px solid #3263c90d',
              paddingLeft: '10px',
              paddingRight: '10px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '10px',
            },
            disableUnderline: true,
          }}
          leftArrowIcon={
            <img
              src='/assets/images/listBuilder/arrow-left.svg'
              alt='calendar icon'
              className='h-5 w-5'
            />
          }
          rightArrowIcon={
            <img
              src='/assets/images/listBuilder/arrow-right.svg'
              alt='calendar icon'
              className='h-5 w-5'
            />
          }
          keyboardIcon={
            <img
              src='/assets/images/listBuilder/calendar.svg'
              alt='calendar icon'
              className='h-5 w-5'
            />
          }
          PopoverProps={{
            disableRestoreFocus: true,
            PaperProps: {
              style: {
                borderRadius: '15px',
              },
            },
            disableScrollLock: true,
          }}
        />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}
