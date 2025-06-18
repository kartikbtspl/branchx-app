import React from 'react';
import { TextField } from '@mui/material';

const FormInput = ({
  name,
  type = 'text',
  placeholder,
  register,
  error,
  className = '',
  inputProps = {},        
  customSx = {},          
  ...rest                 
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <TextField
        id={name}
        type={type}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        fullWidth
        error={!!error}
        helperText={error?.message}
        {...register(name)}
        slotProps={{
          input: {
            ...inputProps,
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#f9f9f9',
            borderRadius: '6px',
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
          '& input': {
            padding: '10px 12px',
            fontSize: '14px',
            color: '#1f2937',
          },
          ...customSx, 
        }}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
