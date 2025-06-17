import React from 'react';
import { InputLabel } from '@mui/material';

const FormLabel = ({ htmlFor, text, required = false, className = '' }) => {
  return (
    <InputLabel
      htmlFor={htmlFor}
      className={`text-md font-bold  mb-1 ${className}`}
      shrink
    >
      {text}
      {required && <span className="text-red-500 ml-1">*</span>}
    </InputLabel>
  );
};

export default FormLabel;
