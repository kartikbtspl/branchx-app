import React from "react";
import { useFormContext } from 'react-hook-form';

const CampaignForm = () => {
    const { register ,  formState: { errors } } = useFormContext();

  return (
    <div className="bg-gray-100 w-full flex ">
      <div className="bg-white w-full rounded-xl shadow p-8">
        <h2 className="text-lg font-semibold mb-6">Campaign Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campaign Name */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Name
            </label>
            <input
            {...register('campaignName' , { required: true , message: "Campaign Name is required" })}
              type="text"
              placeholder="Amul Butter Morning Push"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
            {errors.campaignName && (
              <span className="text-red-500 text-sm mt-1">
                Campaign Name is required
              </span>
            )}
          </div>

          {/* Campaign Description */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Description
            </label>
            <input
              type="text"
              {...register("campaignDescription" ,{required : true , message: "Campaign Description is required"})}
              placeholder="Optional description internal tracking"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
            {errors.campaignDescription && (
                <span className="text-red-500 text-sm mt-1">
                    Campaign Description is required
                </span>
            )}
          </div>

          {/* Campaign Objective */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Objective
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
             {...register('campaignObjective')}
            >
              <option>Brand Awareness</option>
              {/* Add more options if needed */}
            </select>
            {/* {errors.campaignObjective && (
              <span className="text-red-500 text-sm mt-1">
                Campaign Objective is required
              </span>
            )} */}
          </div>

          {/* Campaign Type */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Type
            </label>
            <select 
            {...register('campaignType')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400">
              <option>Video Ad</option>
              {/* Add more options if needed */}
            </select>
            {/* {errors.campaignType && (
              <span className="text-red-500 text-sm mt-1">
                Campaign Type is required
              </span>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
