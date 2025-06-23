import React from "react";
import { useController } from "react-hook-form";
import FormLabel from "../formLabel/FormLabel"; // Update the path if needed

const FormDaysOfWeek = ({
  name,
  control,
  error,
  required = false,
  label = "Days of the Week",
  options = [
    { label: "Mon", value: "monday" },
    { label: "Tue", value: "tuesday" },
    { label: "Wed", value: "wednesday" },
    { label: "Thu", value: "thursday" },
    { label: "Fri", value: "friday" },
    { label: "Sat", value: "saturday" },
    { label: "Sun", value: "sunday" },
  ],
  className = "",
  customCss = "",
  inputProps = {},
}) => {
  const {
    field: { value = [], onChange },
  } = useController({
    name,
    control,
    rules: { required: required && "This field is required" },
  });

  const toggleDay = (day) => {
    if (value.includes(day)) {
      onChange(value.filter((d) => d !== day));
    } else {
      onChange([...value, day]);
    }
  };

  return (
    <div className={`w-full ${className} ${customCss}`}>
      <FormLabel htmlFor={name} text={label} required={required} />
      <div className="flex flex-wrap gap-2 mt-1">
        {options.map((day) => (
          <label
            key={day.value}
            className={`px-3 py-1 rounded border cursor-pointer select-none ${
              value.includes(day.value)
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              value={day.value}
              checked={value.includes(day.value)}
              onChange={() => toggleDay(day.value)}
              className="hidden"
              {...inputProps}
            />
            {day.label}
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default FormDaysOfWeek;
