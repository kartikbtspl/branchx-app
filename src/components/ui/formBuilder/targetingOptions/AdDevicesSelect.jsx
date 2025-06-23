import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { deviceTypes } from "../../../../api/campaign-api/targetingOptionService";
import FormLabel from "../../formLabel/FormLabel";

const AdDevicesSelect = () => {
  const { control, setValue, formState: { errors } } = useFormContext();
  const [adDeviceOptions, setAdDeviceOptions] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devices = await deviceTypes();
        const unique = Array.from(new Map(devices.map(d => [d.deviceType, d])).values())
          .map(d => ({
            name: d.deviceType,
            price: d.price,
            count: d.availableCount,
          }));
        setAdDeviceOptions(unique);
      } catch (err) {
        console.error("Failed to fetch devices:", err);
      }
    };
    fetchDevices();
  }, []);

  return (
    <div className="w-full">
      <FormLabel text="Ad Devices" required />
      <Controller
        name="adDevices"
        control={control}
        defaultValue={[]}
        rules={{ required: "Please select at least one device" }}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            fullWidth
            options={adDeviceOptions}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            value={value}
            onChange={(e, newValue) => {
              const removedDevices = (value || []).filter(
                (d) => !newValue.some((nd) => nd.name === d.name)
              );
              removedDevices.forEach((d) => setValue(`deviceUsage.${d.name}`, undefined));
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Devices"
                error={!!errors.adDevices}
                helperText={errors.adDevices?.message}
                size="small"
                fullWidth
              />
            )}
          />
        )}
      />
    </div>
  );
};

export default AdDevicesSelect;
