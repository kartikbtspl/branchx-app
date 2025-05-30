import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { indianCities } from "../../../utils/ad-campaign-data/cities";

const TargetingOptions = () => {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext();

  const ageGroups = watch("ageGroups") || [];

  const toggleSelection = (value, list, fieldName) => {
    if (list.includes(value)) {
      setValue(
        fieldName,
        list.filter((v) => v !== value)
      );
    } else {
      setValue(fieldName, [...list, value]);
    }
  };

  const ageOptions = ["16-24", "25-35", "35-50", "50+"];
  const demographicOptions = [
    "Gender",
    "Purchase Behavior",
    "Income Level",
    "Education Level",
    "Occupation",
    "Interests",
  ];
  const adDeviceOptions = ["Cube", "TV", "Billboard"];

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
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
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

          {/* Age Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age Group
            </label>
            <div className="flex flex-wrap gap-4">
              {ageOptions.map((age) => (
                <label key={age} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={ageGroups.includes(age)}
                    onChange={() =>
                      toggleSelection(age, ageGroups, "ageGroups")
                    }
                  />
                  {age}
                </label>
              ))}
            </div>
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

          {/* Ad Device Show Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad Device Show
            </label>
            <select
              {...register("adDeviceShow", {
                required: "Please select a device type",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:ring focus:border-blue-400"
            >
              <option value="">Select Device</option>
              {adDeviceOptions.map((device) => (
                <option key={device} value={device}>
                  {device}
                </option>
              ))}
            </select>
            {errors.adDeviceShow && (
              <p className="text-red-500 text-sm mt-1">
                {errors.adDeviceShow.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetingOptions;

// import React from "react";
// import { useFormContext, Controller } from "react-hook-form";
// import { Autocomplete, TextField } from "@mui/material";
// import { indianCities } from "../../../utils/ad-campaign-data/cities";

// const TargetingOptions = () => {
//   const {
//     register,
//     setValue,
//     watch,
//     control,
//     formState: { errors },
//   } = useFormContext();

//   const ageGroups = watch("ageGroups") || [];
//   const demographic = watch("demographic") || [];

//   const toggleSelection = (value, list, fieldName) => {
//     if (list.includes(value)) {
//       setValue(
//         fieldName,
//         list.filter((v) => v !== value)
//       );
//     } else {
//       setValue(fieldName, [...list, value]);
//     }
//   };

//   const ageOptions = ["16-24", "25-35", "35-50", "50+"];
//   const demographicOptions = [
//     "Gender",
//     "Purchase Behavior",
//     "Income Level",
//     "Education Level",
//     "Occupation",
//     "Interests",
//   ];

//   return (
//     <div className="bg-white w-full max-w-6xl mx-auto p-6 rounded-lg shadow">
//       <h2 className="text-lg font-semibold mb-4">Targeting Options</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-4">
         
//           <div className="">
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
//                   onChange={(event, newValue) => {
//                     onChange(newValue);
//                   }}
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

//           {/* Age Group */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Age Group
//             </label>
//             <div className="flex flex-wrap gap-4">
//               {ageOptions.map((age) => (
//                 <label key={age} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     checked={ageGroups.includes(age)}
//                     onChange={() =>
//                       toggleSelection(age, ageGroups, "ageGroups")
//                     }
//                   />
//                   {age}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Side */}
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
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TargetingOptions;


// import React from "react";
// import { useFormContext, Controller } from "react-hook-form";
// import { Autocomplete, TextField } from "@mui/material";
// import { indianCities } from "../../../utils/ad-campaign-data/cities";

// const TargetingOptions = () => {
//   const {
//     register,
//     setValue,
//     watch,
//     control,
//     formState: { errors },
//   } = useFormContext();

//   const ageGroups = watch("ageGroups") || [];
//   const cities = watch("cities") || [];
//   const demographic = watch("demographic") || [];

//   const toggleSelection = (value, list, fieldName) => {
//     if (list.includes(value)) {
//       setValue(
//         fieldName,
//         list.filter((v) => v !== value)
//       );
//     } else {
//       setValue(fieldName, [...list, value]);
//     }
//   };

//   const ageOptions = ["16-24", "25-35", "35-50", "50+"];
//   const cityOptions = ["<18", "24", "55", "50"];
//   const demographicOptions = [
//     "Gender",
//     "Purchase Behavior",
//     "Income Level",
//     "Education Level",
//     "Occupation",
//     "Interests",
//   ];

//   return (
//     <div className="bg-white w-full max-w-6xl mx-auto p-6 rounded-lg shadow">
//       <h2 className="text-lg font-semibold mb-4">Targeting Options</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-4">
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
//                   onChange={(event, newValue) => {
//                     onChange(newValue);
//                   }}
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

//           {/* Age Group */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Age Group
//             </label>
//             <div className="flex flex-wrap gap-4">
//               {ageOptions.map((age) => (
//                 <label key={age} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     checked={ageGroups.includes(age)}
//                     onChange={() =>
//                       toggleSelection(age, ageGroups, "ageGroups")
//                     }
//                   />
//                   {age}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="space-y-4">
//           {/* Target Cities */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Target Cities
//             </label>
//             <div className="flex flex-wrap gap-4">
//               {cityOptions.map((city) => (
//                 <label key={city} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     checked={cities.includes(city)}
//                     onChange={() => toggleSelection(city, cities, "cities")}
//                   />
//                   {city}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Demographics */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Demographics
//             </label>
//             <select
//               {...register("demographic")}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:border-blue-400"
//             >
//               <option value="">Select Demographic</option>
//               {demographicOptions.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TargetingOptions;
