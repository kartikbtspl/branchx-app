import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FormTimeSlotPicker = ({
  startName = "startTime",
  endName = "endTime",
  label = "Select Time Slot",
  customCss = "",
  inputProps = {},
}) => {
  const { control } = useFormContext();

  return (
    <Box className={customCss}>
      <Typography variant="subtitle1" className="mb-2">
        {label}
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box display="flex" gap={2}>
          <Controller
            name={startName}
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <TimePicker
                label="Start Time"
                value={field.value ? dayjs(field.value) : null}
                onChange={(val) => field.onChange(val?.toISOString() || null)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    ...inputProps,
                  },
                }}
              />
            )}
          />

          <Controller
            name={endName}
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <TimePicker
                label="End Time"
                value={field.value ? dayjs(field.value) : null}
                onChange={(val) => field.onChange(val?.toISOString() || null)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    ...inputProps,
                  },
                }}
              />
            )}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default FormTimeSlotPicker;
