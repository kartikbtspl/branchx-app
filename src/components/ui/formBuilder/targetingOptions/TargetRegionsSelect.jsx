import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { targetRegions } from "../../../../api/campaign-api/targetingOptionService";
import FormLabel from "../../formLabel/FormLabel";
const TargetRegionsSelect = () => {
  const { control, formState: { errors } } = useFormContext();
  const [regionOptions, setRegionOptions] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const regions = await targetRegions();
        const seen = new Set();
        const formatted = regions
          .filter(r => {
            if (seen.has(r.city)) return false;
            seen.add(r.city);
            return true;
          })
          .map(region => ({
            id: `${region.city}-${region.price}`,
            name: region.city,
            price: region.price,
          }));
        setRegionOptions(formatted);
      } catch (err) {
        console.error("Failed to fetch target regions:", err);
      }
    };
    fetchRegions();
  }, []);

  return (
    <div className="w-full">
      <FormLabel text="Target Regions" required />
      <Controller
        name="targetRegions"
        control={control}
        defaultValue={[]}
        rules={{ required: "Please select target regions" }}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            fullWidth
            className="w-full"
            options={regionOptions}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={value}
            onChange={(e, newValue) => onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Regions"
                error={!!errors.targetRegions}
                helperText={errors.targetRegions?.message}
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

export default TargetRegionsSelect;
