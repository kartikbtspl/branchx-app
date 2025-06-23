import { TextField } from "@mui/material";

const FormInput = ({
  name,
  type = 'text',
  placeholder,
  register,
  error,
  className = '',
  inputProps = {},
  customSx = {},
  variant = 'outlined',
  size = 'small',
  readOnly = false, // ← add this
  ...rest
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <TextField
        id={name}
        type={type}
        placeholder={placeholder}
        variant={variant}
        size={size}
        fullWidth
        error={!!error}
        helperText={error?.message}
        {...register(name)}
        InputProps={{
          readOnly, // ← apply here
        }}
        slotProps={{
          input: {
            ...inputProps,
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: readOnly ? '#f0fdf4' : '#f9f9f9', // highlight if readOnly
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