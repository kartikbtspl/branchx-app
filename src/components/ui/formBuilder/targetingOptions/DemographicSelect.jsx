import React from "react";
import { useFormContext } from "react-hook-form";
import FormLabel from "../../formLabel/FormLabel";

const DemographicSelect = () => {
  const { register } = useFormContext();
  const demographicOptions = [
    "Gender",
    "Purchase Behavior",
    "Income Level",
    "Education Level",
    "Occupation",
    "Interests",
  ];

  return (
    <div className="w-full">
      <FormLabel text="Demographics" />
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
  );
};

export default DemographicSelect;