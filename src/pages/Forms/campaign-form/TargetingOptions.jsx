import { useEffect, useState } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import {
  deviceTypes,
  productTypes,
  targetRegions,
  estimatePrice,
} from "../../../api/campaign-api/targetingOptionService";

const TargetingOptions = () => {
  const {
    setValue,
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const [adDeviceOptions, setAdDeviceOptions] = useState([]);
  const [productTypeOptions, setProductTypeOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);

  const watchedTargetRegions = useWatch({ control, name: "targetRegions" });
  const watchedProductType = useWatch({ control, name: "productType" });
  const watchedAdDevices = useWatch({ control, name: "adDevices" });

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devices = await deviceTypes();
        const uniqueDevices = Array.from(
          new Map(devices.map((d) => [d.deviceType, d])).values()
        ).map((d) => ({
          name: d.deviceType,
          price: d.price,
          count: d.availableCount,
        }));
        setAdDeviceOptions(uniqueDevices);
      } catch (err) {
        console.error("Failed to fetch device types:", err);
      }
    };
    fetchDevices();
  }, []);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const products = await productTypes();
        const formatted = products.map((p) => ({
          name: p.product_type,
          price: p.price,
        }));
        setProductTypeOptions(formatted);
      } catch (err) {
        console.error("Failed to fetch product types:", err);
      }
    };
    fetchProductTypes();
  }, []);

  useEffect(() => {
    const fetchTargetRegions = async () => {
      try {
        const regions = await targetRegions();
        const seen = new Set();
        const formatted = regions
          .filter((r) => {
            if (seen.has(r.city)) return false;
            seen.add(r.city);
            return true;
          })
          .map((region) => ({
            id: `${region.city}-${region.price}`,
            name: region.city,
            price: region.price,
          }));

        setRegionOptions(formatted);
        console.log(formatted)
      } catch (err) {
        console.error("Failed to fetch target regions:", err);
      }
    };
    fetchTargetRegions();
  }, []);

  // Estimate price
  useEffect(() => {
    const fetchEstimate = async () => {
      if (
        watchedTargetRegions?.length > 0 &&
        watchedProductType?.name &&
        watchedAdDevices?.length > 0
      ) {
        const payload = {
          targetRegions: watchedTargetRegions.map((r) => r.name),
          productType: watchedProductType.name,
          adDevices: watchedAdDevices.map((d) => d.name),
        };

        console.log("Estimate Payload:", payload);

        try {
          const data = await estimatePrice(payload);
          setValue("estimatedPrice", data.estimatedPrice);
          setValue("baseBid", data.estimatedPrice);
          setValue("budgetLimit", data.estimatedPrice);
        } catch (error) {
          console.error("Error fetching estimate:", error);
        }
      }
    };

    fetchEstimate();
  }, [watchedTargetRegions, watchedProductType, watchedAdDevices]);

  const demographicOptions = [
    "Gender",
    "Purchase Behavior",
    "Income Level",
    "Education Level",
    "Occupation",
    "Interests",
  ];

  const estimatedPrice = watch("estimatedPrice");

  return (
    <div className="bg-white w-full max-w-6xl mx-auto p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Targeting Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Target Regions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Regions
            </label>
            <Controller
              name="targetRegions"
              control={control}
              defaultValue={[]}
              rules={{ required: "Please select target regions" }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={regionOptions}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  value={value}
                  onChange={(event, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Regions"
                      error={!!errors.targetRegions}
                      helperText={errors.targetRegions?.message}
                      size="small"
                    />
                  )}
                />
              )}
            />
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Type
            </label>
            <Controller
              name="productType"
              control={control}
              rules={{ required: "Please select a product type" }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={productTypeOptions}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  value={value}
                  onChange={(event, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Product Type"
                      error={!!errors.productType}
                      helperText={errors.productType?.message}
                      size="small"
                    />
                  )}
                />
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          {/* Ad Devices */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad Devices
            </label>
            <Controller
              name="adDevices"
              control={control}
              defaultValue={[]}
              rules={{ required: "Please select at least one device" }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={adDeviceOptions}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  value={value}
                  onChange={(event, newValue) => {
                    const prevDevices = value || [];
                    const removedDevices = prevDevices.filter(
                      (d) => !newValue.some((nd) => nd.name === d.name)
                    );
                    removedDevices.forEach((d) =>
                      setValue(`deviceUsage.${d.name}`, undefined)
                    );
                    onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Devices"
                      error={!!errors.adDevices}
                      helperText={errors.adDevices?.message}
                      size="small"
                    />
                  )}
                />
              )}
            />
          </div>

          {/* Demographics */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Demographics
            </label>
            <select
              {...register("demographic")}
              className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:ring focus:border-blue-400"
            >
              <option value="">Select Demographic</option>
              {demographicOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Estimated Price */}
      {estimatedPrice && (
        <div className="mt-6 text-lg font-semibold text-green-600">
          Estimated Price: ₹ {estimatedPrice.toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default TargetingOptions;


