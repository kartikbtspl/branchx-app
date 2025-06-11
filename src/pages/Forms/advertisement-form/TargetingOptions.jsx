import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { indianCities } from "../../../utils/ad-campaign-data/cities";

const TargetingOptions = () => {
  const {
    setValue,
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const adDeviceOptions = [
    { name: "Cube", price: 1500 },
    { name: "TV", price: 5000 },
    { name: "Billboard", price: 3000 },
    { name: "Mobile App", price: 1000 },
    { name: "Website", price: 1200 },
  ];

  const productTypeOptions = [
    { name: "Fresh Produce", price: 200 },
    { name: "Dairy Products", price: 300 },
    { name: "Packaged Snacks", price: 250 },
    { name: "Frozen Foods", price: 400 },
    { name: "Juices", price: 350 },
    { name: "Canned Goods", price: 275 },
  ];

  const demographicOptions = [
    "Gender",
    "Purchase Behavior",
    "Income Level",
    "Education Level",
    "Occupation",
    "Interests",
  ];

  return (
    <div className="bg-white w-full max-w-6xl mx-auto p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Targeting Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side */}
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
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={indianCities}
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

          {/* Product Type (store full object) */}
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
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
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

        {/* Right side */}
        <div className="space-y-4">
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

          {/* Ad Device Show (multi-select + object) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad Device Show
            </label>
            <Controller
              name="adDeviceShow"
              control={control}
              defaultValue={[]}
              rules={{ required: "Please select at least one device" }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={adDeviceOptions}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  value={value}
                  onChange={(event, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Devices"
                      error={!!errors.adDeviceShow}
                      helperText={errors.adDeviceShow?.message}
                      size="small"
                    />
                  )}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetingOptions;


// import { useFormContext, Controller } from "react-hook-form";
// import { Autocomplete, TextField } from "@mui/material";
// import { indianCities } from "../../../utils/ad-campaign-data/cities";

// const TargetingOptions = () => {
//   const {
//     register,
//     setValue,
//     control,
//     formState: { errors },
//   } = useFormContext();

//   // const toggleSelection = (value, list, fieldName) => {
//   //   if (list.includes(value)) {
//   //     setValue(
//   //       fieldName,
//   //       list.filter((v) => v !== value)
//   //     );
//   //   } else {
//   //     setValue(fieldName, [...list, value]);
//   //   }
//   // };

//   const toggleSelection = (value, list = [], fieldName) => {
//     if (list.includes(value)) {
//       setValue(
//         fieldName,
//         list.filter((v) => v !== value)
//       );
//     } else {
//       setValue(fieldName, [...list, value]);
//     }
//   };

//   const demographicOptions = [
//     "Gender",
//     "Purchase Behavior",
//     "Income Level",
//     "Education Level",
//     "Occupation",
//     "Interests",
//   ];
//   const adDeviceOptions = [
//     { name: "Cube", price: 1500 },
//     { name: "TV", price: 5000 },
//     { name: "Billboard", price: 3000 },
//     { name: "Mobile App", price: 1000 },
//     { name: "website", price: 1200 },
//   ];

//   const productTypeOptions = [
//     { name: "Fresh Produce", price: 200 },
//     { name: "Dairy Products", price: 300 },
//     { name: "Packaged Snacks", price: 250 },
//     { name: "Frozen Foods", price: 400 },
//     { name: "Juices", price: 350 },
//     { name: "Canned Goods", price: 275 },
//   ];

//   return (
//     <div className="bg-white w-full max-w-6xl mx-auto p-6 rounded-lg shadow">
//       <h2 className="text-lg font-semibold mb-4">Targeting Options</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left side */}
//         <div className="space-y-4">
//           {/* Target Regions */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Target Regions
//             </label>
//             <Controller
//               name="targetRegions"
//               control={control}
//               defaultValue={[]}
//               render={({ field: { onChange, value } }) => (
//                 <Autocomplete
//                   multiple
//                   options={indianCities}
//                   getOptionLabel={(option) => option.name}
//                   isOptionEqualToValue={(option, value) =>
//                     option.id === value.id
//                   }
//                   value={value}
//                   onChange={(event, newValue) => onChange(newValue)}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       placeholder="Select Regions"
//                       error={!!errors.targetRegions}
//                       helperText={errors.targetRegions?.message}
//                       size="small"
//                     />
//                   )}
//                 />
//               )}
//             />
//           </div>
//           {/* Product Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Type
//             </label>
//             <select
//               {...register("productType", {
//                 required: "Please select a product type",
//               })}
//               className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:ring focus:border-blue-400"
//             >
//               <option value="">Select Product</option>
//               {productTypeOptions.map((type) => (
//                 <option key={type.name} value={type.name}>
//                   {type.name}
//                 </option>
//               ))}
//             </select>
//             {errors.productType && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.productType.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Right side */}
//         <div className="space-y-4">
//           {/* Demographics */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Demographics
//             </label>
//             <select
//               {...register("demographic")}
//               className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:ring focus:border-blue-400"
//             >
//               <option value="">Select Demographic</option>
//               {demographicOptions.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Ad Device Show - MULTI SELECT using Autocomplete */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Ad Device Show
//             </label>
//             <Controller
//               name="adDeviceShow"
//               control={control}
//               defaultValue={[]}
//               rules={{ required: "Please select at least one device" }}
//               render={({ field: { onChange, value } }) => (
//                 <Autocomplete
//                   multiple
//                   options={adDeviceOptions}
//                   getOptionLabel={(option) => option.name}
//                   isOptionEqualToValue={(option, value) =>
//                     option.name === value.name
//                   }
//                   value={value}
//                   onChange={(event, newValue) => onChange(newValue)}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       placeholder="Select Devices"
//                       error={!!errors.adDeviceShow}
//                       helperText={errors.adDeviceShow?.message}
//                       size="small"
//                     />
//                   )}
//                 />
//               )}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TargetingOptions;

