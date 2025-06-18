import React from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const FormDatePicker = ({
  name,
  control,
  required = false,
  error,
  className = '',
  inputProps = {},    
  customSx = {},     
  ...rest
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name={name}
          control={control}
          rules={{ required: required ? 'This field is required' : false }}
          render={({ field }) => (
            <DatePicker
              {...field}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  error: !!error,
                  helperText: error?.message,
                  variant: 'outlined',
                  sx: {
                    backgroundColor: '#f9f9f9',
                    borderRadius: '6px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: error ? '#f44336' : '#cbd5e0',
                      },
                      '&:hover fieldset': {
                        borderColor: '#3b82f6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2563eb',
                      },
                    },
                    ...customSx,  
                  },
                  ...inputProps,  
                },
              }}
              {...rest}
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default FormDatePicker;
