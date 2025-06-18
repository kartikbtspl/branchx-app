import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { useController } from "react-hook-form";

const FormRadioGroup = ({
  name,
  control,
  label,
  required = false,
  options = [],
  customClassName = "",         // New prop for external CSS class
  inputProps = {},              // New prop to pass to each Radio
  labelProps = {},              // Optional: props for FormLabel
  radioGroupProps = {},         // Optional: props for RadioGroup
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: required ? "This field is required" : false },
  });

  return (
    <FormControl
      component="fieldset"
      error={!!error}
      className={customClassName}
      sx={{ marginBottom: 2 }}
    >
      {label && (
        <FormLabel component="legend" {...labelProps}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </FormLabel>
      )}
      <RadioGroup {...field} row {...radioGroupProps}>
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio inputProps={inputProps} />}
            label={opt.label}
          />
        ))}
      </RadioGroup>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default FormRadioGroup;
