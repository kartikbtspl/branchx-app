import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { productTypes } from "../../../../api/campaign-api/targetingOptionService";
import FormLabel from "../../formLabel/FormLabel";

const ProductTypeSelect = () => {
  const { control, formState: { errors } } = useFormContext();
  const [productTypeOptions, setProductTypeOptions] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productTypes();
        const formatted = products.map(p => ({
          name: p.product_type,
          price: p.price,
        }));
        setProductTypeOptions(formatted);
      } catch (err) {
        console.error("Failed to fetch product types:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <FormLabel text="Product Type" required />
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
            onChange={(e, newValue) => onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Product Type"
                error={!!errors.productType}
                helperText={errors.productType?.message}
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

export default ProductTypeSelect;