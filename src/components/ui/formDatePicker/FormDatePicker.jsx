import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const FormDatePicker = ({
  name,
  control,
  required = false,
  error,
  className = '',
  ...rest
}) => {
  return (
    <div className={`mb-4 ${className}`}>
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
                },
              },
            }}
            {...rest}
          />
        )}
      />
    </div>
  );
};

export default FormDatePicker;
