import React from 'react';
import { InputLabel } from '@mui/material';

const FormLabel = ({
  htmlFor,
  text,
  required = false,
  className = '',
  customSx = {},           
  inputProps = {},         
}) => {
  return (
    <InputLabel
      htmlFor={htmlFor}
      className={`text-md font-bold mb-1 ${className}`}
      shrink
      sx={customSx}
      {...inputProps}
    >
      {text}
      {required && <span className="text-red-500 ml-1">*</span>}
    </InputLabel>
  );
};

export default FormLabel;
