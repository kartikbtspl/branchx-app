import React from "react";
import { useFormContext } from "react-hook-form";
import FormLabel from "@/components/ui/formLabel/FormLabel";
import FormInput from "@/components/ui/formInput/FormInput";
import FormSelect from "@/components/ui/formSelect/FormSelect";
import { CampaignFormfields as fields } from "./config/campaigFormFields";

const CampaignForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-gray-100 w-full flex">
      <div className="bg-white w-full rounded-xl shadow p-8">
        <h2 className="text-lg font-semibold mb-6">Campaign Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(({ name, label, type, placeholder, options, required }) => (
            <div className="w-full" key={name}>
              <FormLabel
                htmlFor={name}
                text={<span className="font-bold text-lg">{label}</span>}
                required={required?.value}
              />

              {type === "text" && (
                <FormInput
                  name={name}
                  placeholder={placeholder}
                  register={register}
                  error={errors[name]}
                  required={required}
                />
              )}

              {type === "select" && (
                <FormSelect
                  name={name}
                  register={register}
                  error={errors[name]}
                  options={options}
                  required={required}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;

// import React from "react";
// import { useFormContext } from "react-hook-form";
// import FormLabel from "../../../components/ui/formLabel/FormLabel";
// import FormInput from "../../../components/ui/formInput/FormInput";
// import FormSelect from "../../../components/ui/formSelect/FormSelect";

// const CampaignForm = () => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div className="bg-gray-100 w-full flex">
//       <div className="bg-white w-full rounded-xl shadow p-8">
//         <h2 className="text-lg font-semibold mb-6">Campaign Details</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="w-full">
//             <FormLabel
//               htmlFor="campaignName"
//               text={<span className="font-bold text-lg">Campaign Name</span>}
//               required
//             />
//             <FormInput
//               name="campaignName"
//               placeholder="write your campaign name"
//               register={register}
//               error={errors.campaignName}
//               required={{ value: true, message: "Campaign Name is required" }}
//             />
//           </div>

         
//           <div className="w-full">
//             <FormLabel
//               htmlFor="campaignName"
//               text={<span className="font-bold text-lg">Campaign Name</span>}
//             />

//             <FormInput
//               name="campaignDescription"
//               placeholder="Optional description for internal tracking"
//               register={register}
//               error={errors.campaignDescription}
//               required={{
//                 value: true,
//                 message: "Campaign Description is required",
//               }}
//             />
//           </div>

//           <div className="w-full">
//             <FormLabel htmlFor="campaignObjective"
//             text={<span className="font-bold text-lg">campaign Objective</span>}
//             />
//             <FormSelect
//               name="campaignObjective"
//               register={register}
//               error={errors.campaignObjective}
//               options={[
//                 { label: "Brand Awareness", value: "Brand Awareness" },
//                 { label: "Lead Generation", value: "Lead Generation" },
//                 { label: "Sales Promotion", value: "Sales Promotion" },
//               ]}
//             />
//           </div>

//           {/* Campaign Type */}
//           <div className="w-full">
//             <FormLabel htmlFor="campaignType" 
//               text={<span className="font-bold text-lg">Campaign Type</span>}
//             />
//             <FormSelect
//               name="campaignType"
//               register={register}
//               error={errors.campaignType}
//               options={[
//                 { label: "Video Ad", value: "Video Ad" },
//                 { label: "Image Ad", value: "Image Ad" },
//               ]}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CampaignForm;

// import React from "react";
// import { useFormContext } from 'react-hook-form';

// const CampaignForm = () => {
//     const { register ,  formState: { errors } } = useFormContext();

//   return (
//     <div className="bg-gray-100 w-full flex ">
//       <div className="bg-white w-full rounded-xl shadow p-8">
//         <h2 className="text-lg font-semibold mb-6">Campaign Details</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Campaign Name */}
//           <div className="w-full">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Campaign Name
//             </label>
//             <input
//             {...register('campaignName' , { required: true , message: "Campaign Name is required" })}
//               type="text"
//               placeholder="Amul Butter Morning Push"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
//             />
//             {errors.campaignName && (
//               <span className="text-red-500 text-sm mt-1">
//                 Campaign Name is required
//               </span>
//             )}
//           </div>

//           {/* Campaign Description */}
//           <div className="w-full">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Campaign Description
//             </label>
//             <input
//               type="text"
//               {...register("campaignDescription" ,{required : true , message: "Campaign Description is required"})}
//               placeholder="Optional description internal tracking"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
//             />
//             {errors.campaignDescription && (
//                 <span className="text-red-500 text-sm mt-1">
//                     Campaign Description is required
//                 </span>
//             )}
//           </div>

//           {/* Campaign Objective */}
//           <div className="w-full">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Campaign Objective
//             </label>
//             <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
//              {...register('campaignObjective')}
//             >
//               <option>Brand Awareness</option>
//               <option>Lead Generation</option>
//               <option>Sales Promotion</option>
//               {/* Add more options if needed */}
//             </select>
//             {/* {errors.campaignObjective && (
//               <span className="text-red-500 text-sm mt-1">
//                 Campaign Objective is required
//               </span>
//             )} */}
//           </div>

//           {/* Campaign Type */}
//           <div className="w-full">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Campaign Type
//             </label>
//             <select
//             {...register('campaignType')}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400">
//               <option>Video Ad</option>
//               <option>Image Ad</option>
//               {/* Add more options if needed */}
//             </select>
//             {/* {errors.campaignType && (
//               <span className="text-red-500 text-sm mt-1">
//                 Campaign Type is required
//               </span>
//             )} */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CampaignForm;
